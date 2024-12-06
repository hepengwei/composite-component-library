/**
 * 下拉面板为表格的多选下拉组件
 */
import React, { useRef } from "react";
import { Spin } from "antd";
import type { ArtColumn } from "ali-react-table";
import CustomMultiSelect from "@/components/formItems/CustomMultiSelect";
import type { CustomMultiSelectProps } from "@/components/formItems/CustomMultiSelect";
import AliTable from "@/components/AliTable";
import type { ArtColumn2 } from "@/components/AliTable";

type TablePanelMultiSelectProps = {
  value?: string[];
  options: Record<string, any>[];
  loading?: boolean;
  onChange?: (value: string[]) => void;
} & CustomMultiSelectProps;

const rowKey = "code";

const columns: ArtColumn2[] = [
  { name: "Name", code: "name", width: 120 },
  { name: "Code", code: "code", width: 120 },
  { name: "备注", code: "remark", width: 150, ellipsis: true },
];

const TablePanelMultiSelect = (props: TablePanelMultiSelectProps) => {
  const { value, options, loading, onChange } = props;
  const multiSelectOptionsRef = useRef<any>(null);

  const onSelectChange = (selectedRowKeys: string[]) => {
    onChange?.(selectedRowKeys);
  };

  const onRowClick = (record: Record<string, any>) => {
    const clickRowKey = record[rowKey];
    const isSelectedBefore = value?.some((key: string) => key === clickRowKey);

    // 如果当前行已被选中，则取消选中，否则反之
    if (isSelectedBefore) {
      if (value?.length === 1) {
        multiSelectOptionsRef.current?.clear();
      } else {
        const newSelectedRows: Record<string, any>[] = [];
        const newSelectedRowKeys =
          value?.filter((key: string) => key !== clickRowKey) || [];
        newSelectedRowKeys.forEach((key: string) => {
          const selectRow = options?.find(
            (item: Record<string, any>) => item[rowKey] === key
          );
          if (selectRow) {
            newSelectedRows.push(selectRow);
          }
        });
        multiSelectOptionsRef.current?.setSelectedRows(newSelectedRows);
      }
    } else {
      if (value && value.length > 0) {
        const newSelectedRows: Record<string, any>[] = [];
        const newSelectedRowKeys: string[] = [];
        value.forEach((key: string) => {
          const selectRow = options?.find(
            (item: Record<string, any>) => item[rowKey] === key
          );
          if (selectRow) {
            newSelectedRows.push(selectRow);
            newSelectedRowKeys.push(selectRow[rowKey]);
          }
        });
        newSelectedRows.push(record);
        newSelectedRowKeys.push(clickRowKey);
        multiSelectOptionsRef.current?.setSelectedRows(newSelectedRows);
      } else {
        multiSelectOptionsRef.current?.setSelectedRows([record]);
      }
    }
  };

  const onClear = () => {
    multiSelectOptionsRef.current?.onClear();
  };

  const onDeselect = (deselectValue: string) => {
    if (value) {
      const newValue = value.filter((key: string) => key !== deselectValue);
      const newSelectedRows: Record<string, any>[] = [];
      newValue.map((key: string) => {
        const selectRow = options?.find(
          (item: Record<string, any>) => item[rowKey] === key
        );
        if (selectRow) {
          newSelectedRows.push(selectRow);
        }
      });
      multiSelectOptionsRef.current?.setSelectedRows(newSelectedRows);
    }
  };

  const dropdownRenderContent = () => (
    <div style={{ width: 700, padding: "12px 16px" }}>
      <Spin spinning={loading}>
        <AliTable
          rowKey={rowKey}
          resize
          height={280}
          isLoading={loading}
          columns={columns as ArtColumn[]}
          dataSource={options}
          selectedRowKeys={value}
          onRowClick={onRowClick}
          multiSelect
          multiSelectOptions={{
            value,
            onChange: onSelectChange,
            ref: multiSelectOptionsRef,
          }}
        />
      </Spin>
    </div>
  );

  return (
    <CustomMultiSelect
      fieldNames={{ label: "name", value: rowKey }}
      searchKeys={["name"]}
      popupMatchSelectWidth={false}
      dropdownRenderContent={dropdownRenderContent}
      onClear={onClear}
      onDeselect={onDeselect}
      {...props}
    />
  );
};

export default TablePanelMultiSelect;
