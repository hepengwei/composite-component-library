import React from 'react';
import { Form, Row, Col } from 'antd';
import SampleBox from '@/components/SampleBox';
import InputNumberAndSelect from '@/components/formItems/InputNumberAndSelect';
import styles from './index.module.scss';

const InputNumberAndSelectSample = () => {
  const [form] = Form.useForm();

  return (
    <SampleBox title='左边数值输入框右边下拉框的复合组件'>
      <Form form={form} labelAlign='right' className={styles.container}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='字段标题' name='field1'>
              <InputNumberAndSelect
                options={[
                  { name: '工作日', id: 'workingDay' },
                  { name: '自然日', id: 'naturalDay' },
                ]}
                inputNumberProps={{ addonAfter: '个' }}
                selectProps={{
                  fieldNames: { label: 'name', value: 'id' },
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='字段标题' name='field2'>
              <InputNumberAndSelect
                options={[
                  { label: '年', value: 'year' },
                  { label: '月', value: 'month' },
                  { label: '天', value: 'day' },
                ]}
                inputNumberProps={{ min: 0, max: 10000, precision: 2 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </SampleBox>
  );
};

export default InputNumberAndSelectSample;
