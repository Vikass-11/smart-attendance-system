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
      setDepartments(res.data.data || res.data);
    } catch (err) {
      console.error('Failed to load departments', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <h2 className="font-semibold text-slate-900 mb-4">Add New Department</h2>
        <form onSubmit={handleAddDepartment} className="flex gap-2">
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
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            Add
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">All Departments</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {departments.length === 0 && <p className="text-sm text-slate-400 p-6">No departments yet.</p>}
          {departments.map((d, i) => (
            <div key={d.id} className="flex items-center gap-3 px-6 py-3 hover:bg-slate-50/50 transition-colors">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-sm text-slate-700 font-medium">{d.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Departments;