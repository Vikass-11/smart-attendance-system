import { useEffect, useState } from 'react';
import { Calendar, CheckSquare } from 'lucide-react';
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

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-medium text-slate-500 animate-pulse">Syncing class list indices...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-slate-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Roster Checklist Input</h2>
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="date"
              value={markDate}
              onChange={(e) => setMarkDate(e.target.value)}
              className="border border-slate-200 pl-9 pr-3 py-1.5 text-xs rounded-lg bg-transparent text-slate-900 dark:text-white dark:border-slate-800 focus:outline-none"
            />
          </div>
        </div>

        {saveMessage && (
          <div className="mb-4 p-3 rounded-md text-xs font-semibold bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300">
            {saveMessage}
          </div>
        )}

        <div className="space-y-1 divide-y divide-slate-100 dark:divide-slate-800/60 max-h-96 overflow-y-auto pr-1 mb-6">
          {students.length === 0 && <p className="text-sm text-slate-400 py-4 text-center">No students registered.</p>}
          {students.map((student) => (
            <div key={student.id} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {student.name} <span className="text-slate-400 font-normal text-xs">({student.email})</span>
              </span>
              <div className="flex gap-1">
                {['present', 'absent', 'late'].map((status) => {
                  const active = attendanceMap[student.id] === status;
                  const theme = 
                    status === 'present' ? 'bg-emerald-600 text-white' : 
                    status === 'absent' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white';
                  
                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(student.id, status)}
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1.5 rounded transition-all ${
                        active ? theme : 'bg-slate-50 dark:bg-slate-900 text-slate-400'
                      }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveAttendance}
          disabled={saving || Object.keys(attendanceMap).length === 0}
          className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          {saving ? 'Saving...' : `Save Attendance (${Object.keys(attendanceMap).length})`}
        </button>
      </div>
    </Layout>
  );
};

export default MarkAttendance;