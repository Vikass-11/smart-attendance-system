import { useEffect, useState } from 'react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';

interface StudentUser {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string | null;
}

interface PendingLeave {
  id: number;
  reason: string;
  from_date: string;
  to_date: string;
  status: string;
  student_id: number;
  student_name: string;
  student_email: string;
}

interface LowAttendanceStudent {
  id: number;
  name: string;
  email: string;
  total_days: number;
  present_days: number;
  percentage: number;
}

const FacultyDashboard = () => {
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [pendingLeaves, setPendingLeaves] = useState<PendingLeave[]>([]);
  const [lowAttendance, setLowAttendance] = useState<LowAttendanceStudent[]>([]);
  const [loading, setLoading] = useState(true);

  const [markDate, setMarkDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceMap, setAttendanceMap] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersRes, leaveRes, lowRes] = await Promise.all([
        apiClient.get('/admin/users?role=student'),
        apiClient.get('/leave/pending'),
        apiClient.get('/attendance/low-attendance?threshold=75'),
      ]);
      setStudents(usersRes.data);
      setPendingLeaves(leaveRes.data);
      setLowAttendance(lowRes.data);
    } catch (err) {
      console.error('Failed to load faculty dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadData();
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
    } catch {
      setSaveMessage('Failed to save attendance for one or more students.');
    } finally {
      setSaving(false);
    }
  };

  const handleReview = async (id: number, decision: 'approved' | 'rejected') => {
    try {
      await apiClient.patch(`/leave/${id}/review`, { decision });
      await loadData();
    } catch (err) {
      console.error('Failed to review leave request', err);
    }
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Mark Attendance</h2>
          <input
            type="date"
            value={markDate}
            onChange={(e) => setMarkDate(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm"
          />
        </div>

        {saveMessage && <p className="text-sm text-blue-600 mb-3">{saveMessage}</p>}

        <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
          {students.length === 0 && <p className="text-sm text-gray-400">No students found.</p>}
          {students.map((student) => (
            <div key={student.id} className="flex justify-between items-center border-b pb-2">
              <span className="text-sm">{student.name} <span className="text-gray-400">({student.email})</span></span>
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
                        : 'bg-gray-100 text-gray-600'
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
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : `Save Attendance (${Object.keys(attendanceMap).length})`}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold mb-4">Pending Leave Requests</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {pendingLeaves.length === 0 && <p className="text-sm text-gray-400">No pending requests.</p>}
            {pendingLeaves.map((lr) => (
              <div key={lr.id} className="border-b pb-3">
                <p className="text-sm font-medium">{lr.student_name}</p>
                <p className="text-xs text-gray-500 mb-1">{lr.reason}</p>
                <p className="text-xs text-gray-400 mb-2">
                  {new Date(lr.from_date).toLocaleDateString()} - {new Date(lr.to_date).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReview(lr.id, 'approved')}
                    className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReview(lr.id, 'rejected')}
                    className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold mb-4">Low Attendance (Below 75%)</h2>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {lowAttendance.length === 0 && <p className="text-sm text-gray-400">No students below threshold.</p>}
            {lowAttendance.map((s) => (
              <div key={s.id} className="flex justify-between items-center border-b pb-2">
                <span className="text-sm">{s.name}</span>
                <span className="text-xs font-medium text-red-600">{s.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FacultyDashboard;
