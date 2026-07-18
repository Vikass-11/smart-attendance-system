import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentOverview from './pages/student/StudentOverview';
import ApplyLeave from './pages/student/ApplyLeave';
import ViewAttendance from './pages/student/ViewAttendance';
import FacultyOverview from './pages/faculty/FacultyOverview';
import MarkAttendance from './pages/faculty/MarkAttendance';
import LeaveRequests from './pages/faculty/LeaveRequests';
import AdminOverview from './pages/admin/AdminOverview';
import Departments from './pages/admin/Departments';
import UserManagement from './pages/admin/UserManagement';
import Reports from './pages/admin/Reports';
import { useAuth } from './hooks/useAuth';
import ErrorBoundary from './components/ErrorBoundary';
import CourseManagement from './pages/admin/CourseManagement';
import TimetableManagement from './pages/admin/TimetableManagement';
import MyTimetable from './pages/MyTimetable';

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
        {/* Student Routes */}
        {appUser.role === 'student' && (
          <>
            <Route path="/dashboard" element={<StudentOverview />} />
            <Route path="/dashboard/my-attendance" element={<ViewAttendance />} />
            <Route path="/dashboard/apply-leave" element={<ApplyLeave />} />
            <Route path="/dashboard/timetable" element={<MyTimetable />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}

        {/* Faculty Routes */}
        {appUser.role === 'faculty' && (
          <>
            <Route path="/dashboard" element={<FacultyOverview />} />
            <Route path="/dashboard/attendance" element={<MarkAttendance />} />
            <Route path="/dashboard/leave" element={<LeaveRequests />} />
            <Route path="/dashboard/timetable" element={<MyTimetable />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}

        {/* Admin Routes */}
        {appUser.role === 'admin' && (
          <>
            <Route path="/dashboard" element={<AdminOverview />} />
            <Route path="/dashboard/departments" element={<Departments />} />
            <Route path="/dashboard/users" element={<UserManagement />} />
            <Route path="/dashboard/reports" element={<Reports />} />
            <Route path="/dashboard/courses" element={<CourseManagement />} />
            <Route path="/dashboard/timetable" element={<TimetableManagement />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </ErrorBoundary>
  );
}

export default App;