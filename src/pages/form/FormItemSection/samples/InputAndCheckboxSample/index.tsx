import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import styles from "./index.module.scss";
import { fileCodeList } from "@/components/formItems/InputAndCheckbox";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList
);

const InputAndCheckboxSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='左边输入框右边复选框的复合组件'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default InputAndCheckboxSample;
