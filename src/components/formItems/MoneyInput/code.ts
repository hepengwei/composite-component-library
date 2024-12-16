export const indexTextCode = `/**
 * 金额输入框组件，入参和出参都为字符串类型（支持输入例如9999999999999.999、999999999999.99999等数值）
 */
import React from "react";
import { Input } from "antd";
import type { InputProps } from "antd/lib";
import BigNumber from "bignumber.js";
import classnams from "classnames";
import styles from "./index.module.scss";

const NUMBER_REG = /^[-]?(\d+(\.)?(\d+)?)?$/;

type MoneyInputProps = {
  value?: string | undefined;
  precision?: number; // 可输入的数值精度
  min?: number | string; // 可输入的数值最小值
  max?: number | string; // 可输入的数值最大值
  onChange?: (value: string | undefined) => void;
  onBlur?: (newValue: string | undefined) => void;
  className?: string;
} & InputProps;

const MoneyInput = (props: MoneyInputProps) => {
  const {
    value,
    precision,
    min,
    max,
    onChange,
    onBlur,
    className = "",
    ...restProps
  } = props;

  const onInputChange = (e: any) => {
    const v = e.target?.value;
    if (typeof v === "string") {
      if (v) {
        if (NUMBER_REG.test(v)) {
          if (v.endsWith(".")) {
            if (typeof precision === "number" && precision <= 0) {
              // precision为0时，不能输入小数点
              return;
            }
          } else {
            const valueArr = v.split(".");
            const fractionalValue = valueArr[1]; // 小数部分的数字
            if (v.startsWith("-")) {
              if ((min || min === 0) && new BigNumber(min).gte(0)) {
                // min>=0时，不能输入负号
                if (v === "-") {
                  if (value === undefined) {
                    onChange?.("");
                  }
                } else {
                  if (
                    fractionalValue &&
                    typeof precision === "number" &&
                    precision >= 0 &&
                    fractionalValue.length > precision
                  ) {
                    // 将小数部分多出的precision限制的部分直接去掉
                    const newValue = new BigNumber(
                      \`\${valueArr[0].substring(1)}\${
                        precision > 0
                          ? \`.\${fractionalValue.substring(0, precision)}\`
                          : ""
                      }\`
                    );
                    onChange?.(newValue.toString());
                  } else {
                    onChange?.(new BigNumber(v).absoluteValue().toString());
                  }
                }
                return;
              }
            } else {
              if (
                fractionalValue &&
                typeof precision === "number" &&
                precision >= 0 &&
                fractionalValue.length > precision
              ) {
                // 将小数部分多出的precision限制的部分直接去掉
                const newValue = new BigNumber(
                  \`\${valueArr[0]}\${
                    precision > 0
                      ? \`.\${fractionalValue.substring(0, precision)}\`
                      : ""
                  }\`
                );
                onChange?.(newValue.toString());
                return;
              }
            }
          }
          onChange?.(v);
        } else {
          if (value === undefined) {
            onChange?.("");
          }
        }
      } else {
        onChange?.("");
      }
    } else {
      onChange?.(undefined);
    }
  };

  const onInputBlur = () => {
    if (value) {
      if (value === "-" || !NUMBER_REG.test(value)) {
        onChange?.("");
        onBlur?.("");
        return;
      }

      let newValueStr: string = value;

      if (value.endsWith(".")) {
        // 去掉最后的小数点
        newValueStr = value.substring(0, value.length - 1);
      }

      const newValue = new BigNumber(newValueStr);
      if (min || min === 0) {
        const minValue = new BigNumber(min);
        if (newValue.lt(minValue)) {
          newValueStr = minValue.toString();
        }
      }

      if (max || max === 0) {
        const maxValue = new BigNumber(max);
        if (newValue.gt(maxValue)) {
          newValueStr = maxValue.toString();
        }
      }

      const valueArr = newValueStr.split(".");
      const fractionalValue = valueArr[1]; // 小数部分的数字
      if (
        fractionalValue &&
        typeof precision === "number" &&
        precision >= 0 &&
        fractionalValue.length > precision
      ) {
        // 将小数部分多出的precision限制的部分直接去掉
        const newValue2 = new BigNumber(
          \`\${valueArr[0]}\${
            precision > 0 ? \`.\${fractionalValue.substring(0, precision)}\` : ""
          }\`
        );
        newValueStr = newValue2.toString();
      }

      if ((min || min === 0) && new BigNumber(min).gte(0)) {
        // 如果min>=0，则去掉负号
        const newValue2 = new BigNumber(newValueStr);
        newValueStr = newValue2.absoluteValue().toString();
      }

      if (value !== newValueStr) {
        onChange?.(newValueStr);
      }
      onBlur?.(newValueStr);
    }
  };

  return (
    <Input
      {...restProps}
      className={classnams({
        [styles.moneyInput]: true,
        [className]: !!className,
      })}
      value={value}
      onChange={onInputChange}
      onBlur={onInputBlur}
    />
  );
};

export default MoneyInput;`;
