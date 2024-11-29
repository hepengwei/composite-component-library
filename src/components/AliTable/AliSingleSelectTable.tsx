import React, { useEffect, useRef, useMemo } from "react";
import { PaginationProps } from "antd/lib/pagination";
import { ArtColumn } from "ali-react-table";
import AliTable from "./index";
import type { ArtColumn2, AliTableProps } from "./index";
import { createPagination } from "./TablePagination";
import { getRandomId } from "utils/util";

interface AliSingleSelectTableProps
  extends Omit<AliTableProps, "rowKey" | "columns"> {
  rowKey?: string;
  columns: ArtColumn2[] | ArtColumn[];
  dataSource: Record<string, any>[];
  getDataSource: (pagin?: Record<string, any>) => void;
  selectedRows: Record<string, any>[];
  setSelectedRows: (selectedRows: Record<string, any>[]) => void;
  pagination?: PaginationProps;
  setPagination?: (pagination: Record<string, any>) => void;
}

const AliSingleSelectTable = (props: AliSingleSelectTableProps) => {
  const {
    rowKey = "randomId",
    columns,
    dataSource,
    getDataSource,
    isLoading,
    selectedRows,
    setSelectedRows,
    pagination,
    setPagination,
    ...restProps
  } = props;
  const singleSelectOptionsRef = useRef<any>(null);

  const paginationWitchMemo = useMemo(() => {
    if (pagination && setPagination) {
      return createPagination(
        pagination,
        async ({ pageNum, pageSize }: any) => {
          await setPagination?.({ pageNum, pageSize });
          getDataSource({ pageNum, pageSize });
        }
      );
    }
    return undefined;
  }, [pagination, setPagination]);

  const singleSelectOptions = useMemo(() => {
    return {
      value: selectedRows?.[0]?.[rowKey] || "",
      onChange: (selectedRowKey: string) => {
        const newSelectedRows = dataSource.filter(
          (item: Record<string, any>) => item[rowKey] === selectedRowKey
        );
        setSelectedRows(newSelectedRows);
      },
      sotpClickEventPropagation: true,
      ref: singleSelectOptionsRef,
    };
  }, [selectedRows]);

  useEffect(() => {
    isLoading && singleSelectOptionsRef.current?.clear();
  }, [isLoading]);

  const onRowClick = (record: Record<string, any>) => {
    const clickRowKey = record[rowKey];

    // 当前行已被选中则不进行任何操作
    if (selectedRows && selectedRows[0]?.[rowKey] === clickRowKey) return;

    singleSelectOptionsRef.current?.setSelectedRow(record);
    setSelectedRows?.([record]);
  };

  const selectedRowKeys = useMemo(() => {
    return selectedRows?.map((item) => item[rowKey]) || [];
  }, [selectedRows]);

  const proDataSoure = useMemo(() => {
    if (rowKey === "randomId" && dataSource?.length > 0) {
      return dataSource.map((item: Record<string, any>) => ({
        ...item,
        randomId: getRandomId(12),
      }));
    }
    return dataSource;
  }, [dataSource]);

  return (
    <AliTable
      rowKey={rowKey}
      resize
      singleSelect
      isLoading={isLoading}
      columns={columns as ArtColumn[]}
      dataSource={proDataSoure}
      selectedRowKeys={selectedRowKeys}
      pagination={paginationWitchMemo}
      singleSelectOptions={singleSelectOptions}
      onRowClick={onRowClick}
      {...restProps}
    />
  );
};

export default AliSingleSelectTable;
