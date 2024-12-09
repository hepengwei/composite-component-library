import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import styles from "./index.module.scss";
import { fileCodeList } from "@/components/formItems/RangePickerAndCheckbox";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList
);

const RangePickerAndCheckboxSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='左边日期范围选择框右边复选框的复合组件'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default RangePickerAndCheckboxSample;
