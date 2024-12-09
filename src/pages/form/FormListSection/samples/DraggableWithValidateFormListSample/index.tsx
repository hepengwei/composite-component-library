import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import styles from "./index.module.scss";
import { fileCodeList as fileCodeList1 } from "@/components/formLists/DraggableFormListContext";
import { fileCodeList as fileCodeList2 } from "@/components/formItems/WithValidateMessage";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList1,
  fileCodeList2
);

const DraggableWithValidateFormListSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='可上下拖拽排序且显示自定义校验信息的Form.List'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default DraggableWithValidateFormListSample;
