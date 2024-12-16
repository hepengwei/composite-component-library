import React from "react";
import { Form, Row, Col } from "antd";
import InputNumberAndSelect from "@/components/formItems/InputNumberAndSelect";

const Content = () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      labelAlign='right'
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label='字段标题' name='field1'>
            <InputNumberAndSelect
              options={[
                { name: "工作日", id: "workingDay" },
                { name: "自然日", id: "naturalDay" },
              ]}
              inputNumberProps={{ addonAfter: "个", percision: 8 }}
              selectProps={{
                fieldNames: { label: "name", value: "id" },
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='字段标题' name='field2'>
            <InputNumberAndSelect
              options={[
                { label: "年", value: "year" },
                { label: "月", value: "month" },
                { label: "天", value: "day" },
              ]}
              inputNumberProps={{ min: 0, max: 10000, precision: 2 }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Content;
