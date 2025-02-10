export const contentTextCode = `import React from "react";
import { Form, Row, Col, Select } from "antd";
import FocusableFormItem from "@/components/formItems/FocusableFormItem";
import CanAddMultiple from "@/components/formItems/CanAddMultiple";
import InputAndCheckbox from "@/components/formItems/InputAndCheckbox";
import InputNumberAndSelect from "@/components/formItems/InputNumberAndSelect";

const Content = () => {
  const [form] = Form.useForm();

  const selectBefore = (
    <Select
      style={{ width: 90 }}
      defaultValue='http://'
      options={[
        { label: "http://", value: "http://" },
        { label: "https://", value: "https://" },
      ]}
    />
  );
  const selectAfter = (
    <Select
      style={{ width: 80 }}
      defaultValue='.com'
      options={[
        { label: ".com", value: ".com" },
        { label: ".cn", value: ".cn" },
        { label: ".org", value: ".org" },
      ]}
    />
  );

  return (
    <Form form={form} name='canAddMultipleSampleForm' labelAlign='right'>
      <Row gutter={16}>
        <Col span={12}>
          <FocusableFormItem label='字段标题' name='field1'>
            <CanAddMultiple maxRows={5}>
              <InputAndCheckbox
                inputProps={{
                  addonBefore: selectBefore,
                  addonAfter: selectAfter,
                }}
                checkboxLabel='复选框标题'
              />
            </CanAddMultiple>
          </FocusableFormItem>
        </Col>
        <Col span={12}>
          <FocusableFormItem label='字段标题' name='field2'>
            <CanAddMultiple maxRows={6}>
              <InputNumberAndSelect
                style={{ marginRight: "8px" }}
                options={[
                  { name: "工作日", id: "workingDay" },
                  { name: "自然日", id: "naturalDay" },
                ]}
                inputNumberProps={{ addonAfter: "个" }}
                selectProps={{
                  fieldNames: { label: "name", value: "id" },
                }}
              />
            </CanAddMultiple>
          </FocusableFormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default Content;`;
