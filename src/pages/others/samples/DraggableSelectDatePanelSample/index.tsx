import React from "react";
import SampleBox from "@/components/SampleBox";
import Content from "./Content";
import { fileCodeList as draggableSelectDatePanelFileCodeList } from "@/components/DraggableSelectDatePanel";
import { fileCodeList as draggableSelectDateFileCodeList } from "@/components/DraggableSelectDate";
import { contentTextCode } from "./code";

const codeParams = [{ fileName: "index.tsx", code: contentTextCode }]
  .concat(draggableSelectDatePanelFileCodeList)
  .concat(draggableSelectDateFileCodeList);

const DraggableSelectDatePanelSample = () => {
  return (
    <SampleBox title="可进行拖拽的日期选择面板组件" codeParams={codeParams}>
      <Content />
    </SampleBox>
  );
};

export default DraggableSelectDatePanelSample;
