import { useEffect, useState } from 'react';
import apiClient from '../api/axiosClient';
import Layout from '../components/Layout';
import type { StudentTimetableEntry } from '../types/course';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

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

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="page-title mb-6">My Timetable</h1>

      {entries.length === 0 ? (
        <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 text-center text-slate-400">
          No timetable entries yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {DAYS.map((day) => (
            <div key={day} className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-4">
              <p className="font-semibold text-sm text-slate-900 dark:text-white mb-3 capitalize">{day}</p>
              <div className="space-y-2">
                {entriesForDay(day).length === 0 && (
                  <p className="text-xs text-slate-300 dark:text-slate-600">No classes</p>
                )}
                {entriesForDay(day).map((e, i) => (
                  <div key={i} className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-2 border-l-2 border-indigo-500">
                    <p className="text-xs font-medium text-indigo-900 dark:text-indigo-300">{e.courseCode}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{e.startTime.slice(0, 5)} - {e.endTime.slice(0, 5)}</p>
                    {e.room && <p className="text-xs text-slate-400 dark:text-slate-500">{e.room}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default MyTimetable;