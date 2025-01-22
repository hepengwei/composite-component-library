/**
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
import {
  aliTableTextCode,
  aliTableScssTextCode,
  aliBaseTableTextCode,
} from "./code";
export interface ArtColumn2 extends Omit<ArtColumn, "lock"> {
  ellipsis?: boolean;
  ellipsis2?: boolean; // 支持显示包含/n换行符的文本
  tipWidth?: number; // 限制hover后显示的Tooltip中文本宽度，默认为"auto"
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
    .primaryKey(rowKey)
    .use(supportEllipsis)
    .use(tableFilter);

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
              // 如果表格底部有汇总行，则汇总行对应的record数据中的rowKey字段值应设置为"footer"，这样就不能选择表格底部的汇总行
              if (record[rowKey] !== "footer") {
                onRowClick?.(record);
              }
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

export default AliTable;

export const fileCodeList = [
  { fileName: "AliTable.tsx", code: aliTableTextCode },
  { fileName: "AliTable.module.scss", code: aliTableScssTextCode },
  { fileName: "AliBaseTable.tsx", code: aliBaseTableTextCode },
];
