import React from "react";
import { Form, Row, Col } from "antd";
import RadioGroupAndSelect from "@/components/formItems/RadioGroupAndSelect";

const RADIO_GROUP_OPTIONS = [
  { label: "工作日", value: "workingDay" },
  { label: "自然日", value: "naturalDay" },
];
const SELECT_OPTIONS = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
];

const Content = () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      labelAlign='right'
      initialValues={{ field1: [0, undefined] }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label='字段标题' name='field1'>
            <RadioGroupAndSelect selectOptions={SELECT_OPTIONS} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='字段标题' name='field2'>
            <RadioGroupAndSelect
              radioGroupOptions={RADIO_GROUP_OPTIONS}
              whenShowSelect='workingDay'
              reserveSelectValue
              selectOptions={SELECT_OPTIONS}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Content;