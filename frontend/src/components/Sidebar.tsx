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

  return (
    <>
      {/* MOBILE TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg md:hidden dark:bg-white dark:text-slate-900"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* MOBILE BACKDROP */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden" />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-100 bg-slate-50/60 p-4 transition-transform duration-200 dark:border-slate-800/60 dark:bg-slate-950
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:sticky md:top-0 md:h-screen md:translate-x-0`}
      >
        {/* BRAND IDENTITY */}
        <div className="flex items-center gap-3 px-3 py-4 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <GraduationCap className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-200 leading-tight">
            Smart Attendance<br />System
          </span>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 space-y-1">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={i}
                to={link.to}
                end={link.to === '/dashboard'} // 🌟 FIXES THE OVERVIEW ALWAYS HIGHLIGHTED BUG!
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                  ${
                    isActive
                      ? 'bg-slate-200/70 text-slate-900 font-semibold dark:bg-slate-800 dark:text-white'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* METADATA FOOTER */}
        <div className="pt-4 border-t border-slate-200/60 text-[11px] text-slate-400 dark:border-slate-800">
          Logged in as <span className="font-semibold text-slate-600 dark:text-slate-300 capitalize">{appUser?.role}</span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;