import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Users,
  Building2,
  GraduationCap,
  ClipboardList,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { appUser } = useAuth();

  const studentLinks = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  ];

  const facultyLinks = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/attendance', label: 'Mark Attendance', icon: CalendarCheck },
  { to: '/dashboard/leave', label: 'Leave Requests', icon: ClipboardList },
];

  const adminLinks = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/dashboard', label: 'Departments', icon: Building2 },
    { to: '/dashboard', label: 'Users', icon: Users },
    { to: '/dashboard', label: 'Reports', icon: FileText },
  ];

  const links =
    appUser?.role === 'admin' ? adminLinks : appUser?.role === 'faculty' ? facultyLinks : studentLinks;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="flex items-center gap-2 px-6 py-6 border-b border-white/10">
        <div className="bg-indigo-500/20 p-2 rounded-xl">
          <GraduationCap className="w-5 h-5 text-indigo-300" />
        </div>
        <span className="font-semibold text-sm leading-tight">Smart Attendance<br />System</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link, i) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={i}
              to={link.to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-white/10 text-xs text-slate-500">
        Logged in as <span className="text-slate-300 capitalize">{appUser?.role}</span>
      </div>
    </aside>
  );
};

export default Sidebar;