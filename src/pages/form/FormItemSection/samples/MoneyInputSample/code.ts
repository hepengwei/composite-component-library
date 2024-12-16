export const contentTextCode = `import React from "react";
import { Form, Row, Col, Button } from "antd";
import MoneyInput from "@/components/formItems/MoneyInput";

const Content = () => {
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      const values = await form?.validateFields();
      console.log("values:", values);
    } catch (err) {}
  };

  return (
    <Form form={form} layout='vertical'>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label='无限制输入' name='field1'>
            <MoneyInput placeholder='请输入' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='precision为2，min为0， max为999.99' name='field2'>
            <MoneyInput precision={2} min={0} max={999.99} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label='precision为0，min为-10000， max为100000'
            name='field3'
          >
            <MoneyInput precision={0} min={-10000} max={10000} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label='precision为8，min为0， max为999999999999.99999999'
            name='field4'
          >
            <MoneyInput precision={8} min={0} max={"999999999999.99999999"} />
          </Form.Item>
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
