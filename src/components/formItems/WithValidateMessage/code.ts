export const indexTextCode = `/**
 * 用于显示自定义校验信息的FormItem组件的包装组件(注意：如果子组件需要传onChange属性，则必须由该包装组件进行传递，不能写在子组件里；要在外层组件中将.ant-form-item-explain类样式的display属性覆盖为none)
 */
import React, { useMemo, ReactElement } from "react";
import { Tooltip, type FormInstance } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

type WithValidateMessageProps = {
  form?: FormInstance | null; // form对象，nevervalidate为true时可以不传
  nevervalidate?: boolean; // 是否绝对不会进行校验，该值为true时，组件后面不会有校验信息的图标，也不会占用空间
  id?: string; // Form.Item组件自动传入
  "aria-invalid"?: string; // Form校验时会自动传入"true"
  children?: ReactElement | null; // children必须是支持value和onChange属性的组件
  className?: string;
  style?: Record<string, any>;
} & { [key in string]: any };

const WithValidateMessage = (props: WithValidateMessageProps) => {
  const {
    form,
    nevervalidate = false,
    id = "",
    ["aria-invalid"]: invalid,
    children,
    className,
    style = {},
    ...restProps
  } = props;

  // 获取校验信息
  const errorMessage = useMemo(() => {
    let str = "";
    if (!nevervalidate && form && id && invalid === "true") {
      const namePath = id.split("_");
      let errorList = [];
      // 兼容Form.List
      if (namePath.length >= 3) {
        errorList = form.getFieldError([
          namePath[0],
          Number(namePath[1]),
          namePath[2],
        ]);
      } else {
        errorList = form.getFieldError(namePath[0]);
      }
      str = errorList[0];
    }
    return str;
  }, [form, nevervalidate, id, invalid]);

  return (
    <div
      className={\`\${styles.container}\${className ? \` \${className}\` : ""}\`}
      style={style}
    >
      <div
        className={styles.componentBox}
        style={{ width: nevervalidate ? "100%" : "calc(100% - 28px)" }}
      >
        {children
          ? React.cloneElement(children, {
              ...restProps,
              "aria-invalid": invalid,
              id,
            })
          : null}
      </div>
      {!nevervalidate && !!errorMessage && (
        <div className={styles.messageBox}>
          <Tooltip title={errorMessage}>
            <ExclamationCircleOutlined />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default WithValidateMessage;`;

export const indexScssTextCode = `.container {
  width: 100%;
  display: flex;
  $messageWidth: 26px;
  .componentBox {
    display: flex;
    align-items: center;
  }
  .messageBox {
    width: $messageWidth;
    height: $messageWidth;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3px;
    margin-left: 2px;
    svg {
      width: 18px;
      height: 18px;
      path {
        fill: $globalRedColor;
      }
    }
  }
}`;
