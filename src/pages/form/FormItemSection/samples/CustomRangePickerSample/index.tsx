import React from "react";
import SampleBox from "@/components/SampleBox";
import { fileCodeList } from "@/components/formItems/CustomRangePicker";
import Content from "./Content";
import { contentTextCode } from "./code";
import styles from "./index.module.scss";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList
);

const CustomRangePickerSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='自定义日期范围选择复合组件'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default CustomRangePickerSample;
