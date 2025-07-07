import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import styles from "./index.module.scss";
import { contentTextCode } from "./code";
import { fileCodeList } from "@/components/EchartsTable/fileCodeList";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList
);

const EchartsTableSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title="图表与表格联动应用"
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default EchartsTableSample;
