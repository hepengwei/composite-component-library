import React from "react";
import SampleBox from "@/components/SampleBox";
import { fileCodeList } from "@/components/formItems/WithValidateMessage";
import Content from "./Content";
import { contentTextCode } from "./code";
import styles from "./index.module.scss";

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
