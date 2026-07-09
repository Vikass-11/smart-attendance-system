import { useEffect, useState } from 'react';
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
      setDepartments(res.data);
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

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Departments</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <form onSubmit={handleAddDepartment} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newDeptName}
            onChange={(e) => setNewDeptName(e.target.value)}
            placeholder="New department name"
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={saving}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
          >
            Add
          </button>
        </form>

        <div className="space-y-1">
          {departments.length === 0 && <p className="text-sm text-slate-400">No departments yet.</p>}
          {departments.map((d) => (
            <div key={d.id} className="text-sm text-slate-700 border-b border-slate-100 py-2">{d.name}</div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Departments;
