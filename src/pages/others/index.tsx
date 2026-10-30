/**
 * 其他 菜单页
 */
import React from "react";
import BaseModalSample from "./samples/BaseModalSample";
import SearchFormSample from "./samples/SearchFormSample";
import DraggableSelectDatePanelSample from "./samples/DraggableSelectDatePanelSample";
import styles from "./index.module.scss";

const sampleList = [
  <BaseModalSample />,
  <SearchFormSample />,
  <DraggableSelectDatePanelSample />,
];

const Others = () => {
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

export default Others;
