import { useEffect, useState } from 'react';
import { Trash2, ShieldAlert, CheckCircle2 } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import type { AxiosError } from 'axios';

interface UserRecord {
  id: string | number;
  name: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
  department?: string | null;
  departmentId?: number | null;
}

interface DepartmentRecord {
  id: number;
  name: string;
}

const ROLE_STYLES: Record<UserRecord['role'], string> = {
  admin: 'bg-slate-600 text-white',
  faculty: 'bg-emerald-600 text-white',
  student: 'bg-blue-600 text-white',
};

const UserManagement = () => {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [departments, setDepartments] = useState<DepartmentRecord[]>([]);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchDataDirectives = async () => {
    try {
      setError(null);
      const [usersResponse, deptsResponse] = await Promise.all([
        apiClient.get('/admin/users', { params: { limit: 100 } }),
        apiClient.get('/admin/departments', { params: { limit: 100 } }),
      ]);

      setUsers(usersResponse.data?.data ?? usersResponse.data ?? []);
      setDepartments(deptsResponse.data?.data ?? deptsResponse.data ?? []);
    } catch (err) {
      console.error('Error synchronizing database metrics:', err);
      setError('Failed to fetch institutional account or department lists.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchDataDirectives();
  }, []);

  const resolveDepartmentName = (departmentId: number | null | undefined): string => {
    if (departmentId == null) return '';
    return departments.find((dept) => dept.id === departmentId)?.name ?? '';
  };

  const handleUpdateUserProperties = async (
    userId: string | number,
    parameters: { role?: string; departmentId?: number | null }
  ) => {
    setError(null);
    setSuccess(null);
    try {
      const response = await apiClient.patch(`/admin/users/${userId}`, parameters);
      const updated = response.data?.data;

      setSuccess('User updated successfully.');

      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id !== userId) return user;

          const nextDepartmentId =
            updated?.departmentId !== undefined ? updated.departmentId : user.departmentId ?? null;

          return {
            ...user,
            role: (updated?.role ?? parameters.role ?? user.role) as UserRecord['role'],
            departmentId: nextDepartmentId,
            department: resolveDepartmentName(nextDepartmentId) || null,
          };
        })
      );
    } catch (err) {
      const errorPayload = err as AxiosError<{ error?: string }>;
      setError(errorPayload.response?.data?.error || 'Failed to update user.');
      void fetchDataDirectives();
    }
  };

  const handleDeleteUser = async (userId: string | number, name: string) => {
    if (!confirm(`Are you absolutely sure you want to delete access for ${name}?`)) return;
    setError(null);
    setSuccess(null);
    try {
      await apiClient.delete(`/admin/users/${userId}`);
      setSuccess(`Account workspace for ${name} removed.`);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      const errorPayload = err as AxiosError<{ error?: string }>;
      setError(errorPayload.response?.data?.error || 'Failed to terminate account profile.');
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = selectedRoleFilter === 'all' || user.role === selectedRoleFilter;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage roles and access permissions across the institution.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="faculty">Faculty</option>
            <option value="student">Students</option>
          </select>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none md:w-64"
          />
        </div>
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

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[320px] w-full">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-900 dark:border-slate-800 dark:border-t-white"></div>
          <span className="text-xs text-slate-400 mt-3 font-medium tracking-wide">Assembling user profiles...</span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="panel-card text-center text-slate-400 italic text-sm">
          No registered records match your lookup parameters.
        </div>
      ) : (
        <div className="panel-card overflow-x-auto text-sm p-0">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3">User</th>
                <th className="px-3 py-3">Current Role</th>
                <th className="px-3 py-3">Department</th>
                <th className="px-3 py-3">Change Role</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {filteredUsers.map((user) => {
                const departmentValue =
                  user.departmentId != null ? String(user.departmentId) : '';

                return (
                  <tr key={user.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 shrink-0 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold text-xs uppercase">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">{user.name}</div>
                          <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide ${ROLE_STYLES[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap">
                      {user.role === 'admin' ? (
                        <span className="text-xs text-slate-400 italic">Global System Scope</span>
                      ) : (
                        <select
                          value={departmentValue}
                          onChange={(e) => {
                            const nextDepartmentId = e.target.value ? Number(e.target.value) : null;
                            void handleUpdateUserProperties(user.id, { departmentId: nextDepartmentId });
                          }}
                          className="px-2 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 min-w-[140px]"
                        >
                          <option value="">Unassigned (None)</option>
                          {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          void handleUpdateUserProperties(user.id, { role: e.target.value })
                        }
                        className="px-2 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      >
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => void handleDeleteUser(user.id, user.name)}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors outline-none"
                        title={`Delete account entry for ${user.name}`}
                      >
                        <Trash2 className="w-4 h-4 mx-auto" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default UserManagement;
