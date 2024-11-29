import React from "react";
import { TablePipeline } from "ali-react-table";
import { Popover } from "antd";
import { FilterFilled } from "@ant-design/icons";

const FilterHeader = (props: any) => {
  const { _title, filterDropdown } = props;

  return (
    <Popover
      content={filterDropdown}
      placement='bottomLeft'
      trigger='click'
      destroyTooltipOnHide
    >
      <span>
        {_title}
        <FilterFilled />
      </span>
    </Popover>
  );
};

const tableFilter = (pipeline: TablePipeline) => {
  const columns = pipeline.getColumns();
  const newColumns = columns.map((col) => {
    if (col.filterDropdown && !col._title) {
      const newCol = { ...col };
      newCol._tittle = newCol.title || newCol.name;
      newCol.title = <FilterHeader {...newCol} />;
      return newCol;
    }
    return col;
  });
  return pipeline.columns(newColumns);
};

export default tableFilter;
