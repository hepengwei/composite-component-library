export interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export interface DateRange {
  start: string | null;
  end: string | null;
  dates?: string[];
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const parseDate = (value: string): Date | null => {
  if (!DATE_PATTERN.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
    ? date
    : null;
};

const formatDate = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};

const compareDates = (left: string, right: string): number => {
  return left < right ? -1 : left > right ? 1 : 0;
};

export const isDateSelectable = (
  value: string,
  min?: string,
  max?: string,
): boolean => {
  if (!parseDate(value)) return false;
  return (
    (!min || !parseDate(min) || compareDates(value, min) >= 0) &&
    (!max || !parseDate(max) || compareDates(value, max) <= 0)
  );
};

export const normalizeDate = (
  value: string | null | undefined,
  min?: string,
  max?: string,
): string | null => {
  if (!value || !parseDate(value)) return null;
  let normalized = value;
  if (min && parseDate(min) && compareDates(normalized, min) < 0)
    normalized = min;
  if (max && parseDate(max) && compareDates(normalized, max) > 0)
    normalized = max;
  return normalized;
};

export const normalizeDateRange = (
  start: string | null | undefined,
  end: string | null | undefined,
  min?: string,
  max?: string,
): DateRange => {
  const normalizedStart = normalizeDate(start, min, max);
  const normalizedEnd = normalizeDate(end, min, max);
  if (!normalizedStart || !normalizedEnd)
    return { start: normalizedStart, end: normalizedEnd };
  return compareDates(normalizedStart, normalizedEnd) <= 0
    ? { start: normalizedStart, end: normalizedEnd }
    : { start: normalizedEnd, end: normalizedStart };
};

export const getDateRange = (start: string, end: string): string[] => {
  const first = parseDate(start);
  const last = parseDate(end);
  if (!first || !last) return [];
  const rangeStart = compareDates(start, end) <= 0 ? first : last;
  const rangeEnd = compareDates(start, end) <= 0 ? last : first;
  const result: string[] = [];
  for (
    const cursor = new Date(rangeStart);
    cursor <= rangeEnd;
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  ) {
    result.push(formatDate(cursor));
  }
  return result;
};

export const getMonthGrid = (
  month: string,
  today = formatDate(new Date()),
): CalendarDay[] => {
  const parsed = parseDate(month);
  if (!parsed) return [];
  const year = parsed.getUTCFullYear();
  const monthIndex = parsed.getUTCMonth();
  const firstDay = new Date(Date.UTC(year, monthIndex, 1));
  const mondayOffset = (firstDay.getUTCDay() + 6) % 7;
  const gridStart = new Date(Date.UTC(year, monthIndex, 1 - mondayOffset));
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setUTCDate(gridStart.getUTCDate() + index);
    const dateString = formatDate(date);
    return {
      date: dateString,
      day: date.getUTCDate(),
      isCurrentMonth:
        date.getUTCMonth() === monthIndex && date.getUTCFullYear() === year,
      isToday: dateString === today,
    };
  });
};
