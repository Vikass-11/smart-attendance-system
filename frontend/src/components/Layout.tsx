import type { ReactNode } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }: { children: ReactNode }) => {
  const { appUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Smart Attendance System</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {appUser?.name} <span className="text-gray-400">({appUser?.role})</span>
          </span>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </div>
  );
};

export default Layout;