import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import styles from "./index.module.scss";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }];

const WithFooterTableSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='添加底部汇总行的表格'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default WithFooterTableSample;
