import React from "react";
import { Pagination } from "antd";
import { PaginationProps } from "antd/lib/pagination";

export const usePagination = (props: any) => {
  const { pageNum, pageSize, total, showTotal, ...restProps } = props;
  return {
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50", "100"],
    showTotal: (total: number) => `共${total}条数据`,
    current: Number(pageNum) || 1,
    pageSize: Number(pageSize) || 10,
    total: Number(total) || 0,
    ...restProps,
  };
};

export const createPagination = (
  opts: any,
  onChange: Function
): PaginationProps => {
  const {
    pageNum,
    pageSize,
    total,
    pageSizeOptions = ["10", "20", "50", "100"],
  } = opts;

  return {
    current: Number(pageNum),
    hideOnSinglePage: false,
    pageSize: Number(pageSize),
    showQuickJumper: true,
    total: Number(total),
    size: "small",
    pageSizeOptions,
    showTotal: (total: number) => `共${total}条数据`,
    onChange: async (pageNum, pageSize) => {
      onChange?.({ pageNum, pageSize });
    },
  };
};

const TablePagination = (props: any) => {
  const paginationProps = usePagination(props);
  return <Pagination {...paginationProps} />;
};

export default TablePagination;
