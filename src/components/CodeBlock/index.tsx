/**
 * 显示代码文本的组件
 */
import React from "react";
import { Highlight, themes } from "prism-react-renderer";
import type { PrismTheme } from "prism-react-renderer";
import styles from "./index.module.scss";

type CodeBlockProps = {
  code: string;
  language?: string;
  theme?: PrismTheme;
};

const CodeBlock = (props: CodeBlockProps) => {
  const { code, language = "tsx", theme = themes.oneLight } = props;

  return (
    <Highlight theme={theme} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre className={styles.codeBlock} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className={styles.line}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
