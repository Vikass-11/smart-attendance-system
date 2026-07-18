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
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const { appUser } = useAuth();

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
    <aside
      className="
        /* Mobile Viewport: Persistent Bottom Flex Dock */
        fixed bottom-0 left-0 right-0 z-40 flex flex-row items-center justify-around h-16 border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-2 py-1 shadow-lg dark:border-slate-800/80 dark:bg-slate-950/95
        /* Desktop Viewport: Standard Pinned Left Column */
        md:sticky md:top-0 md:bottom-auto md:left-auto md:right-auto md:z-auto md:flex md:w-64 md:h-screen md:flex-col md:justify-start md:border-r md:border-t-0 md:bg-slate-50/60 md:p-4 md:shadow-none dark:md:bg-slate-950 transition-colors duration-200
      "
    >
      {/* BRAND IDENTITY: Displayed on Desktop, Collapsed on Mobile */}
      <div className="hidden md:flex items-center gap-3 px-3 py-4 mb-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
          <GraduationCap className="h-4 w-4" />
        </div>
        <span className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-200 leading-tight">
          Smart Attendance<br />System
        </span>
      </div>

      {/* NAVIGATION LINKS: Flex Row on Mobile, Flex Column on Desktop */}
      <nav className="flex flex-row w-full justify-between items-center gap-1 md:flex-col md:flex-1 md:justify-start md:items-stretch md:space-y-1">
        {links.map((link, i) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={i}
              to={link.to}
              end={link.to === '/dashboard'} // Preserved fix context
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 rounded-xl text-center flex-1 py-1 px-1.5 transition-all duration-150
                md:flex-row md:justify-start md:gap-3 md:px-3 md:py-2 md:w-full md:text-left
                ${
                  isActive
                    ? 'bg-slate-200/70 text-slate-900 font-semibold dark:bg-slate-800 dark:text-white'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200'
                }`
              }
            >
              <Icon className="h-4 w-4 md:h-[18px] md:w-[18px] shrink-0" />
              <span className="text-[10px] md:text-sm font-medium tracking-tight md:tracking-normal">{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* METADATA FOOTER: Displayed on Desktop, Collapsed on Mobile */}
      <div className="hidden md:block pt-4 border-t border-slate-200/60 text-[11px] text-slate-400 dark:border-slate-800">
        Logged in as <span className="font-semibold text-slate-600 dark:text-slate-300 capitalize">{appUser?.role}</span>
      </div>
    </aside>
  );
};

export default Sidebar;