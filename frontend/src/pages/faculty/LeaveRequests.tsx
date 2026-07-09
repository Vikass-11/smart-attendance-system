import { useEffect, useState } from 'react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';

interface PendingLeave {
  id: number;
  reason: string;
  from_date: string;
  to_date: string;
  student_name: string;
}

const LeaveRequests = () => {
  const [pendingLeaves, setPendingLeaves] = useState<PendingLeave[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/leave/pending');
      setPendingLeaves(res.data);
    } catch (err) {
      console.error('Failed to load leave requests', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Pending Leave Requests</h2>
        <div className="space-y-3">
          {pendingLeaves.length === 0 && <p className="text-sm text-slate-400">No pending requests.</p>}
          {pendingLeaves.map((lr) => (
            <div key={lr.id} className="border-b border-slate-100 pb-3">
              <p className="text-sm font-medium text-slate-800">{lr.student_name}</p>
              <p className="text-xs text-slate-500 mb-1">{lr.reason}</p>
              <p className="text-xs text-slate-400 mb-2">
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
    </Layout>
  );
};

export default LeaveRequests;