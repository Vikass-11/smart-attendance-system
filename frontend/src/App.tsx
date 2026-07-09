import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/student/StudentDashboard';
import FacultyOverview from './pages/faculty/FacultyOverview';
import MarkAttendance from './pages/faculty/MarkAttendance';
import LeaveRequests from './pages/faculty/LeaveRequests';
import AdminOverview from './pages/admin/AdminOverview';
import Departments from './pages/admin/Departments';
import UserManagement from './pages/admin/UserManagement';
import Reports from './pages/admin/Reports';
import { useAuth } from './hooks/useAuth';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const { appUser, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!appUser) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <ErrorBoundary>
      <Routes>
      {appUser.role === 'student' && (
        <>
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
      {appUser.role === 'faculty' && (
        <>
          <Route path="/dashboard" element={<FacultyOverview />} />
          <Route path="/dashboard/attendance" element={<MarkAttendance />} />
          <Route path="/dashboard/leave" element={<LeaveRequests />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
      {appUser.role === 'admin' && (
        <>
          <Route path="/dashboard" element={<AdminOverview />} />
          <Route path="/dashboard/departments" element={<Departments />} />
          <Route path="/dashboard/users" element={<UserManagement />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
      </Routes>
    </ErrorBoundary>
  );
}

export default App;