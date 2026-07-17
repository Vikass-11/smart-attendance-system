import { useEffect, useState } from 'react';
import { Search, ShieldAlert, CheckCircle2, Trash2, Users } from 'lucide-react';
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
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/40">
        System Admin
      </span>
    );
  }

  const styles = {
    admin: 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent',
    faculty: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border-purple-100 dark:border-purple-900/40',
    student: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-blue-100 dark:border-blue-900/40',
  };

  const style = styles[role as keyof typeof styles] || 'bg-slate-50 text-slate-600 border-slate-100';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border capitalize ${style}`}>
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
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">User Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage roles and access permissions across the institution.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2.5">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400 outline-none"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="faculty">Faculty</option>
            <option value="student">Students</option>
          </select>
          
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white dark:border-slate-800 w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-slate-400 outline-none"
            />
          </form>
        </div>
      </div>

      {actionError && (
        <div className="mb-4 flex items-center gap-2 p-3 text-xs font-semibold text-red-800 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/30">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          {actionError}
        </div>
      )}

      {actionSuccess && (
        <div className="mb-4 flex items-center gap-2 p-3 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {actionSuccess}
        </div>
      )}

      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/60">
              <tr>
                <th className="px-5 py-3 font-semibold">User</th>
                <th className="px-5 py-3 font-semibold">Current Role</th>
                <th className="px-5 py-3 font-semibold">Department</th>
                <th className="px-5 py-3 font-semibold">Change Role</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-400">Loading configurations...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-400">No matching registry nodes found.</td>
                </tr>
              ) : (
                users.map((u) => {
                  const isSelf = appUser?.id === u.id;
                  const isProtectedSystemAdmin = Boolean(u.is_system_admin);

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-medium text-slate-900 dark:text-white">{u.name}</div>
                        <div className="text-slate-400 text-xs mt-0.5 flex items-center gap-1.5">
                          {u.email}
                          {isSelf && (
                            <span className="text-[9px] font-bold tracking-wider text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400 px-1.5 py-0.2 rounded uppercase">
                              Self
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <RoleBadge role={u.role} isSystemAdmin={isProtectedSystemAdmin} />
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
                        {u.department || <span className="text-slate-400 dark:text-slate-600 italic">None</span>}
                      </td>
                      <td className="px-5 py-3.5">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          disabled={isSelf || isProtectedSystemAdmin}
                          className="bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg dark:bg-slate-900 dark:text-white dark:border-slate-800 block p-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <option value="student">Student</option>
                          <option value="faculty">Faculty</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          disabled={isSelf || isProtectedSystemAdmin}
                          className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed p-1 rounded transition-colors"
                          title={isSelf ? "You cannot delete yourself" : isProtectedSystemAdmin ? "System admin cannot be deleted" : "Delete user"}
                        >
                          <Trash2 className="w-4 h-4" />
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