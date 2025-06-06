import React, { useRef } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DraggableFormListContext from "@/components/formLists/DraggableFormListContext";
import useFixHeight from "@/components/formLists/DraggableFormListContext/hooks/useFixHeight";
import WithValidateMessage from "@/components/formItems/WithValidateMessage";
import InputAndCheckbox from "@/components/formItems/InputAndCheckbox";
import RangePickerAndCheckbox from "@/components/formItems/RangePickerAndCheckbox";
import styles from "./index.module.scss";

const DRAGGABLE_HEIGHT = 48;
const REQUIRED_FORM_ITEM_RULES = [{ required: true, message: "必填项" }];

const Content = () => {
  const [form] = Form.useForm();
  const containerRef = useRef<HTMLDivElement>(null);
  const { droppableHeight, onAdd, onRemove } = useFixHeight(
    containerRef,
    DRAGGABLE_HEIGHT
  );
  const rows = useRef<number>(1);

  const onAddClick = (add: any) => {
    if (rows.current >= 5) {
      message.warning("最多可增加5条数据");
      return;
    }
    onAdd(add);
    rows.current = rows.current + 1;
  };

  const onRemoveClick = (remove: any, index: number) => {
    if (rows.current <= 1) {
      message.warning("最少要有1条数据");
      return;
    }
    onRemove(remove, index);
    rows.current = rows.current - 1;
  };

  // 点击提交
  const onSubmit = async () => {
    try {
      const values = await form?.validateFields();
      console.log("values:", values);
    } catch (err) {}
  };

  return (
    <Form
      form={form}
      name='draggableWithValidateFormListSampleForm'
      labelAlign='right'
      initialValues={{
        fieldList: [{}],
      }}
    >
      <Form.List name='fieldList'>
        {(fields, { add, move, remove }) => (
          <>
            <div className={styles.itemTitleRow}>
              <Button
                type='primary'
                icon={<PlusOutlined />}
                ghost
                onClick={() => onAddClick(add)}
              >
                新增
              </Button>
            </div>
            <div
              style={{
                width: "100%",
                height: droppableHeight > 0 ? `${droppableHeight}px` : "auto",
              }}
              ref={containerRef}
            >
              <DraggableFormListContext
                droppableId='fieldList'
                fields={fields}
                showToTop
                move={move}
                remove={(index) => onRemoveClick(remove, index as number)}
              >
                {(quote) => (
                  <div className={styles.formListRow}>
                    <Form.Item
                      {...quote}
                      name={[quote.name, "id"]}
                      hidden
                    ></Form.Item>
                    <Form.Item
                      {...quote}
                      label='字段1'
                      name={[quote.name, "field1"]}
                      rules={REQUIRED_FORM_ITEM_RULES}
                    >
                      <WithValidateMessage
                        form={form}
                        style={{ width: "214px" }}
                      >
                        <Input />
                      </WithValidateMessage>
                    </Form.Item>
                    <Form.Item
                      {...quote}
                      label='字段2'
                      name={[quote.name, "field2"]}
                      rules={REQUIRED_FORM_ITEM_RULES}
                    >
                      <WithValidateMessage
                        form={form}
                        style={{ width: "214px" }}
                      >
                        <Select
                          options={[
                            { label: "工作日", value: "workingDay" },
                            { label: "自然日", value: "naturalDay" },
                          ]}
                          style={{ width: "200px" }}
                        />
                      </WithValidateMessage>
                    </Form.Item>
                    <Form.Item
                      {...quote}
                      label='字段3'
                      name={[quote.name, "field3"]}
                      rules={REQUIRED_FORM_ITEM_RULES}
                    >
                      <WithValidateMessage
                        form={form}
                        style={{ width: "214px" }}
                      >
                        <InputAndCheckbox />
                      </WithValidateMessage>
                    </Form.Item>
                    <Form.Item
                      {...quote}
                      label='字段4'
                      name={[quote.name, "field4"]}
                      rules={REQUIRED_FORM_ITEM_RULES}
                    >
                      <WithValidateMessage
                        form={form}
                        style={{ width: "294px" }}
                      >
                        <RangePickerAndCheckbox />
                      </WithValidateMessage>
                    </Form.Item>
                  </div>
                )}
              </DraggableFormListContext>
            </div>
          </>
        )}
      </Form.List>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button type='primary' onClick={onSubmit}>
          提交
        </Button>
      </div>
    </Form>
  );
};

export default Content;
