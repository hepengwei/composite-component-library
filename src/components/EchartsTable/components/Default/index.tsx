import React from "react";
import cls from "classnames";
import styles from "./index.module.scss";

const MESSAGE_MAP = {
  empty: "暂无数据",
  error: "系统异常",
  lock: "暂无权限",
  emptysm: "暂无数据",
};

/**
 * 缺省图
 * @param type ['empty', 'emptysm', 'error', 'lock']
 */

type DefaultType = "empty" | "error" | "lock" | "emptysm";

interface DefaultProps {
  type?: DefaultType;
  message?: string;
  size?: number;
  theme?: any;
  className?: string;
}

export default (props: DefaultProps) => {
  const {
    type = "empty",
    message = "",
    size = 0,
    theme,
    className = "",
  } = props;

  const msg = message || MESSAGE_MAP[type];
  const isSmall = type.indexOf("sm") > -1;
  const imageStyle = {
    height: size ? size : isSmall ? 100 : 250,
  };

  return (
    <div
      className={cls({
        [styles.tr_default]: true,
        [className]: true,
      })}
    >
      <div
        className={cls({
          [styles.tr_default_img]: true,
          [styles[type]]: true,
        })}
        style={{ ...imageStyle }}
      />
      <div
        className={cls({
          [styles.tr_default_desc]: true,
        })}
      >
        {msg}
      </div>
    </div>
  );
};
