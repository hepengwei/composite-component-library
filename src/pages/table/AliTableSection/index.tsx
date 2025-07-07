/**
 * Ali表格 部分 菜单页
 */
import React from "react";
import AliMainTableSample from "./samples/AliMainTableSample";
import SingleSelectTableSample from "./samples/SingleSelectTableSample";
import MultiSelectTableSample from "./samples/MultiSelectTableSample";
import SortableTableSample from "./samples/SortableTableSample";
import WithFooterTableSample from "./samples/WithFooterTableSample";
import EchartsTableSample from "./samples/EchartsTableSample";
import styles from "./index.module.scss";

const sampleList = [
  <AliMainTableSample />,
  <SingleSelectTableSample />,
  <MultiSelectTableSample />,
  <SortableTableSample />,
  <WithFooterTableSample />,
  <EchartsTableSample />,
];

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
