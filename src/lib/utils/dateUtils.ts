type GetStartAndEndOfDateRanges = 'week' | 'month';

export function fixDate(
  date: Date,
  locales?: string | string[],
  options?: Intl.DateTimeFormatOptions
) {
  return date.toLocaleDateString(locales ?? 'en-US', options ?? {
  weekday: 'long',
  day: '2-digit',
  month: 'short'});
}

export function getStartAndEndOfDate(range: GetStartAndEndOfDateRanges, startOnFirst = true) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (range === 'week') {
    const currentDayOfWeek = today.getDay();
    const daysToSubtract = startOnFirst
      ? (currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1)
      : currentDayOfWeek;

    const start = new Date(today);
    start.setDate(today.getDate() - daysToSubtract);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  }

  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

export function addDays(date: Date, days: number) {
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() + days);
  return dateCopy;
}