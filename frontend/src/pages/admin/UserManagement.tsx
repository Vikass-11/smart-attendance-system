import { useEffect, useState } from 'react';
// 🌟 FIXED: Removed 'Users' from the import line below to prevent the TS6133 build error
import { Trash2, ShieldAlert, CheckCircle2 } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import type { AxiosError } from 'axios';

interface UserRecord {
  id: string | number;
  name: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
  department?: string | { name: string };
}

interface DepartmentRecord {
  id: number;
  name: string;
}

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
        apiClient.get('/admin/users'),
        apiClient.get('/admin/departments')
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
    void fetchDataDirectives();
  }, []);

  const handleUpdateUserProperties = async (userId: string | number, parameters: { role?: string; department?: string }) => {
    setError(null);
    setSuccess(null);
    try {
      await apiClient.patch(`/admin/users/${userId}`, parameters);
      setSuccess('User security configuration updated successfully.');
      
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? ({ ...user, ...parameters } as UserRecord) : user
        )
      );
    } catch (err) {
      const errorPayload = err as AxiosError<{ error?: string }>;
      setError(errorPayload.response?.data?.error || 'Failed to update target account properties.');
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

  const resolveUserDepartmentValue = (user: UserRecord): string => {
    if (!user.department) return '';
    if (typeof user.department === 'object') return user.department.name || '';
    return user.department;
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
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">User Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage roles and access permissions across the institution.</p>
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
        <div className="bg-white dark:bg-slate-950 border border-slate-200 rounded-xl p-8 text-center text-slate-400 italic text-sm shadow-sm">
          No registered records match your lookup parameters.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-x-auto text-sm">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">User</th>
                <th className="px-4 py-3.5">Current Role</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5">Change Role</th>
                <th className="px-6 py-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {filteredUsers.map((user) => {
                const currentDepartment = resolveUserDepartmentValue(user);

                return (
                  <tr key={user.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 shrink-0 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold text-xs uppercase">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            {user.name}
                          </div>
                          <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide ${
                        user.role === 'admin' 
                          ? 'bg-slate-900 text-slate-100 dark:bg-white dark:text-slate-900' 
                          : user.role === 'faculty'
                          ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400'
                          : 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {user.role === 'admin' ? (
                        <span className="text-xs text-slate-400 italic">Global System Scope</span>
                      ) : (
                        <select
                          value={currentDepartment}
                          onChange={(e) => void handleUpdateUserProperties(user.id, { department: e.target.value })}
                          className="px-2 py-1 bg-transparent border border-slate-200 dark:border-slate-800 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400"
                        >
                          <option value="">Unassigned (None)</option>
                          {departments.map((dept) => (
                            <option key={dept.id} value={dept.name}>
                              {dept.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) => void handleUpdateUserProperties(user.id, { role: e.target.value })}
                        className="px-2 py-1 bg-transparent border border-slate-200 dark:border-slate-800 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      >
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteUser(user.id, user.name)}
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