import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, FileText, ArrowRight } from 'lucide-react';
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
          const summaryObj = res.data?.data?.summary ?? res.data?.summary ?? null;
          setSummary(summaryObj);
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

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-medium text-slate-500 animate-pulse">Loading system overview data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome, {appUser?.name}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Institution-wide overview for this month.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Total Students', value: summary?.total_students ?? 0, line: 'from-indigo-500 to-cyan-400' },
          { label: 'Overall Attendance', value: `${summary?.overall_percentage ?? 0}%`, line: 'from-emerald-500 to-green-400' },
          { label: 'Present (This Month)', value: summary?.total_present ?? 0, line: 'from-indigo-500 to-purple-400' },
          { label: 'Absent (This Month)', value: summary?.total_absent ?? 0, line: 'from-red-500 to-pink-400' }
        ].map((card, i) => (
          <div key={i} className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 relative overflow-hidden shadow-sm flex flex-col justify-between">
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${card.line}`} />
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{card.label}</span>
            <p className="text-3xl font-bold mt-3 text-slate-900 dark:text-white tracking-tight">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { to: '/dashboard/departments', icon: Building2, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-400', title: 'Departments', desc: 'Manage institution departments' },
          { to: '/dashboard/users', icon: Users, color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/30 dark:text-cyan-400', title: 'Users', desc: 'Manage students, faculty, and admins' },
          { to: '/dashboard/reports', icon: FileText, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400', title: 'Reports', desc: 'Department breakdown and exports' }
        ].map((link, i) => {
          const Icon = link.icon;
          return (
            <Link
              key={i}
              to={link.to}
              className="group bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl transition-transform group-hover:scale-105 ${link.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">{link.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{link.desc}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 transition-transform group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </div>
    </Layout>
  );
};

export default AdminOverview;