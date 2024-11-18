import React from "react";
import SampleBox from "@/components/SampleBox";
import { fileCodeList } from "@/components/formItems/DatePickerAndCheckbox";
import Content from "./Content";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  fileCodeList
);

const DatePickerAndCheckboxSample = () => {
  return (
    <SampleBox
      title='左边日期选择框右边复选框的复合组件'
      codeParams={codeParams}
    >
      <Content />
    </SampleBox>
  );
};

export default DatePickerAndCheckboxSample;
