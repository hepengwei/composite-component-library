/**
 * FormItem部分 菜单页
 */
import React from "react";
import DatePickerAndCheckboxSample from "./samples/DatePickerAndCheckboxSample";
import RangePickerAndCheckboxSample from "./samples/RangePickerAndCheckboxSample";
import CustomRangePickerSample from "./samples/CustomRangePickerSample";
import InputAndCheckboxSample from "./samples/InputAndCheckboxSample";
import InputNumberAndSelectSample from "./samples/InputNumberAndSelectSample";
import RadioGroupAndSelectSample from "./samples/RadioGroupAndSelectSample";
import CanAddMultipleSample from "./samples/CanAddMultipleSample";
import CustomMultiSelectSample from "./samples/CustomMultiSelectSample";
import SelectBoxSample from "./samples/SelectBoxSample/index";
import WithValidateMessageSample from "./samples/WithValidateMessageSample";
import MoneyInputSample from "./samples/MoneyInputSample";
import styles from "./index.module.scss";

const sampleList = [
  <DatePickerAndCheckboxSample />,
  <RangePickerAndCheckboxSample />,
  <CustomRangePickerSample />,
  <InputAndCheckboxSample />,
  <InputNumberAndSelectSample />,
  <RadioGroupAndSelectSample />,
  <CanAddMultipleSample />,
  <CustomMultiSelectSample />,
  <SelectBoxSample />,
  <WithValidateMessageSample />,
  <MoneyInputSample />,
];

const FormItemSection = () => {
  return (
    <div className={styles.container}>
      {sampleList.map((component, index) => (
        <div className={styles.sample} key={index}>
          {component}
        </div>
      ))}
    </div>
  );
};

export default FormItemSection;
