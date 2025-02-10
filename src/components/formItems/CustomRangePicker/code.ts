export const indexTextCode = `/**
 * 自定义日期范围选择复合组件
 */
import React, {
  ReactNode,
  useMemo,
  useImperativeHandle,
  useRef,
  forwardRef,
  Ref,
} from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import useFormDisabled from "hooks/useFormDisabled";
import styles from "./index.module.scss";

type Value = [Dayjs | null | undefined, Dayjs | null | undefined];
type Status = "warning" | "error" | "" | undefined;

type CustomRangePickerProps = {
  value?: Value;
  placeholder?: [string, string];
  customCenter?: ReactNode;
  disabled?: boolean;
  datePickerProps?: Record<string, any>;
  onChange?: (value: Value) => void;
  "aria-invalid"?: string; // Form校验时会自动传入"true"
  setDatePickerStatus?: (value: Value | undefined) => [Status, Status]; // 当form校验时，设置日期选择框的status属性值。当使用该属性时，要给外层的Form.Item设置validateStatus为''
  style?: Record<string, any>;
};

const CustomRangePicker = forwardRef(
  (props: CustomRangePickerProps, ref: Ref<{ focus: () => void }>) => {
    const {
      value,
      placeholder,
      customCenter = "~",
      disabled: selfDisabled,
      datePickerProps = {},
      onChange,
      ["aria-invalid"]: invalid,
      setDatePickerStatus,
      style = {},
    } = props;
    const disabled = useFormDisabled(selfDisabled);
    const focusRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        focusRef.current?.focus();
      },
    }));

    const onStartDateChange = (date: Dayjs | null) => {
      let newValue: Value =
        value && value.length >= 2
          ? [undefined, value[1]]
          : [undefined, undefined];
      if (date) {
        newValue =
          value && value.length >= 2 ? [date, value[1]] : [date, undefined];
      }
      onChange?.(newValue);
    };

    const onEndDateChange = (date: Dayjs | null) => {
      let newValue: Value =
        value && value.length >= 1
          ? [value[0], undefined]
          : [undefined, undefined];
      if (date) {
        newValue =
          value && value.length >= 1 ? [value[0], date] : [undefined, date];
      }
      onChange?.(newValue);
    };

    const startDisabledDate = (currentDate: Dayjs) => {
      if (datePickerProps?.disabledDate) {
        return datePickerProps.disabledDate(currentDate, "start");
      }
      if (value && value.length >= 2 && value[1]) {
        const currentFormatDate = currentDate.format("YYYY-MM-DD");
        const endFormatDate = value[1].format("YYYY-MM-DD");
        if (currentFormatDate === endFormatDate) {
          return false;
        }
        if (currentDate > value[1]) return true;
      }
      return false;
    };

    const endDisabledDate = (currentDate: Dayjs) => {
      if (datePickerProps?.disabledDate) {
        return datePickerProps.disabledDate(currentDate, "end");
      }
      if (value && value.length >= 1 && value[0]) {
        const currentFormatDate = currentDate.format("YYYY-MM-DD");
        const startFormatDate = value[0].format("YYYY-MM-DD");
        if (currentFormatDate === startFormatDate) {
          return false;
        }
        if (currentDate < value[0]) return true;
      }
      return false;
    };

    const startDisabledTime = (selectedDate: Dayjs) => {
      if (datePickerProps?.disabledTime) {
        return datePickerProps.disabledTime(selectedDate, "start");
      }
      if (value && value.length >= 2 && value[1]) {
        if (
          dayjs(selectedDate.format("YYYY-MM-DD")) >=
          dayjs(value[1].format("YYYY-MM-DD"))
        ) {
          const [hourStr, minuteStr, secondStr] = value[1]
            .format("HH:mm:ss")
            .split(":");
          const hour = Number(hourStr);
          const minute = Number(minuteStr);
          const second = Number(secondStr);
          return {
            disabledHours: () => {
              const disabledHours: number[] = [];
              for (let i = hour + 1; i < 24; i++) {
                disabledHours.push(i);
              }
              return disabledHours;
            },
            disabledMinutes: (selectedHour: number) => {
              const disabledMinutes: number[] = [];
              if (selectedHour >= hour) {
                for (let i = minute + 1; i < 60; i++) {
                  disabledMinutes.push(i);
                }
              }
              return disabledMinutes;
            },
            disabledSeconds: (selectedHour: number, selectedMinute: number) => {
              const disabledSeconds: number[] = [];
              if (selectedHour >= hour && selectedMinute >= minute) {
                for (let i = second + 1; i < 60; i++) {
                  disabledSeconds.push(i);
                }
              }
              return disabledSeconds;
            },
          };
        }
      }
      return {};
    };

    const endDisabledTime = (selectedDate: Dayjs) => {
      if (datePickerProps?.disabledTime) {
        return datePickerProps.disabledTime(selectedDate, "end");
      }
      if (value && value.length >= 1 && value[0]) {
        if (
          dayjs(selectedDate.format("YYYY-MM-DD")) <=
          dayjs(value[0].format("YYYY-MM-DD"))
        ) {
          const [hourStr, minuteStr, secondStr] = value[0]
            .format("HH:mm:ss")
            .split(":");
          const hour = Number(hourStr);
          const minute = Number(minuteStr);
          const second = Number(secondStr);
          return {
            disabledHours: () => {
              const disabledHours: number[] = [];
              for (let i = 0; i < hour; i++) {
                disabledHours.push(i);
              }
              return disabledHours;
            },
            disabledMinutes: (selectedHour: number) => {
              const disabledMinutes: number[] = [];
              if (selectedHour <= hour) {
                for (let i = 0; i < minute; i++) {
                  disabledMinutes.push(i);
                }
              }
              return disabledMinutes;
            },
            disabledSeconds: (selectedHour: number, selectedMinute: number) => {
              const disabledSeconds: number[] = [];
              if (selectedHour <= hour && selectedMinute <= minute) {
                for (let i = 0; i < second; i++) {
                  disabledSeconds.push(i);
                }
              }
              return disabledSeconds;
            },
          };
        }
      }
      return {};
    };

    const datePickerStatus = useMemo(() => {
      if (setDatePickerStatus && invalid === "true") {
        return setDatePickerStatus(value);
      }
      return [undefined, undefined];
    }, [invalid, value]);

    const finalPlaceholder = useMemo(() => {
      const startPlaceholder = placeholder?.[0] ? placeholder[0] : "开始日期";
      const endPlaceholder = placeholder?.[1] ? placeholder[1] : "结束日期";
      return [startPlaceholder, endPlaceholder];
    }, [placeholder]);

    return (
      <div className={styles.container} style={style}>
        <DatePicker
          className={styles.datePicker}
          value={value && value.length >= 1 ? value[0] : undefined}
          placeholder={finalPlaceholder[0]}
          disabledDate={startDisabledDate}
          disabledTime={
            datePickerProps?.showTime ? startDisabledTime : undefined
          }
          disabled={disabled}
          status={datePickerStatus[0]}
          onChange={onStartDateChange}
          {...datePickerProps}
          ref={focusRef}
        />
        <div className={styles.center}>{customCenter}</div>
        <DatePicker
          className={styles.datePicker}
          value={value && value.length >= 2 ? value[1] : undefined}
          placeholder={finalPlaceholder[1]}
          disabledDate={endDisabledDate}
          disabledTime={datePickerProps?.showTime ? endDisabledTime : undefined}
          disabled={disabled}
          status={datePickerStatus[1]}
          onChange={onEndDateChange}
          {...datePickerProps}
        />
      </div>
    );
  }
);

export default CustomRangePicker;`;

export const indexScssTextCode = `.container {
  width: 100%;
  display: flex;
  align-items: center;
  .datePicker {
    display: flex;
    flex: 1;
  }
  .center {
    padding: 0 8px;
  }
}`;
