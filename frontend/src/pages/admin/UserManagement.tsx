import { useEffect, useState } from 'react';
import { Search, ShieldAlert, CheckCircle2 } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useAuth } from '../../hooks/useAuth';
import { useDashboardStore } from '../../store/dashboardStore';
import type { AxiosError } from 'axios';

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string | null;
  is_system_admin: number;
}

const RoleBadge = ({ role, isSystemAdmin }: { role: string; isSystemAdmin: boolean }) => {
  if (isSystemAdmin) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
        System Admin
      </span>
    );
  }

  const styles = {
    admin: 'bg-red-100 text-red-800 border-red-200',
    faculty: 'bg-purple-100 text-purple-800 border-purple-200',
    student: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  const style = styles[role as keyof typeof styles] || 'bg-gray-100 text-gray-800 border-gray-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${style}`}>
      {role}
    </span>
  );
};

const UserManagement = () => {
  const { appUser } = useAuth();
  const { invalidate } = useDashboardStore();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const loadData = async (searchQuery = '', role = 'all') => {
    setLoading(true);
    setActionError(null);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (role !== 'all') params.append('role', role);
      // Hardcode limit for now, typically pagination would be used
      params.append('limit', '100');

      const res = await apiClient.get(`/admin/users?${params.toString()}`);
      setUsers(res.data?.data ?? res.data);
    } catch (err) {
      console.error('Failed to load users', err);
      setActionError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadData(search, filterRole);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRole]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    void loadData(search, filterRole);
  };

  const showSuccess = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      // Revert the select visually by reloading data
      void loadData(search, filterRole);
      return;
    }

    setActionError(null);
    try {
      await apiClient.patch(`/admin/users/${userId}`, { role: newRole });
      showSuccess('Role updated successfully.');
      await loadData(search, filterRole);
    } catch (error) {
      const err = error as AxiosError<{ error?: { message?: string } | string }>;
      const msg = typeof err.response?.data?.error === 'string'
        ? err.response.data.error
        : err.response?.data?.error?.message || 'Failed to update role';
      setActionError(msg);
      // Reload to revert select state
      void loadData(search, filterRole);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you absolutely sure you want to delete this user? This action cannot be undone.')) return;
    
    setActionError(null);
    try {
      await apiClient.delete(`/admin/users/${userId}`);
      showSuccess('User deleted successfully.');
      await loadData(search, filterRole);
      invalidate('admin-overview');
    } catch (error) {
      const err = error as AxiosError<{ error?: { message?: string } | string }>;
      const msg = typeof err.response?.data?.error === 'string'
        ? err.response.data.error
        : err.response?.data?.error?.message || 'Failed to delete user';
      setActionError(msg);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage roles and access permissions across the institution.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="faculty">Faculty</option>
            <option value="student">Students</option>
          </select>
          
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm w-full sm:w-64 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </form>
        </div>
      </div>

      {actionError && (
        <div className="mb-6 flex items-center gap-2 p-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          {actionError}
        </div>
      )}

      {actionSuccess && (
        <div className="mb-6 flex items-center gap-2 p-4 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          {actionSuccess}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Current Role</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Change Role</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const isSelf = appUser?.id === u.id;
                  const isProtectedSystemAdmin = Boolean(u.is_system_admin);

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{u.name}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{u.email}</div>
                        {isSelf && (
                          <span className="inline-block mt-1 text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                            YOU
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <RoleBadge role={u.role} isSystemAdmin={isProtectedSystemAdmin} />
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {u.department || <span className="text-slate-400 italic">None</span>}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          disabled={isSelf || isProtectedSystemAdmin}
                          className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100"
                        >
                          <option value="student">Student</option>
                          <option value="faculty">Faculty</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          disabled={isSelf || isProtectedSystemAdmin}
                          className="text-red-600 hover:text-red-800 font-medium text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title={isSelf ? "You cannot delete yourself" : isProtectedSystemAdmin ? "System admin cannot be deleted" : "Delete user"}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement;
