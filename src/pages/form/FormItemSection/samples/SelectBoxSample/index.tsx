import React from "react";
import { Form, Row, Col } from "antd";
import SampleBox from "@/components/SampleBox";
import TreeSelect from "./components/TreeSelect";
import { mock } from "./components/TreeSelect/mock";
import styles from "./index.module.scss";

const SelectBoxSample = () => {
  const [form] = Form.useForm();

  return (
    <SampleBox className={styles.container} title="下拉选择框的复合组件">
      <Form form={form} labelAlign="right">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="字段标题" name="field1">
              <TreeSelect
                value={["4"]}
                options={mock || []}
                onChange={() => {}}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </SampleBox>
  );
};

export default SelectBoxSample;
