import type { ReactNode } from 'react'; 
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, LogOut, ArrowLeft } from 'lucide-react';
import Sidebar from './Sidebar';
import apiClient from '../api/axiosClient';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize theme state based on local storage configurations
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Keep track of theme shifts on root HTML node
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Session termination clearance handler
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

  // Condition to check if the user is on the main landing page of the dashboard
  const isMainOverviewPage = location.pathname === '/dashboard' || location.pathname === '/dashboard/';

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 pb-16 md:pb-0 transition-colors duration-200">
      
      {/* 1. Sidebar Navigation Column (Transforms into bottom flex row on mobile) */}
      <Sidebar />

      {/* 2. Core Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Unified Top Control Bar */}
        <header className="flex justify-between items-center px-6 py-3.5 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 transition-colors shadow-sm">
          
          {/* Left Action Slot: Contextual Navigation Back Button */}
          <div>
            {!isMainOverviewPage ? (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all outline-none"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Institutional Overview
              </div>
            )}
          </div>

          {/* Right Action Slot: Mode Toggler & System Access Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Dark Mode Control Handle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors border border-transparent outline-none"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />

            {/* Secure Logout Action */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all outline-none"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* 3. View Port Content Delivery Zone */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;