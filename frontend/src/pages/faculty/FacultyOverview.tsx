import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, ClipboardList, AlertTriangle, ArrowRight } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
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
    const cacheKey = 'faculty-overview';
    const timeoutId = window.setTimeout(() => {
      void (async () => {
        const cached = getCached<FacultyOverviewCache>(cacheKey);

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

          const lowData = lowRes.data?.data ?? lowRes.data;
          const leaveData = leaveRes.data?.data ?? leaveRes.data;
          const studentsData = studentsRes.data?.data ?? studentsRes.data;

          const result = {
            lowAttendance: Array.isArray(lowData) ? lowData : [],
            pendingCount: Array.isArray(leaveData) ? leaveData.length : (leaveData?.length ?? 0),
            studentCount: Array.isArray(studentsData) ? studentsData.length : (studentsData?.length ?? 0),
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
      })();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [getCached, setCache]);

  if (loading) {
    return (
      <Layout>
        <Spinner className="min-h-[50vh] w-full" label="Processing alert registers..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Welcome, {appUser?.name}</h1>
        <p className="page-subtitle">Here&apos;s what&apos;s happening in your classes today.</p>
      </div>

      <div className="stat-grid-3">
        {[
          { label: 'Total Students', value: studentCount, line: 'from-indigo-500 to-cyan-400' },
          { label: 'Pending Leaves', value: pendingCount, line: 'from-amber-500 to-orange-400' },
          { label: 'Below 75%', value: lowAttendance.length, line: 'from-red-500 to-pink-400' },
        ].map((card, i) => (
          <div key={i} className="stat-card">

            <span className="stat-card-label">{card.label}</span>
            <p className="stat-card-value">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start">
        <div className="space-y-3">
          <Link to="/dashboard/attendance" className="group action-card">
            <div className="flex items-center gap-3 min-w-0">
              <div className="action-card-icon bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-slate-900 dark:text-white">Mark Attendance</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Record attendance for your students</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link to="/dashboard/leave" className="group action-card">
            <div className="flex items-center gap-3 min-w-0">
              <div className="action-card-icon bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
                <ClipboardList className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-slate-900 dark:text-white">Review Leave Requests</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{pendingCount} request(s) waiting</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {lowAttendance.length > 0 && (
          <div className="panel-card">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Low Attendance Watchlist</h2>
            </div>
            <div className="space-y-1 max-h-52 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
              {lowAttendance.map((s) => (
                <div key={s.id} className="flex justify-between items-center gap-2 py-2 first:pt-0 last:pb-0">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{s.name}</span>
                  <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded shrink-0">
                    {s.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FacultyOverview;