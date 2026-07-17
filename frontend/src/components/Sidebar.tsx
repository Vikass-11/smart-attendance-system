import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Users,
  Building2,
  GraduationCap,
  ClipboardList,
  Calendar,
  BookOpen,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ThemeToggle } from './ThemeToggle'; // Adjust paths as per your project

const Sidebar = () => {
  const { appUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const studentLinks = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/dashboard/timetable', label: 'Timetable', icon: Calendar },
  ];

  const facultyLinks = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/dashboard/attendance', label: 'Mark Attendance', icon: CalendarCheck },
    { to: '/dashboard/leave', label: 'Leave Requests', icon: ClipboardList },
    { to: '/dashboard/timetable', label: 'Timetable', icon: Calendar },
  ];

  const adminLinks = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/dashboard/departments', label: 'Departments', icon: Building2 },
    { to: '/dashboard/users', label: 'Users', icon: Users },
    { to: '/dashboard/reports', label: 'Reports', icon: FileText },
    { to: '/dashboard/courses', label: 'Courses', icon: BookOpen },
    { to: '/dashboard/timetable', label: 'Timetable', icon: Calendar },
  ];

  const links =
    appUser?.role === 'admin' ? adminLinks : appUser?.role === 'faculty' ? facultyLinks : studentLinks;

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 📱 MOBILE HEADER BAR */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden w-full sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <GraduationCap className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-200">
            Smart Attendance
          </span>
        </div>
        {/* Step 4 placement: Top Right on Mobile */}
        <ThemeToggle />
      </div>

      {/* 📱 MOBILE BACKDROP OVERLAY */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm md:hidden"
        />
      )}

      {/* 🧱 MAIN SIDEBAR ASSEMBLY */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:sticky md:top-0 md:h-screen md:translate-x-0`}
      >
        {/* SIDEBAR HEADER (Desktop Only) */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-200 leading-tight">
              Smart Attendance<br />System
            </span>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 md:hidden dark:text-slate-400 dark:hover:bg-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* NAVIGATION LINKS CONTAINER */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={i}
                to={link.to}
                onClick={() => setIsOpen(false)} // Closes mobile drawer on navigation click
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* SIDEBAR FOOTER (User Context & Desktop Theme Switcher) */}
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              Logged in as
            </span>
            <span className="text-xs font-semibold text-slate-700 capitalize dark:text-slate-300">
              {appUser?.role || 'Guest'}
            </span>
          </div>

          {/* Step 4 placement: Bottom Right on Desktop */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;