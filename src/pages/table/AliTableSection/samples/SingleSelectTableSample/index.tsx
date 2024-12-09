import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import styles from "./index.module.scss";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }];

const SingleSelectTableSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='单选表格'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default SingleSelectTableSample;
