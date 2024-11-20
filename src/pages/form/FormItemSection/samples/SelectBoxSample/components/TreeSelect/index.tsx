import React from "react";
import { Select } from "antd";
import { MockItem } from "./mock";
import { default as CheckboxModal } from "./modal";

interface TreeSelectProps {
  defaultValue?: string[];
  options: MockItem[];
  onChange: (checkedKeys: string[]) => void;
  title?: string;
  width?: number;
}

const flattenDeep = (arr: any = [], result: any = []) => {
  arr.map((item: any) => {
    item?.children?.length > 0
      ? flattenDeep(item.children, result)
      : result.push(item);
  });
  return result;
};

const TreeSelect: React.FC<TreeSelectProps> = ({
  defaultValue = [],
  onChange = (checkedKeys: string[]) => {},
  options = [],
  title = "示例测试",
  width = 200,
}) => {
  const stations = flattenDeep(options, []);
  const len = defaultValue.length;
  const allLen = stations.length;
  const onClickSelect = async () => {
    // 点击下拉
    const { index, checkedKeys } = await CheckboxModal.show({
      title,
      value: defaultValue,
      treeData: options,
    });
    index === 1 && !!checkedKeys.length && onChange(checkedKeys);
  };

  return (
    <Select
      style={{ width: width }}
      value={
        !options.length
          ? "请联系管理员开通权限"
          : `${len === allLen ? "全部" : `${len}/${allLen}项`}${title}`
      }
      disabled={!options.length}
      options={[]}
      open={false}
      showArrow
      onClick={onClickSelect}
    />
  );
};

export default TreeSelect;
