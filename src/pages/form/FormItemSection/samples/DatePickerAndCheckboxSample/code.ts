export const contentTextCode = `import React from "react";
import { Form, Row, Col } from "antd";
import FocusableFormItem from "@/components/formItems/FocusableFormItem";
import DatePickerAndCheckbox from "@/components/formItems/DatePickerAndCheckbox";
import styles from "./index.module.scss";

const Content = () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name='datePickerAndCheckboxSampleForm'
      labelAlign='right'
      className={styles.container}
    >
      <Row gutter={16}>
        <Col span={12}>
          <FocusableFormItem label='字段标题' name='field1'>
            <DatePickerAndCheckbox checkboxLabel='复选框标题' />
          </FocusableFormItem>
        </Col>
        <Col span={12}>
          <FocusableFormItem label='字段标题' name='field2'>
            <DatePickerAndCheckbox datePickerProps={{ format: "YYYY/MM/DD" }} />
          </FocusableFormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default Content;`;
