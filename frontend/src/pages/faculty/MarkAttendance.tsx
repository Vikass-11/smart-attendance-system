import { useEffect, useState } from 'react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useDashboardStore } from '../../store/dashboardStore';

interface StudentUser {
  id: number;
  name: string;
  email: string;
}

const MarkAttendance = () => {
  const { invalidate } = useDashboardStore();
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [markDate, setMarkDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceMap, setAttendanceMap] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/users?role=student');
      setStudents(res.data?.data ?? res.data);
    } catch (err) {
      console.error('Failed to load students', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadStudents();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleStatusChange = (studentId: number, status: string) => {
    setAttendanceMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    setSaveMessage('');
    try {
      const entries = Object.entries(attendanceMap);
      await Promise.all(
        entries.map(([studentId, status]) =>
          apiClient.post('/attendance/mark', { studentId: Number(studentId), date: markDate, status })
        )
      );
      setSaveMessage(`Saved attendance for ${entries.length} student(s).`);
      setAttendanceMap({});
      invalidate('faculty-overview');
    } catch {
      setSaveMessage('Failed to save attendance for one or more students.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <div>
            <h2 className="font-semibold text-slate-900">Mark Attendance</h2>
            <p className="text-xs text-slate-500 mt-0.5">Select a status for each student</p>
          </div>
          <input
            type="date"
            value={markDate}
            onChange={(e) => setMarkDate(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm"
          />
        </div>

        {saveMessage && (
          <p className="text-sm text-indigo-600 px-6 pt-4">{saveMessage}</p>
        )}

        <div className="divide-y divide-slate-50 max-h-96 overflow-y-auto">
          {students.length === 0 && <p className="text-sm text-slate-400 p-6">No students found.</p>}
          {students.map((student) => (
            <div key={student.id} className="flex justify-between items-center px-6 py-3 hover:bg-slate-50/50 transition-colors">
              <span className="text-sm text-slate-700">
                {student.name} <span className="text-slate-400">({student.email})</span>
              </span>
              <div className="flex gap-1">
                {['present', 'absent', 'late'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(student.id, status)}
                    className={`text-xs px-3 py-1 rounded-full transition-colors ${attendanceMap[student.id] === status
                        ? status === 'present'
                          ? 'bg-emerald-500 text-white'
                          : status === 'absent'
                            ? 'bg-red-500 text-white'
                            : 'bg-amber-500 text-white'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-slate-100">
          <button
            onClick={handleSaveAttendance}
            disabled={saving || Object.keys(attendanceMap).length === 0}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 transition-colors"
          >
            {saving ? 'Saving...' : `Save Attendance (${Object.keys(attendanceMap).length})`}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MarkAttendance;
