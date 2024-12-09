/**
 * 左边日期范围选择框右边复选框的复合组件
 */
import React, { useMemo } from "react";
import { DatePicker, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Dayjs } from "dayjs";
import classnams from "classnames";
import useFormDisabled from "hooks/useFormDisabled";
import styles from "./index.module.scss";
import { indexTextCode, indexScssTextCode } from "./code";

const { RangePicker } = DatePicker;

type Value = [
  Dayjs | null | undefined,
  Dayjs | null | undefined,
  boolean | undefined
];
type Status = "warning" | "error" | "" | undefined;

type RangePickerAndCheckboxProps = {
  value?: Value;
  checkboxLabel?: string;
  disabled?: boolean;
  rangePickerProps?: Record<string, any>; // 传递给日期范围选择框的属性值
  checkboxProps?: Record<string, any>; // 传递给复选框的属性值
  onChange?: (value: Value) => void;
  "aria-invalid"?: string; // Form校验时会自动传入"true"
  setRangePickerStatus?: (value: Value | undefined) => Status; // 当form校验时，设置日期范围选择框的status属性值。当使用该属性时，要给外层的Form.Item设置validateStatus为''
  style?: Record<string, any>;
};

const RangePickerAndCheckbox = (props: RangePickerAndCheckboxProps) => {
  const {
    value,
    checkboxLabel = "",
    disabled: selfDisabled,
    rangePickerProps = {},
    checkboxProps = {},
    onChange,
    ["aria-invalid"]: invalid,
    setRangePickerStatus,
    style = {},
  } = props;
  const disabled = useFormDisabled(selfDisabled);

  const onRangePickerChange = (dates: [Dayjs, Dayjs] | null) => {
    let newValue: Value =
      value && value.length >= 3
        ? [undefined, undefined, value[2]]
        : [undefined, undefined, undefined];
    if (dates && dates.length >= 2) {
      newValue =
        value && value.length >= 3
          ? [dates[0], dates[1], value[2]]
          : [dates[0], dates[1], undefined];
    }
    onChange?.(newValue);
  };

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    const checked = e?.target?.checked || false;
    const newValue: Value =
      value && value.length >= 2
        ? [value[0], value[1], checked]
        : [undefined, undefined, checked];
    onChange?.(newValue);
  };

  const rangePickerStatus = useMemo(() => {
    if (setRangePickerStatus && invalid === "true") {
      return setRangePickerStatus(value);
    }
    return undefined;
  }, [invalid, value]);

  return (
    <div className={styles.container} style={style}>
      <RangePicker
        value={
          value && value.length >= 2
            ? [value[0], value[1]]
            : [undefined, undefined]
        }
        disabled={disabled}
        status={rangePickerStatus}
        {...rangePickerProps}
        // @ts-ignore
        onChange={onRangePickerChange}
      />
      <Checkbox
        className={classnams({
          [styles.checkbox]: true,
          [styles.noLabel]: !checkboxLabel,
        })}
        checked={value && value.length >= 3 ? value[2] : false}
        disabled={disabled}
        {...checkboxProps}
        onChange={onCheckboxChange}
      >
        {checkboxLabel}
      </Checkbox>
    </div>
  );
};

export default RangePickerAndCheckbox;

export const fileCodeList = [
  { fileName: "RangePickerAndCheckbox.tsx", code: indexTextCode },
  {
    fileName: "RangePickerAndCheckbox.module.scss",
    code: indexScssTextCode,
  },
];
