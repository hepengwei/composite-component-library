import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import { fileCodeList } from "@/components/formItems/MoneyInput";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList
);

const MoneyInputSample = () => {
  return (
    <SampleBox
      title='金额输入框组件，入参和出参都为字符串类型（支持输入例如9999999999999.999、999999999999.99999等数值）'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default MoneyInputSample;
