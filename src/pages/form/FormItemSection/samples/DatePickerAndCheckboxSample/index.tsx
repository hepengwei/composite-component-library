import React from 'react';
import { Form, Row, Col } from 'antd';
import SampleBox from '@/components/SampleBox';
import DatePickerAndCheckbox from '@/components/formItems/DatePickerAndCheckbox';
import styles from './index.module.scss';

const DatePickerAndCheckboxSample = () => {
  const [form] = Form.useForm();

  return (
    <SampleBox
      className={styles.container}
      title='左边日期选择框右边复选框的复合组件'
    >
      <Form form={form} labelAlign='right'>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='字段标题' name='field1'>
              <DatePickerAndCheckbox checkboxLabel='复选框标题' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='字段标题' name='field2'>
              <DatePickerAndCheckbox
                datePickerProps={{ format: 'YYYY/MM/DD' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </SampleBox>
  );
};

export default DatePickerAndCheckboxSample;
