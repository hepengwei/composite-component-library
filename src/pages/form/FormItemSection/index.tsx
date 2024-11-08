/**
 * FormItem部分 菜单页
 */
import React from 'react';
import DatePickerAndCheckboxSample from './samples/DatePickerAndCheckboxSample';
import RangePickerAndCheckboxSample from './samples/RangePickerAndCheckboxSample';
import InputAndCheckboxSample from './samples/InputAndCheckboxSample';
import InputNumberAndSelectSample from './samples/InputNumberAndSelectSample';
import CanAddMultipleSample from './samples/CanAddMultipleSample';
import WithValidateMessageSample from './samples/WithValidateMessageSample';
import styles from './index.module.scss';

const sampleList = [
  <DatePickerAndCheckboxSample />,
  <RangePickerAndCheckboxSample />,
  <InputAndCheckboxSample />,
  <InputNumberAndSelectSample />,
  <CanAddMultipleSample />,
  <WithValidateMessageSample />,
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
