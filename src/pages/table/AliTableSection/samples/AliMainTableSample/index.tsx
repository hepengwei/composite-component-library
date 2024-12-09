import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import styles from "./index.module.scss";
import { fileCodeList } from "@/components/AliTable/AliMainTable";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList
);

const AliMainTableSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='基于ali-react-table封装的表格组件'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default AliMainTableSample;
