/**
 * Ali表格 部分 菜单页
 */
import React from "react";
import AliMainTableSample from "./samples/AliMainTableSample";
import styles from "./index.module.scss";

const sampleList = [<AliMainTableSample />];

const TableSection = () => {
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

export default TableSection;
