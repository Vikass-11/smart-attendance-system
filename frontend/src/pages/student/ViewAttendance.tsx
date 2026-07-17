import { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useDashboardStore } from '../../store/dashboardStore';

interface AttendanceRecord {
  id: number;
  date: string;
  status: string;
}

const ViewAttendance = () => {
  const { getCached, setCache } = useDashboardStore();
  const [history, setHistory] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const cacheKey = 'student-dashboard';

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void (async () => {
        const cached = getCached<{ history: AttendanceRecord[] }>(cacheKey);
        if (cached?.history && cached.history.length > 0) {
          setHistory(cached.history);
          setLoading(false);
          return;
        }

        try {
          const historyRes = await apiClient.get('/attendance/my-history');
          const data = historyRes.data?.data ?? historyRes.data;
          setHistory(data);
          
          setCache(cacheKey, { percentage: null, history: data, leaveRequests: [] });
        } catch (err) {
          console.error('Failed to sync structural attendance records', err);
        } finally {
          setLoading(false);
        }
      })();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [getCached, setCache]);

  const statusBadge = (status: string) => {
    const variants: Record<string, string> = {
      present: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30',
      absent: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/30',
      late: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/30',
    };
    return `inline-flex items-center px-2 py-0.5 rounded text-xs font-bold tracking-wide uppercase border ${
      variants[status] || 'bg-slate-50 text-slate-600 border-slate-100'
    }`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-medium text-slate-500 animate-pulse">Syncing personal validation ledger...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Attendance History</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Granular log audit map of your institution check-ins.</p>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/60">
                <tr>
                  <th className="px-5 py-3 font-semibold flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-slate-400" /> Date Evaluated
                  </th>
                  <th className="px-5 py-3 font-semibold text-right">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-5 py-8 text-center text-slate-400">No verification stamps mapped yet.</td>
                  </tr>
                ) : (
                  history.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">
                        {new Date(record.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <span className={statusBadge(record.status)}>{record.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewAttendance;