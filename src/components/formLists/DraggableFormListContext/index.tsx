/**
 * 可上下拖拽排序的Form.List的包装组件
 */
import React, { useCallback, ReactNode } from "react";
import useFormDisabled from "hooks/useFormDisabled";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import type { DroppableProvided } from "react-beautiful-dnd";
import DraggableFormListRow from "./DraggableFormListRow";
import {
  indexTextCode,
  draggableFormListRowTextCode,
  indexScssTextCode,
} from "./code";

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

export default DraggableFormListContext;

export const fileCodeList = [
  { fileName: "DraggableFormListContext.tsx", code: indexTextCode },
  { fileName: "DraggableFormListRow.tsx", code: draggableFormListRowTextCode },
  {
    fileName: "DraggableFormListContext.module.scss",
    code: indexScssTextCode,
  },
];
