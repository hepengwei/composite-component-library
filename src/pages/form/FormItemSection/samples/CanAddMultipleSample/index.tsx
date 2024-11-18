import React from "react";
import SampleBox from "@/components/SampleBox";
import { fileCodeList } from "@/components/formItems/CanAddMultiple";
import Content from "./Content";
import styles from "./index.module.scss";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList
);

const CanAddMultipleSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='可增加和删除多条数据的包装组件'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default CanAddMultipleSample;
