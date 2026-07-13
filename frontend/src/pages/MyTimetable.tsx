import { useEffect, useState } from 'react';
import apiClient from '../api/axiosClient';
import Layout from '../components/Layout';
import type { StudentTimetableEntry } from '../types/course';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const COURSE_COLORS = [
  { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-900', badge: 'text-indigo-600' },
  { bg: 'bg-cyan-50', border: 'border-cyan-500', text: 'text-cyan-900', badge: 'text-cyan-600' },
  { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-900', badge: 'text-amber-600' },
  { bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-900', badge: 'text-emerald-600' },
  { bg: 'bg-pink-50', border: 'border-pink-500', text: 'text-pink-900', badge: 'text-pink-600' },
  { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-900', badge: 'text-purple-600' },
];

const getColorForCourse = (courseCode: string) => {
  let hash = 0;
  for (let i = 0; i < courseCode.length; i++) {
    hash = courseCode.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COURSE_COLORS[Math.abs(hash) % COURSE_COLORS.length];
};

const MyTimetable = () => {
  const [entries, setEntries] = useState<StudentTimetableEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.get('/timetable/my-timetable');
        setEntries(res.data);
      } catch (err) {
        console.error('Failed to load timetable', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const entriesForDay = (day: string) =>
    entries.filter((e) => e.dayOfWeek === day).sort((a, b) => a.startTime.localeCompare(b.startTime));

  const todayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">My Timetable</h1>
      <p className="text-slate-500 mb-6">Your recurring weekly class schedule.</p>

      {entries.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
          <p className="text-slate-400">No timetable entries yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {DAYS.map((day) => {
            const isToday = day === todayName;
            return (
              <div
                key={day}
                className={`bg-white rounded-xl shadow-sm border p-4 relative ${
                  isToday ? 'border-indigo-300 ring-1 ring-indigo-100' : 'border-slate-100'
                }`}
              >
                {isToday && (
                  <span className="absolute -top-2 left-4 bg-indigo-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                    Today
                  </span>
                )}
                <p className="font-semibold text-sm text-slate-900 mb-3 capitalize">{day}</p>
                <div className="space-y-2">
                  {entriesForDay(day).length === 0 && (
                    <p className="text-xs text-slate-300">No classes</p>
                  )}
                  {entriesForDay(day).map((e, i) => {
                    const color = getColorForCourse(e.courseCode);
                    return (
                      <div key={i} className={`${color.bg} rounded-lg p-2 border-l-2 ${color.border}`}>
                        <p className={`text-xs font-medium ${color.text}`}>{e.courseCode}</p>
                        <p className="text-xs text-slate-600">{e.startTime.slice(0, 5)} - {e.endTime.slice(0, 5)}</p>
                        {e.room && <p className={`text-xs ${color.badge}`}>{e.room}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default MyTimetable;