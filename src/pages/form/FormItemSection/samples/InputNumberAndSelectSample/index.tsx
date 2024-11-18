import React from "react";
import SampleBox from "@/components/SampleBox";
import { fileCodeList } from "@/components/formItems/InputNumberAndSelect";
import Content from "./Content";
import styles from "./index.module.scss";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList
);

const InputNumberAndSelectSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='左边数值输入框右边下拉框的复合组件'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default InputNumberAndSelectSample;
