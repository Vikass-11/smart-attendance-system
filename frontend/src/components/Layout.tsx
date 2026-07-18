import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, LogOut, ArrowLeft } from 'lucide-react';
import Sidebar from './Sidebar';
import AgentChat from './AgentChat';
import apiClient from '../api/axiosClient';
import { useTheme } from '../hooks/useTheme';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to log out of the session?')) return;
    try {
      localStorage.removeItem('token');
      await apiClient.post('/auth/logout').catch(() => {});
    } catch (err) {
      console.error('Logout error context:', err);
    } finally {
      window.location.href = '/login';
    }
  };

  const isMainOverviewPage =
    location.pathname === '/dashboard' || location.pathname === '/dashboard/';

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 md:min-h-screen">
        <header className="sticky top-0 z-30 flex justify-between items-center px-4 py-2.5 md:px-5 md:py-3 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm transition-colors shadow-sm">
          <div>
            {!isMainOverviewPage ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all outline-none"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Back to </span>Overview
              </button>
            ) : (
              <div className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Overview
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-1.5 md:p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors border border-transparent outline-none"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
            </button>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all outline-none"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-5 lg:p-6 pb-24 md:pb-6 overflow-y-auto overflow-x-hidden w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>

      <AgentChat />
    </div>
  );
};

export default Layout;
