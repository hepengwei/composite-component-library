export const indexTextCode = `/**
 * 根据配置数据自动生成的搜索表单组件
 */
import React, {
  useState,
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

export default SearchForm;`;

export const indexScssTextCode = `.searchForm {
  $fontSize: 14px;
  $formItemLabelWidth: 86px;
  $formItemComponentWidth: 230px;
  $formItemComponentHeight: 32px;
  $formItemMarginBottom: 10px;

  display: flex;
  justify-content: space-between;
  .rightBox {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .actionButtons {
      display: flex;
      align-items: center;

      :global {
        button {
          display: inline-flex;
          height: $formItemComponentHeight !important;
          align-items: center;
          justify-content: center;
          margin-left: 8px;
        }
      }
    }
    .expandAll {
      display: inline-flex !important;
      height: 32px;
      margin-top: 8px;
      color: #1677ff;
      align-items: center;
      font-size: 14px;
      cursor: pointer;

      svg {
        padding-left: 4px;
        margin-right: 4px;
      }
    }
  }

  :global {
    .ant-form-item {
      margin-bottom: $formItemMarginBottom !important;
      .ant-form-item-label {
        min-width: $formItemLabelWidth;
        width: $formItemLabelWidth;
        label {
          height: $formItemComponentHeight !important;
          font-size: $fontSize !important;
        }
      }
      .ant-form-item-control-input {
        min-width: $formItemComponentWidth;
        min-height: $formItemComponentHeight !important;
        .ant-input:not(textarea),
        .ant-input-number,
        .ant-select,
        .ant-picker {
          width: $formItemComponentWidth;
          height: $formItemComponentHeight !important;
          font-size: $fontSize !important;
        }
        .ant-input-affix-wrapper {
          box-sizing: border-box;
          height: $formItemComponentHeight !important;
          line-height: $formItemComponentHeight !important;
          // padding: 0px 11px !important;
          .ant-input {
            height: calc($formItemComponentHeight - 2px) !important;
          }
        }
        textarea.ant-input {
          width: $formItemComponentWidth;
          font-size: $fontSize !important;
          min-height: $formItemComponentHeight !important;
          // padding: 2px 11px;
        }
        // .ant-input-number {
        //   .ant-input-number-input {
        //     padding: 2px 7px;
        //   }
        // }
        .ant-select {
          .ant-select-selector {
            font-size: $fontSize !important;
            .ant-select-selection-placeholder {
              font-size: $fontSize !important;
            }
            .ant-select-selection-search {
              margin: auto;
              .ant-select-selection-search-input {
                font-size: $fontSize !important;
                height: 100%;
              }
            }
          }
        }
        // .ant-select-multiple{
        //   .ant-select-selection-item{
        //     height: 18px;
        //     line-height: 16px;
        //   }
        // }
        .ant-picker {
          .ant-picker-input {
            font-size: $fontSize !important;
            input {
              font-size: $fontSize !important;
            }
          }
        }
      }
    }
  }
}`;
