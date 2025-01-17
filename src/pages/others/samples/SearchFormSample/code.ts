export const contentTextCode = `import React, { useState, useRef, useCallback, useEffect } from "react";
import { FormInstance, message } from "antd";
import SearchForm from "components/SearchForm";
import type { FormItemOption } from "components/SearchForm";
import CustomMultiSelect from "@/components/formItems/CustomMultiSelect";
import { requestMockData } from "utils/util";

const Content = () => {
  const formRef = useRef<FormInstance | null>(null);
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

  const formItemList: FormItemOption[] = [
    {
      label: "字段1",
      name: "field1",
    },
    {
      label: "字段2",
      name: "field2",
      fieldType: "InputNumber",
    },
    {
      label: "字段3",
      name: "field3",
      fieldType: "RadioGroup",
      componentProps: {
        options: [
          { label: "是", value: "1" },
          { label: "否", value: "0" },
        ],
      },
    },
    {
      label: "字段4",
      name: "field4",
      fieldType: "CheckboxGroup",
      componentProps: {
        options: [
          { label: "是", value: "1" },
          { label: "否", value: "0" },
        ],
      },
    },
    {
      label: "字段5",
      name: "field5",
      fieldType: "DatePicker",
    },
    {
      label: "字段6",
      name: "field6",
      fieldType: "RangePicker",
    },
    {
      label: "字段7",
      name: "field7",
      fieldType: "Select",
      componentProps: {
        options: [
          { label: "是", value: "1" },
          { label: "否", value: "0" },
        ],
      },
    },
    {
      label: "自定义组件1",
      name: "field8",
      component: (
        <CustomMultiSelect
          options={options}
          loading={loading}
          fieldNames={{ label: "name", value: "code" }}
          searchKeys={["name"]}
        />
      ),
    },
    {
      label: "自定义组件2",
      name: "field9",
      component: (
        <CustomMultiSelect
          options={options}
          loading={loading}
          fieldNames={{ label: "name", value: "code" }}
          searchKeys={["name"]}
        />
      ),
    },
  ];

  const fetchData = (params: Record<string, any>) => {
    message.warning(
      \`发起请求，请求参数为：\${params ? JSON.stringify(params) : ""}\`
    );
  };

  const onSearch = useCallback((formValues: Record<string, any>) => {
    fetchData(formValues);
  }, []);

  const onReset = useCallback(() => {
    formRef.current?.resetFields();
    fetchData({});
  }, []);


  useEffect(() => {
    getOptions();
  }, []);

  return (
    <SearchForm
      formItemList={formItemList}
      onSearch={onSearch}
      onReset={onReset}
      ref={formRef}
    />
  );
};

export default Content;`;
