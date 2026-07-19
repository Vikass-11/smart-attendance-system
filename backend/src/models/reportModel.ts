import db from '../config/db';

export interface DepartmentReportFilters {
  search?: string;
  page: number;
  limit: number;
  offset: number;
  sortBy: 'department' | 'attendanceRate';
  sortOrder: 'asc' | 'desc';
}

export const getDailyReportData = async (date: string): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT u.id as student_id, u.name, u.email, d.name as department, COALESCE(a.status, 'absent') as status
     FROM users u
     LEFT JOIN departments d ON u.department_id = d.id
     LEFT JOIN attendance a ON u.id = a.student_id AND a.date = ?
     WHERE u.role = 'student' AND u.is_active = 1`,
    [date]
  );
  return rows;
};

export const getRangeReportData = async (fromDate: string, toDate: string): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT u.id, u.name, u.email, d.name as department,
       COALESCE(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END), 0) as present_days,
       COALESCE(SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END), 0) as absent_days,
       COALESCE(SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END), 0) as late_days,
       COUNT(a.id) as total_days
     FROM users u
     LEFT JOIN departments d ON u.department_id = d.id
     LEFT JOIN attendance a ON u.id = a.student_id AND a.date BETWEEN ? AND ?
     WHERE u.role = 'student' AND u.is_active = 1
     GROUP BY u.id, u.name, u.email, d.name`,
    [fromDate, toDate]
  );

  return rows.map((row: any) => {
    const present = Number(row.present_days);
    const absent = Number(row.absent_days);
    const late = Number(row.late_days);
    const total = Number(row.total_days);
    const effectivePresent = present + (late * 0.5);
    const percentage = total > 0 ? Math.round((effectivePresent / total) * 100) : 100;
    return { ...row, percentage };
  });
};

export const getInstitutionSummaryData = async (fromDate: string, toDate: string, filters: DepartmentReportFilters): Promise<any> => {
  const [overallRows]: any = await db.query(
    `SELECT 
       COUNT(DISTINCT u.id) as totalStudents,
       COALESCE(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END), 0) as presentCount,
       COALESCE(SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END), 0) as absentCount,
       COALESCE(SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END), 0) as lateCount
     FROM users u
     LEFT JOIN attendance a ON u.id = a.student_id AND a.date BETWEEN ? AND ?
     WHERE u.role = 'student' AND u.is_active = 1`,
    [fromDate, toDate]
  );
  
  const overall = overallRows[0] || { totalStudents: 0, presentCount: 0, absentCount: 0, lateCount: 0 };
  const oPresent = Number(overall.presentCount);
  const oAbsent = Number(overall.absentCount);
  const oLate = Number(overall.lateCount);
  const oTotal = oPresent + oAbsent + oLate;
  const overallAttendanceRate = oTotal > 0 ? Math.round(((oPresent + oLate * 0.5) / oTotal) * 100) : 0;

  let breakdownQuery = `
    SELECT d.name as department,
       COUNT(DISTINCT u.id) as studentCount,
       COALESCE(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END), 0) as presentCount,
       COALESCE(SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END), 0) as absentCount,
       COALESCE(SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END), 0) as lateCount
    FROM departments d
    LEFT JOIN users u ON d.id = u.department_id AND u.role = 'student' AND u.is_active = 1
    LEFT JOIN attendance a ON u.id = a.student_id AND a.date BETWEEN ? AND ?
  `;
  const params: any[] = [fromDate, toDate];

  if (filters.search) {
    breakdownQuery += ' AND d.name LIKE ?';
    params.push(`%${filters.search}%`);
  }

  breakdownQuery += ' GROUP BY d.id, d.name';

  const [bdRows]: any = await db.query(breakdownQuery, params);

  const formattedBD = bdRows.map((row: any) => {
    const present = Number(row.presentCount);
    const absent = Number(row.absentCount);
    const late = Number(row.lateCount);
    const total = present + absent + late;
    const percentage = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 0;
    return { department: row.department, studentCount: row.studentCount, percentage };
  });

  if (filters.sortBy === 'attendanceRate') {
    formattedBD.sort((a: any, b: any) => filters.sortOrder === 'desc' ? b.percentage - a.percentage : a.percentage - b.percentage);
  } else {
    formattedBD.sort((a: any, b: any) => {
      const comp = a.department.localeCompare(b.department);
      return filters.sortOrder === 'desc' ? -comp : comp;
    });
  }

  const totalBreakdownCount = formattedBD.length;
  const paginatedBD = formattedBD.slice(filters.offset, filters.offset + filters.limit);

  return {
    summary: { 
      total_students: overall.totalStudents, 
      overall_percentage: overallAttendanceRate,
      total_present: overall.presentCount,
      total_absent: overall.absentCount
    },
    departmentBreakdown: paginatedBD,
    departmentBreakdownMeta: { total: totalBreakdownCount, page: filters.page, limit: filters.limit }
  };
};