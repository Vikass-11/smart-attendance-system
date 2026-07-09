import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/student/StudentDashboard';
import { useAuth } from './context/AuthContext';

function App() {
  const { firebaseUser, appUser, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          !firebaseUser ? (
            <Navigate to="/login" />
          ) : appUser?.role === 'student' ? (
            <StudentDashboard />
          ) : (
            <div className="p-8">Dashboard for {appUser?.role} coming next</div>
          )
        }
      />
      <Route path="*" element={<Navigate to={firebaseUser ? '/dashboard' : '/login'} />} />
    </Routes>
  );
}

export default App;