import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';

function App() {
  const { firebaseUser, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={firebaseUser ? <div className="p-8">Dashboard (coming next)</div> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to={firebaseUser ? '/dashboard' : '/login'} />} />
    </Routes>
  );
}

export default App;