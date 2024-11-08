/**
 * FormList部分 菜单页
 */
import React from 'react';
import DraggableFormListSample from './samples/DraggableFormListSample';
import DraggableWithValidateFormListSample from './samples/DraggableWithValidateFormListSample';
import styles from './index.module.scss';

const sampleList = [
  <DraggableFormListSample />,
  <DraggableWithValidateFormListSample />,
];

const FormListSection = () => {
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

export default FormListSection;
