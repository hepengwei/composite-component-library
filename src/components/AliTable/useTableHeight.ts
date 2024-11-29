import { useState, useRef, useMemo, useEffect, useLayoutEffect } from "react";

type UseTableHeigthProps = {
  height?: number;
  autoHeight?: boolean;
  recalculateHeight?: boolean | boolean[];
  pagination?: Record<string, any>;
  style?: Record<string, any>;
};

const useTableHeight = (props: UseTableHeigthProps) => {
  const {
    height,
    autoHeight,
    recalculateHeight,
    pagination,
    style = {},
  } = props;
  const [tableHeight, setTableHeight] = useState(0);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(
    document.documentElement.clientHeight
  );

  let newHeight = height || 0;
  if (autoHeight) {
    newHeight = tableHeight;
  }

  const tableStyle = useMemo(() => {
    const heightStyle = newHeight && { height: newHeight, overflow: "auto" };
    return { ...heightStyle, ...style };
  }, [newHeight]);

  const emptyCellHeight = newHeight
    ? !!pagination
      ? Math.ceil(newHeight - 26 - 4)
      : Math.ceil(newHeight)
    : undefined;

  // 兼容数组使用方式
  const newRecalculateHeight = Array.isArray(recalculateHeight)
    ? recalculateHeight
    : [recalculateHeight];

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(document.documentElement.clientHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    if (autoHeight && tableContainerRef.current) {
      const clientRect = tableContainerRef.current.getBoundingClientRect();
      if (!clientRect.width) return;
      // 26为表格页码功能区高度，4为表格页码功能区距离表格的高度 由于浏览器版本或分辨率问题，导致像素不支持0.5px
      const tableHeight = !!pagination
        ? Math.ceil(clientRect.height - 26 - 4)
        : Math.ceil(clientRect.height);
      setTableHeight(tableHeight);
    }
  }, [...newRecalculateHeight, windowHeight]);

  return { tableStyle, emptyCellHeight, tableContainerRef };
};

export default useTableHeight;
