export interface DateRange {
  fromDate: string;
  toDate: string;
}

export const getWeekRange = (dateStr: string): DateRange => {
  const date = new Date(dateStr);
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    fromDate: monday.toISOString().split('T')[0],
    toDate: sunday.toISOString().split('T')[0],
  };
};

export const getMonthRange = (month: number, year: number): DateRange => {
  const fromDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
  const toDate = new Date(year, month, 0).toISOString().split('T')[0];
  return { fromDate, toDate };
};