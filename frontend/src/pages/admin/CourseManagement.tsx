import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { courseSchema } from '../../schemas/courseSchema';
import type { CourseFormData } from '../../schemas/courseSchema';
import type { Course } from '../../types/course';
import type { z } from 'zod';

type CourseFormInput = z.input<typeof courseSchema>;

interface Department {
  id: number;
  name: string;
}

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseFormInput, unknown, CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: { credits: 3 },
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [coursesRes, deptRes] = await Promise.all([
        apiClient.get('/courses'),
        apiClient.get('/admin/departments'),
      ]);
      setCourses(coursesRes.data);
      setDepartments(deptRes.data.data || deptRes.data);
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (data: CourseFormData) => {
    setApiError('');
    setSaving(true);
    try {
      await apiClient.post('/courses', data);
      reset({ credits: 3, name: '', code: '', departmentId: undefined });
      await loadData();
    } catch (err: any) {
      setApiError(err.message || 'Failed to create course');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this course?')) return;
    try {
      await apiClient.delete(`/courses/${id}`);
      await loadData();
    } catch (err) {
      console.error('Failed to delete course', err);
    }
  };

  const getDeptName = (id: number) => departments.find((d) => d.id === id)?.name || '-';

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Course Management</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <h2 className="font-semibold text-slate-900 mb-4">Add New Course</h2>

        {apiError && (
          <p className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg p-3">{apiError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-3" noValidate>
          <div>
            <input
              type="text"
              {...register('name')}
              placeholder="Course name"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <input
              type="text"
              {...register('code')}
              placeholder="Course code (e.g. CS201)"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
            {errors.code && <p className="text-red-600 text-xs mt-1">{errors.code.message}</p>}
          </div>

          <div>
            <select
              {...register('departmentId')}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Select department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            {errors.departmentId && <p className="text-red-600 text-xs mt-1">{errors.departmentId.message}</p>}
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              {...register('credits')}
              placeholder="Credits"
              className="w-20 border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? 'Adding...' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">All Courses</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="pb-2">Code</th>
              <th className="pb-2">Name</th>
              <th className="pb-2">Department</th>
              <th className="pb-2">Credits</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 && (
              <tr><td colSpan={5} className="text-slate-400 py-4 text-center">No courses yet.</td></tr>
            )}
            {courses.map((c) => (
              <tr key={c.id} className="border-b border-slate-100">
                <td className="py-2 text-slate-700 font-medium">{c.code}</td>
                <td className="py-2 text-slate-700">{c.name}</td>
                <td className="py-2 text-slate-700">{getDeptName(c.departmentId)}</td>
                <td className="py-2 text-slate-700">{c.credits}</td>
                <td className="py-2 text-right">
                  <button onClick={() => handleDelete(c.id)} className="text-red-600 text-xs hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default CourseManagement;