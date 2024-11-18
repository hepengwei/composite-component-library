import { useState, useEffect, RefObject } from "react";

const useFixHeight = (
  containerRef: RefObject<HTMLElement>,
  draggableHeight: number
) => {
  const [droppableHeight, setDroppableHeight] = useState<number>(0);

  const onAdd = (add: any) => {
    setDroppableHeight((height) => height + draggableHeight);
    add?.();
  };

  const onRemove = (remove: any, index: number | number[]) => {
    setDroppableHeight((height) => Math.max(height - draggableHeight, 0));
    remove?.(index);
  };

  useEffect(() => {
    if (containerRef.current) {
      const { clientHeight } = containerRef.current;
      setDroppableHeight(clientHeight);
    }
  }, []);

  return {
    droppableHeight,
    setDroppableHeight,
    onAdd,
    onRemove,
  };
};

export default useFixHeight;
