import { useEffect, useState } from 'react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string | null;
}

interface Department {
  id: number;
  name: string;
}

interface Summary {
  total_students: number;
  total_records: number;
  total_present: number;
  total_absent: number;
  total_late: number;
  overall_percentage: number;
}

interface DeptBreakdown {
  department: string;
  total_students: number;
  percentage: number;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [deptBreakdown, setDeptBreakdown] = useState<DeptBreakdown[]>([]);
  const [loading, setLoading] = useState(true);

  const [newDeptName, setNewDeptName] = useState('');
  const [deptSaving, setDeptSaving] = useState(false);
  const [search, setSearch] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const monthStart = today.slice(0, 8) + '01';

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersRes, deptRes, summaryRes] = await Promise.all([
        apiClient.get('/admin/users'),
        apiClient.get('/admin/departments'),
        apiClient.get(`/reports/summary?fromDate=${monthStart}&toDate=${today}`),
      ]);
      setUsers(usersRes.data);
      setDepartments(deptRes.data);
      setSummary(summaryRes.data.summary);
      setDeptBreakdown(summaryRes.data.departmentBreakdown);
    } catch (err) {
      console.error('Failed to load admin dashboard data', err);
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
    setDeptSaving(true);
    try {
      await apiClient.post('/admin/departments', { name: newDeptName });
      setNewDeptName('');
      await loadData();
    } catch (err) {
      console.error('Failed to add department', err);
    } finally {
      setDeptSaving(false);
    }
  };

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
    if (!confirm('Delete this user permanently?')) return;
    try {
      await apiClient.delete(`/admin/users/${id}`);
      await loadData();
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-3xl font-bold mt-1">{summary?.total_students ?? 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">Overall Attendance</p>
          <p className="text-3xl font-bold mt-1">{summary?.overall_percentage ?? 0}%</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">Present (This Month)</p>
          <p className="text-3xl font-bold mt-1">{summary?.total_present ?? 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">Absent (This Month)</p>
          <p className="text-3xl font-bold mt-1">{summary?.total_absent ?? 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold mb-4">Department-wise Attendance</h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {deptBreakdown.length === 0 && <p className="text-sm text-gray-400">No data yet.</p>}
            {deptBreakdown.map((d, i) => (
              <div key={i} className="flex justify-between items-center border-b pb-2">
                <span className="text-sm">{d.department || 'Unassigned'}</span>
                <span className="text-sm font-medium">{d.percentage ?? 0}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold mb-4">Manage Departments</h2>
          <form onSubmit={handleAddDepartment} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
              placeholder="New department name"
              className="flex-1 border rounded px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={deptSaving}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              Add
            </button>
          </form>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {departments.map((d) => (
              <div key={d.id} className="text-sm border-b pb-1">{d.name}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">All Users</h2>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email"
              className="border rounded px-3 py-1.5 text-sm"
            />
            <button type="submit" className="bg-gray-100 px-3 py-1.5 rounded text-sm hover:bg-gray-200">
              Search
            </button>
          </form>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2">Name</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">Role</th>
              <th className="pb-2">Department</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="py-2">{u.name}</td>
                <td className="py-2">{u.email}</td>
                <td className="py-2 capitalize">{u.role}</td>
                <td className="py-2">{u.department || '-'}</td>
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

export default AdminDashboard;