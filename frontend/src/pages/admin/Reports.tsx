import { useEffect, useState } from 'react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';

interface DeptBreakdown {
  department: string;
  percentage: number;
}

const Reports = () => {
  const [deptBreakdown, setDeptBreakdown] = useState<DeptBreakdown[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];
  const monthStart = today.slice(0, 8) + '01';

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void (async () => {
        try {
          const res = await apiClient.get(`/reports/summary?fromDate=${monthStart}&toDate=${today}`);
          const breakdownRaw = res.data?.data?.departmentBreakdown ?? res.data?.departmentBreakdown ?? [];
          const breakdown = Array.isArray(breakdownRaw) ? breakdownRaw : breakdownRaw?.rows ?? [];
          setDeptBreakdown(breakdown);
        } catch (err) {
          console.error('Failed to load reports', err);
        } finally {
          setLoading(false);
        }
      })();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [monthStart, today]);

  const handleExport = async (type: 'csv' | 'pdf') => {
    const res = await apiClient.get(`/reports/export/${type}?fromDate=${monthStart}&toDate=${today}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `attendance-report.${type}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading) return <Layout><Spinner className="min-h-[50vh] w-full" label="Loading reports..." /></Layout>;

  return (
    <Layout>
      <h1 className="page-title mb-6">Reports</h1>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Department-wise Attendance (This Month)</h2>
        <div className="space-y-2">
          {deptBreakdown.length === 0 && <p className="text-sm text-slate-400">No data yet.</p>}
          {deptBreakdown.map((d, i) => (
            <div key={i} className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-sm text-slate-700 dark:text-slate-300">{d.department || 'Unassigned'}</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{d.percentage ?? 0}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Export Attendance Report</h2>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport('csv')}
            className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            Export as CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            Export as PDF
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
