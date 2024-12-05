/**
 * 可自定义的多选下拉框组件
 */
import React, {
  ReactNode,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Select, Popover, Checkbox, Spin } from "antd";
import type { SelectProps } from "antd";
import styles from "./index.module.scss";

type CustomMultiSelectProps = {
  value?: string[];
  options?: Record<string | symbol, any>[];
  customOptionLabel?: (
    option: Record<string | symbol, any>,
    value?: string[],
    index?: number
  ) => ReactNode; // 自定义下拉选项的视图, 不传时，会显示默认视图；传值后，则直接使用该函数返回的视图进行显示
  dropdownRenderContent?: (menu?: ReactNode) => ReactNode; // 下拉面板自定义视图
  disabled?: boolean;
  popupParentElement?: boolean; // 下拉面板是否渲染到父节点上，默认false，渲染到document.body上
  onChange?: (value: any[], options?: Record<string, any>[]) => void;
  searchKeys?: (string | symbol)[]; // 要进行模糊搜索的字段名列表
  onSearch?: (searchValue: string, selected?: string[]) => void;
  customFilter?: (
    input: string,
    record: Record<string | symbol, any>
  ) => boolean; // 自定义模糊搜索
  maxTagCount?: number;
  showSimplePlaceholder?: boolean; // 已选中的是否只简单显示 label1,label2
  onDropdownVisibleChange?: (openState?: boolean) => void; // 下拉面板显示隐藏时的回调
  fieldNames?: Record<string, any>;
  loading?: boolean;
  style?: Record<string, any>;
} & SelectProps;

const labelKeySymbol = Symbol("labelKey");

const CustomMultiSelect = (props: CustomMultiSelectProps) => {
  const {
    value,
    options,
    customOptionLabel,
    dropdownRenderContent,
    disabled,
    onChange,
    searchKeys,
    onSearch,
    customFilter,
    maxTagCount = 0,
    showSimplePlaceholder = false,
    onDropdownVisibleChange,
    fieldNames,
    loading = false,
    style = {},
    ...restProps
  } = props;
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
  const dropdownOpenRef = useRef<boolean>(false);
  const searchValueRef = useRef<string>("");

  const onFilter = (
    inputValue: string,
    record: Record<string | symbol, any>
  ) => {
    if (!inputValue) return true;
    if (customFilter) {
      return customFilter(inputValue, record);
    }

    const result = Object.keys(record).some((key: string | symbol) => {
      const value = record[key] || "";
      if (searchKeys && searchKeys.length > 0) {
        return (
          searchKeys.includes(key) &&
          value
            .toString()
            .toLowerCase()
            .includes(inputValue.toLocaleLowerCase())
        );
      }

      if (typeof key === "string" && ["id", "key"].includes(key)) return false;
      if (key === labelKeySymbol) return false;

      return value
        .toString()
        .toLowerCase()
        .includes(inputValue.toLocaleLowerCase());
    });

    return result;
  };

  const filterOption = (
    inputValue: string,
    option: Record<string | symbol, any>
  ) => {
    return onFilter(inputValue, option);
  };

  const handleSearch = (searchValue: string) => {
    searchValueRef.current = searchValue;
    onSearch?.(searchValue);
  };

  const handleDropdownVisibleChange = (openState: boolean) => {
    dropdownOpenRef.current = openState;
    onDropdownVisibleChange?.(openState);
    setPopoverVisible(false);
    if (!openState) {
      searchValueRef.current = "";
    }
  };

  const onAllCheckboxChange = (checked: boolean) => {
    if (checked) {
      const valueKey = fieldNames?.value || "value";
      const allValues = (
        options?.filter(
          (item: Record<string | symbol, any>) =>
            !searchValueRef.current || onFilter(searchValueRef.current, item)
        ) || []
      ).map((item) => item[valueKey]);
      const newValue = new Set(allValues.concat(value || []));
      onChange?.([...newValue]);
    } else {
      onChange?.([]);
    }
  };

  const onClear = useCallback((e: any) => {
    e.stopPropagation();
    onChange?.([]);
  }, []);

  const { isAllSelected, indeterminate } = useMemo(() => {
    const valueKey = fieldNames?.value || "value";
    const isAllSelected =
      options &&
      options.length > 0 &&
      value &&
      value.length > 0 &&
      options.every((item: Record<string | symbol, any>) =>
        value.includes(item[valueKey])
      );
    const indeterminate = !isAllSelected && value && value.length > 0;
    return { isAllSelected, indeterminate };
  }, [value, options]);

  const hoverMaxTagPlaceholder = () => {
    const labelKey = fieldNames?.label || "label";
    const valueKey = fieldNames?.value || "value";
    let selectedOptions: Record<string, any>[] = [];
    if (value && value.length > 0 && options && options.length > 0) {
      selectedOptions = options.filter((item: Record<string | symbol, any>) =>
        value.includes(item[valueKey])
      );
    }

    if (showSimplePlaceholder) {
      return selectedOptions
        .map((item: Record<string | symbol, any>) => item[labelKey])
        .join(", ");
    }

    return (
      <Popover
        placement='bottomLeft'
        content={
          <div>
            {selectedOptions.map((record: Record<string | symbol, any>) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 24,
                  minWidth: 100,
                  justifyContent: "space-between",
                }}
                key={record[valueKey]}
              >
                {record[labelKey]}
              </div>
            ))}
          </div>
        }
        open={popoverVisible}
        onOpenChange={() => {
          if (dropdownOpenRef.current) return;
          setPopoverVisible(!popoverVisible);
        }}
      >
        <div
          style={{ width: "100%", marginLeft: -6, paddingLeft: 6 }}
          onClick={() => {
            if (!dropdownOpenRef.current) {
              setPopoverVisible(true);
            }
          }}
        >
          {`已选${value ? value.length : 0}个项目`}
        </div>
      </Popover>
    );
  };

  const dropdownRender = (menu: any) => (
    <div className={styles.customMultiSelectDropdown}>
      <Spin spinning={loading}>
        <div className={styles.allCheck}>
          <Checkbox
            className={styles.allCheckbox}
            checked={isAllSelected}
            indeterminate={indeterminate}
            onChange={() => {
              onAllCheckboxChange(!isAllSelected);
            }}
          >
            <span
              onClick={(e) => {
                e.preventDefault();
                onAllCheckboxChange(!isAllSelected);
              }}
            >
              全选
            </span>
          </Checkbox>
          <span className={styles.clear} onClick={onClear}>
            清空
          </span>
          <span className={styles.checkCount}>
            已选（{value?.length || 0}/{options?.length || 0}）
          </span>
        </div>
        <div className={styles.options}>{menu}</div>
      </Spin>
    </div>
  );

  const finalOptions = useMemo(() => {
    return (
      options?.map((option: Record<string | symbol, any>, index: number) => {
        const labelKey = fieldNames?.label || "label";
        const valueKey = fieldNames?.value || "value";
        return {
          ...option,
          [labelKeySymbol]: customOptionLabel ? (
            customOptionLabel(option, value, index)
          ) : (
            <div
              style={{ display: "flex", alignItems: "center" }}
              key={option[valueKey]}
            >
              <Checkbox
                style={{ marginRight: 4 }}
                checked={value?.includes(option[valueKey])}
              />
              <span>{option[labelKey]}</span>
            </div>
          ),
        };
      }) || []
    );
  }, [value, options]);

  const finalFieldNames = useMemo(() => {
    let newfieldNames: Record<string | symbol, any> = { ...(fieldNames || {}) };
    newfieldNames.label = labelKeySymbol;
    return newfieldNames;
  }, []);

  return (
    <Select
      className={styles.customMultiSelect}
      style={style}
      showSearch
      maxTagCount={maxTagCount}
      maxTagPlaceholder={
        value && value.length > maxTagCount ? hoverMaxTagPlaceholder : null
      }
      value={value}
      onChange={onChange as any}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      filterOption={filterOption as any}
      loading={loading}
      {...restProps}
      mode='multiple'
      options={finalOptions as any}
      fieldNames={finalFieldNames}
      dropdownRender={dropdownRender}
      onSearch={handleSearch}
    />
  );
};

export default CustomMultiSelect;
