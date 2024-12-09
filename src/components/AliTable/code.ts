export const aliMainTableTextCode = `import React, { useMemo, useRef, useEffect } from "react";
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
        value: selectedRows?.map((item: Record<string, any>) => item[rowKey]),
        onChange: (selectedRowKeys: string) => {
          const newSelectedRows = dataSource.filter(
            (item: Record<string, any>) =>
              selectedRowKeys.includes(item[rowKey])
          );
          setSelectedRows(newSelectedRows);
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
          setSelectedRows(newSelectedRows);
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

export default AliMainTable;`;

export const aliTableTextCode = `/**
 * 基于ali-react-table封装的表格组件
 * 功能用法请查询：https://ali-react-table.js.org/
 */
import React, { useMemo, Ref, ReactNode, ReactElement } from "react";
import {
  useTablePipeline,
  features,
  BaseTableProps,
  TablePipeline,
} from "ali-react-table";
import type { ArtColumn } from "ali-react-table";
import { Checkbox, Radio } from "antd";
import { PaginationProps } from "antd/lib/pagination";
import AliBaseTable from "./AliBaseTable";
import supportEllipsis from "./supportEllipsis";
import tableFilter from "./tableFilter";
import FunctionPanel from "./FunctionPanel";
import TablePagination from "./TablePagination";
import useTableHeight from "./useTableHeight";
import useMultiSelect from "./useMultiSelect";
import useSingleSelect from "./useSingleSelect";
import styles from "./index.module.scss";

export interface ArtColumn2 extends Omit<ArtColumn, "lock"> {
  ellipsis?: boolean;
  lock?: boolean | "left" | "right";
}

export type MultiSelectOptions = features.MultiSelectFeatureOptions & {
  Checkbox?: ReactElement;
  ref?: Ref<any>;
};

export type SingleSelectOptions = features.SingleSelectFeatureOptions & {
  Radio?: ReactElement;
  ref?: Ref<any>;
};

export interface AliTableProps extends BaseTableProps {
  rowKey: string;
  // 是否支持排序
  sort?: boolean;
  sortOptions?: features.SortFeatureOptions;
  // 是否支持拖拉调整列宽度
  resize?: boolean;
  resizeOptions?: features.ColumnResizeFeatureOptions;
  // 是否支持多选
  multiSelect?: boolean;
  multiSelectOptions?: MultiSelectOptions;
  // 是否显示单选框
  singleSelect?: boolean;
  singleSelectOptions?: SingleSelectOptions;
  // 分页
  pagination?: PaginationProps;
  // 操作区按钮
  buttonGroup?: ReactNode;
  // 表格高度
  height?: number;
  // 空数据时显示手动查询
  showQuery?: boolean;
  // 是否有边框
  bordered?: boolean;
  // 自动计算高度，和recalculateHeight配合
  autoHeight?: boolean;
  // 激活表格重新计算高度，和autoHeight配合
  recalculateHeight?: boolean | boolean[];
  // 是否显示底部功能区
  showFunctionPanel?: boolean;
  // 菜单id + tableKey 会组成唯一标识，若一个菜单下有多个表格，又需要开启持久化功能情况下，务必要设置tableKey，确保表格有唯一id
  tableKey?: string;
  selectedRowKeys?: string[];
  // 点击行的回调
  onRowClick?: (record: Record<string, any>) => void;
}

// 表格常用功能整合
const useProTablePipeline = (
  props: AliTableProps & { filter?: boolean }
): TablePipeline => {
  const {
    dataSource,
    columns,
    rowKey,
    sort = false,
    sortOptions,
    resize = false,
    resizeOptions,
    multiSelect = false,
    multiSelectOptions,
    singleSelect = false,
    singleSelectOptions,
    getRowProps,
  } = props;
  let pipeline = useTablePipeline({
    components: {
      Checkbox: multiSelectOptions?.Checkbox ?? Checkbox,
      Radio: singleSelectOptions?.Radio ?? Radio,
    },
  })
    .input({ dataSource, columns })
    .primaryKey(rowKey);

  pipeline = pipeline.use(supportEllipsis);
  pipeline = pipeline.use(tableFilter);

  if (multiSelect) {
    pipeline = pipeline.use(
      features.multiSelect({
        highlightRowWhenSelected: true,
        clickArea: "cell",
        checkboxColumn: { lock: true },
        stopClickEventPropagation: true,
        ...multiSelectOptions,
      })
    );
  }

  if (singleSelect) {
    pipeline = pipeline.use(
      features.singleSelect({
        highlightRowWhenSelected: true,
        clickArea: "cell",
        radioColumn: { lock: true },
        stopClickEventPropagation: true,
        ...singleSelectOptions,
      })
    );
  }

  if (sort) {
    pipeline = pipeline.use(
      features.sort({
        mode: "single",
        keepDataSource: true,
        ...sortOptions,
      })
    );
  }

  if (resize) {
    pipeline = pipeline.use(
      features.columnResize({
        handleHoverBackground: "var(--g-primary-color) !important",
        handleActiveBackground: "var(--g-primary-color)",
        ...resizeOptions,
      })
    );
  }

  if (getRowProps) {
    pipeline.appendRowPropsGetter(getRowProps);
  }

  return pipeline;
};

const AliTable = (props: AliTableProps) => {
  const {
    dataSource,
    columns,
    rowKey,
    sort,
    sortOptions,
    resize,
    resizeOptions = {},
    multiSelect,
    multiSelectOptions = {},
    singleSelect,
    singleSelectOptions = {},
    pagination,
    buttonGroup,
    height,
    autoHeight,
    recalculateHeight,
    showFunctionPanel = true,
    tableKey = "aliTable",
    useVirtual,
    selectedRowKeys = [],
    onRowClick,
    getRowProps,
    style,
    ...restProps
  } = props;

  const { tableContainerRef, tableStyle, emptyCellHeight } = useTableHeight({
    height,
    autoHeight,
    recalculateHeight,
    pagination,
    style,
  });

  const {
    selectValue,
    selectAll,
    selectRows,
    clearSelect,
    clearCurrentSelect,
    proMutiSelectOptions,
    indeterminate,
    checked,
  } = useMultiSelect({
    rowKey,
    multiSelectOptions,
    dataSource,
  });

  const { proSingleSelectOptions } = useSingleSelect({
    rowKey,
    singleSelectOptions,
  });

  const pipeline = useProTablePipeline({
    dataSource,
    columns,
    rowKey,
    sort,
    sortOptions,
    resize,
    resizeOptions,
    multiSelect,
    multiSelectOptions: proMutiSelectOptions,
    singleSelect,
    singleSelectOptions: proSingleSelectOptions,
    getRowProps,
  });

  const activeVirtual = useMemo(() => {
    if (useVirtual) return useVirtual;
    if (!dataSource) return false;
    return { vertical: false };
  }, [dataSource, useVirtual]);

  const functionPanelProps = {
    selectAll,
    clearSelect,
    clearCurrentSelect,
    indeterminate,
    checked,
    selectValue,
    selectRows,
    buttonGroup,
  };

  return (
    <div className={styles.tableContainer} ref={tableContainerRef}>
      <AliBaseTable
        style={tableStyle}
        emptyCellHeight={emptyCellHeight}
        useVirtual={activeVirtual}
        useOuterBorder
        autoHeight
        {...restProps}
        {...pipeline.getProps()}
        getRowProps={(record) => {
          const selected = selectedRowKeys?.includes(record[rowKey]);

          return {
            style: selected
              ? {
                  "--hover-bgcolor": "#1677FF80",
                  "--bgcolor": "#1677FF80",
                  "--odd-bgcolor": "#1677FF80",
                  "--color": "#FFFFFF",
                }
              : {},
            className: selected ? "selected" : "",
            onClick() {
              onRowClick?.(record);
            },
          };
        }}
      />
      {showFunctionPanel && (
        <div className={styles.functionPanel}>
          {multiSelect && <FunctionPanel {...functionPanelProps} />}
          {pagination && <TablePagination {...pagination} />}
        </div>
      )}
    </div>
  );
};

export default AliTable;`;

export const aliTableScssTextCode = `.selected {
  font-size: var(--g-base-size);
  color: var(--g-text-color);
  margin-right: 12px;
  cursor: pointer;

  em {
    color: var(--g-primary-color);
    font-style: normal;
    padding: 0 4px;
  }
}

.tableContainer {
  $tableRowHeight: 26px;
  $fontSize: 12px;

  position: relative;
  height: 100%;
  :global {
    .art-table-wrapper {
      --row-height: 26px;

      .art-loading-wrapper {
        height: 100%;
        .art-loading-content-wrapper {
          height: 100%;
          .art-table {
            height: 100%;
            .art-table-header {
              border-right: 7px solid #e9edf2;
              .art-table-header-row {
                .art-table-header-cell {
                  height: $tableRowHeight !important;
                  padding: 3px 9px !important;
                  font-weight: 600 !important;
                  --header-color: #333333 !important;
                }
              }
            }

            .art-table-body {
              height: calc(100% - $tableRowHeight);
              overflow-y: scroll;
              table {
                .art-table-row {
                  color: var(--color);

                  td.art-table-cell {
                    box-sizing: border-box;
                    height: $tableRowHeight !important;
                    max-height: $tableRowHeight !important;
                    min-height: $fontSize !important;
                    line-height: 16px !important;
                    padding: 3px 9px !important;
                    vertical-align: middle !important;
                  }
                  &:hover {
                    --hover-bgcolor: #b4d5ff;
                  }
                }
                .odd {
                  color: var(--color);
                  --odd-bgcolor: #edf2fc;
                  td.art-table-cell {
                    background: var(--odd-bgcolor);
                  }
                  &:hover {
                    --odd-bgcolor: #b4d5ff;
                  }
                }
                .selected {
                  .art-table-cell {
                    span {
                      --color: #ffffff !important;
                    }
                    button {
                      --color: #ffffff !important;
                      color: #ffffff !important;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .use-outer-border:not(.has-footer) tbody tr.last td {
      border-bottom: var(--cell-border-horizontal) !important;
    }

    .use-outer-border:not(.has-footer)
      tbody
      tr.last.first.no-hover
      td.first.last {
      border-bottom: none !important;
    }
  }

  .functionPanel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
    :global {
      .ant-pagination-total-text,
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-item {
        height: $tableRowHeight !important;
        line-height: $tableRowHeight !important;
        font-size: 12px !important;
      }
      .ant-select {
        height: $tableRowHeight !important;
        font-size: 12px !important;
        .ant-select-selector {
          font-size: 12px !important;
        }
      }
      .ant-checkbox-wrapper {
        font-size: 12px !important;
      }
      span {
        font-size: 12px !important;
      }
    }
  }
}

.ellipsisText {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`;

export const aliBaseTableTextCode = `import React, { forwardRef } from "react";
import { Empty } from "antd";
import { BaseTable, BaseTableProps } from "ali-react-table";
import classnames from "classnames";
import styled from "styled-components";

const BasicTable = styled(BaseTable)\`
  &.dark {
    --bgcolor: #132331;
    --header-bgcolor: #182735;
    --hover-bgcolor: #182735;
    --header-hover-bgcolor: #182735;
    --highlight-bgcolor: #191a1b;
    --header-highlight-bgcolor: #191a1b;
    --color: rgba(255, 255, 255, 0.88);
    --header-color: rgba(255, 255, 255, 0.88);
    --lock-shadow: rgb(37 37 37 / 0.5) 0 0 6px 2px;
    --border-color: #0a131b;
  }
  td {
    word-wrap: break-word;
  }
  th {
    font-weight: 600;
    padding-top: 0;
    padding-bottom: 0;
    border-bottom-width: 2px;

    .ant-checkbox-wrapper {
      display: none;
    }
    &:hover {
      background: #e2e7ee;
      .resize-handle {
        background: #d7dbe1;
      }
    }
  }
  &,
  .art-horizontal-scroll-container {
    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
    }

    ::-webkit-scrollbar-thumb {
      background: #ababab;
      border-radius: 4px;

      &:hover {
        background: #6e6e6e;
      }
    }
  }
  \${(props: any) =>
    props.bordered
      ? ""
      : \`& {
      --cell-border-vertical: none;
      --header-cell-border-vertical: none;
      thead > tr.first th {
        border-top: none;
      }
      td.first.last {
        border-bottom: none;
      }
    }\`}
\`;

export const AliBaseTable = forwardRef<
  BaseTable,
  BaseTableProps & { skinColor?: "light" | "dark" }
>(({ skinColor, ...restProps }, ref) => {
  return (
    <BasicTable
      ref={ref}
      stickyScrollHeight={7}
      className={classnames(
        { dark: skinColor === "dark" },
        restProps.className
      )}
      components={{
        EmptyContent: () => <Empty />,
      }}
      estimatedRowHeight={26}
      {...restProps}
    />
  );
});

export default AliBaseTable;`;
