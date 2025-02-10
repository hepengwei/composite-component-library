import React, { useCallback, useEffect, useState } from "react";
import { Form, Row, Col, Checkbox } from "antd";
import FocusableFormItem from "@/components/formItems/FocusableFormItem";
import CustomMultiSelect from "@/components/formItems/CustomMultiSelect";
import TablePanelMultiSelect from "./TablePanelMultiSelect";
import { requestMockData } from "utils/util";

const Content = () => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getOptions = async () => {
    setLoading(true);
    const res = await requestMockData();
    setLoading(false);
    if (res) {
      setOptions(res.data);
    } else {
      setOptions([]);
    }
  };

  const customOptionLabel = useCallback(
    (
      option: Record<string | symbol, any>,
      selectedValue: string[] | undefined
    ) => (
      <div
        style={{ display: "flex", alignItems: "center", width: 450 }}
        key={option.code}
      >
        <Checkbox
          style={{ marginRight: 4 }}
          checked={selectedValue?.includes(option.code)}
        />
        <span
          style={{
            display: "flex",
            flex: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {option.name}
        </span>
        <span
          style={{
            display: "flex",
            flex: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {option.code}
        </span>
      </div>
    ),
    []
  );

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <Form form={form} name='customMultiSelectSampleForm' labelAlign='right'>
      <Row gutter={16}>
        <Col span={12}>
          <FocusableFormItem label='字段标题' name='field1'>
            <CustomMultiSelect
              options={options}
              loading={loading}
              fieldNames={{ label: "name", value: "code" }}
              searchKeys={["name"]}
            />
          </FocusableFormItem>
        </Col>
        <Col span={12}>
          <FocusableFormItem label='字段标题' name='field2'>
            <CustomMultiSelect
              options={options}
              loading={loading}
              fieldNames={{ label: "name", value: "code" }}
              searchKeys={["name"]}
              showSimplePlaceholder
            />
          </FocusableFormItem>
        </Col>
        <Col span={12}>
          <FocusableFormItem label='字段标题' name='field3'>
            <CustomMultiSelect
              options={options}
              customOptionLabel={customOptionLabel}
              loading={loading}
              fieldNames={{ label: "name", value: "code" }}
              searchKeys={["name"]}
              popupMatchSelectWidth={false}
            />
          </FocusableFormItem>
        </Col>
        <Col span={12}>
          <FocusableFormItem label='字段标题' name='field4'>
            <TablePanelMultiSelect
              options={options}
              loading={loading}
              showSimplePlaceholder
            />
          </FocusableFormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default Content;
