/**
 * 左边输入框右边复选框的复合组件
 */
import React, { useMemo } from "react";
import { Input, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import useFormDisabled from "hooks/useFormDisabled";
import styles from "./index.module.scss";
import { indexTextCode, indexScssTextCode } from "./code";

export type Value = [string | undefined, boolean | undefined];
type Status = "warning" | "error" | "" | undefined;

type InputAndCheckboxProps = {
  value?: Value;
  checkboxLabel?: string;
  disabled?: boolean;
  inputProps?: Record<string, any>; // 传递给输入框的属性值
  checkboxProps?: Record<string, any>; // 传递给复选框的属性值
  onChange?: (value: Value) => void;
  "aria-invalid"?: string; // Form校验时会自动传入"true"
  setInputStatus?: (value: Value | undefined) => Status; // 当form校验时，设置输入框的status属性值。当使用该属性时，要给外层的Form.Item设置validateStatus为''
  style?: Record<string, any>;
};

const InputAndCheckbox = (props: InputAndCheckboxProps) => {
  const {
    value,
    checkboxLabel = null,
    disabled: selfDisabled,
    inputProps = {},
    checkboxProps = {},
    onChange,
    ["aria-invalid"]: invalid,
    setInputStatus,
    style = {},
  } = props;
  const disabled = useFormDisabled(selfDisabled);

  const onInputChange = (e: any) => {
    const v = e?.target?.value;
    const newValue: Value =
      value && value.length >= 2 ? [v, value[1]] : [v, undefined];
    onChange?.(newValue);
  };

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    const checked = e?.target?.checked || false;
    const newValue: Value =
      value && value.length >= 1 ? [value[0], checked] : [undefined, checked];
    onChange?.(newValue);
  };

  const inputStatus = useMemo(() => {
    if (setInputStatus && invalid === "true") {
      return setInputStatus(value);
    }
    return undefined;
  }, [invalid, value]);

  return (
    <div className={styles.container} style={style}>
      <Input
        value={value && value.length >= 1 ? value[0] : undefined}
        disabled={disabled}
        status={inputStatus}
        {...inputProps}
        onChange={onInputChange}
      />
      <Checkbox
        className={`${styles.checkbox}${
          !checkboxLabel ? ` ${styles.noLabel}` : ""
        }`}
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

export default InputAndCheckbox;

export const fileCodeList = [
  { fileName: "InputAndCheckbox.tsx", code: indexTextCode },
  {
    fileName: "InputAndCheckbox.module.scss",
    code: indexScssTextCode,
  },
];
