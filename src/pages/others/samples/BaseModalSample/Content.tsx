import React, { useState } from "react";
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

export default Content;
