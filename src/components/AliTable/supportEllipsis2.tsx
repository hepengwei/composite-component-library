import React, { useRef, useState } from "react";
import { TablePipeline } from "ali-react-table";
import { Input } from "antd";
import { createPortal } from "react-dom";
import styles from "./index.module.scss";

const { TextArea } = Input;

const EllipsisWrap = ({ title, text }: Record<string, any>) => {
  const ellipsisWrapRef = useRef<HTMLDivElement>(null);
  const ellipsisTipRef = useRef<HTMLDivElement>(null);
  const [tooltipStyle, setTooltipStyle] = useState<Record<string, any>>({});

  const onMouseOver = () => {
    if (ellipsisTipRef.current && ellipsisWrapRef.current) {
      const ellipsisRect = ellipsisTipRef.current.getBoundingClientRect();
      const ellipsisWrapRect = ellipsisWrapRef.current.getBoundingClientRect();

      if (ellipsisRect.width + ellipsisWrapRect.left > window.innerWidth) {
        setTooltipStyle({
          top: ellipsisWrapRect.top - ellipsisRect.height - 10,
          left: window.innerWidth - ellipsisRect.width - 20,
          opacity: 1,
        });
      } else {
        setTooltipStyle({
          top: ellipsisWrapRect.top - ellipsisRect.height - 10,
          left:
            ellipsisWrapRect.left -
            (ellipsisRect.width - ellipsisWrapRect.width) / 2,
          opacity: 1,
        });
      }
    }
  };

  const onMouseLeave = () => {
    if (ellipsisTipRef.current && ellipsisWrapRef.current) {
      setTooltipStyle({
        top: -1999,
        left: -1999,
        opacity: 0,
      });
    }
  };

  return (
    <div
      className={styles.ellipsisText}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      ref={ellipsisWrapRef}
    >
      {text}
      {title &&
        createPortal(
          <div
            className={styles.ellipsisTooltip}
            style={tooltipStyle}
            ref={ellipsisTipRef}
          >
            {title}
          </div>,
          document.body
        )}
    </div>
  );
};

const supportEllipsis = (pipeline: TablePipeline) => {
  const columns = pipeline.getColumns();

  const newColumns = columns.map((col) => {
    if ((col.ellipsis || col.ellipsis2) && !col.setEllipsis) {
      const newCol = { ...col };
      newCol.setEllipsis = true;
      newCol._render = newCol.render;
      newCol.render = (val: any, record: Record<string, any>) => {
        const text = col._render ? col._render(val, record) : val;
        let title = "";
        if (text || text === 0) {
          title = col.ellipsis2 ? (
            <TextArea
              className={styles.tipTextArea}
              style={{ width: col.tipWidth || "auto" }}
              value={text}
              disabled
              autoSize
            />
          ) : (
            text
          );
        }

        return <EllipsisWrap title={title} text={text} />;
      };
      return newCol;
    }

    return col;
  });

  return pipeline.columns(newColumns);
};

export default supportEllipsis;
