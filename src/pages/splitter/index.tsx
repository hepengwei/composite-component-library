/**
 * 分隔面板 菜单页
 */
import React from "react";
import { Flex, Splitter, Typography } from "antd";
import SampleBox from "@/components/SampleBox";
import Card1 from "./components/Card1";
import Card2 from "./components/Card2";
import styles from "./index.module.scss";

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: "100%" }}>
    <Typography.Title
      type="secondary"
      level={5}
      style={{ whiteSpace: "nowrap" }}
    >
      {props.text == "Top" ? (
        <Card1 />
      ) : props.text == "Bottom" ? (
        <Card2 />
      ) : (
        props.text
      )}
    </Typography.Title>
  </Flex>
);

const SplitterSection = () => {
  return (
    <div className={styles.container}>
      <SampleBox title="复杂组合面板--垂直方向快捷折叠">
        <Splitter layout="vertical" className={styles.splitter}>
          <Splitter.Panel>
            <Desc text="Top" />
          </Splitter.Panel>
          <Splitter.Panel>
            <Desc text="Bottom" />
          </Splitter.Panel>
        </Splitter>
      </SampleBox>
      <SampleBox title="复杂组合面板--左中右快捷折叠">
        <Splitter className={styles.splitter}>
          <Splitter.Panel collapsible>
            <Desc text={"Left"} />
          </Splitter.Panel>
          <Splitter.Panel collapsible={{ start: true }}>
            <Desc text={"Center"} />
          </Splitter.Panel>
          <Splitter.Panel>
            <Desc text={"Right"} />
          </Splitter.Panel>
        </Splitter>
      </SampleBox>
      <SampleBox title="复杂组合面板--上下左右快捷折叠">
        <Splitter className={styles.splitter}>
          <Splitter.Panel collapsible>
            <Splitter layout="vertical">
              <Splitter.Panel>
                <Desc text="Left-Top" />
              </Splitter.Panel>
              <Splitter.Panel>
                <Desc text="Left-Bottom" />
              </Splitter.Panel>
            </Splitter>
          </Splitter.Panel>
          <Splitter.Panel collapsible>
            <Splitter layout="vertical">
              <Splitter.Panel>
                <Desc text="Right-Top" />
              </Splitter.Panel>
              <Splitter.Panel>
                <Desc text="Right-Bottom" />
              </Splitter.Panel>
            </Splitter>
          </Splitter.Panel>
        </Splitter>
      </SampleBox>
    </div>
  );
};

export default SplitterSection;
