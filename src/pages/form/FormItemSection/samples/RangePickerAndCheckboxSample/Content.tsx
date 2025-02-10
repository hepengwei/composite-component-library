import React from "react";
import { Form, Row, Col } from "antd";
import FocusableFormItem from "@/components/formItems/FocusableFormItem";
import RangePickerAndCheckbox from "@/components/formItems/RangePickerAndCheckbox";

const Content = () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name='rangePickerAndCheckboxSampleForm'
      labelAlign='right'
    >
      <Row gutter={16}>
        <Col span={12}>
          <FocusableFormItem label='字段标题' name='field1'>
            <RangePickerAndCheckbox checkboxLabel='复选框标题' />
          </FocusableFormItem>
        </Col>
        <Col span={12}>
          <FocusableFormItem label='字段标题' name='field2'>
            <RangePickerAndCheckbox
              rangePickerProps={{ format: "YYYY/MM/DD" }}
            />
          </FocusableFormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default Content;
