/**
 * 左边日期选择框右边复选框的复合组件
 */
import React, { useMemo } from "react";
import { DatePicker, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Dayjs } from "dayjs";
import classnams from "classnames";
import useFormDisabled from "hooks/useFormDisabled";
import styles from "./index.module.scss";
import { indexTextCode, indexScssTextCode } from "./code";

type Value = [Dayjs | null | undefined, boolean | undefined];
type Status = "warning" | "error" | "" | undefined;

type DatePickerAndCheckboxProps = {
  value?: Value;
  checkboxLabel?: string;
  disabled?: boolean;
  datePickerProps?: Record<string, any>; // 传递给日期选择框的属性值
  checkboxProps?: Record<string, any>; // 传递给复选框的属性值
  onChange?: (value: Value) => void;
  "aria-invalid"?: string; // Form校验时会自动传入"true"
  setDatePickerStatus?: (value: Value | undefined) => Status; // 当form校验时，设置日期选择框的status属性值。当使用该属性时，要给外层的Form.Item设置validateStatus为''
  style?: Record<string, any>;
};

const DatePickerAndCheckbox = (props: DatePickerAndCheckboxProps) => {
  const {
    value,
    checkboxLabel = null,
    disabled: selfDisabled,
    datePickerProps = {},
    checkboxProps = {},
    onChange,
    ["aria-invalid"]: invalid,
    setDatePickerStatus,
    style = {},
  } = props;
  const disabled = useFormDisabled(selfDisabled);

  const onDatePickerChange = (date: Dayjs | null) => {
    const newValue: Value =
      value && value.length >= 2
        ? [date || undefined, value[1]]
        : [date || undefined, undefined];
    onChange?.(newValue);
  };

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    const checked = e?.target?.checked || false;
    const newValue: Value =
      value && value.length >= 1 ? [value[0], checked] : [undefined, checked];
    onChange?.(newValue);
  };

  const datePickerStatus = useMemo(() => {
    if (setDatePickerStatus && invalid === "true") {
      return setDatePickerStatus(value);
    }
    return undefined;
  }, [invalid, value]);

  return (
    <div className={styles.container} style={style}>
      <DatePicker
        value={value && value.length >= 1 ? value[0] : undefined}
        disabled={disabled}
        status={datePickerStatus}
        {...datePickerProps}
        onChange={onDatePickerChange}
      />
      <Checkbox
        className={classnams({
          [styles.checkbox]: true,
          [styles.noLabel]: !checkboxLabel,
        })}
        checked={value && value.length >= 2 ? value[1] : undefined}
        disabled={disabled}
        {...checkboxProps}
        onChange={onCheckboxChange}
      >
        {checkboxLabel}
      </Checkbox>
    </div>
  );
};

export default DatePickerAndCheckbox;

export const fileCodeList = [
  { fileName: "DatePickerAndCheckbox.tsx", code: indexTextCode },
  {
    fileName: "DatePickerAndCheckbox.module.scss",
    code: indexScssTextCode,
  },
];
