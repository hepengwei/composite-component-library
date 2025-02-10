export const contentTextCode = `import React from "react";
import { Form, Row, Col, Input, Select, Button } from "antd";
import FocusableFormItem from "@/components/formItems/FocusableFormItem";
import WithValidateMessage from "@/components/formItems/WithValidateMessage";
import CanAddMultiple from "@/components/formItems/CanAddMultiple";
import InputAndCheckbox from "@/components/formItems/InputAndCheckbox";
import type { Value as InputAndCheckboxValue } from "@/components/formItems/InputAndCheckbox";
import InputNumberAndSelect from "@/components/formItems/InputNumberAndSelect";
import type { Value as InputNumberAndSelectValue } from "@/components/formItems/InputNumberAndSelect";

const EMAIL_PATTERN =
  /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4})(;[\w+-.]+@[\w-.]+\.[A-Za-z]{2,4})*$/;

const REQUIRED_FORM_ITEM_RULES = [{ required: true, message: "必填项" }];
const CUSTOM_SELECT_RULES = [{ required: true, message: "请选择" }];
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
const MULTIPLE_EMAIL_RULES = [
  {
    validator: (
      _: Record<string, any>,
      value: ([string | undefined, boolean | undefined] | undefined)[]
    ) => {
      if (value && value.length > 0) {
        let hasBadValue = false;
        for (let i = 0, l = value.length; i < l; i++) {
          const item = value[i];
          if (!item || !item[0] || !item[0].trim()) {
            return Promise.reject("邮箱必填");
          } else if (!EMAIL_PATTERN.test(item[0].trim())) {
            hasBadValue = true;
          }
        }
        if (hasBadValue) {
          return Promise.reject("邮箱格式不正确");
        }
      } else {
        return Promise.reject("邮箱必填");
      }
      return Promise.resolve();
    },
  },
];

const Content = () => {
  const [form] = Form.useForm();

  // 点击提交
  const onSubmit = async () => {
    try {
      const values = await form?.validateFields();
      console.log("values:", values);
    } catch (err) {}
  };

  return (
    <Form form={form} name='withValidateMessageSampleForm' labelAlign='right'>
      <Row gutter={16}>
        <Col span={12}>
          <FocusableFormItem
            label='字段标题'
            name='field1'
            rules={REQUIRED_FORM_ITEM_RULES}
          >
            <WithValidateMessage form={form}>
              <Input />
            </WithValidateMessage>
          </FocusableFormItem>
        </Col>
        <Col span={12}>
          <FocusableFormItem
            label='字段标题'
            name='field2'
            rules={CUSTOM_SELECT_RULES}
          >
            <WithValidateMessage form={form}>
              <Select
                options={[
                  { label: "A", value: "a" },
                  { label: "B", value: "b" },
                ]}
              />
            </WithValidateMessage>
          </FocusableFormItem>
        </Col>
        <Col span={12}>
          <FocusableFormItem
            label='字段标题'
            name='field3'
            rules={INPUTNUMBER_SELECT_RULES}
            required
            validateStatus=''
          >
            <WithValidateMessage form={form}>
              <InputNumberAndSelect
                options={[
                  { name: "工作日", id: "workingDay" },
                  { name: "自然日", id: "naturalDay" },
                ]}
                inputNumberProps={{ addonAfter: "个" }}
                selectProps={{
                  fieldNames: { label: "name", value: "id" },
                  allowClear: true,
                }}
                setInputNumberStatus={(
                  value: InputNumberAndSelectValue | undefined
                ) => {
                  if (!value || (!value[0] && value[0] !== 0)) {
                    return "error";
                  }
                  return "";
                }}
                setSelectStatus={(
                  value: InputNumberAndSelectValue | undefined
                ) => {
                  if (!value || !value[1]) {
                    return "error";
                  }
                  return "";
                }}
              />
            </WithValidateMessage>
          </FocusableFormItem>
        </Col>
        <Col span={12}>
          <FocusableFormItem
            label='字段标题'
            name='field4'
            rules={REQUIRED_FORM_ITEM_RULES}
          >
            <WithValidateMessage form={form}>
              <InputAndCheckbox checkboxLabel='复选框标题' />
            </WithValidateMessage>
          </FocusableFormItem>
        </Col>
        <Col span={12}>
          <FocusableFormItem
            label='邮箱'
            name='field5'
            rules={MULTIPLE_EMAIL_RULES}
            required
            validateStatus=''
          >
            <WithValidateMessage form={form}>
              <CanAddMultiple maxRows={5}>
                <InputAndCheckbox
                  checkboxLabel='是否同步到平台'
                  setInputStatus={(
                    value: InputAndCheckboxValue | undefined
                  ) => {
                    if (
                      !value ||
                      !value[0] ||
                      !value[0].trim() ||
                      !EMAIL_PATTERN.test(value[0].trim())
                    ) {
                      return "error";
                    }
                    return "";
                  }}
                />
              </CanAddMultiple>
            </WithValidateMessage>
          </FocusableFormItem>
        </Col>
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "30px",
          }}
        >
          <Button type='primary' onClick={onSubmit}>
            提交
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Content;`;
