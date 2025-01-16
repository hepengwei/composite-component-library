import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import { fileCodeList } from "@/components/BaseModal";
import { contentTextCode, modal1TextCode, modal2TextCode } from "./code";

const codeParams = [
  { fileName: "index.tsx", code: contentTextCode },
  { fileName: "Modal1.tsx", code: modal1TextCode },
  { fileName: "Modal2.tsx", code: modal2TextCode },
].concat(fileCodeList);

const BaseModalSample = () => {
  return (
    <SampleBox title='可进行拖拽的公共弹框组件' codeParams={codeParams}>
      <Content />
    </SampleBox>
  );
};

export default BaseModalSample;
