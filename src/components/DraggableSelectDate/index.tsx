/**
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
import {
  indexTextCode,
  dateRangeCalendarTextCode,
  indexScssTextCode,
} from "./code";

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

export default DraggableSelectDate;

export const fileCodeList = [
  { fileName: "DraggableSelectDatePanel.tsx", code: indexTextCode },
  { fileName: "dateRangeCalendar.ts", code: dateRangeCalendarTextCode },
  {
    fileName: "DraggableSelectDatePanel.module.scss",
    code: indexScssTextCode,
  },
];
