/**
 * 分隔面板 菜单页
 */
import React, { useState } from "react";
import { Flex, Splitter, Typography } from "antd";
import { mock, MockItem } from "./components/Card3/mock";
import SampleBox from "@/components/SampleBox";
import Card1 from "./components/Card1";
import Card2 from "./components/Card2";
import { Card3 } from "./components/Card3";
import styles from "./index.module.scss";

/** 描述内容组件 */
const Desc: React.FC<{ text?: string | number }> = ({ text }) => {
  const [treeValue, setTreeValue] = useState(["4"]);



  return (
    <Flex justify="center" align="center" style={{ height: "100%" }}>
      <Typography.Title
        type="secondary"
        level={5}
        style={{ whiteSpace: "nowrap" }}
      >
        {text === "Top" ? (
          <Card1 />
        ) : text === "Bottom" ? (
          <Card2 />
        ) : text === "Left" ? (
          <Card3 value={treeValue} options={mock || []} onChange={() => {}} />
        ) : (
          text
        )}
      </Typography.Title>
    </Flex>
  );
};

/** 面板组组件 */
const SplitterPanelGroup: React.FC<{
  layout?: "vertical" | "horizontal";
  panels: Array<{ text: string; collapsible?: boolean; start?: boolean }>;
}> = ({ layout = "horizontal", panels }) => (
  <Splitter layout={layout} className={styles.splitter}>
    {panels.map((panel, index) => (
      <Splitter.Panel
        key={index}
        collapsible={panel.collapsible ? { start: panel.start } : false}
      >
        <Desc text={panel.text} />
      </Splitter.Panel>
    ))}
  </Splitter>
);

/** 主组件 */
const SplitterSection = () => {
  return (
    <div className={styles.container}>
      <SampleBox title="复杂组合面板--垂直方向快捷折叠">
        <SplitterPanelGroup
          layout="vertical"
          panels={[{ text: "Top" }, { text: "Bottom" }]}
        />
      </SampleBox>

      <SampleBox title="复杂组合面板--左中右快捷折叠">
        <SplitterPanelGroup
          panels={[
            { text: "Left", collapsible: true },
            { text: "Center", collapsible: true, start: true },
            { text: "Right" },
          ]}
        />
      </SampleBox>

      <SampleBox title="复杂组合面板--上下左右快捷折叠">
        <Splitter className={styles.splitter}>
          <Splitter.Panel collapsible>
            <SplitterPanelGroup
              layout="vertical"
              panels={[{ text: "Left-Top" }, { text: "Left-Bottom" }]}
            />
          </Splitter.Panel>
          <Splitter.Panel collapsible>
            <SplitterPanelGroup
              layout="vertical"
              panels={[{ text: "Right-Top" }, { text: "Right-Bottom" }]}
            />
          </Splitter.Panel>
        </Splitter>
      </SampleBox>
    </div>
  );
};

export default SplitterSection;
