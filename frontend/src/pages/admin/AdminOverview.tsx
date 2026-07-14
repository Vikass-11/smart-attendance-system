import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, FileText } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useAuth } from '../../hooks/useAuth';
import { Users2, TrendingUp, UserCheck, UserX } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { useDashboardStore } from '../../store/dashboardStore';

interface Summary {
  total_students: number;
  overall_percentage: number;
  total_present: number;
  total_absent: number;
}

const AdminOverview = () => {
  const { appUser } = useAuth();
  const { getCached, setCache } = useDashboardStore();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];
  const monthStart = today.slice(0, 8) + '01';

  useEffect(() => {
    const cacheKey = 'admin-overview';

    const loadData = async () => {
      const cached = getCached(cacheKey);

      if (cached) {
        setSummary(cached as Summary);
        setLoading(false);
        return;
      }

      try {
        const res = await apiClient.get(`/reports/summary?fromDate=${monthStart}&toDate=${today}`);
        const summaryData = res.data.data?.summary;
        setSummary(summaryData);
        setCache(cacheKey, summaryData);
      } catch (err) {
        console.error('Failed to load summary', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [monthStart, today]);

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome, {appUser?.name}</h1>
      <p className="text-slate-500 mb-8">Institution-wide overview for this month.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Students" value={summary?.total_students ?? 0} icon={Users2} gradient="from-indigo-500 to-cyan-400" />
        <StatCard label="Overall Attendance" value={`${summary?.overall_percentage ?? 0}%`} icon={TrendingUp} gradient="from-emerald-500 to-green-400" />
        <StatCard label="Present (This Month)" value={summary?.total_present ?? 0} icon={UserCheck} gradient="from-indigo-500 to-purple-400" />
        <StatCard label="Absent (This Month)" value={summary?.total_absent ?? 0} icon={UserX} gradient="from-red-500 to-pink-400" />
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
