/**
 * 可增加和删除多条数据的包装组件
 */
import React, { useMemo, ReactElement } from 'react';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { message } from 'antd';

type Value = any[];

type CanAddMultipleProps = {
  value?: Value;
  disabled?: boolean;
  hideBtn?: boolean; // 是否隐藏新增和删除按钮
  maxRows?: number; // 最多可显示的行个数, 默认为-1无限制
  children?: ReactElement | null; // children必须是支持value和onChange属性的组件
  onChange?: (value: Value, ...restProps: any[]) => void;
  style?: Record<string, any>;
} & { [key in string]: any };

const CanAddMultiple = (props: CanAddMultipleProps) => {
  const {
    value,
    disabled = false,
    hideBtn = false,
    maxRows = -1,
    children,
    onChange,
    style = {},
    ...restProrps
  } = props;

  const onChildrenChange = (index: number, rowValue: any, restProps: any[]) => {
    if (value && value.length > 0) {
      const newValue: Value = [];
      value.forEach((item: any, i: number) => {
        if (i === index) {
          newValue.push(rowValue);
        } else {
          newValue.push(item);
        }
      });
      onChange?.(newValue, ...restProps);
    } else {
      onChange?.([rowValue], ...restProps);
    }
  };

  const onAdd = () => {
    if (disabled) return;
    let newValue: Value = [undefined, undefined];
    if (value && value.length > 0) {
      if (maxRows > 0 && value.length >= maxRows) {
        message.warning(`最多可添加${maxRows}个`);
        return;
      }
      newValue = [...value, undefined];
    }
    onChange?.(newValue);
  };

  const onDelete = (index: number) => {
    if (disabled) return;
    if (value && value.length > 0) {
      const newValue: Value = value.filter((_: any, i: number) => i !== index);
      onChange?.(newValue);
    }
  };

  const finalValue = useMemo(() => {
    if (value && value.length > 0) {
      return value;
    }
    return [undefined];
  }, [value]);

  return (
    <div className={styles.container} style={style}>
      {finalValue.map((itemValue: any, index: number) => {
        return (
          <div className={styles.row} key={index}>
            {children
              ? React.cloneElement(children, {
                  value: itemValue,
                  disabled,
                  index,
                  onChange: (value: any, ...restProps: any[]) =>
                    onChildrenChange(index, value, restProps),
                  ...restProrps,
                })
              : null}
            {!hideBtn && (
              <>
                {index === 0 && (
                  <div
                    className={`${styles.addBtn}${
                      disabled ? ` ${styles.disabled}` : ''
                    }`}
                    onClick={onAdd}
                  >
                    <PlusCircleOutlined />
                  </div>
                )}
                {index > 0 && (
                  <div
                    className={`${styles.deleteBtn}${
                      disabled ? ` ${styles.disabled}` : ''
                    }`}
                    onClick={() => onDelete(index)}
                  >
                    <MinusCircleOutlined />
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CanAddMultiple;
