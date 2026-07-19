import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, Send, CalendarRange, ShieldAlert } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import { useDashboardStore } from '../../store/dashboardStore';
import { leaveSchema } from '../../schemas/leaveSchema';
import type { LeaveFormData } from '../../schemas/leaveSchema';
import type { AxiosError } from 'axios';

interface LeaveRequest {
  id: number;
  reason: string;
  from_date: string;
  to_date: string;
  status: string;
  created_at: string;
}

const ApplyLeave = () => {
  const { getCached, setCache, invalidate } = useDashboardStore();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
  });

  const cacheKey = 'student-dashboard';

  const loadRequests = async (skipCache = false) => {
    setLoadingHistory(true);
    if (!skipCache) {
      const cached = getCached<{ leaveRequests: LeaveRequest[] }>(cacheKey);
      if (cached?.leaveRequests && cached.leaveRequests.length > 0) {
        setLeaveRequests(cached.leaveRequests);
        setLoadingHistory(false);
        return;
      }
    }

    try {
      const leaveRes = await apiClient.get('/leave/my-requests');
      const data = leaveRes.data?.data ?? leaveRes.data;
      setLeaveRequests(data);
      setCache(cacheKey, { percentage: null, history: [], leaveRequests: data });
    } catch (err) {
      console.error('Failed to synchronize exemption records', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadRequests();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitLeave = async (data: LeaveFormData) => {
    setSubmitError('');
    setSubmitting(true);
    try {
      await apiClient.post('/leave/submit', data);
      reset();
      invalidate(cacheKey);
      await loadRequests(true);
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      setSubmitError(err.message ?? 'Failed to submit leave request');
    } finally {
      setSubmitting(false);
    }
  };

  const statusBadge = (status: string) => {
    const variants: Record<string, string> = {
      approved: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400',
      rejected: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950/30 dark:text-red-400',
      pending: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400',
    };
    return `text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border shrink-0 ${
      variants[status] || 'bg-slate-100 text-slate-600'
    }`;
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-5xl">
        
        {/* Input Block */}
        <div className="md:col-span-1 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
            <FileText className="h-4 w-4 text-slate-400" />
            <h2 className="text-sm font-bold">Request Exemption</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmitLeave)} className="space-y-3.5" noValidate>
            {submitError && (
              <div className="flex items-center gap-2 p-3 text-xs font-semibold text-red-800 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/30 dark:text-red-400">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                {submitError}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1">Reason Statement</label>
              <textarea
                rows={3}
                {...register('reason')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-transparent text-slate-900 dark:text-white dark:border-slate-800 focus:outline-none resize-none"
                placeholder="State your clear justification..."
              />
              {errors.reason && <p className="text-red-500 text-[11px] font-medium mt-1">{errors.reason.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1">From Date</label>
                <input
                  type="date"
                  {...register('fromDate')}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-transparent text-slate-900 dark:text-white dark:border-slate-800 focus:outline-none"
                />
                {errors.fromDate && <p className="text-red-500 text-[11px] font-medium mt-1">{errors.fromDate.message}</p>}
              </div>
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1">To Date</label>
                <input
                  type="date"
                  {...register('toDate')}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-transparent text-slate-900 dark:text-white dark:border-slate-800 focus:outline-none"
                />
                {errors.toDate && <p className="text-red-500 text-[11px] font-medium mt-1">{errors.toDate.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-2 rounded-lg text-xs font-semibold hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-1.5 transition-opacity"
            >
              <Send className="w-3 h-3" />
              {submitting ? 'Transmitting...' : 'Submit Request'}
            </button>
          </form>
        </div>

        {/* History Ledger Block */}
        <div className="md:col-span-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white">
            <CalendarRange className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-bold">Leave Pipeline Logs</h3>
          </div>

          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {loadingHistory ? (
              <Spinner className="py-6 w-full" label="Syncing pipeline registries..." />
            ) : leaveRequests.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">No structural exemption records logged.</p>
            ) : (
              leaveRequests.map((lr) => (
                <div key={lr.id} className="p-3.5 border border-slate-100 dark:border-slate-900 rounded-xl flex items-start justify-between gap-4 bg-slate-50/20 dark:bg-slate-900/10">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">"{lr.reason}"</p>
                    <p className="text-[10px] font-medium text-slate-400">
                      Span: {new Date(lr.from_date).toLocaleDateString()} — {new Date(lr.to_date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={statusBadge(lr.status)}>{lr.status}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default ApplyLeave;