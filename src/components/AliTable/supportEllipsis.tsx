import React from "react";
import { TablePipeline } from "ali-react-table";
import { Tooltip } from "antd";
import styles from "./index.module.scss";

const supportEllipsis = (pipeline: TablePipeline) => {
  const columns = pipeline.getColumns();
  const newColumns = columns.map((col) => {
    if (col.ellipsis && !col.setEllipsis) {
      const newCol = { ...col };
      newCol.setEllipsis = true;
      newCol._render = newCol.render;
      newCol.render = (val: any, record: Record<string, any>) => {
        const text = col._render ? col._render(val, record) : val;
        return (
          <Tooltip title={text}>
            <div className={styles.ellipsisText}>{text}</div>
          </Tooltip>
        );
      };
      return newCol;
    }

    return col;
  });
  return pipeline.columns(newColumns);
};

export default supportEllipsis;
