import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useDashboardStore } from '../../store/dashboardStore';

interface PendingLeave {
  id: number;
  reason: string;
  from_date: string;
  to_date: string;
  student_name: string;
}

const LeaveRequests = () => {
  const { invalidate } = useDashboardStore();
  const [pendingLeaves, setPendingLeaves] = useState<PendingLeave[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/leave/pending');
      setPendingLeaves(res.data?.data ?? res.data);
    } catch (err) {
      console.error('Failed to load leave requests', err);
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

  const handleReview = async (id: number, decision: 'approved' | 'rejected') => {
    try {
      await apiClient.patch(`/leave/${id}/review`, { decision });
      await loadData();
      invalidate('faculty-overview');
    } catch (err) {
      console.error('Failed to review leave request', err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-medium text-slate-500 animate-pulse">Loading leave queue entries...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-slate-400" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Pending Leave Requests</h2>
        </div>
        <div className="space-y-3">
          {pendingLeaves.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-6">No active entries requiring evaluation.</p>
          )}
          {pendingLeaves.map((lr) => (
            <div key={lr.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-900/60 bg-slate-50/30 dark:bg-slate-900/10 space-y-2">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{lr.student_name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-0.5">"{lr.reason}"</p>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Timeline: {new Date(lr.from_date).toLocaleDateString()} - {new Date(lr.to_date).toLocaleDateString()}
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => handleReview(lr.id, 'approved')}
                  className="text-xs bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-3 py-1.5 rounded-md font-semibold transition-opacity hover:opacity-90"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReview(lr.id, 'rejected')}
                  className="text-xs border border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-400 px-3 py-1.5 rounded-md font-semibold transition-colors hover:bg-slate-50 dark:hover:bg-slate-900"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LeaveRequests;