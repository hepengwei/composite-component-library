export const contentTextCode = `import React from "react";
import { Form, Row, Col } from "antd";
import RangePickerAndCheckbox from "@/components/formItems/RangePickerAndCheckbox";

const Content = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} labelAlign='right'>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label='字段标题' name='field1'>
            <RangePickerAndCheckbox checkboxLabel='复选框标题' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='字段标题' name='field2'>
            <RangePickerAndCheckbox
              rangePickerProps={{ format: "YYYY/MM/DD" }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Content;`;
