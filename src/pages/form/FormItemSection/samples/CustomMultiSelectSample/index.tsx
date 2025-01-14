import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import styles from "./index.module.scss";
import { fileCodeList as fileCodeList1 } from "./TablePanelMultiSelect";
import { fileCodeList as fileCodeList2 } from "@/components/formItems/CustomMultiSelect";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList1,
  fileCodeList2
);

const CustomMultiSelectSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='可自定义的多选下拉框组件'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default CustomMultiSelectSample;
