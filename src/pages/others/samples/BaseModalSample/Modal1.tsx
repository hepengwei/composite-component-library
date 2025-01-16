import React, { useState } from "react";
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

export default Modal1;
