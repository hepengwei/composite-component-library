import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import { fileCodeList } from "@/components/formItems/TreeSelectBox";
import { contentTextCode, mockCode } from "./code";

const codeParams = [
  { fileName: "index.tsx", code: contentTextCode },
  { fileName: "mock.ts", code: mockCode },
].concat(fileCodeList);

const SelectBoxSample = () => {
  return (
    <SampleBox title="下拉选择框的复合组件" codeParams={codeParams}>
      <Content />
    </SampleBox>
  );
};

export default SelectBoxSample;
