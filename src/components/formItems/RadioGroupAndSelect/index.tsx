/**
 * 左边单选框右边下拉框的复合组件
 */
import React, { useMemo } from "react";
import { Radio, Select } from "antd";
import type { RadioChangeEvent } from "antd";
import useFormDisabled from "hooks/useFormDisabled";
import styles from "./index.module.scss";
import { indexTextCode, indexScssTextCode } from "./code";

export type Value = [number | string | undefined, string | undefined];
type Status = "warning" | "error" | "" | undefined;

type RadioGroupAndSelectProps = {
  value?: Value;
  selectOptions: Record<string, any>;
  radioGroupOptions?: Record<string, any>;
  disabled?: boolean;
  radioGroupProps?: Record<string, any>; // 传递给单选框的属性值
  selectProps?: Record<string, any>; // 传递给下拉框的属性值
  onChange?: (value: Value, option?: Record<string, any>) => void; // 如果修改下拉框则onChange的第二个参数会返回option
  "aria-invalid"?: string; // Form校验时会自动传入"true"
  setSelectStatus?: (value: Value | undefined) => Status; // 当form校验时，设置下拉框的status属性值。当使用该属性时，要给外层的Form.Item设置validateStatus为''
  whenShowSelect?: number | string; // 何时显示右边的下拉框，默认当左边单选框的值为0时
  reserveSelectValue?: boolean; // 当下拉框不显示时，是否要保留下拉框中的值，默认为false
  style?: Record<string, any>;
};

const DEFAULT_RADIO_GROUP_OPTIONS = [
  { label: "是", value: 1 },
  { label: "否", value: 0 },
];

const RadioGroupAndSelect = (props: RadioGroupAndSelectProps) => {
  const {
    value,
    selectOptions = [],
    radioGroupOptions = DEFAULT_RADIO_GROUP_OPTIONS,
    disabled: selfDisabled,
    radioGroupProps = {},
    selectProps = {},
    onChange,
    ["aria-invalid"]: invalid,
    setSelectStatus,
    whenShowSelect = 0,
    reserveSelectValue = false,
    style = {},
  } = props;
  const disabled = useFormDisabled(selfDisabled);

  const onRadioGroupChange = (e: RadioChangeEvent) => {
    const v = e.target?.value;
    const newValue: Value =
      value && value.length >= 2
        ? [v, reserveSelectValue || v === whenShowSelect ? value[1] : undefined]
        : [v, undefined];
    onChange?.(newValue);
  };

  const onSelectChange = (v: string, option: Record<string, any>) => {
    const newValue: Value =
      value && value.length >= 1 ? [value[0], v] : [undefined, v];
    onChange?.(newValue, option);
  };

  const selectStatus = useMemo(() => {
    if (setSelectStatus && invalid === "true") {
      return setSelectStatus(value);
    }
    return undefined;
  }, [invalid, value]);

  return (
    <div className={styles.container} style={style}>
      <Radio.Group
        className={styles.radioGroup}
        value={value && value.length >= 1 ? value[0] : undefined}
        options={radioGroupOptions as any[]}
        disabled={disabled}
        {...radioGroupProps}
        onChange={onRadioGroupChange}
      />
      <div className={styles.selectBox}>
        {value?.[0] === whenShowSelect && (
          <Select
            className={styles.select}
            value={value && value.length >= 2 ? value[1] : undefined}
            options={selectOptions as any[]}
            disabled={disabled}
            status={selectStatus}
            {...selectProps}
            onChange={onSelectChange}
          />
        )}
      </div>
    </div>
  );
};

export default RadioGroupAndSelect;

export const fileCodeList = [
  { fileName: "RadioGroupAndSelect.tsx", code: indexTextCode },
  {
    fileName: "RadioGroupAndSelect.module.scss",
    code: indexScssTextCode,
  },
];
