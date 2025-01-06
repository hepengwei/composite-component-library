import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";

const { TextArea } = Input;

type AddDataModalProps = {
  open: boolean;
  onOk: (text: string) => void;
  onCancel: () => void;
};

const AddDataModal = (props: AddDataModalProps) => {
  const { open, onOk, onCancel } = props;
  const [text, setText] = useState<string>("");

  const onDeleteSpecialChart = () => {
    if (text && text.trim()) {
      const newText = text.trim().replaceAll(/\\n/g, "");
      setText(newText);
    } else {
      message.warning("没有数据");
    }
  };

  const handleOk = () => {
    if (text && text.trim()) {
      const newText = text.trim().replaceAll(/\\n/g, "");
      onOk(newText);
      setText("");
    } else {
      message.warning("没有数据");
    }
  };

  const handleCancel = () => {
    onCancel();
    setText("");
  };

  return (
    <Modal
      title='添加数据'
      width={1000}
      open={open}
      onCancel={handleCancel}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
            }}
          >
            打开
            <a href='https://www.cwl.gov.cn/ygkj/wqkjgg/' target='_blank'>
              中国福利彩票官网
            </a>
            ，按F12打开开发者工具面板，将接口返回的响应数据全选复制到上面的文本输入框中
          </div>
          <>
            <Button type='primary' ghost onClick={onDeleteSpecialChart}>
              去掉特殊字符
            </Button>
            <Button
              type='primary'
              style={{ marginLeft: "8px" }}
              onClick={handleOk}
            >
              添加
            </Button>
          </>
        </div>
      }
    >
      <TextArea
        autoSize={{ minRows: 20, maxRows: 30 }}
        value={text}
        onChange={(e) => setText(e.target?.value || "")}
      />
    </Modal>
  );
};

export default AddDataModal;
