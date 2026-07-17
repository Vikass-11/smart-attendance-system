import { useEffect, useState } from 'react';
import { Building2, Plus } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useDashboardStore } from '../../store/dashboardStore';

interface Department {
  id: number;
  name: string;
}

const Departments = () => {
  const { invalidate } = useDashboardStore();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [newDeptName, setNewDeptName] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/departments');
      const data = res.data?.data ?? res.data;
      setDepartments(data);
    } catch (err) {
      console.error('Failed to load departments', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleAddDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName.trim()) return;
    setSaving(true);
    try {
      await apiClient.post('/admin/departments', { name: newDeptName });
      setNewDeptName('');
      await loadData();
      invalidate('admin-overview');
    } catch (err) {
      console.error('Failed to add department', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-medium text-slate-500 animate-pulse">Loading department directories...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Departments</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure structural organizational units.</p>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-200">
            <Building2 className="h-4 w-4 text-slate-400" />
            <h2 className="text-sm font-bold">Register New Unit</h2>
          </div>
          <form onSubmit={handleAddDepartment} className="flex gap-2">
            <input
              type="text"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
              placeholder="e.g., Computer Science & Engineering"
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
            <button
              type="submit"
              disabled={saving}
              className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              {saving ? 'Adding...' : 'Add'}
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Active Infrastructure Logs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {departments.length === 0 ? (
              <p className="text-sm text-slate-400 py-2 col-span-2">No departments yet.</p>
            ) : (
              departments.map((d) => (
                <div key={d.id} className="text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60 rounded-lg p-3">
                  {d.name}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Departments;