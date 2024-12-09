export const indexTextCode = `/**
 * 可上下拖拽排序的Form.List的包装组件
 */
import React, { useCallback, ReactNode } from "react";
import useFormDisabled from "hooks/useFormDisabled";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import type { DroppableProvided } from "react-beautiful-dnd";
import DraggableFormListRow from "./DraggableFormListRow";

type DraggableFormListContextProps = {
  droppableId: string;
  fields: Record<string, any>[];
  move: (from: number, to: number) => void;
  children: (quote: Record<string, any>, index?: number) => ReactNode;
  remove?: (index: number | number[]) => void;
  showToTop?: boolean; // 是否显示置顶按钮
  disabled?: boolean;
};

const DraggableFormListContext = (props: DraggableFormListContextProps) => {
  const {
    droppableId = "",
    fields,
    move,
    children,
    remove,
    showToTop = false,
    disabled: selfDisabled,
  } = props;
  const disabled = useFormDisabled(selfDisabled);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (
      source &&
      destination &&
      source.droppableId == destination.droppableId &&
      source.index !== destination.index
    ) {
      const from = source.index;
      const to = destination.index;
      move(from, to);
    }
  };

  const handleToTop = useCallback((index: number) => {
    move(index, 0);
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided: DroppableProvided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {fields.map((quote: any, index: number) => {
              const { key, ...restQuoteProps } = quote;
              return (
                <DraggableFormListRow
                  quote={quote}
                  index={index}
                  remove={remove}
                  onToTop={showToTop ? handleToTop : null}
                  disabled={disabled}
                  key={key}
                >
                  {children(restQuoteProps, index)}
                </DraggableFormListRow>
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableFormListContext;`;

export const draggableFormListRowTextCode = `/**
 * 可增加和删除多条数据的包装组件
 */
import React, { ReactNode } from "react";
import { Draggable } from "react-beautiful-dnd";
import type { DraggableProvided } from "react-beautiful-dnd";
import {
  HolderOutlined,
  VerticalAlignTopOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import classnams from "classnames";
import styles from "./index.module.scss";

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
              className={classnams({
                [styles.defaultBtn]: true,
                [styles.disabled]: disabled,
              })}
              style={{ marginRight: "8px" }}
            >
              <HolderOutlined />
            </div>
            {children}
            {remove && (
              <div
                className={classnams({
                  [styles.removeBtn]: true,
                  [styles.disabled]: disabled,
                })}
                style={{ marginLeft: "10px" }}
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
                className={classnams({
                  [styles.defaultBtn]: true,
                  [styles.disabled]: disabled,
                })}
                style={{ marginLeft: "10px" }}
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

export default DraggableFormListRow;`;

export const indexScssTextCode = `.draggableRow {
  display: flex;
  align-items: center;
  padding: 8px 0;

  $btnSize: 16px;
  .defaultBtn:not(.disabled) {
    cursor: pointer;
    :global {
      svg {
        width: $btnSize;
        height: $btnSize;
        path {
          fill: $globalPrimaryColor;
        }
      }
    }
  }

  .removeBtn:not(.disabled) {
    cursor: pointer;
    :global {
      svg {
        width: $btnSize;
        height: $btnSize;
        path {
          fill: $globalRedColor;
        }
      }
    }
  }

  .disabled {
    cursor: not-allowed !important;
    :global {
      svg {
        width: $btnSize;
        height: $btnSize;
        path {
          fill: $disabledColor;
        }
      }
    }
  }
}`;
