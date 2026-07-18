import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { timetableSlotSchema } from '../../schemas/courseSchema';
import type { TimetableSlotFormInput, TimetableSlotFormData } from '../../schemas/courseSchema';
import type { Course, TimetableSlot } from '../../types/course';

interface Department {
  id: number;
  name: string;
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

const TimetableManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [slots, setSlots] = useState<Record<number, TimetableSlot[]>>({});
  const [selectedDeptId, setSelectedDeptId] = useState<number | ''>('');
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  
  const todayDayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
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
      const [coursesRes, deptRes] = await Promise.all([
        apiClient.get('/courses'),
        apiClient.get('/admin/departments')
      ]);
      const courseList: Course[] = coursesRes.data;
      setCourses(courseList);
      setDepartments(deptRes.data?.data ?? deptRes.data ?? []);

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData();
  }, []);

  const onSubmit = async (data: TimetableSlotFormData) => {
    setApiError('');
    setSaving(true);
    try {
      await apiClient.post('/timetable', data);
      reset();
      await loadData();
    } catch (err: unknown) {
      let message = 'Failed to create slot';
      if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message?: unknown }).message === 'string') {
        message = (err as { message: string }).message;
      }
      setApiError(message);
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
      <h1 className="page-title mb-6">Timetable Management</h1>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Add Timetable Slot</h2>

        {apiError && (
          <p className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg p-3">{apiError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-5 gap-3" noValidate>
          <div>
            <select {...register('courseId')} className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white">
              <option value="" className="dark:bg-slate-900">Select course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id} className="dark:bg-slate-900">{c.code} - {c.name}</option>
              ))}
            </select>
            {errors.courseId && <p className="text-red-600 text-xs mt-1">{errors.courseId.message}</p>}
          </div>

          <div>
            <select {...register('dayOfWeek')} className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white">
              {DAYS.map((d) => (
                <option key={d} value={d} className="dark:bg-slate-900">{d.charAt(0).toUpperCase() + d.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <input type="time" {...register('startTime')} className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white [color-scheme:light_dark]" />
            {errors.startTime && <p className="text-red-600 text-xs mt-1">{errors.startTime.message}</p>}
          </div>

          <div>
            <input type="time" {...register('endTime')} className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white [color-scheme:light_dark]" />
            {errors.endTime && <p className="text-red-600 text-xs mt-1">{errors.endTime.message}</p>}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              {...register('room')}
              placeholder="Room"
              className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={saving}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50 whitespace-nowrap"
            >
              {saving ? '...' : 'Add'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h2 className="font-semibold text-slate-900 dark:text-white">Current Schedule</h2>
          <div className="flex items-center gap-3">
             <button
                onClick={() => setShowTodayOnly(!showTodayOnly)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  showTodayOnly
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300'
                    : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Today Only
              </button>
             <select
               value={selectedDeptId}
               onChange={(e) => setSelectedDeptId(e.target.value === '' ? '' : Number(e.target.value))}
               className="border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white"
             >
               <option value="" className="dark:bg-slate-900">All Departments</option>
               {departments.map(d => (
                 <option key={d.id} value={d.id} className="dark:bg-slate-900">{d.name}</option>
               ))}
             </select>
          </div>
        </div>
        <div className="space-y-4">
          {courses
            .filter(c => selectedDeptId === '' || c.departmentId === selectedDeptId)
            .filter(c => {
              if (!showTodayOnly) return true;
              const cSlots = slots[c.id] || [];
              return cSlots.some(s => s.dayOfWeek === todayDayName);
            })
            .map((c) => {
              const cSlots = slots[c.id] || [];
              const filteredSlots = showTodayOnly ? cSlots.filter(s => s.dayOfWeek === todayDayName) : cSlots;
              
              return (
                <div key={c.id}>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">{c.code} - {c.name}</p>
                  {filteredSlots.length === 0 ? (
                    <p className="text-xs text-slate-400 ml-2">No slots scheduled{showTodayOnly ? ' today' : ''}.</p>
                  ) : (
                    <div className="space-y-1 ml-2">
                      {filteredSlots.map((s) => (
                        <div key={s.id} className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400 border-b border-slate-50 dark:border-slate-800/50 pb-1">
                          <span className="capitalize">
                            {s.dayOfWeek} • {s.startTime.slice(0, 5)} - {s.endTime.slice(0, 5)} {s.room && `• ${s.room}`}
                          </span>
                          <button onClick={() => handleDeleteSlot(s.id)} className="text-red-600 hover:underline">
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default TimetableManagement;