import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Users,
  Building2,
  ClipboardList,
  Calendar,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import eduflowIcon from '../assets/eduflow-icon.png';

const Sidebar = () => {
  const { appUser } = useAuth();

  const studentLinks = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, shortLabel: 'Home' },
    { to: '/dashboard/timetable', label: 'Timetable', icon: Calendar, shortLabel: 'Time' },
  ];

  const facultyLinks = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, shortLabel: 'Home' },
    { to: '/dashboard/attendance', label: 'Mark Attendance', icon: CalendarCheck, shortLabel: 'Mark' },
    { to: '/dashboard/leave', label: 'Leave Requests', icon: ClipboardList, shortLabel: 'Leave' },
    { to: '/dashboard/timetable', label: 'Timetable', icon: Calendar, shortLabel: 'Time' },
  ];

  const adminLinks = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, shortLabel: 'Home' },
    { to: '/dashboard/departments', label: 'Departments', icon: Building2, shortLabel: 'Depts' },
    { to: '/dashboard/users', label: 'Users', icon: Users, shortLabel: 'Users' },
    { to: '/dashboard/reports', label: 'Reports', icon: FileText, shortLabel: 'Reports' },
    { to: '/dashboard/courses', label: 'Courses', icon: BookOpen, shortLabel: 'Courses' },
    { to: '/dashboard/timetable', label: 'Timetable', icon: Calendar, shortLabel: 'Time' },
  ];

  const links =
    appUser?.role === 'admin' ? adminLinks : appUser?.role === 'faculty' ? facultyLinks : studentLinks;

  return (
    <>
      <aside className="hidden md:flex md:sticky md:top-0 md:h-screen md:w-52 md:shrink-0 md:flex-col md:border-r md:border-slate-200/80 md:bg-slate-50/80 md:p-3 dark:md:border-slate-800/80 dark:md:bg-slate-950 transition-colors duration-200">
        <div className="flex items-center gap-2.5 px-2 py-3 mb-2">
          <img src={eduflowIcon} alt="EduFlow" className="h-7 w-7 shrink-0 rounded-md object-cover" />
          <span className="text-xs font-bold tracking-tight text-slate-800 dark:text-slate-200 leading-tight">
            EduFlow
          </span>
        </div>

        <nav className="flex flex-col flex-1 space-y-0.5 overflow-y-auto">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={i}
                to={link.to}
                end={link.to === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-200/70 text-slate-900 font-semibold dark:bg-slate-800 dark:text-white'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200'
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate text-[13px] font-medium">{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto pt-3 border-t border-slate-200/60 text-[10px] text-slate-400 dark:border-slate-800 px-2">
          Logged in as{' '}
          <span className="font-semibold text-slate-600 dark:text-slate-300 capitalize">{appUser?.role}</span>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/95 shadow-[0_-4px_20px_rgba(15,23,42,0.08)]">
        <div className="flex items-stretch overflow-x-auto scrollbar-none px-1 py-1.5 gap-0.5">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={i}
                to={link.to}
                end={link.to === '/dashboard'}
                className={({ isActive }) =>
                  `flex min-w-[4.25rem] shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg px-1.5 py-1.5 transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-200/70 text-slate-900 font-semibold dark:bg-slate-800 dark:text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900'
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="text-[9px] font-medium leading-tight text-center">{link.shortLabel}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
