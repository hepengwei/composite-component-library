/**
 * 左边数值输入框右边下拉框的复合组件
 */
import React, {
  useMemo,
  useImperativeHandle,
  useRef,
  forwardRef,
  Ref,
} from "react";
import { InputNumber, Select } from "antd";
import useFormDisabled from "hooks/useFormDisabled";
import styles from "./index.module.scss";
import { indexTextCode, indexScssTextCode } from "./code";

export type Value = [number | string | null | undefined, string | undefined];
type Status = "warning" | "error" | "" | undefined;

type InputNumberAndSelectProps = {
  value?: Value;
  options: Record<string, any>;
  disabled?: boolean;
  inputNumberProps?: Record<string, any>; // 传递给数值输入框的属性值
  selectProps?: Record<string, any>; // 传递给下拉框的属性值
  onChange?: (value: Value, option?: Record<string, any>) => void; // 如果修改下拉框则onChange的第二个参数会返回option
  "aria-invalid"?: string; // Form校验时会自动传入"true"
  setInputNumberStatus?: (value: Value | undefined) => Status; // 当form校验时，设置数值输入框的status属性值。当使用该属性时，要给外层的Form.Item设置validateStatus为''
  setSelectStatus?: (value: Value | undefined) => Status; // 当form校验时，设置下拉框的status属性值。当使用该属性时，要给外层的Form.Item设置validateStatus为''
  style?: Record<string, any>;
};

const InputNumberAndSelect = forwardRef(
  (props: InputNumberAndSelectProps, ref: Ref<{ focus: () => void }>) => {
    const {
      value,
      options = [],
      disabled: selfDisabled,
      inputNumberProps = {},
      selectProps = {},
      onChange,
      ["aria-invalid"]: invalid,
      setInputNumberStatus,
      setSelectStatus,
      style = {},
    } = props;
    const disabled = useFormDisabled(selfDisabled);
    const focusRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        focusRef.current?.focus();
      },
    }));

    const onInputNumberChange = (v: number | string | null) => {
      const newValue: Value =
        value && value.length >= 2 ? [v, value[1]] : [v, undefined];
      onChange?.(newValue);
    };

    const onSelectChange = (v: string, option: Record<string, any>) => {
      const newValue: Value =
        value && value.length >= 1 ? [value[0], v] : [undefined, v];
      onChange?.(newValue, option);
    };

    const inputNumberStatus = useMemo(() => {
      if (setInputNumberStatus && invalid === "true") {
        return setInputNumberStatus(value);
      }
      return undefined;
    }, [invalid, value]);

    const selectStatus = useMemo(() => {
      if (setSelectStatus && invalid === "true") {
        return setSelectStatus(value);
      }
      return undefined;
    }, [invalid, value]);

    return (
      <div className={styles.container} style={style}>
        <InputNumber
          className={styles.inputNumber}
          value={value && value.length >= 1 ? value[0] : undefined}
          disabled={disabled}
          status={inputNumberStatus}
          {...inputNumberProps}
          onChange={onInputNumberChange}
          ref={focusRef}
        />
        <Select
          className={styles.select}
          value={value && value.length >= 2 ? value[1] : undefined}
          options={options as any[]}
          disabled={disabled}
          status={selectStatus}
          {...selectProps}
          onChange={onSelectChange}
        />
      </div>
    );
  }
);

export default InputNumberAndSelect;

export const fileCodeList = [
  { fileName: "InputNumberAndSelect.tsx", code: indexTextCode },
  {
    fileName: "InputNumberAndSelect.module.scss",
    code: indexScssTextCode,
  },
];
