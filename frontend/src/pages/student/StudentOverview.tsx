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
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Student Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Overview of your standing and validation requirements.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${isBreached ? 'from-red-500 to-pink-500' : 'from-emerald-500 to-green-400'}`} />
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Attendance Rate</span>
          <p className={`text-3xl font-bold mt-3 tracking-tight ${isBreached ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
            {rate}%
          </p>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-cyan-400" />
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Days Present</span>
          <p className="text-3xl font-bold mt-3 text-slate-900 dark:text-white tracking-tight">{present}</p>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-slate-400 to-slate-500" />
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Recorded Sessions</span>
          <p className="text-3xl font-bold mt-3 text-slate-900 dark:text-white tracking-tight">{total}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Link
          to="/dashboard/my-attendance"
          className="group bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-all flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 p-3 rounded-xl transition-transform group-hover:scale-105">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-slate-900 dark:text-white">Attendance Logs</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Examine historic ledger details and sign-offs</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <Link
          to="/dashboard/apply-leave"
          className="group bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-all flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 p-3 rounded-xl transition-transform group-hover:scale-105">
              <FilePlus2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-slate-900 dark:text-white">Leave Requests</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">File standard exemption justifications and track pipelines</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {isBreached && total > 0 && (
        <div className="mt-6 flex items-start gap-3 p-4 bg-red-50/50 border border-red-100 rounded-xl dark:bg-red-950/10 dark:border-red-900/30">
          <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-800 dark:text-red-400">Compliance Limit Notice</p>
            <p className="text-xs text-red-700/80 dark:text-red-400/70 mt-1 leading-relaxed">
              Your overall metric is currently calculated below the required 75% limit. Ensure upcoming intervals are cleared or process structural leaves to balance the {absent} undocumented absence points.
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default StudentOverview;