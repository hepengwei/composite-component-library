/**
 * 单选表格受控hook
 */
import { useEffect, useState, Ref, ReactElement } from "react";
import { features } from "ali-react-table";

type UseSingleSelectProps = {
  singleSelectOptions: features.SingleSelectFeatureOptions & {
    Radio?: ReactElement;
    ref?: Ref<any>;
  };
  rowKey: string;
};

const useSingleSelect = (props: UseSingleSelectProps) => {
  const { singleSelectOptions, rowKey } = props;
  const [selectValue, setSelectValue] = useState(
    singleSelectOptions.value || ""
  );

  const clearSelect = () => {
    setSelectValue("");
  };

  const onChange = (nextValue: string) => {
    setSelectValue(nextValue);
  };

  const proSingleSelectOptions = {
    ...singleSelectOptions,
    value: selectValue,
    onChange,
  };

  const selectMethods = {
    clear: clearSelect,
    setSelectedRow: (row: Record<string, any>) => {
      if (row) {
        setSelectValue(row[rowKey]);
      } else {
        setSelectValue("");
      }
    },
  };

  useEffect(() => {
    // 将方法暴露出去，让外面使用
    if (singleSelectOptions.ref) {
      // @ts-ignore
      singleSelectOptions.ref.current = selectMethods;
    }
  }, [singleSelectOptions.ref]);

  useEffect(() => {
    singleSelectOptions.onChange?.(selectValue);
  }, [selectValue]);

  return {
    selectValue,
    proSingleSelectOptions,
  };
};

export default useSingleSelect;
