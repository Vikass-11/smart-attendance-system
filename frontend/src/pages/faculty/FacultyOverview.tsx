import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, ClipboardList, AlertTriangle, Users2 } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import StatCard from '../../components/StatCard';
import { useAuth } from '../../hooks/useAuth';
import { useDashboardStore } from '../../store/dashboardStore';

interface LowAttendanceStudent {
  id: number;
  name: string;
  percentage: number;
}
interface FacultyOverviewCache {
  lowAttendance: LowAttendanceStudent[];
  pendingCount: number;
  studentCount: number;
}

const FacultyOverview = () => {
  const { appUser } = useAuth();
  const { getCached, setCache } = useDashboardStore();
  const [lowAttendance, setLowAttendance] = useState<LowAttendanceStudent[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const cacheKey = 'faculty-overview';
      const cached = getCached(cacheKey) as FacultyOverviewCache | null;


      if (cached) {
        setLowAttendance(cached.lowAttendance);
        setPendingCount(cached.pendingCount);
        setStudentCount(cached.studentCount);
        setLoading(false);
        return;
      }

      try {
        const [lowRes, leaveRes, studentsRes] = await Promise.all([
          apiClient.get('/attendance/low-attendance?threshold=75'),
          apiClient.get('/leave/pending'),
          apiClient.get('/admin/users?role=student'),
        ]);

        const result = {
          lowAttendance: lowRes.data,
          pendingCount: leaveRes.data.length,
          studentCount: studentsRes.data.length,
        };

        setLowAttendance(result.lowAttendance);
        setPendingCount(result.pendingCount);
        setStudentCount(result.studentCount);
        setCache(cacheKey, result);
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
        <StatCard label="Total Students" value={studentCount} icon={Users2} gradient="from-indigo-500 to-cyan-400" />
        <StatCard label="Pending Leave Requests" value={pendingCount} icon={ClipboardList} gradient="from-amber-500 to-orange-400" />
        <StatCard label="Below 75% Attendance" value={lowAttendance.length} icon={AlertTriangle} gradient="from-red-500 to-pink-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/dashboard/attendance"
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-4"
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
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-4"
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