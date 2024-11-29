import React from "react";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const FunctionPanel = (props: any) => {
  const {
    selectAll,
    selectRows,
    clearSelect,
    clearCurrentSelect,
    indeterminate,
    checked,
    selectValue,
    buttonGroup: ButtonGroup,
  } = props;

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    if (e.target?.checked) {
      selectAll();
    } else {
      clearCurrentSelect();
    }
  };

  return (
    <div>
      <Checkbox
        indeterminate={indeterminate}
        checked={checked}
        onChange={onCheckboxChange}
      >
        全选本页
      </Checkbox>
      {selectValue.length > 0 ? (
        <span>
          已选<em>{selectValue.length}</em>项
        </span>
      ) : null}
      {ButtonGroup ? (
        <ButtonGroup selectRows={selectRows} clearSelect={clearSelect} />
      ) : null}
    </div>
  );
};

export default FunctionPanel;
