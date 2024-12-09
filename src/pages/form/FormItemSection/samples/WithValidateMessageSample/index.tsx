import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import styles from "./index.module.scss";
import { fileCodeList } from "@/components/formItems/WithValidateMessage";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList
);

const WithValidateMessageSample = () => {
  return (
    <SampleBox
      className={styles.container}
      title='用于显示自定义校验信息的FormItem组件的包装组件'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default WithValidateMessageSample;
