export const indexTextCode = `/**
 * 点击label可聚焦控件的FormItem组件(前提是控件的ref对象中要有focus方法)
 */
import React, { useRef, ReactElement } from "react";
import { Form, FormItemProps } from "antd";

const FocusableFormItem = (props: FormItemProps) => {
  const { label = "", children, ...restProps } = props;
  const componentRef = useRef<any>(null);

  const onLabelClick = () => {
    componentRef.current?.focus?.();
  };

  return (
    <Form.Item
      {...restProps}
      label={<span onClick={onLabelClick}>{label}</span>}
    >
      {children
        ? React.cloneElement(children as ReactElement<any>, {
            ...restProps,
            ref: componentRef,
          })
        : null}
    </Form.Item>
  );
};

export default FocusableFormItem;`;
