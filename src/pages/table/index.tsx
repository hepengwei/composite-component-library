/**
 * 表格 菜单页
 */
import React from 'react';
import EditableTableSample from './samples/EditableTableSample';
import styles from './index.module.scss';

const sampleList = [<EditableTableSample />];

const TableSection = () => {
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

export default TableSection;
