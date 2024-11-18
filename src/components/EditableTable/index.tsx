/**
 * 可进行编辑的表格组件
 */
import React, { ReactNode, useEffect, useContext, useMemo } from "react";
import {
  Form,
  Table,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Cascader,
  Button,
  Popconfirm,
} from "antd";
import type { TableProps, TableColumnProps, GetRef, FormRule } from "antd";
import { omit } from "lodash-es";
import WithValidateMessage from "@/components/formItems/WithValidateMessage";
import styles from "./index.module.scss";

const { RangePicker } = DatePicker;
const EMAIL_PATTERN =
  /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4})(;[\w+-.]+@[\w-.]+\.[A-Za-z]{2,4})*$/;

export type EditType =
  | "input"
  | "inputNumber"
  | "select"
  | "datePicker"
  | "rangePicker"
  | "radioGroup"
  | "checkboxGroup"
  | "cascader";

type EditProps =
  | ({
      nevervalidate?: boolean;
      validateStatus?: "warning" | "error" | "";
    } & Record<string, any>)
  | ((record: Record<string, any>) => Record<string, any>);

type FormInstance<T> = GetRef<typeof Form<T>>;

type EditableTableColumnRuleOptions = {
  isRequired?: boolean;
  isEmail?: boolean;
  isPositiveInt?: boolean;
};

export type EditableTableColumnProps = {
  editable?: boolean;
  editType?: EditType;
  editProps?: EditProps;
  component?: ReactNode | null;
  ruleOptions?: EditableTableColumnRuleOptions;
  rules?: FormRule[];
} & TableColumnProps;

type RenderItemProps = {
  editType: EditType;
  editProps: EditProps;
  disabled?: boolean;
  dataIndex: string;
  component?: ReactNode | null;
  record?: Record<string, any>;
  save: (dataIndex: string, cellValue?: any) => void;
};

type EditableTableCellProps = {
  rowKey?: string;
  disabled?: boolean;
  dataIndex: string;
  record: Record<string, any>;
  editProps?: EditProps;
  component?: ReactNode | null;
  handleSave: (event: any) => void;
} & Omit<EditableTableColumnProps, "dataIndex">;

type EditableTableProps = {
  dataSource: Record<string, any>[];
  columns: EditableTableColumnProps[];
  setDataSource: (dataSource: Record<string, any>[]) => void;
  rowKey?: string;
  disabled?: boolean;
  onFormValuesChange?: (
    changedValues: Record<string, any>,
    form?: FormInstance<any> | null,
    allValues?: Record<string, any>
  ) => void;
  deleteRowCallback?: (record: Record<string, any>) => void; // 删除一行后的回调
} & TableProps;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const renderItem = ({
  form,
  editType,
  editProps,
  component,
  disabled,
  dataIndex,
  record,
  save,
}: RenderItemProps & { form: FormInstance<any> | null }) => {
  const restProps: Record<string, any> = {
    ...editProps,
    disabled: (editProps as Record<string, any>).disabled || disabled,
  };
  delete restProps.validateStatus;

  const onBlur = () => save(dataIndex);

  const onChange = (cellValue?: any, option?: Record<string, any>) => {
    if (
      (!editType && !component) ||
      ["input", "inputNumber"].includes(editType)
    )
      return;
    if (editType === "radioGroup") {
      save?.(dataIndex, cellValue?.target?.value || undefined);
      return;
    }
    const newValue = cellValue?.target ? "" : cellValue;
    save?.(dataIndex, newValue);
    (editProps as Record<string, any>).onChange?.(newValue, option, record);
  };

  let itemComponent: any = (
    <Input style={{ width: "100%" }} onBlur={onBlur} {...restProps} />
  );

  switch (editType) {
    case "inputNumber":
      itemComponent = (
        <InputNumber style={{ width: "100%" }} onBlur={onBlur} {...restProps} />
      );
      break;
    case "select":
      itemComponent = <Select style={{ width: "100%" }} {...restProps} />;
      break;
    case "datePicker":
      itemComponent = <DatePicker style={{ width: "100%" }} {...restProps} />;
      break;
    case "rangePicker":
      itemComponent = <RangePicker style={{ width: "100%" }} {...restProps} />;
      break;
    case "radioGroup":
      itemComponent = <Radio.Group {...restProps} />;
      break;
    case "checkboxGroup":
      itemComponent = <Checkbox.Group {...restProps} />;
      break;
    case "cascader":
      itemComponent = <Cascader style={{ width: "100%" }} {...restProps} />;
      break;
  }

  if (component) {
    itemComponent = React.cloneElement(component, { record, ...restProps });
  }

  return (
    <WithValidateMessage
      onChange={onChange}
      form={form}
      nevervalidate={!!(editProps as Record<string, any>).nevervalidate}
    >
      {itemComponent}
    </WithValidateMessage>
  );
};

const EditableTableCell = React.memo((props: EditableTableCellProps) => {
  const {
    rowKey = "id",
    editable = false,
    editType = "input",
    editProps,
    component,
    disabled,
    dataIndex,
    record,
    children,
    ruleOptions,
    rules,
    handleSave,
    ...restProps
  } = props;
  const form = useContext(EditableContext);

  let finalComponentProps: Record<string, any> = editProps || {};
  if (typeof editProps === "function") {
    finalComponentProps = editProps(record) || {};
  }

  const finalRules = useMemo(() => {
    let finalRulesArr: FormRule[] = [];
    if (rules && rules.length > 0) {
      finalRulesArr = rules;
    } else {
      if (ruleOptions?.isRequired) {
        finalRulesArr.push({ required: true, message: "必填项" });
      }
      if (ruleOptions?.isEmail) {
        finalRulesArr.push({
          pattern: EMAIL_PATTERN,
          message: "请输入正确邮箱格式",
        });
      }
    }
    return finalRulesArr;
  }, [ruleOptions, rules]);

  const save = async (currentDataIndex: string, cellValue?: any) => {
    const value = cellValue || (await form?.getFieldValue(currentDataIndex));
    const newRecord = { ...record, [currentDataIndex]: value };
    handleSave?.(newRecord);
    try {
      await form?.validateFields([currentDataIndex]);
    } catch (err) {
      //   console.log('EditableTable保存数据失败', err);
    }
  };

  useEffect(() => {
    form?.setFieldsValue({
      [dataIndex]: record?.[dataIndex],
    });
  }, []);

  let childNode: ReactNode = children;

  if (editable) {
    childNode = (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={finalRules}
        required={!!ruleOptions?.isRequired}
        validateStatus={finalComponentProps.validateStatus}
      >
        {renderItem({
          editType,
          editProps: finalComponentProps,
          component,
          disabled,
          dataIndex,
          record,
          form,
          save,
        })}
      </Form.Item>
    );
  } else if (dataIndex === rowKey) {
    childNode = (
      <Form.Item style={{ margin: 0 }} name={dataIndex} hidden></Form.Item>
    );
  }

  return (
    <td title={disabled ? record?.[dataIndex] : ""} {...restProps}>
      {childNode}
    </td>
  );
});

class TableCellWrapper extends React.PureComponent {
  render() {
    return (
      <EditableTableCell
        {...omit(this.props, ["onMouseEnter", "onMouseLeave"])}
      />
    );
  }
}

const EditableTableRow = ({
  rowKey,
  onFromaValuesChange,
  ...restProps
}: any) => {
  const [form] = Form.useForm();

  const onValuesChange = (
    changedValues: Record<string, any>,
    allValues: Record<string, any>
  ) => {
    onFromaValuesChange?.(changedValues, form, {
      ...allValues,
      [rowKey]: restProps["data-row-key"],
    });
  };

  return (
    <Form form={form} onValuesChange={onValuesChange} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...restProps} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableTable = ({
  rowKey = "id",
  dataSource,
  columns,
  setDataSource,
  disabled = false,
  onFormValuesChange,
  deleteRowCallback,
  ...restProps
}: EditableTableProps) => {
  const components = useMemo(
    () => ({
      body: {
        row: (props: any) => (
          <EditableTableRow
            {...props}
            rowKey={rowKey}
            onFromaValuesChange={onFormValuesChange}
          />
        ),
        cell: TableCellWrapper,
      },
    }),
    []
  );

  const handleSave = (row: Record<string, any>) => {
    const newDataSource = dataSource.map((item) => {
      if (item[rowKey] === row[rowKey]) {
        return {
          ...item,
          ...row,
        };
      }
      return item;
    });

    setTimeout(() => {
      setDataSource(newDataSource);
    });
  };

  const handleDeleteRow = (record: Record<string, any>) => {
    const newDataSource = dataSource.filter(
      (item) => item[rowKey] !== record[rowKey]
    );
    setDataSource(newDataSource);
    deleteRowCallback?.(record);
  };

  const newColumns = useMemo(() => {
    return columns.map((col) => ({
      ...col,
      onCell: (record: Record<string, any>) => ({
        editable: col.editable,
        editType: col.editType,
        editProps: col.editProps,
        component: col.component,
        disabled,
        dataIndex: col.dataIndex,
        record,
        ruleOptions: col.ruleOptions,
        rules: col.rules,
        handleSave,
      }),
    }));
  }, [columns, disabled, handleSave]);

  const finalColumns = [
    ...newColumns,
    {
      title: "操作",
      key: "action",
      dataIndex: "action",
      align: "center",
      width: 80,
      fixed: "right",
      render: (_: any, record: Record<string, any>) => {
        return (
          <div style={{ padding: 0 }}>
            {disabled ? (
              <Button type='link' danger disabled>
                删除
              </Button>
            ) : (
              <Popconfirm
                title='是否确定删除此行？'
                onConfirm={() => {
                  handleDeleteRow(record);
                }}
              >
                <Button style={{ padding: 0 }} type='link' danger>
                  删除
                </Button>{" "}
              </Popconfirm>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles.editableTable}>
      <Table
        rowKey={rowKey}
        columns={finalColumns as any}
        components={components}
        dataSource={dataSource}
        pagination={false}
        tableLayout='fixed'
        bordered
        {...restProps}
      />
    </div>
  );
};

export default EditableTable;
