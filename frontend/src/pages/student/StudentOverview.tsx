import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FilePlus2, ArrowRight, XCircle } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useDashboardStore } from '../../store/dashboardStore';

interface PercentageData {
  totalDays: number;
  presentDays: number;
  percentage: number;
}

const StudentOverview = () => {
  const { getCached, setCache } = useDashboardStore();
  const [percentage, setPercentage] = useState<PercentageData | null>(null);
  const [loading, setLoading] = useState(true);

  const cacheKey = 'student-dashboard';

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void (async () => {
        // Access existing cache if available
        const cached = getCached<{ percentage: PercentageData | null }>(cacheKey);
        if (cached?.percentage) {
          setPercentage(cached.percentage);
          setLoading(false);
          return;
        }

        try {
          const pctRes = await apiClient.get('/attendance/my-percentage');
          const data = pctRes.data?.data ?? pctRes.data;
          setPercentage(data);
          
          // Seed initial cache shell safely
          setCache(cacheKey, { percentage: data, history: [], leaveRequests: [] });
        } catch (err) {
          console.error('Failed to load compliance percentage metric', err);
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
          <p className="text-sm font-medium text-slate-500 animate-pulse">Syncing systemic compliance metrics...</p>
        </div>
      </Layout>
    );
  }

  const rate = percentage?.percentage ?? 0;
  const total = percentage?.totalDays ?? 0;
  const present = percentage?.presentDays ?? 0;
  const absent = total - present;
  const isBreached = rate < 75;

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Student Dashboard</h1>
        <p className="page-subtitle">Overview of your attendance and leave status.</p>
      </div>

      <div className="stat-grid-3">
        <div className="stat-card flex flex-col justify-between">
          <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${isBreached ? 'from-red-500 to-pink-500' : 'from-emerald-500 to-green-400'}`} />
          <span className="stat-card-label">Attendance Rate</span>
          <p className={`stat-card-value ${isBreached ? 'text-red-600 dark:text-red-400' : ''}`}>{rate}%</p>
        </div>

        <div className="stat-card flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-400" />
          <span className="stat-card-label">Days Present</span>
          <p className="stat-card-value">{present}</p>
        </div>

        <div className="stat-card flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-slate-400 to-slate-500" />
          <span className="stat-card-label">Total Sessions</span>
          <p className="stat-card-value">{total}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <Link to="/dashboard/my-attendance" className="group action-card">
          <div className="flex items-center gap-3 min-w-0">
            <div className="action-card-icon bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-slate-900 dark:text-white">Attendance Logs</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">View your attendance history</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <Link to="/dashboard/apply-leave" className="group action-card">
          <div className="flex items-center gap-3 min-w-0">
            <div className="action-card-icon bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
              <FilePlus2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-slate-900 dark:text-white">Leave Requests</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Apply for leave and track status</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {isBreached && total > 0 && (
        <div className="mt-4 flex items-start gap-3 p-3 md:p-4 bg-red-50/50 border border-red-100 rounded-lg dark:bg-red-950/10 dark:border-red-900/30">
          <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-800 dark:text-red-400">Compliance Notice</p>
            <p className="text-xs text-red-700/80 dark:text-red-400/70 mt-1 leading-relaxed">
              Your attendance is below the required 75% limit. You have {absent} absent day(s) recorded.
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default StudentOverview;