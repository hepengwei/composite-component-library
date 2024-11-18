import React, { useState } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SampleBox from "@/components/SampleBox";
import EditableTable from "@/components/EditableTable";
import type { EditableTableColumnProps } from "@/components/EditableTable";
import InputNumberAndSelect from "@/components/formItems/InputNumberAndSelect";
import type { Value as InputNumberAndSelectValue } from "@/components/formItems/InputNumberAndSelect";
import { getRandomId } from "utils/util";
import styles from "./index.module.scss";

const INPUTNUMBER_SELECT_RULES = [
  {
    validator: (_: Record<string, any>, value: InputNumberAndSelectValue) => {
      if (value && value.length > 0) {
        if (!value[0] && value[0] !== 0 && !value[1]) {
          return Promise.reject("必填项");
        } else {
          if (!value[0] && value[0] !== 0) {
            return Promise.reject("两个都必填");
          }
          if (!value[1]) {
            return Promise.reject("两个都必填");
          }
        }
      } else {
        return Promise.reject("必填项");
      }
      return Promise.resolve();
    },
  },
];

const EditableTableSample = () => {
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);

  const onAddClick = () => {
    if (tableData.length >= 5) {
      message.warning("最多可增加5条数据");
      return;
    }
    const newDataSource = [...tableData, { id: `ROW_ID_${getRandomId()}` }];
    setTableData(newDataSource);
  };

  const columns: EditableTableColumnProps[] = [
    {
      title: (
        <div className={styles.columnTitle}>
          <span className={styles.requiredIcon}>*</span>
          <span>邮箱</span>
        </div>
      ),
      dataIndex: "email",
      width: 160,
      editable: true,
      ruleOptions: {
        isRequired: true,
        isEmail: true,
      },
    },
    {
      title: (
        <div className={styles.columnTitle}>
          <span className={styles.requiredIcon}>*</span>
          <span>日期</span>
        </div>
      ),
      dataIndex: "date",
      width: 140,
      editable: true,
      editType: "datePicker",
      ruleOptions: {
        isRequired: true,
      },
    },
    {
      title: "日期类型",
      dataIndex: "dateType",
      width: 120,
      editable: true,
      editType: "select",
      editProps: {
        options: [
          { label: "年", value: "year" },
          { label: "月", value: "month" },
          { label: "天", value: "day" },
        ],
        allowClear: true,
        nevervalidate: true,
      },
    },
    {
      title: "是否提交",
      dataIndex: "isSubmit",
      width: 120,
      editable: true,
      editType: "radioGroup",
      editProps: {
        options: [
          { label: "是", value: "1" },
          { label: "否", value: "0" },
        ],
        nevervalidate: true,
      },
    },
    {
      title: (
        <div className={styles.columnTitle}>
          <span className={styles.requiredIcon}>*</span>
          <span>交易日</span>
        </div>
      ),
      dataIndex: "field",
      width: 240,
      editable: true,
      component: (
        <InputNumberAndSelect
          options={[
            { label: "工作日", value: "workingDay" },
            { label: "自然日", value: "naturalDay" },
          ]}
          inputNumberProps={{
            addonAfter: "个",
          }}
          setInputNumberStatus={(
            value: InputNumberAndSelectValue | undefined
          ) => {
            if (!value || (!value[0] && value[0] !== 0)) {
              return "error";
            }
            return "";
          }}
          setSelectStatus={(value: InputNumberAndSelectValue | undefined) => {
            if (!value || !value[1]) {
              return "error";
            }
            return "";
          }}
        />
      ),
      editProps: {
        validateStatus: "",
      },
      ruleOptions: {
        isRequired: true,
      },
      rules: INPUTNUMBER_SELECT_RULES,
    },
  ];

  return (
    <SampleBox className={styles.container} title='可进行编辑的表格组件'>
      <div className={styles.itemTitleRow}>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          ghost
          onClick={onAddClick}
        >
          新增
        </Button>
      </div>
      <EditableTable
        columns={columns}
        dataSource={tableData}
        setDataSource={setTableData}
      />
    </SampleBox>
  );
};

export default EditableTableSample;
