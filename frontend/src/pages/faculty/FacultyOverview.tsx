import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, ClipboardList, AlertTriangle, ArrowRight } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
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
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-medium text-slate-500 animate-pulse">Processing alert registers...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome, {appUser?.name}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Here's what's happening in your classes today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[
          { label: 'Total Students', value: studentCount, line: 'from-indigo-500 to-cyan-400' },
          { label: 'Pending Leaves', value: pendingCount, line: 'from-amber-500 to-orange-400' },
          { label: 'Attendance Breaches (<75%)', value: lowAttendance.length, line: 'from-red-500 to-pink-400' }
        ].map((card, i) => (
          <div key={i} className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 relative overflow-hidden shadow-sm">
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${card.line}`} />
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{card.label}</span>
            <p className="text-3xl font-bold mt-3 text-slate-900 dark:text-white tracking-tight">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <div className="space-y-4">
          <Link
            to="/dashboard/attendance"
            className="group bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-all flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 p-3 rounded-xl transition-transform group-hover:scale-105">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-900 dark:text-white">Mark Attendance</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Record checkpoint logs for your student groups</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            to="/dashboard/leave"
            className="group bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-all flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 p-3 rounded-xl transition-transform group-hover:scale-105">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-900 dark:text-white">Review Leave Requests</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{pendingCount} request(s) waiting for validation</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {lowAttendance.length > 0 && (
          <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Compliance Risk Watchlist</h2>
            </div>
            <div className="space-y-1 max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 pr-1">
              {lowAttendance.map((s) => (
                <div key={s.id} className="flex justify-between items-center py-2.5 first:pt-0 last:pb-0">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{s.name}</span>
                  <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded">
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