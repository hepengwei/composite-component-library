import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import styles from "./index.module.scss";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }];

const MultiSelectTableSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='多选表格'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default MultiSelectTableSample;
