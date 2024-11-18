import React, { useState, useEffect, useRef } from "react";
import { Tooltip, Modal, Alert } from "antd";
import { CoffeeOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import collectionCode from "images/collectionCode.jpeg";
import styles from "./index.module.scss";

const Header: React.FC = () => {
  const { setHeadHeight } = useGlobalContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (containerRef.current) {
      const { height } = containerRef.current.getBoundingClientRect();
      setHeadHeight(height);
    }
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.title}>复合组件示例库</div>
      <Alert
        message='本示例库并非组件库，封装的组件并没有考虑在所有场景下的适配'
        type='warning'
        showIcon
        closable
      />
      <div className={styles.right}>
        <Tooltip placement='bottomRight' title='打赏'>
          <div
            className={styles.btn}
            onClick={() => {
              setOpen(true);
            }}
          >
            <CoffeeOutlined />
          </div>
        </Tooltip>
      </div>
      <Modal
        wrapClassName={styles.rewardModal}
        title='打赏'
        open={open}
        footer={null}
        maskClosable={false}
        width={320}
      >
        <div
          className={styles.closeBtn}
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseCircleOutlined />
        </div>
        <img src={collectionCode} alt='' />
        <p>如果觉得网站不错，内容对你有所帮助，再打赏也不迟</p>
      </Modal>
    </div>
  );
};

export default Header;
