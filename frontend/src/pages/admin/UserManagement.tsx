import { useEffect, useState } from 'react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useDashboardStore } from '../../store/dashboardStore';

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string | null;
}

const UserManagement = () => {
  const { invalidate } = useDashboardStore();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to load users', err);
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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.get(`/admin/users?search=${encodeURIComponent(search)}`);
      setUsers(res.data);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Delete this user?')) return;
    try {
      await apiClient.delete(`/admin/users/${id}`);
      await loadData();
      invalidate('admin-overview');
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm"
          />
          <button type="submit" className="bg-slate-100 px-3 py-1.5 rounded-lg text-sm hover:bg-slate-200">
            Search
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="pb-2">Name</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">Role</th>
              <th className="pb-2">Department</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-slate-100">
                <td className="py-2 text-slate-700">{u.name}</td>
                <td className="py-2 text-slate-700">{u.email}</td>
                <td className="py-2 capitalize text-slate-700">{u.role}</td>
                <td className="py-2 text-slate-700">{u.department || '-'}</td>
                <td className="py-2 text-right">
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    className="text-red-600 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default UserManagement;
