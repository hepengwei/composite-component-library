/**
 * 可进行拖拽的公共弹框组件
 */
import React, { useState, useMemo, useRef, ReactNode } from "react";
import { Modal, Button, ModalProps } from "antd";
import Draggable from "react-draggable";
import type { DraggableData, DraggableEvent } from "react-draggable";
import classnams from "classnames";
import styles from "./index.module.scss";
import { indexTextCode, indexScssTextCode } from "./code";

interface BaseModalProps extends ModalProps {
  width?: number; // 弹框的宽度
  size?: "small" | "middle" | "large"; // 弹框的尺寸，分为大中小三个宽度，默认为middle，有传width则按照width来显示宽度
  title?: ReactNode; // 弹框的顶部标题
  open?: boolean; // 弹框是否显示
  confirmLoading?: boolean; // 弹框是否为loading状态
  onCancel: () => void;
  onOk?: () => void;
  cancelText?: string;
  okText?: string;
  footer?: ReactNode | null;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  okLoading?: boolean; // 保存按钮是否为loading状态
}

const BaseModal = (props: BaseModalProps) => {
  const {
    width,
    size = "middle",
    title = "",
    open = false,
    confirmLoading = false,
    onCancel,
    onOk,
    cancelText = "取消",
    okText = "保存",
    footer,
    className = "",
    children = null,
    disabled = false,
    okLoading = false,
    ...restPorps
  } = props;
  const [draggableDisabled, setDraggableDisabled] = useState<boolean>(true);
  const [bounds, setBounds] = useState<{
    left: number;
    right: number;
    top: number;
    bottom: number;
  }>({ left: 0, right: 0, top: 0, bottom: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);

  const onDragStart = (_: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    if (draggleRef.current) {
      const { left, right, top, bottom } =
        draggleRef.current.getBoundingClientRect();
      setBounds({
        left: -left + uiData.x, // 当拖动边界的左边有距离时，只需加上那个距离就行了
        right: clientWidth - (right - uiData.x), // 当拖动边界的左边有距离时，只需加上那个距离就行了
        top: -top + uiData.y, // 当拖动边界的上边有距离时，只需加上那个距离就行了
        bottom: clientHeight - (bottom - uiData.y), // 当拖动边界的上边有距离时，只需加上那个距离就行了
      });
    }
  };

  const finalWidth = useMemo(() => {
    if (width) return width;
    return size === "large" ? 1220 : size === "small" ? 600 : 1080;
  }, [width, size]);

  return (
    <Modal
      maskClosable={false}
      {...restPorps}
      className={classnams({
        [styles.baseModal]: true,
        [className]: !!className,
      })}
      open={open}
      width={finalWidth}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      footer={null}
      modalRender={(modal) => (
        <Draggable
          disabled={draggableDisabled}
          bounds={bounds}
          nodeRef={draggleRef}
          onStart={onDragStart}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    >
      <div
        className={styles.modalHeader}
        onMouseEnter={() => {
          if (draggableDisabled) {
            setDraggableDisabled(false);
          }
        }}
        onMouseLeave={() => {
          setDraggableDisabled(true);
        }}
      >
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.modalContent}>{children}</div>
      {footer !== null && (
        <div className={styles.modalFooter}>
          {footer || (
            <>
              <Button onClick={onCancel}>{cancelText}</Button>
              {!disabled && onOk && (
                <Button type='primary' loading={okLoading} onClick={onOk}>
                  {okText}
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </Modal>
  );
};

export default BaseModal;

export const fileCodeList = [
  { fileName: "BaseModal.tsx", code: indexTextCode },
  {
    fileName: "BaseModal.module.scss",
    code: indexScssTextCode,
  },
];