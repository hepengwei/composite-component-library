/**
 * 多选表格受控hook
 */
import { useEffect, useMemo, useRef, useState, Ref, ReactElement } from "react";
import { features } from "ali-react-table";
import { union, difference, intersection, keyBy } from "lodash-es";

type UseMultiSelectProps = {
  multiSelectOptions: features.MultiSelectFeatureOptions & {
    Checkbox?: ReactElement;
    ref?: Ref<any>;
  };
  dataSource: Record<string, any>[];
  rowKey: string;
};

const useMultiSelect = (props: UseMultiSelectProps) => {
  const { multiSelectOptions, dataSource, rowKey } = props;
  const [selectValue, setSelectValue] = useState(
    multiSelectOptions.value || []
  );
  const selectRowsRef = useRef<Record<string, any>[]>([]);

  const dataSourceRowKeys = useMemo(() => {
    let rows = dataSource;
    if (multiSelectOptions.isDisabled) {
      rows = rows.filter((row: Record<string, any>, rowIndex: number) => {
        return !multiSelectOptions.isDisabled?.(row, rowIndex);
      });
    }
    return rows.map((row: Record<string, any>) => row[rowKey]);
  }, [dataSource]);

  const selectAll = () => {
    setSelectValue(union(selectValue, dataSourceRowKeys));
  };

  const clearSelect = () => {
    setSelectValue([]);
  };

  const clearCurrentSelect = () => {
    setSelectValue(difference(selectValue, dataSourceRowKeys));
  };

  const onChange = (nextValue: string[]) => {
    setSelectValue(nextValue);
  };

  const proMutiSelectOptions = {
    ...multiSelectOptions,
    value: selectValue,
    onChange,
  };

  const { indeterminate, checked } = useMemo(() => {
    const filter = intersection(dataSourceRowKeys, selectValue);
    const indeterminate =
      filter.length && filter.length !== dataSourceRowKeys.length;
    const checked = filter.length && filter.length === dataSourceRowKeys.length;
    return { indeterminate, checked };
  }, [selectValue, dataSourceRowKeys, rowKey]);

  const selectMethods = {
    clear: clearSelect,
    getSelectedRows: () => selectRowsRef.current,
    setSelectedRows: (rows: Record<string, any>[]) => {
      setSelectValue(rows.map((row) => row[rowKey]));
    },
    setPassDataSource: (passDataSource: Record<string, any>[]) => {
      const map = keyBy(passDataSource, (row) => row[rowKey]);
      const noPassDataSource = selectRowsRef.current.filter(
        (item) => !map[item[rowKey]]
      );
      setSelectValue(noPassDataSource.map((item) => item[rowKey]));
    },
  };

  useMemo(() => {
    const allDataSource = [...selectRowsRef.current, ...dataSource];
    const keysObj = keyBy(allDataSource, (row) => row[rowKey]);
    selectRowsRef.current = selectValue.map((key) => keysObj[key]);
  }, [selectValue, dataSource]);

  useEffect(() => {
    // 将方法暴露出去，让外面使用
    if (multiSelectOptions.ref) {
      // @ts-ignore
      multiSelectOptions.ref.current = selectMethods;
    }
  }, [multiSelectOptions.ref]);

  useEffect(() => {
    multiSelectOptions.onChange?.(selectValue, selectRowsRef.current);
  }, [selectValue]);

  return {
    selectValue,
    selectRows: selectRowsRef.current,
    selectAll,
    clearSelect,
    clearCurrentSelect,
    proMutiSelectOptions,
    indeterminate,
    checked,
  };
};

export default useMultiSelect;
