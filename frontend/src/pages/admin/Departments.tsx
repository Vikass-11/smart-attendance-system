import { useEffect, useState } from 'react';
import { Plus, Trash2, Building, ShieldAlert, CheckCircle2 } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import type { AxiosError } from 'axios';

interface DepartmentNode {
  id: number;
  name: string;
}

const Departments = () => {
  const [departments, setDepartments] = useState<DepartmentNode[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchDepartments = async () => {
    try {
      setError(null);
      const res = await apiClient.get('/admin/departments');
      // Adjust structure safely to handle unwrapped arrays or collection containers
      setDepartments(res.data?.data ?? res.data ?? []);
    } catch (err) {
      console.error('Failed fetching data matrices:', err);
      setError('Could not fetch active structural organization nodes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchDepartments();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await apiClient.post('/admin/departments', { name: name.trim() });
      setSuccess(`Successfully registered unit "${name}".`);
      setName('');
      await fetchDepartments();
    } catch (err) {
      const errorPayload = err as AxiosError<{ error?: string }>;
      setError(errorPayload.response?.data?.error || 'Failed to initialize unit path.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, targetName: string) => {
    if (!confirm(`Are you sure you want to completely drop "${targetName}"?`)) return;

    setError(null);
    setSuccess(null);
    try {
      await apiClient.delete(`/admin/departments/${id}`);
      setSuccess('Department dropped successfully.');
      await fetchDepartments();
    } catch (err) {
      const errorPayload = err as AxiosError<{ error?: string }>;
      setError(errorPayload.response?.data?.error || 'Failed to remove target department record.');
    }
  };

  return (
    <Layout>
      {/* Flexible Header: Align right on desktop, drop down on mobile */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Departments</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure structural organizational units.</p>
        </div>

        {/* Form Element optimized for upper-right placement */}
        <form onSubmit={handleCreate} className="w-full lg:max-w-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm text-sm">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Register New Unit</label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              disabled={submitting}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Computer Science"
              className="flex-1 px-3 py-1.5 bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-400 placeholder-slate-400 text-sm"
            />
            <button
              type="submit"
              disabled={submitting || !name.trim()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-40 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 text-xs font-semibold text-red-800 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/30">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 flex items-center gap-2 p-3 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {success}
        </div>
      )}

      {/* Core Display State Resolver */}
      {loading ? (
        /* Perfectly Centered Content Loading Spinner */
        <div className="flex flex-col items-center justify-center min-h-[280px] w-full">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-900 dark:border-slate-800 dark:border-t-white"></div>
          <span className="text-xs text-slate-400 mt-3 font-medium tracking-wide">Syncing architecture...</span>
        </div>
      ) : departments.length === 0 ? (
        <div className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-8 text-center text-slate-400 italic text-sm shadow-sm">
          No institutional infrastructure logs mapped to node indexes.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden text-sm">
          <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Infrastructure Units</span>
          </div>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
            {departments.map((dept) => (
              <li key={dept.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-slate-900 dark:text-white">{dept.name}</span>
                </div>
                <button
                  onClick={() => handleDelete(dept.id, dept.name)}
                  className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-lg transition-colors outline-none"
                  title="Remove department"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
};

export default Departments;