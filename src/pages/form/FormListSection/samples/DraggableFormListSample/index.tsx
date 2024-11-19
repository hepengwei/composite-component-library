import React from "react";
import SampleBox from "@/components/SampleBox";
import { fileCodeList } from "@/components/formLists/DraggableFormListContext";
import Content from "./Content";
import styles from "./index.module.scss";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList
);

const DraggableFormListSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='可上下拖拽排序的Form.List的包装组件'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default DraggableFormListSample;
