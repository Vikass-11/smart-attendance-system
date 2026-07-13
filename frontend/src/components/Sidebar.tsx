import { NavLink, useLocation } from 'react-router-dom';
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
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const { appUser } = useAuth();
  const location = useLocation();

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
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-2 px-6 py-6 border-b border-white/10 relative z-10">
        <div className="bg-indigo-500/20 p-2 rounded-xl ring-1 ring-indigo-400/30">
          <GraduationCap className="w-5 h-5 text-indigo-300" />
        </div>
        <span className="font-semibold text-sm leading-tight">Smart Attendance<br />System</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 relative z-10">
        {links.map((link, i) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <NavLink
              key={i}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all relative ${
                isActive
                  ? 'bg-indigo-500/15 text-white ring-1 ring-indigo-400/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-400 rounded-r-full" />
              )}
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-300' : ''}`} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-white/10 text-xs text-slate-500 relative z-10">
        Logged in as <span className="text-slate-300 capitalize font-medium">{appUser?.role}</span>
      </div>
    </aside>
  );
};

export default Sidebar;