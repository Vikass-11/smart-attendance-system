import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, FileText, ArrowRight } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
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
        <Spinner className="min-h-[50vh] w-full" label="Loading system overview data..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Welcome, {appUser?.name}</h1>
        <p className="page-subtitle">Institution-wide overview for this month.</p>
      </div>

      <div className="stat-grid">
        {[
          { label: 'Total Students', value: summary?.total_students ?? 0, line: 'from-indigo-500 to-cyan-400' },
          { label: 'Overall Attendance', value: `${summary?.overall_percentage ?? 0}%`, line: 'from-emerald-500 to-green-400' },
          { label: 'Present (Month)', value: summary?.total_present ?? 0, line: 'from-indigo-500 to-purple-400' },
          { label: 'Absent (Month)', value: summary?.total_absent ?? 0, line: 'from-red-500 to-pink-400' },
        ].map((card, i) => (
          <div key={i} className="stat-card flex flex-col justify-between">

            <span className="stat-card-label">{card.label}</span>
            <p className="stat-card-value">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="action-grid">
        {[
          { to: '/dashboard/departments', icon: Building2, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-400', title: 'Departments', desc: 'Manage institution departments' },
          { to: '/dashboard/users', icon: Users, color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/30 dark:text-cyan-400', title: 'Users', desc: 'Manage students, faculty, and admins' },
          { to: '/dashboard/reports', icon: FileText, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400', title: 'Reports', desc: 'Department breakdown and exports' },
        ].map((link, i) => {
          const Icon = link.icon;
          return (
            <Link key={i} to={link.to} className="group action-card">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`action-card-icon ${link.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">{link.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{link.desc}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </div>
    </Layout>
  );
};

export default AdminOverview;