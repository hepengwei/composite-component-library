import React from "react";
import { Form, Row, Col } from "antd";
import TreeSelect from "./components/TreeSelect";
import { mock } from "./components/TreeSelect/mock";
import styles from "./index.module.scss";

const Content = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} labelAlign="right" className={styles.container}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="字段标题" name="field1">
            <TreeSelect
              title="示例测试"
              defaultValue={["4"]}
              options={mock || []}
              onChange={() => {}}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Content;
