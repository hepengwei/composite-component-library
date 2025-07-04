import React from "react";
import styles from "./index.module.scss";

interface TitleProps {
  title: React.ReactNode;
  tooltip?: React.ReactNode;
  right?: React.ReactNode;
  style?: React.CSSProperties;
}

const Title: React.FC<TitleProps> = ({
  title,
  tooltip,
  right = null,
  style = {},
}) => {
  return (
    <div className={styles.tj_title} style={style}>
      <div className={styles.flex}>
        <div>{title}</div>
      </div>
      {!!right && <div className={styles.flex}>{right}</div>}
    </div>
  );
};

export default Title;
