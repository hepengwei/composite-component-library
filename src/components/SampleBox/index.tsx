import React, { useState, ReactNode, useMemo } from "react";
import { message, Tabs, Tooltip } from "antd";
import { CodeOutlined, CopyOutlined, UpOutlined } from "@ant-design/icons";
import classnams from "classnames";
import CodeBlock from "components/CodeBlock";
import { saveTextToClip } from "utils/util";
import styles from "./index.module.scss";

type SampleBoxProps = {
  title?: string;
  children: ReactNode;
  codeParams?: CodeParam | CodeParam[];
  className?: string;
};

type CodeParam = { code: string; fileName?: string };

const SampleBox = (props: SampleBoxProps) => {
  const { title, children, className, codeParams } = props;
  const [showCodeBlock, setShowCodeBlock] = useState<boolean>(false);

  const tabsItems = useMemo(() => {
    if (Array.isArray(codeParams)) {
      return codeParams.map((item: CodeParam, index: number) => ({
        key: index.toString(),
        label: item.fileName,
        children: (
          <div className={styles.codeBlockContent}>
            <CodeBlock code={item.code} />
            <div
              className={styles.copyBtn}
              onClick={() => {
                saveTextToClip(item.code);
                message.success("复制成功");
              }}
            >
              <Tooltip title='复制'>
                <CopyOutlined />
              </Tooltip>
            </div>
          </div>
        ),
      }));
    }
    return [];
  }, [codeParams]);

  return (
    <div
      className={classnams({
        [styles.container]: true,
        [className || ""]: !!className,
      })}
    >
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>{children}</div>
      {codeParams && (
        <div className={styles.actions}>
          <Tooltip title={showCodeBlock ? "收起代码" : "显示代码"}>
            <CodeOutlined onClick={() => setShowCodeBlock(!showCodeBlock)} />
          </Tooltip>
        </div>
      )}
      {showCodeBlock && (
        <div className={styles.codeBlockBox}>
          {Array.isArray(codeParams) ? (
            <Tabs centered items={tabsItems} />
          ) : (
            <CodeBlock code={(codeParams as CodeParam).code} />
          )}
          <div
            className={styles.footer}
            onClick={() => setShowCodeBlock(false)}
          >
            <UpOutlined />
            收起
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleBox;
