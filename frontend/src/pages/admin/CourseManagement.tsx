import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { courseSchema } from '../../schemas/courseSchema';
import type { CourseFormInput, CourseFormData } from '../../schemas/courseSchema';
import type { Course } from '../../types/course';

interface Department {
  id: number;
  name: string;
}

interface FacultyUser {
  id: number;
  name: string;
  email: string;
}

interface StudentUser {
  id: number;
  name: string;
  email: string;
}

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [facultyList, setFacultyList] = useState<FacultyUser[]>([]);
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [enrolledMap, setEnrolledMap] = useState<Record<number, number[]>>({});
  const [expandedCourseId, setExpandedCourseId] = useState<number | null>(null);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [editFacultyId, setEditFacultyId] = useState<string>('');
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
      const [coursesRes, deptRes, facultyRes, studentsRes] = await Promise.all([
        apiClient.get('/courses'),
        apiClient.get('/admin/departments'),
        apiClient.get('/admin/users?role=faculty'),
        apiClient.get('/admin/users?role=student'),
      ]);
      setCourses(coursesRes.data);
      setDepartments(deptRes.data.data || deptRes.data);
      setFacultyList(facultyRes.data.data || facultyRes.data);
      setStudents(studentsRes.data.data || studentsRes.data);
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setLoading(false);
    }
  };

  const loadEnrollments = async (courseId: number) => {
    try {
      const res = await apiClient.get(`/courses/${courseId}/students`);
      const ids = (res.data || []).map((e: any) => e.studentId);
      setEnrolledMap((prev) => ({ ...prev, [courseId]: ids }));
    } catch (err) {
      console.error('Failed to load enrollments', err);
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
      reset({ credits: 3, name: '', code: '', departmentId: undefined, facultyId: undefined } as CourseFormInput);
      await loadData();
    } catch (err: any) {
      setApiError(err.message || 'Failed to create course');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this course? This will also remove its enrollments and timetable slots.')) return;
    try {
      await apiClient.delete(`/courses/${id}`);
      await loadData();
    } catch (err) {
      console.error('Failed to delete course', err);
    }
  };

  const toggleExpand = (courseId: number) => {
    if (expandedCourseId === courseId) {
      setExpandedCourseId(null);
      return;
    }
    setExpandedCourseId(courseId);
    if (!enrolledMap[courseId]) {
      loadEnrollments(courseId);
    }
  };

  const startEditFaculty = (course: Course) => {
    setEditingCourseId(course.id);
    setEditFacultyId(course.facultyId ? String(course.facultyId) : '');
  };

  const saveEditFaculty = async (courseId: number) => {
    try {
      await apiClient.patch(`/courses/${courseId}`, {
        facultyId: editFacultyId ? Number(editFacultyId) : null,
      });
      setEditingCourseId(null);
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to update faculty assignment');
    }
  };

  const handleToggleEnroll = async (courseId: number, studentId: number, isEnrolled: boolean) => {
    try {
      if (isEnrolled) {
        await apiClient.delete(`/courses/${courseId}/students/${studentId}`);
      } else {
        await apiClient.post(`/courses/${courseId}/enroll`, { studentId });
      }
      await loadEnrollments(courseId);
    } catch (err) {
      console.error('Failed to update enrollment', err);
    }
  };

  const getDeptName = (id: number) => departments.find((d) => d.id === id)?.name || '-';
  const getFacultyName = (id: number | null) => facultyList.find((f) => f.id === id)?.name || 'Unassigned';

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Course Management</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <h2 className="font-semibold text-slate-900 mb-4">Add New Course</h2>

        {apiError && (
          <p className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg p-3">{apiError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-5 gap-3" noValidate>
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
              placeholder="Course code"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
            {errors.code && <p className="text-red-600 text-xs mt-1">{errors.code.message}</p>}
          </div>

          <div>
            <select {...register('departmentId')} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
              <option value="">Select department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            {errors.departmentId && <p className="text-red-600 text-xs mt-1">{errors.departmentId.message}</p>}
          </div>

          <div>
            <select {...register('facultyId')} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
              <option value="">Assign faculty (optional)</option>
              {facultyList.map((f) => (
                <option key={f.id} value={String(f.id)}>{f.name}</option>
              ))}
            </select>
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
        <div className="space-y-2">
          {courses.length === 0 && <p className="text-sm text-slate-400">No courses yet.</p>}
          {courses.map((c) => (
            <div key={c.id} className="border border-slate-100 rounded-lg">
              <div className="flex items-center justify-between p-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{c.code} — {c.name}</p>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{getDeptName(c.departmentId)} • {c.credits} credits • Faculty:</span>
                    {editingCourseId === c.id ? (
                      <span className="flex items-center gap-1">
                        <select
                          value={editFacultyId}
                          onChange={(e) => setEditFacultyId(e.target.value)}
                          className="border border-slate-300 rounded px-1 py-0.5 text-xs"
                        >
                          <option value="">Unassigned</option>
                          {facultyList.map((f) => (
                            <option key={f.id} value={f.id}>{f.name}</option>
                          ))}
                        </select>
                        <button onClick={() => saveEditFaculty(c.id)} className="text-indigo-600 hover:underline">Save</button>
                        <button onClick={() => setEditingCourseId(null)} className="text-slate-400 hover:underline">Cancel</button>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        {getFacultyName(c.facultyId)}
                        <button onClick={() => startEditFaculty(c)} className="text-indigo-600 hover:underline ml-1">Edit</button>
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleExpand(c.id)}
                    className="text-indigo-600 text-xs hover:underline"
                  >
                    {expandedCourseId === c.id ? 'Hide Students' : 'Manage Students'}
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="text-red-600 text-xs hover:underline">
                    Delete
                  </button>
                </div>
              </div>

              {expandedCourseId === c.id && (
                <div className="border-t border-slate-100 p-3 bg-slate-50">
                  <p className="text-xs font-medium text-slate-600 mb-2">Enroll / Unenroll Students</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-h-48 overflow-y-auto">
                    {students.map((s) => {
                      const isEnrolled = (enrolledMap[c.id] || []).includes(s.id);
                      return (
                        <label
                          key={s.id}
                          className="flex items-center gap-2 text-xs text-slate-700 bg-white rounded px-2 py-1.5 border border-slate-100 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={isEnrolled}
                            onChange={() => handleToggleEnroll(c.id, s.id, isEnrolled)}
                          />
                          {s.name} <span className="text-slate-400">({s.email})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CourseManagement;