export const indexTextCode = `/**
 * 可进行拖拽的日期选择组件
 */
import React, { useState, useRef, useMemo } from "react";
import classnams from "classnames";
import {
  getDateRange,
  getMonthGrid,
  isDateSelectable,
  normalizeDateRange,
  type DateRange,
} from "./dateRangeCalendar";
import styles from "./index.module.scss";

interface DraggableSelectDateProps {
  dateRangeValue?: DateRange | null;
  month?: string;
  minSelectableDate?: string;
  maxSelectableDate?: string;
  disabled?: boolean;
  className?: string; // 可以使用该参数进行样式覆盖
  onChange?: (range: DateRange) => void;
}

const weekdays = ["一", "二", "三", "四", "五", "六", "日"];

const DraggableSelectDate = (props: DraggableSelectDateProps) => {
  const {
    dateRangeValue,
    month,
    minSelectableDate,
    maxSelectableDate,
    disabled,
    className = "",
    onChange,
  } = props;

  const hasDraggedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const [dragStartDate, setDragStartDate] = useState<string>("");
  const [dragEndDate, setDragEndDate] = useState<string>("");

  const monthGrid = useMemo(() => {
    const internalMonth =
      month ||
      dateRangeValue?.start ||
      new Date().toISOString().slice(0, 7) + "-01";
    hasDraggedRef.current = false;
    setDragStartDate("");
    setDragEndDate("");
    return getMonthGrid(internalMonth);
  }, [month]);

  const selectedDates = useMemo(() => {
    if (dateRangeValue?.dates) return new Set(dateRangeValue.dates);
    const selectedRange = normalizeDateRange(
      dateRangeValue?.start,
      dateRangeValue?.end,
      minSelectableDate,
      maxSelectableDate,
    );
    if (selectedRange.start && selectedRange.end) {
      return new Set(getDateRange(selectedRange.start, selectedRange.end));
    }
    return new Set<string>();
  }, [dateRangeValue]);

  const setSelectedDates = (dates: string[]): void => {
    const sortedDates = [...new Set(dates)].sort();
    onChange?.({
      start: sortedDates[0] ?? null,
      end: sortedDates[sortedDates.length - 1] ?? null,
      dates: sortedDates,
    });
  };

  const onMouseDown = (date: string) => {
    if (
      disabled ||
      !isDateSelectable(date, minSelectableDate, maxSelectableDate)
    )
      return;
    setDragStartDate(date);
    setDragEndDate(date);
    hasDraggedRef.current = false;
  };

  const onMouseEnter = (date: string) => {
    if (!dragStartDate) return;
    if (!isDateSelectable(date, minSelectableDate, maxSelectableDate)) return;
    if (date !== dragStartDate) hasDraggedRef.current = true;
    setDragEndDate(date);
  };

  const onMouseUp = () => {
    if (!dragStartDate || !dragEndDate) return;
    const start = dragStartDate;
    const end = dragEndDate;
    const dragged = hasDraggedRef.current;
    setDragStartDate("");
    setDragEndDate("");
    hasDraggedRef.current = false;
    if (dragged) {
      const range = getDateRange(start, end);
      const dates = new Set(selectedDates);
      const shouldRemove = dates.has(start);
      range.forEach((date) => {
        if (shouldRemove) dates.delete(date);
        else dates.add(date);
      });
      setSelectedDates([...dates]);
      suppressClickRef.current = true;
    } else {
      suppressClickRef.current = false;
    }
  };

  const onMouseLeave = () => {
    setDragStartDate("");
    setDragEndDate("");
    hasDraggedRef.current = false;
    suppressClickRef.current = false;
  };

  const onClick = (date: string) => {
    if (
      disabled ||
      !isDateSelectable(date, minSelectableDate, maxSelectableDate)
    )
      return;
    if (dragStartDate) return;
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    const dates = new Set(selectedDates);
    if (dates.has(date)) dates.delete(date);
    else dates.add(date);
    setSelectedDates([...dates]);
  };

  const isSelected = (date: string): boolean => {
    // 如果是拖拽，则根据gestureStart和dragEnd，以及gestureStart之前是否已选中来判断当前date是否要选中
    if (dragStartDate && dragEndDate) {
      const range = getDateRange(dragStartDate, dragEndDate);
      const dates = new Set(selectedDates);
      const shouldRemove = dates.has(dragStartDate);
      if (range.includes(date)) {
        if (!shouldRemove) {
          return true;
        }
        return false;
      }
    }
    return selectedDates.has(date);
  };

  return (
    <div
      className={classnams({
        [styles.draggableSelectDate]: true,
        [className]: !!className,
      })}
    >
      <div className={styles.weekdays}>
        {weekdays.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>
      <div className={styles.grid} onMouseLeave={onMouseLeave}>
        {monthGrid.map((item) => (
          <div
            key={item.date}
            className={classnams({
              [styles.dayBox]: true,
              [styles.isToday]: item.isToday,
              [styles.isSelected]: isSelected(item.date),
              [styles.disabled]:
                disabled ||
                !isDateSelectable(
                  item.date,
                  minSelectableDate,
                  maxSelectableDate,
                ),
              [styles.isEmpty]: !item.isCurrentMonth,
            })}
            onMouseDown={() => onMouseDown(item.date)}
            onMouseEnter={() => onMouseEnter(item.date)}
            onMouseUp={onMouseUp}
            onClick={() => onClick(item.date)}
          >
            {item.isCurrentMonth ? item.day : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraggableSelectDate;`;

export const dateRangeCalendarTextCode = `export interface CalendarDay {
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
`;

export const indexScssTextCode = `.draggableSelectDate {
  width: 100%;
  user-select: none;

  .weekdays,
  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    align-items: center;
  }

  .weekdays {
    color: #909399;
    font-size: 14px;
    text-align: center;
    margin-bottom: 6px;
  }

  .grid {
    position: relative;

    .overlay {
      position: absolute;
      background: #1677ff;
      color: #ffffff;
      border-radius: 8px;
      pointer-events: none;
      transition:
        left 0.15s ease,
        top 0.15s ease,
        width 0.15s ease,
        height 0.15s ease;
      z-index: 0;
    }

    .dayBox {
      position: relative;
      z-index: 1;
      border: 0;
      background: transparent;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      font-size: 14px;
      transition:
        background-color 0.15s ease,
        color 0.15s ease;
    }
    .dayBox:hover {
      background: #1677ff80;
    }
    .dayBox.isSelected {
      background: #1677ff;
      color: #ffffff;
    }
    .dayBox.isEmpty {
      pointer-events: none;
    }
    .dayBox.disabled {
      cursor: not-allowed;
      color: #909399;
    }
    .dayBox.isToday {
      font-weight: bold;
    }
  }
}
`;
