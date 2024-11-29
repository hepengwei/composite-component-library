import React from "react";
import SampleBox from "@/components/SampleBox";
// import { fileCodeList } from "@/components/EditableTable";
import Content from "./Content";
import styles from "./index.module.scss";

// const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
//   fileCodeList
// );

const EditableTableSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='基于ali-react-table封装的表格组件'
      //   codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default EditableTableSample;
