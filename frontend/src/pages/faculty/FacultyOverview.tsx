import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, ClipboardList, AlertTriangle } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';

interface LowAttendanceStudent {
  id: number;
  name: string;
  percentage: number;
}

interface PendingLeave {
  id: number;
}

const FacultyOverview = () => {
  const { appUser } = useAuth();
  const [lowAttendance, setLowAttendance] = useState<LowAttendanceStudent[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [lowRes, leaveRes, studentsRes] = await Promise.all([
          apiClient.get('/attendance/low-attendance?threshold=75'),
          apiClient.get<PendingLeave[]>('/leave/pending'),
          apiClient.get('/admin/users?role=student'),
        ]);
        setLowAttendance(lowRes.data);
        setPendingCount(leaveRes.data.length);
        setStudentCount(studentsRes.data.length);
      } catch (err) {
        console.error('Failed to load overview data', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome, {appUser?.name}</h1>
      <p className="text-slate-500 mb-8">Here's what's happening in your classes today.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400"></div>
          <p className="text-sm text-slate-500">Total Students</p>
          <p className="text-3xl font-bold mt-1 text-slate-900">{studentCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-400"></div>
          <p className="text-sm text-slate-500">Pending Leave Requests</p>
          <p className="text-3xl font-bold mt-1 text-slate-900">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-pink-400"></div>
          <p className="text-sm text-slate-500">Below 75% Attendance</p>
          <p className="text-3xl font-bold mt-1 text-slate-900">{lowAttendance.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/dashboard/attendance"
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="bg-indigo-50 p-3 rounded-lg">
            <CalendarCheck className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Mark Attendance</p>
            <p className="text-sm text-slate-500">Record today's attendance for your students</p>
          </div>
        </Link>

        <Link
          to="/dashboard/leave"
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="bg-amber-50 p-3 rounded-lg">
            <ClipboardList className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Review Leave Requests</p>
            <p className="text-sm text-slate-500">{pendingCount} request(s) waiting for review</p>
          </div>
        </Link>
      </div>

      {lowAttendance.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h2 className="font-semibold text-slate-900">Students Below 75% Attendance</h2>
          </div>
          <div className="space-y-2">
            {lowAttendance.map((s) => (
              <div key={s.id} className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-sm text-slate-700">{s.name}</span>
                <span className="text-xs font-medium text-red-600">{s.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default FacultyOverview;