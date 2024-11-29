import React from "react";
import SampleBox from "@/components/SampleBox";
import { fileCodeList } from "@/components/EditableTable";
import Content from "./Content";
import styles from "./index.module.scss";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList
);

const EditableTableSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='可进行编辑的表格组件'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default EditableTableSample;
