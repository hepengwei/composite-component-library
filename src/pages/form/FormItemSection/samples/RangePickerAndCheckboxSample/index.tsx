import React from 'react';
import { Form, Row, Col } from 'antd';
import SampleBox from '@/components/SampleBox';
import RangePickerAndCheckbox from '@/components/formItems/RangePickerAndCheckbox';
import styles from './index.module.scss';

const RangePickerAndCheckboxSample = () => {
  const [form] = Form.useForm();

  return (
    <SampleBox title='左边日期范围选择框右边复选框的复合组件'>
      <Form form={form} labelAlign='right' className={styles.container}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='字段标题' name='field1'>
              <RangePickerAndCheckbox checkboxLabel='复选框标题' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='字段标题' name='field2'>
              <RangePickerAndCheckbox
                rangePickerProps={{ format: 'YYYY/MM/DD' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </SampleBox>
  );
};

export default RangePickerAndCheckboxSample;
