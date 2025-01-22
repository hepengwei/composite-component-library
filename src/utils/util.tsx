import React, { Suspense } from "react";
import dayjs from "dayjs";
import SuspenseLoading from "components/SuspenseLoading";

/**
 * 返回随机ID
 * @param {number} length 数据长度 默认6位
 */
export const getRandomId = (length = 6) => {
  return `${Math.random()}`.slice(2, length + 2);
};

/**
 * 保存文本到剪切板
 * @param {string} text 文本
 */
export const saveTextToClip = (text: string) => {
  if (!text) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const input = document.createElement("input");
    input.setAttribute("value", text);
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }
};

/**
 * 获取字符串的宽度
 * @text   将要被提取的原字符串
 * @fontSize  字符串显示时的字符大小，支持>=12
 * @fontWeight  字符串显示时的字符粗细
 */
export const getTextWidth = (
  text: string,
  fontSize: number,
  fontWeight = 400
) => {
  const span = document.createElement("span") as HTMLSpanElement;
  span.style.visibility = "hidden";
  span.style.padding = "0";
  span.style.whiteSpace = "nowrap";
  span.style.overflow = "visible";
  span.style.fontSize = fontSize > 12 ? fontSize + "px" : "12px";
  span.style.fontWeight = fontWeight.toString();
  span.innerText = text;
  document.body.appendChild(span);
  const width = span.offsetWidth;
  document.body.removeChild(span);
  return width;
};

/**
 * 获取固定宽度的字符串，如果传入的text的宽度不够width,则返回原字符串
 * @text   将要被提取的原字符串
 * @width  想要提取的字符串长度
 * @fontSize  字符串显示时的字符大小，支持>=12
 * @fontWeight  字符串显示时的字符粗细
 * @isNeedEllipsis   当text的宽度大于width时是否需要省略号，会在传入的width基础上加，最后返回字符串宽度会>width
 */
export const getFixedWidthText = (
  text: string,
  width: number,
  fontSize = 12,
  fontWeight = 400,
  isNeedEllipsis = true
) => {
  let returnText = "";
  let oldText = "";
  let newText = "";
  if (!text || width < fontSize || typeof text !== "string") return returnText;
  const arr = text.split("");
  const span = document.createElement("span") as HTMLSpanElement;
  span.style.visibility = "hidden";
  span.style.padding = "0";
  span.style.whiteSpace = "nowrap";
  span.style.overflow = "visible";
  span.style.fontSize = fontSize > 12 ? fontSize + "px" : "12px";
  span.style.fontWeight = fontWeight.toString();
  document.body.appendChild(span);

  for (let i = 0, l = arr.length; i < l; i++) {
    const item = arr[i];
    oldText = newText;
    newText += item;
    returnText = newText;
    span.innerText = newText;
    const nowWidth = span.offsetWidth;
    if (nowWidth > width) {
      if (isNeedEllipsis) {
        returnText = oldText + "...";
      } else {
        returnText = oldText;
      }
      break;
    }
  }

  document.body.removeChild(span);
  return returnText;
};

export const requestMockData = (
  params?: Record<string, any>
): Promise<Record<string, any>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { pageNum = 1, pageSize = 10 } = params || {};
      const data = [];
      for (let i = 0; i < pageSize; i++) {
        const id = ((pageNum - 1) * pageSize + i + 1).toString();
        data.push({
          id,
          num: id,
          email: "123456789@qq.com",
          date:
            Math.random() < 0.9
              ? dayjs()
                  .add(
                    Math.round(
                      (Math.random() - 0.5) * (Math.random() * 100000000)
                    ),
                    "seconds"
                  )
                  .format("YYYY-MM-DD HH:mm:ss")
              : "",
          dateType: Math.random() > 0.5 ? "workingDay" : "naturalDay",
          name: `名字${id}`,
          code: `code${id}`,
          number: Math.random() * 1000,
          remark: new Array(10).fill("这是备注").join(""),
        });
      }
      resolve({
        data,
        pageNum,
        total: 200,
      });
    }, 1200);
  });
};

const LazyElement = (props: {
  importFunc: () => Promise<{
    default: React.ComponentType<any>;
  }>;
  path: string;
}) => {
  const { importFunc, path } = props;
  const LazyComponent = React.lazy(importFunc);
  return (
    <Suspense fallback={<SuspenseLoading />}>
      <LazyComponent />
    </Suspense>
  );
};

export const supportLazyElement = (routes: Record<string, any>[]) => {
  if (!routes || routes.length === 0) return;
  routes.forEach((route) => {
    if (typeof route.element === "function") {
      route.element = (
        <LazyElement importFunc={route.element as any} path={route.path} />
      );
    }
    if (route.children) {
      supportLazyElement(route.children);
    }
  });
};
