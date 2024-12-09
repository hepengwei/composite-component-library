import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import styles from "./index.module.scss";
import { fileCodeList } from "@/components/formItems/RadioGroupAndSelect";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList
);

const RadioGroupAndSelectSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='左边单选框右边下拉框的复合组件'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default RadioGroupAndSelectSample;
