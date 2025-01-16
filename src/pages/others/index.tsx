/**
 * 其他 菜单页
 */
import React from "react";
import BaseModalSample from "./samples/BaseModalSample";
import styles from "./index.module.scss";

const sampleList = [<BaseModalSample />];

const Others = () => {
  return (
    <div className={styles.container}>
      {sampleList.map((component, index) => (
        <div className={styles.sample} key={index}>
          {component}
        </div>
      ))}
    </div>
  );
};

export default Others;
