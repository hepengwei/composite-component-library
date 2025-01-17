import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import { fileCodeList } from "@/components/SearchForm";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList
);

const SearchFormSample = () => {
  return (
    <SampleBox
      title='根据配置数据自动生成的搜索表单组件'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default SearchFormSample;
