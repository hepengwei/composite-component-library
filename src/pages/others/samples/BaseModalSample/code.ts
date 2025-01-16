export const contentTextCode = `import React, { useState } from "react";
import { Button } from "antd";
import Modal1 from "./Modal1";
import Modal2 from "./Modal2";

const Content = () => {
  const [modal1Open, setModal1Open] = useState<boolean>(false);
  const [modal2Open, setModal2Open] = useState<boolean>(false);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        type='primary'
        style={{ marginRight: "8px" }}
        onClick={() => setModal1Open(true)}
      >
        普通弹框
      </Button>
      <Button type='primary' onClick={() => setModal2Open(true)}>
        提示文字弹框
      </Button>
      <Modal1 open={modal1Open} onCancel={() => setModal1Open(false)} />
      <Modal2 open={modal2Open} onCancel={() => setModal2Open(false)} />
    </div>
  );
};

export default Content;`;

export const modal1TextCode = `import React, { useState } from "react";
import { Button } from "antd";
import BaseModal from "@/components/BaseModal";
import Modal2 from "./Modal2";

type Modal1Props = { open?: boolean; onCancel: () => void };

const Modal1 = (props: Modal1Props) => {
  const { open, onCancel } = props;
  const [modal2Open, setModal2Open] = useState<boolean>(false);

  return (
    <BaseModal
      title='普通弹框'
      open={open}
      onCancel={onCancel}
      okText='提交'
      onOk={() => {}}
    >
      <div
        style={{
          width: "100%",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button type='primary' onClick={() => setModal2Open(true)}>
          弹框中再弹框
        </Button>
      </div>
      <Modal2 open={modal2Open} onCancel={() => setModal2Open(false)} />
    </BaseModal>
  );
};

export default Modal1;`;

export const modal2TextCode = `import React from "react";
import { Button } from "antd";
import BaseModal from "@/components/BaseModal";

type Modal2Props = { open?: boolean; onCancel: () => void };

const Modal2 = (props: Modal2Props) => {
  const { open, onCancel } = props;
  return (
    <BaseModal
      size='small'
      title='提示'
      open={open}
      onCancel={onCancel}
      footer={
        <Button type='primary' onClick={onCancel}>
          知道了
        </Button>
      }
    >
      <div
        style={{
          padding: "12px 10px",
        }}
      >
        提示：XXXXXXXXXXXXXXXXXXXX
      </div>
    </BaseModal>
  );
};

export default Modal2;`;
