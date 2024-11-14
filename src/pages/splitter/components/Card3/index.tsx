// @ts-nocheck
import React from "react";
import { Select } from "antd";
import { default as CheckboxModal } from "./modal";

const flattenDeep = (arr = [], result = []) => {
  arr.map((item) => {
    item?.children?.length > 0
      ? flattenDeep(item.children, result)
      : result.push(item);
  });
  return result;
};

export default ({
  value = [""],
  onChange = (checkedKeys: any) => {},
  options = [],
  title = "示例测试",
  width = 200,
}) => {
  const stations = flattenDeep(options, []);
  const len = value.length;
  const allLen = stations.length;
  const onClickSelect = async () => {
    // 点击下拉
    const { index, checkedKeys } = await CheckboxModal.show({
      title,
      value,
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
