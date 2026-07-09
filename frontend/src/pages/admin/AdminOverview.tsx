import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, FileText } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useAuth } from '../../hooks/useAuth';

interface Summary {
  total_students: number;
  overall_percentage: number;
  total_present: number;
  total_absent: number;
}

const AdminOverview = () => {
  const { appUser } = useAuth();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];
  const monthStart = today.slice(0, 8) + '01';

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void (async () => {
        try {
          const res = await apiClient.get(`/reports/summary?fromDate=${monthStart}&toDate=${today}`);
          setSummary(res.data.summary);
        } catch (err) {
          console.error('Failed to load summary', err);
        } finally {
          setLoading(false);
        }
      })();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [monthStart, today]);

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome, {appUser?.name}</h1>
      <p className="text-slate-500 mb-8">Institution-wide overview for this month.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400"></div>
          <p className="text-sm text-slate-500">Total Students</p>
          <p className="text-3xl font-bold mt-1 text-slate-900">{summary?.total_students ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-400"></div>
          <p className="text-sm text-slate-500">Overall Attendance</p>
          <p className="text-3xl font-bold mt-1 text-slate-900">{summary?.overall_percentage ?? 0}%</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-400"></div>
          <p className="text-sm text-slate-500">Present (This Month)</p>
          <p className="text-3xl font-bold mt-1 text-slate-900">{summary?.total_present ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-pink-400"></div>
          <p className="text-sm text-slate-500">Absent (This Month)</p>
          <p className="text-3xl font-bold mt-1 text-slate-900">{summary?.total_absent ?? 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/dashboard/departments"
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="bg-indigo-50 p-3 rounded-lg">
            <Building2 className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Departments</p>
            <p className="text-sm text-slate-500">Manage institution departments</p>
          </div>
        </Link>

        <Link
          to="/dashboard/users"
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="bg-cyan-50 p-3 rounded-lg">
            <Users className="w-6 h-6 text-cyan-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Users</p>
            <p className="text-sm text-slate-500">Manage students, faculty, and admins</p>
          </div>
        </Link>

        <Link
          to="/dashboard/reports"
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="bg-amber-50 p-3 rounded-lg">
            <FileText className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Reports</p>
            <p className="text-sm text-slate-500">Department breakdown and exports</p>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default AdminOverview;
