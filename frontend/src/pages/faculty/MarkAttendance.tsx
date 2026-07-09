import { useEffect, useState } from 'react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';

interface StudentUser {
  id: number;
  name: string;
  email: string;
}

const MarkAttendance = () => {
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
      setStudents(res.data);
    } catch (err) {
      console.error('Failed to load students', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
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
    } catch {
      setSaveMessage('Failed to save attendance for one or more students.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-slate-900">Mark Attendance</h2>
          <input
            type="date"
            value={markDate}
            onChange={(e) => setMarkDate(e.target.value)}
            className="border rounded-lg px-3 py-1.5 text-sm"
          />
        </div>

        {saveMessage && <p className="text-sm text-indigo-600 mb-3">{saveMessage}</p>}

        <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
          {students.length === 0 && <p className="text-sm text-slate-400">No students found.</p>}
          {students.map((student) => (
            <div key={student.id} className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm text-slate-700">{student.name} <span className="text-slate-400">({student.email})</span></span>
              <div className="flex gap-1">
                {['present', 'absent', 'late'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(student.id, status)}
                    className={`text-xs px-2 py-1 rounded ${
                      attendanceMap[student.id] === status
                        ? status === 'present'
                          ? 'bg-green-600 text-white'
                          : status === 'absent'
                          ? 'bg-red-600 text-white'
                          : 'bg-yellow-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveAttendance}
          disabled={saving || Object.keys(attendanceMap).length === 0}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : `Save Attendance (${Object.keys(attendanceMap).length})`}
        </button>
      </div>
    </Layout>
  );
};

export default MarkAttendance;