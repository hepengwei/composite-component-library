/**
 * 可增加和删除多条数据的包装组件
 */
import React, { ReactNode } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import type { DraggableProvided } from 'react-beautiful-dnd';
import {
  HolderOutlined,
  VerticalAlignTopOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';

type DraggableFormListRowProps = {
  quote: Record<string, any>;
  index: number;
  children: ReactNode;
  remove?: ((index: number) => void) | null;
  onToTop?: ((index: number) => void) | null;
  disabled?: boolean;
};

const DraggableFormListRow = (props: DraggableFormListRowProps) => {
  const { quote, index, children, remove, onToTop, disabled = false } = props;

  return (
    <Draggable draggableId={quote.key.toString()} index={index}>
      {(provided: DraggableProvided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div className={styles.draggableRow}>
            <div
              {...(!disabled ? provided.dragHandleProps : {})}
              className={`${styles.defaultBtn}${
                disabled ? ` ${styles.disabled}` : ''
              }`}
              style={{ marginRight: '8px' }}
            >
              <HolderOutlined />
            </div>
            {children}
            {remove && (
              <div
                className={`${styles.removeBtn}${
                  disabled ? ` ${styles.disabled}` : ''
                }`}
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  if (disabled) return;
                  remove(index);
                }}
              >
                <MinusCircleOutlined />
              </div>
            )}
            {onToTop && (
              <div
                className={`${styles.defaultBtn}${
                  disabled ? ` ${styles.disabled}` : ''
                }`}
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  if (index === 0) return;
                  if (disabled) return;
                  onToTop(index);
                }}
              >
                <VerticalAlignTopOutlined />
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableFormListRow;
