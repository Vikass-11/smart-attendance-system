import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/student/StudentDashboard';
import FacultyOverview from './pages/faculty/FacultyOverview';
import MarkAttendance from './pages/faculty/MarkAttendance';
import LeaveRequests from './pages/faculty/LeaveRequests';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useAuth } from './context/AuthContext';

function App() {
  const { firebaseUser, appUser, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!firebaseUser) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {appUser?.role === 'student' && (
        <>
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
      {appUser?.role === 'faculty' && (
        <>
          <Route path="/dashboard" element={<FacultyOverview />} />
          <Route path="/dashboard/attendance" element={<MarkAttendance />} />
          <Route path="/dashboard/leave" element={<LeaveRequests />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
      {appUser?.role === 'admin' && (
        <>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );
}

export default App;