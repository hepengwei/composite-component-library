/**
 * 根据配置数据自动生成的搜索表单组件
 */
import React, {
  useState,
  useEffect,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  Ref,
} from "react";
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Checkbox,
  DatePicker,
  Select,
  Button,
} from "antd";
import { FormInstance } from "antd/lib";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import classnams from "classnames";
import styles from "./index.module.scss";
import { indexTextCode, indexScssTextCode } from "./code";

const { RangePicker } = DatePicker;

export type FieldType =
  | "Input"
  | "InputNumber"
  | "RadioGroup"
  | "CheckboxGroup"
  | "DatePicker"
  | "RangePicker"
  | "Select";

export interface FormItemOption {
  label: string; // 字段名称
  name: string; // 字段
  fieldType?: FieldType; // 字段使用的组件类型, 默认为"Input"，如果有component，优先使用component
  defaultValue?: any; // 字段初始值
  componentProps?: Record<string, any>; // 传给的组件的参数
  component?: ReactNode; // 使用自定义组件
}

interface SearchFormProps {
  formItemList: FormItemOption[]; // 配置数据
  initialValues?: Record<string, any>; // 表单初始数据
  expandMinNum?: number; // 超过多少个后显示展开/收起按钮，默认为8
  actionButtonsAfter?: ReactNode; // 追加在操作按钮后面的元素
  onSearch: (formValues: Record<string, any>) => void; // 点击搜索的回调
  onReset: () => void; // 点击重置的回调
  onExport?: () => void; // 点击导出的回调
  loading?: boolean; // 是否正在请求数据
  exportLoading?: boolean; // 导出是否正在loading
  handleExpandAll?: (expandAll: boolean) => void; // 展开/收起状态改变后的回调
  className?: string; // 当label的长度大于默认的固定长度时，可以使用该参数进行样式覆盖
}

const SearchForm = forwardRef<FormInstance | null, SearchFormProps>(
  (props: SearchFormProps, ref: Ref<FormInstance | null>) => {
    const {
      formItemList,
      initialValues = {},
      expandMinNum = 8,
      actionButtonsAfter = null,
      onSearch,
      onReset,
      onExport,
      loading = false,
      exportLoading = false,
      handleExpandAll,
      className = "",
    } = props;
    const [form] = Form.useForm();
    const [expandAll, setExpandAll] = useState<boolean>(false);

    useImperativeHandle(ref, () => form);

    const onExpandAllClick = () => {
      setExpandAll(!expandAll);
      handleExpandAll?.(!expandAll);
    };

    const handleSearch = async () => {
      const formValues = await form?.getFieldsValue();
      onSearch(formValues);
    };

    return (
      <div
        className={classnams({
          [styles.searchForm]: true,
          [className]: !!className,
        })}
      >
        <Form
          colon={false}
          labelAlign='left'
          form={form}
          layout='inline'
          autoComplete='off'
          initialValues={initialValues}
        >
          {formItemList.map((formItemOption: FormItemOption, index: number) => {
            const {
              label,
              name,
              fieldType = "Input",
              componentProps,
              component,
            } = formItemOption;
            if (component) {
              return (
                <Form.Item
                  label={label}
                  name={name}
                  key={name}
                  className={componentProps?.formItemClass || ""}
                  valuePropName={componentProps?.valuePropName || "value"}
                  hidden={index > expandMinNum - 1 && !expandAll}
                >
                  {component}
                </Form.Item>
              );
            }

            return (
              <Form.Item
                label={label}
                name={name}
                key={name}
                className={componentProps?.formItemClass || ""}
                hidden={index > expandMinNum - 1 && !expandAll}
              >
                {fieldType === "Input" && <Input {...componentProps} />}
                {fieldType === "InputNumber" && (
                  <InputNumber {...componentProps} />
                )}
                {fieldType === "RadioGroup" && (
                  <Radio.Group {...componentProps} />
                )}
                {fieldType === "CheckboxGroup" && (
                  <Checkbox.Group {...componentProps} />
                )}
                {fieldType === "DatePicker" && (
                  <DatePicker {...componentProps} />
                )}
                {fieldType === "RangePicker" && (
                  <RangePicker {...componentProps} />
                )}
                {fieldType === "Select" && (
                  <Select allowClear {...componentProps} />
                )}
              </Form.Item>
            );
          })}
        </Form>
        <div className={styles.rightBox}>
          <div className={styles.actionButtons}>
            <Button type='primary' loading={loading} onClick={handleSearch}>
              查询
            </Button>
            <Button loading={loading} onClick={onReset}>
              重置
            </Button>
            {onExport && (
              <Button loading={exportLoading} onClick={onExport}>
                导出
              </Button>
            )}
            {actionButtonsAfter}
          </div>
          {formItemList?.length > expandMinNum && (
            <div className={styles.expandAll} onClick={onExpandAllClick}>
              {!expandAll ? (
                <>
                  <span>展开</span>
                  <DownOutlined />
                </>
              ) : (
                <>
                  <span>收起</span>
                  <UpOutlined />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default SearchForm;

export const fileCodeList = [
  { fileName: "SearchForm.tsx", code: indexTextCode },
  {
    fileName: "SearchForm.module.scss",
    code: indexScssTextCode,
  },
];
