import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { timetableSlotSchema } from '../../schemas/courseSchema';
import type { TimetableSlotFormInput, TimetableSlotFormData } from '../../schemas/courseSchema';
import type { Course, TimetableSlot } from '../../types/course';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

const TimetableManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [slots, setSlots] = useState<Record<number, TimetableSlot[]>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TimetableSlotFormInput, unknown, TimetableSlotFormData>({
    resolver: zodResolver(timetableSlotSchema),
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const coursesRes = await apiClient.get('/courses');
      const courseList: Course[] = coursesRes.data;
      setCourses(courseList);

      const slotsResults = await Promise.all(
        courseList.map((c) => apiClient.get(`/timetable/course/${c.id}`))
      );

      const slotsMap: Record<number, TimetableSlot[]> = {};
      courseList.forEach((c, i) => {
        slotsMap[c.id] = slotsResults[i].data;
      });
      setSlots(slotsMap);
    } catch (err) {
      console.error('Failed to load timetable data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (data: TimetableSlotFormData) => {
    setApiError('');
    setSaving(true);
    try {
      await apiClient.post('/timetable', data);
      reset();
      await loadData();
    } catch (err: any) {
      setApiError(err.message || 'Failed to create slot');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSlot = async (id: number) => {
    if (!confirm('Delete this timetable slot?')) return;
    try {
      await apiClient.delete(`/timetable/${id}`);
      await loadData();
    } catch (err) {
      console.error('Failed to delete slot', err);
    }
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Timetable Management</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <h2 className="font-semibold text-slate-900 mb-4">Add Timetable Slot</h2>

        {apiError && (
          <p className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg p-3">{apiError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-5 gap-3" noValidate>
          <div>
            <select {...register('courseId')} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
              <option value="">Select course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
              ))}
            </select>
            {errors.courseId && <p className="text-red-600 text-xs mt-1">{errors.courseId.message}</p>}
          </div>

          <div>
            <select {...register('dayOfWeek')} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
              {DAYS.map((d) => (
                <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <input type="time" {...register('startTime')} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
            {errors.startTime && <p className="text-red-600 text-xs mt-1">{errors.startTime.message}</p>}
          </div>

          <div>
            <input type="time" {...register('endTime')} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
            {errors.endTime && <p className="text-red-600 text-xs mt-1">{errors.endTime.message}</p>}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              {...register('room')}
              placeholder="Room"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={saving}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50 whitespace-nowrap transition-colors"
            >
              {saving ? '...' : 'Add'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Current Schedule</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {courses.map((c) => (
            <div key={c.id} className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {c.code}
                </span>
                <p className="text-sm font-medium text-slate-800">{c.name}</p>
              </div>
              {(!slots[c.id] || slots[c.id].length === 0) ? (
                <p className="text-xs text-slate-400 ml-1">No slots scheduled.</p>
              ) : (
                <div className="space-y-1.5 ml-1">
                  {slots[c.id].map((s) => (
                    <div key={s.id} className="flex justify-between items-center bg-slate-50 rounded-lg px-3 py-2">
                      <span className="text-xs text-slate-600 capitalize">
                        <span className="font-medium text-slate-800">{s.dayOfWeek}</span>
                        {' • '}{s.startTime.slice(0, 5)} - {s.endTime.slice(0, 5)}
                        {s.room && ` • ${s.room}`}
                      </span>
                      <button
                        onClick={() => handleDeleteSlot(s.id)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TimetableManagement;