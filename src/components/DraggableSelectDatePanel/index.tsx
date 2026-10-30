/**
 * 可进行拖拽的日期选择面板组件
 */
import React, { useMemo, useState } from "react";
import { Button, DatePicker } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import DraggableSelectDate from "../DraggableSelectDate";
import { type DateRange } from "../DraggableSelectDate/dateRangeCalendar";
import styles from "./index.module.scss";
import { indexTextCode, indexScssTextCode } from "./code";

const DraggableSelectDatePanel = () => {
  const [month, setMonth] = useState<Dayjs | null>(dayjs());
  const [dateRangeValue, setDateRangeValue] = useState<DateRange | null>(null);

  const onMonthChange = (date: Dayjs | null) => {
    setMonth(date);
    onClear();
  };

  const onChange = (range: DateRange) => {
    setDateRangeValue(range);
  };

  const onClear = () => {
    setDateRangeValue({ start: null, end: null });
  };

  const selectedDays = useMemo(() => {
    if (dateRangeValue?.dates) return dateRangeValue.dates.length;
    if (!dateRangeValue?.start || !dateRangeValue?.end) return 0;
    const start = new Date(`${dateRangeValue.start}T00:00:00Z`).getTime();
    const end = new Date(`${dateRangeValue.end}T00:00:00Z`).getTime();
    return Math.floor((end - start) / 86400000) + 1;
  }, [dateRangeValue]);

  /** 将选中日期列表合并为连续区间文案，如 "1~5日、8日、12~15日" */
  const selectedDatesLabel = useMemo(() => {
    const { start, end, dates } = dateRangeValue || {};
    if (dates && dates?.length > 0) {
      const days = [...new Set(dates.map((d) => Number(d.split("-")[2])))].sort(
        (a, b) => a - b,
      );
      const parts: string[] = [];
      let i = 0;
      while (i < days.length) {
        let j = i;
        while (j + 1 < days.length && days[j + 1] === days[j] + 1) j++;
        parts.push(j > i ? `${days[i]}~${days[j]}日` : `${days[i]}日`);
        i = j + 1;
      }
      return parts.join("、");
    } else if (start && end) {
      if (start === end) {
        return `${Number(dayjs(start).format("DD"))}日`;
      }
      return `${Number(dayjs(start).format("DD"))}日~${Number(dayjs(end).format("DD"))}日`;
    }
    return "—";
  }, [dateRangeValue]);

  return (
    <div className={styles.draggableSelectDatePanel}>
      <div className={styles.calendarTitle}>
        <DatePicker
          picker="month"
          value={month}
          allowClear={false}
          onChange={onMonthChange}
        />
        <span>
          已选
          <span
            style={{ color: "#1677ff", padding: "0 4px", fontWeight: "bold" }}
          >
            {selectedDays}
          </span>
          天
          <span style={{ color: "#909399" }}>
            （点击添加/移除，拖动可批量操作）
          </span>
        </span>
      </div>
      <DraggableSelectDate
        month={month ? month.format("YYYY-MM-DD") : ""}
        dateRangeValue={dateRangeValue}
        onChange={onChange}
      />
      <div className={styles.selectedSummary}>
        <span>选中日期：{selectedDatesLabel}</span>
      </div>
      <Button className={styles.clearBtn} onClick={onClear}>
        清空
      </Button>
    </div>
  );
};

export default DraggableSelectDatePanel;

export const fileCodeList = [
  { fileName: "DraggableSelectDatePanel.tsx", code: indexTextCode },
  {
    fileName: "DraggableSelectDatePanel.module.scss",
    code: indexScssTextCode,
  },
];
