export const contentTextCode = `import React from "react";
import { Form, Row, Col } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";
import FocusableFormItem from "@/components/formItems/FocusableFormItem";
import CustomRangePicker from "@/components/formItems/CustomRangePicker";

const Content = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} name='customRangePickerSampleForm' labelAlign='right'>
      <Row gutter={16}>
        <Col span={12}>
          <FocusableFormItem label='字段标题' name='field1'>
            <CustomRangePicker />
          </FocusableFormItem>
        </Col>
        <Col span={12}>
          <FocusableFormItem label='字段标题' name='field2'>
            <CustomRangePicker
              placeholder={["开始时间", "结束时间"]}
              datePickerProps={{
                format: "YYYY/MM/DD HH:mm:ss",
                showTime: true,
              }}
              customCenter={<SwapRightOutlined />}
            />
          </FocusableFormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default Content;`;
