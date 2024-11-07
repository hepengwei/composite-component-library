import React from 'react';
import { Form, Row, Col, Select } from 'antd';
import SampleBox from '@/components/SampleBox';
import InputAndCheckbox from '@/components/formItems/InputAndCheckbox';
import styles from './index.module.scss';

const { Option } = Select;

const InputAndCheckboxSample = () => {
  const [form] = Form.useForm();

  const selectBefore = (
    <Select defaultValue='http://'>
      <Option value='http://'>http://</Option>
      <Option value='https://'>https://</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue='.com'>
      <Option value='.com'>.com</Option>
      <Option value='.jp'>.jp</Option>
      <Option value='.cn'>.cn</Option>
      <Option value='.org'>.org</Option>
    </Select>
  );

  return (
    <SampleBox title='左边输入框右边复选框的复合组件'>
      <Form form={form} labelAlign='right' className={styles.container}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='字段标题' name='field1'>
              <InputAndCheckbox
                inputProps={{
                  addonBefore: selectBefore,
                  addonAfter: selectAfter,
                }}
                checkboxLabel='复选框标题'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='字段标题' name='field2'>
              <InputAndCheckbox />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </SampleBox>
  );
};

export default InputAndCheckboxSample;
