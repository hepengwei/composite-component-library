import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import styles from "./index.module.scss";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }];

const SortableTableSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='支持排序表格'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default SortableTableSample;
