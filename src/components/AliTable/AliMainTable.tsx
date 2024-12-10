import React, { useMemo, useRef, useEffect } from "react";
import { PaginationProps } from "antd/lib/pagination";
import type { ArtColumn } from "ali-react-table";
import AliTable from "./index";
import type { ArtColumn2, AliTableProps } from "./index";
import { createPagination } from "./TablePagination";
import { getRandomId } from "utils/util";
import { fileCodeList as aliTableFileCodeList } from "./index";
import { aliMainTableTextCode } from "./code";

interface AliMainTableProps extends Omit<AliTableProps, "rowKey" | "columns"> {
  rowKey?: string;
  columns: ArtColumn2[] | ArtColumn[];
  dataSource: Record<string, any>[];
  getDataSource: (pagin?: Record<string, any>) => void;
  selectedRows?: Record<string, any>[];
  setSelectedRows?: (selectedRows: Record<string, any>[]) => void;
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
    multiSelect,
    multiSelectOptions,
    singleSelect,
    singleSelectOptions,
    ...restProps
  } = props;
  const multiSelectOptionsRef = useRef<any>(null);
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

  const proMultiSelectOptions = useMemo(() => {
    if (multiSelect) {
      return {
        value: selectedRows?.map((item: Record<string, any>) => item[rowKey]) || [],
        onChange: (selectedRowKeys: string) => {
          const newSelectedRows = dataSource.filter(
            (item: Record<string, any>) =>
              selectedRowKeys.includes(item[rowKey])
          );
          setSelectedRows?.(newSelectedRows);
        },
        sotpClickEventPropagation: true,
        ref: multiSelectOptionsRef,
        ...(multiSelectOptions || {}),
      };
    }
    return {};
  }, [multiSelect, selectedRows, multiSelectOptions, dataSource]);

  const proSingleSelectOptions = useMemo(() => {
    if (singleSelect) {
      return {
        value: selectedRows?.[0]?.[rowKey] || "",
        onChange: (selectedRowKey: string) => {
          const newSelectedRows = dataSource.filter(
            (item: Record<string, any>) => item[rowKey] === selectedRowKey
          );
          setSelectedRows?.(newSelectedRows);
        },
        ref: singleSelectOptionsRef,
        ...(singleSelectOptions || {}),
      };
    }
    return {};
  }, [singleSelect, selectedRows, singleSelectOptions, dataSource]);

  useEffect(() => {
    if (isLoading) {
      multiSelectOptionsRef?.current?.clear();
      singleSelectOptionsRef?.current?.clear();
    }
  }, [isLoading]);

  const onRowClick = (record: Record<string, any>) => {
    const clickRowKey = record[rowKey];
    const isSelected = selectedRows?.find(
      (item) => item[rowKey] === clickRowKey
    );
    if (singleSelect) {
      // 当前行已被选中则不进行任何操作
      if (selectedRows && selectedRows[0]?.[rowKey] === clickRowKey) return;
      singleSelectOptionsRef.current?.setSelectedRow(record);
    } else {
      // 当前行已被选中且只选中了这一条，则取消选中
      if (isSelected && selectedRows?.length === 1) {
        setSelectedRows?.([]);
        multiSelectOptionsRef?.current?.clear();
        return;
      }
      multiSelectOptionsRef?.current?.setSelectedRows([record]);
    }
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
      multiSelect={multiSelect}
      multiSelectOptions={proMultiSelectOptions}
      singleSelect={singleSelect}
      singleSelectOptions={proSingleSelectOptions}
      {...restProps}
    />
  );
};

export default AliMainTable;

export const fileCodeList = [
  { fileName: "AliMainTable.tsx", code: aliMainTableTextCode },
].concat(aliTableFileCodeList);
