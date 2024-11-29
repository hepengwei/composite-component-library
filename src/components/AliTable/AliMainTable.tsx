import React, { useMemo, useRef, useEffect } from "react";
import { PaginationProps } from "antd/lib/pagination";
import type { ArtColumn } from "ali-react-table";
import AliTable from "./index";
import type { ArtColumn2, AliTableProps } from "./index";
import { createPagination } from "./TablePagination";
import { getRandomId } from "utils/util";

interface AliMainTableProps extends Omit<AliTableProps, "rowKey" | "columns"> {
  rowKey?: string;
  columns: ArtColumn2[] | ArtColumn[];
  dataSource: Record<string, any>[];
  getDataSource: (pagin?: Record<string, any>) => void;
  selectedRows: Record<string, any>[];
  setSelectedRows: (selectedRows: Record<string, any>[]) => void;
  pagination?: PaginationProps;
  setPagination?: (pagination: Record<string, any>) => void;
}

const AliMainTable = (props: AliMainTableProps) => {
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
    multiSelectOptions,
    ...restProps
  } = props;
  const multiSelectOptionsRef = useRef<any>(null);

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

  const proMultiSelectOptions = useMemo(() => {
    if (multiSelectOptions) {
      return {
        ...multiSelectOptions,
        ref: multiSelectOptionsRef,
      };
    }
    return {};
  }, [multiSelectOptions]);

  useEffect(() => {
    isLoading && multiSelectOptionsRef?.current?.clear();
  }, [isLoading]);

  const onRowClick = (record: Record<string, any>) => {
    const clickRowKey = record[rowKey];
    const isSelected = selectedRows?.find(
      (item) => item[rowKey] === clickRowKey
    );
    // 当前行已被选中且只选中了这一条，则取消选中
    if (isSelected && selectedRows?.length === 1) {
      setSelectedRows?.([]);
      multiSelectOptionsRef?.current?.clear();
      return;
    }

    multiSelectOptionsRef?.current?.setSelectedRows([record]);
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
      autoHeight
      recalculateHeight
      isLoading={isLoading}
      columns={columns as ArtColumn[]}
      dataSource={proDataSoure}
      pagination={paginationWitchMemo}
      selectedRowKeys={selectedRowKeys}
      onRowClick={onRowClick}
      multiSelectOptions={proMultiSelectOptions}
      {...restProps}
    />
  );
};

export default AliMainTable;
