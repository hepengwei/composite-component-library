export const contentTextCode = `import React from "react";
import { Form, Row, Col, Select } from "antd";
import CanAddMultiple from "@/components/formItems/CanAddMultiple";
import InputAndCheckbox from "@/components/formItems/InputAndCheckbox";
import InputNumberAndSelect from "@/components/formItems/InputNumberAndSelect";

const { Option } = Select;

const Content = () => {
  const [form] = Form.useForm();

  const selectBefore = (
    <Select defaultValue='http://'>
      <Option value='http://'>http://</Option>
      <Option value='https://'>https://</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue='.com'>
      <Option value='.com'>.com</Option>
      <Option value='.jp'>.jp</Option>
      <Option value='.cn'>.cn</Option>
      <Option value='.org'>.org</Option>
    </Select>
  );

  return (
    <Form form={form} labelAlign='right'>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label='字段标题' name='field1'>
            <CanAddMultiple maxRows={5}>
              <InputAndCheckbox
                inputProps={{
                  addonBefore: selectBefore,
                  addonAfter: selectAfter,
                }}
                checkboxLabel='复选框标题'
              />
            </CanAddMultiple>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='字段标题' name='field2'>
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
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Content;`;
