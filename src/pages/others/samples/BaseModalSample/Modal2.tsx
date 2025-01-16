import React from "react";
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

export default Modal2;
