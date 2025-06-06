import React from "react";
import { Form, Row, Col, Select } from "antd";
import FocusableFormItem from "@/components/formItems/FocusableFormItem";
import InputAndCheckbox from "@/components/formItems/InputAndCheckbox";

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
    <Form form={form} name='inputAndCheckboxSampleForm' labelAlign='right'>
      <Row gutter={16}>
        <Col span={12}>
          <FocusableFormItem label='字段标题' name='field1'>
            <InputAndCheckbox
              inputProps={{
                addonBefore: selectBefore,
                addonAfter: selectAfter,
              }}
              checkboxLabel='复选框标题'
            />
          </FocusableFormItem>
        </Col>
        <Col span={12}>
          <FocusableFormItem label='字段标题' name='field2'>
            <InputAndCheckbox />
          </FocusableFormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default Content;
