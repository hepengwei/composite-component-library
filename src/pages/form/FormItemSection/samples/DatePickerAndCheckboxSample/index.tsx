import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import { fileCodeList as focusableFormItemCodeList } from "@/components/formItems/FocusableFormItem";
import { fileCodeList as datePickerAndCheckboxCodeList } from "@/components/formItems/DatePickerAndCheckbox";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }].concat(
  focusableFormItemCodeList,
  datePickerAndCheckboxCodeList
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
