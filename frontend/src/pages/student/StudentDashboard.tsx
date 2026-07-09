import { useEffect, useState } from 'react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useDashboardStore } from '../../store/dashboardStore';

interface AttendanceRecord {
  id: number;
  date: string;
  status: string;
}

interface LeaveRequest {
  id: number;
  reason: string;
  from_date: string;
  to_date: string;
  status: string;
  created_at: string;
}

const StudentDashboard = () => {
  const { getCached, setCache, invalidate } = useDashboardStore();
  const [percentage, setPercentage] = useState<{ totalDays: number; presentDays: number; percentage: number } | null>(null);
  const [history, setHistory] = useState<AttendanceRecord[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [reason, setReason] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const cacheKey = 'student-dashboard';

  const loadData = async (skipCache = false) => {
    setLoading(true);

    if (!skipCache) {
      const cached = getCached(cacheKey);
      if (cached) {
        setPercentage(cached.percentage);
        setHistory(cached.history);
        setLeaveRequests(cached.leaveRequests);
        setLoading(false);
        return;
      }
    }

    try {
      const [pctRes, historyRes, leaveRes] = await Promise.all([
        apiClient.get('/attendance/my-percentage'),
        apiClient.get('/attendance/my-history'),
        apiClient.get('/leave/my-requests'),
      ]);

      const result = {
        percentage: pctRes.data,
        history: historyRes.data,
        leaveRequests: leaveRes.data,
      };

      setPercentage(result.percentage);
      setHistory(result.history);
      setLeaveRequests(result.leaveRequests);
      setCache(cacheKey, result);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmitLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    try {
      await apiClient.post('/leave/submit', { reason, fromDate, toDate });
      setReason('');
      setFromDate('');
      setToDate('');
      invalidate(cacheKey);
      await loadData(true);
    } catch (err: any) {
      setSubmitError(err.response?.data?.error || 'Failed to submit leave request');
    } finally {
      setSubmitting(false);
    }
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      present: 'bg-green-100 text-green-700',
      absent: 'bg-red-100 text-red-700',
      late: 'bg-yellow-100 text-yellow-700',
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    return `px-2 py-1 rounded text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-700'}`;
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">Attendance Percentage</p>
          <p className="text-3xl font-bold mt-1">{percentage?.percentage ?? 0}%</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">Days Present</p>
          <p className="text-3xl font-bold mt-1">{percentage?.presentDays ?? 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">Total Days Recorded</p>
          <p className="text-3xl font-bold mt-1">{percentage?.totalDays ?? 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold mb-4">Attendance History</h2>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {history.length === 0 && <p className="text-sm text-gray-400">No records yet.</p>}
            {history.map((record) => (
              <div key={record.id} className="flex justify-between items-center border-b pb-2">
                <span className="text-sm">{new Date(record.date).toLocaleDateString()}</span>
                <span className={statusBadge(record.status)}>{record.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold mb-4">Submit Leave Request</h2>
          <form onSubmit={handleSubmitLeave} className="space-y-3">
            {submitError && <p className="text-red-600 text-sm">{submitError}</p>}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Reason</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">From</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">To</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>

          <h3 className="font-medium text-sm mt-6 mb-2 text-gray-600">My Leave Requests</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {leaveRequests.length === 0 && <p className="text-sm text-gray-400">No leave requests yet.</p>}
            {leaveRequests.map((lr) => (
              <div key={lr.id} className="flex justify-between items-center border-b pb-2">
                <span className="text-sm">{lr.reason}</span>
                <span className={statusBadge(lr.status)}>{lr.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;