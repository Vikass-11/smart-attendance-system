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
  const [pendingEnrollments, setPendingEnrollments] = useState<Record<number, number[]>>({});
  const [savingEnrollments, setSavingEnrollments] = useState<Record<number, boolean>>({});
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
      const raw = (res.data ?? []) as Array<Record<string, unknown>>;
      const ids = raw
        .map((e) => {
          const raw_id = e.studentId ?? e.student_id ?? e.id;
          return typeof raw_id === 'number' ? raw_id : Number(raw_id);
        })
        .filter((n) => !isNaN(n) && n > 0);
      setEnrolledMap((prev) => ({ ...prev, [courseId]: ids }));
    } catch (err) {
      console.error('Failed to load enrollments', err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData();
  }, []);

  const onSubmit = async (data: CourseFormData) => {
    setApiError('');
    setSaving(true);
    try {
      await apiClient.post('/courses', data);
      reset({ credits: 3, name: '', code: '', departmentId: undefined, facultyId: undefined } as CourseFormInput);
      await loadData();
    } catch (err: unknown) {
      let message = 'Failed to create course';
      if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message?: unknown }).message === 'string') {
        message = (err as { message: string }).message;
      }
      setApiError(message);
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
    void loadEnrollments(courseId);
  };

  const handlePendingToggle = (courseId: number, studentId: number) => {
    setPendingEnrollments((prev) => {
      const current = prev[courseId] ?? [...(enrolledMap[courseId] ?? [])];
      const isChecked = current.includes(studentId);
      return {
        ...prev,
        [courseId]: isChecked ? current.filter((id) => id !== studentId) : [...current, studentId],
      };
    });
  };

  const saveEnrollments = async (courseId: number) => {
    setSavingEnrollments((prev) => ({ ...prev, [courseId]: true }));
    const original = enrolledMap[courseId] ?? [];
    const pending = pendingEnrollments[courseId] ?? original;
    const toAdd = pending.filter((id) => !original.includes(id));
    const toRemove = original.filter((id) => !pending.includes(id));
    try {
      await Promise.all([
        ...toAdd.map((studentId) => apiClient.post(`/courses/${courseId}/enroll`, { studentId })),
        ...toRemove.map((studentId) => apiClient.delete(`/courses/${courseId}/students/${studentId}`)),
      ]);
      await loadEnrollments(courseId);
      setPendingEnrollments((prev) => { const next = { ...prev }; delete next[courseId]; return next; });
    } catch (err) {
      console.error('Failed to save enrollments', err);
    } finally {
      setSavingEnrollments((prev) => ({ ...prev, [courseId]: false }));
    }
  };

  const startEditFaculty = (course: Course) => {
    setEditingCourseId(course.id);
    setEditFacultyId(course.facultyId ? String(course.facultyId) : '');
  };

  const saveEditFaculty = async (courseId: number) => {
    try {
      await apiClient.put(`/courses/${courseId}`, {
        facultyId: editFacultyId ? Number(editFacultyId) : null,
      });
      setEditingCourseId(null);
      await loadData();
    } catch (err: unknown) {
      let message = 'Failed to update faculty assignment';
      if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message?: unknown }).message === 'string') {
        message = (err as { message: string }).message;
      }
      alert(message);
    }
  };

  // Enrollment is now managed via handlePendingToggle + saveEnrollments

  const getDeptName = (id: number) => departments.find((d) => d.id === id)?.name || '-';
  const getFacultyName = (id: number | null) => facultyList.find((f) => f.id === id)?.name || 'Unassigned';

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="page-title mb-6">Course Management</h1>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Add New Course</h2>

        {apiError && (
          <p className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg p-3">{apiError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-5 gap-3" noValidate>
          <div>
            <input
              type="text"
              {...register('name')}
              placeholder="Course name"
              className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white"
            />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <input
              type="text"
              {...register('code')}
              placeholder="Course code"
              className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white"
            />
            {errors.code && <p className="text-red-600 text-xs mt-1">{errors.code.message}</p>}
          </div>

          <div>
            <select {...register('departmentId')} className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white">
              <option value="" className="dark:bg-slate-900">Select department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id} className="dark:bg-slate-900">{d.name}</option>
              ))}
            </select>
            {errors.departmentId && <p className="text-red-600 text-xs mt-1">{errors.departmentId.message}</p>}
          </div>

          <div>
            <select {...register('facultyId')} className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white">
              <option value="" className="dark:bg-slate-900">Assign faculty (optional)</option>
              {facultyList.map((f) => (
                <option key={f.id} value={String(f.id)} className="dark:bg-slate-900">{f.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              {...register('credits')}
              placeholder="Credits"
              className="w-20 border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white"
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

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">All Courses</h2>
        <div className="space-y-2">
          {courses.length === 0 && <p className="text-sm text-slate-400">No courses yet.</p>}
          {courses.map((c) => (
            <div key={c.id} className="border border-slate-100 dark:border-slate-800 rounded-lg">
              <div className="flex items-center justify-between p-3 min-w-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{c.code} — {c.name}</p>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{getDeptName(c.departmentId)} • {c.credits} credits • Faculty:</span>
                    {editingCourseId === c.id ? (
                      <span className="flex items-center gap-1">
                        <select
                          value={editFacultyId}
                          onChange={(e) => setEditFacultyId(e.target.value)}
                          className="border border-slate-300 dark:border-slate-700 bg-transparent rounded px-1 py-0.5 text-xs text-slate-900 dark:text-white"
                        >
                          <option value="" className="dark:bg-slate-900">Unassigned</option>
                          {facultyList.map((f) => (
                            <option key={f.id} value={f.id} className="dark:bg-slate-900">{f.name}</option>
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
                <div className="border-t border-slate-100 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Enroll / Unenroll Students</p>
                    <div className="flex items-center gap-2">
                      {pendingEnrollments[c.id] !== undefined && (
                        <button
                          onClick={() => setPendingEnrollments((prev) => { const next = { ...prev }; delete next[c.id]; return next; })}
                          className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 rounded"
                        >
                          Reset
                        </button>
                      )}
                      <button
                        onClick={() => void saveEnrollments(c.id)}
                        disabled={savingEnrollments[c.id] || pendingEnrollments[c.id] === undefined}
                        className="text-xs bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                      >
                        {savingEnrollments[c.id] ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
                    {students.map((s) => {
                      const pending = pendingEnrollments[c.id];
                      const isChecked = pending !== undefined
                        ? pending.includes(s.id)
                        : (enrolledMap[c.id] ?? []).includes(s.id);
                      const isDirty = pending !== undefined &&
                        isChecked !== (enrolledMap[c.id] ?? []).includes(s.id);
                      return (
                        <label
                          key={s.id}
                          className={`flex items-center gap-2.5 text-xs rounded-lg px-3 py-2 border cursor-pointer transition-colors select-none
                            ${
                              isDirty
                                ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-900 dark:text-indigo-200'
                                : isChecked
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-slate-800 dark:text-slate-200'
                                : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                        >
                          <span className={`w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition-colors pointer-events-none
                            ${
                              isDirty
                                ? 'border-indigo-500 bg-indigo-500'
                                : isChecked
                                ? 'border-emerald-500 bg-emerald-500'
                                : 'border-slate-300 dark:border-slate-600'
                            }`}
                          >
                            {isChecked && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isChecked}
                            onChange={() => handlePendingToggle(c.id, s.id)}
                          />
                          <span className="font-medium">{s.name}</span>
                          <span className="text-slate-400 dark:text-slate-500 truncate">({s.email})</span>
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