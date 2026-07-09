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
    const loadData = async () => {
      try {
        const res = await apiClient.get(`/reports/summary?fromDate=${monthStart}&toDate=${today}`);
        setDeptBreakdown(res.data.departmentBreakdown);
      } catch (err) {
        console.error('Failed to load reports', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Reports</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <h2 className="font-semibold text-slate-900 mb-4">Department-wise Attendance (This Month)</h2>
        <div className="space-y-2">
          {deptBreakdown.length === 0 && <p className="text-sm text-slate-400">No data yet.</p>}
          {deptBreakdown.map((d, i) => (
            <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm text-slate-700">{d.department || 'Unassigned'}</span>
              <span className="text-sm font-medium text-slate-900">{d.percentage ?? 0}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Export Attendance Report</h2>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport('csv')}
            className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm hover:bg-slate-200"
          >
            Export as CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm hover:bg-slate-200"
          >
            Export as PDF
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;