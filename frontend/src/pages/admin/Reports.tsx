import { useEffect, useState } from 'react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';

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

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Department-wise Attendance (This Month)</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {deptBreakdown.length === 0 && <p className="text-sm text-slate-400 p-6">No data yet.</p>}
          {deptBreakdown.map((d, i) => (
            <div key={i} className="flex justify-between items-center px-6 py-3">
              <span className="text-sm text-slate-700">{d.department || 'Unassigned'}</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${(d.percentage ?? 0) >= 75 ? 'bg-emerald-500' : (d.percentage ?? 0) >= 50 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                    style={{ width: `${Math.min(d.percentage ?? 0, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-900 w-12 text-right">{d.percentage ?? 0}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Export Attendance Report</h2>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg text-sm hover:bg-slate-100 transition-colors border border-slate-200"
          >
            Export as CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg text-sm hover:bg-slate-100 transition-colors border border-slate-200"
          >
            Export as PDF
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
