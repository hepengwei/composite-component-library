import React from "react";
import SampleBox from "@/components/SampleBox";
// import { fileCodeList } from "@/components/EditableTable";
import Content from "./Content";
import styles from "./index.module.scss";

// const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
//   fileCodeList
// );

const MultiSelectTableSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='多选表格'
      //   codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default MultiSelectTableSample;