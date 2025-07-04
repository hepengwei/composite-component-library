import React from "react";

/**
 *  *******************  用法  *********************
 *   import { useStaticState } from "@/hooks/useStaticState"; //导入方法
 *   const staticState = useStaticState({
 *     'name':'小明'
 *   });
 *   console.log(staticState.name)  // 输出内容为小明
 *   staticState.name = '小西';
 *   console.log(staticState.name)  // 输出内容为小西
 */

/**
 * 通用静态数据存放方式
 * @param initValue  任意类型初始化数据
 * @returns {any}  返回任何类型数据对象
 */
export const useStaticState = (initValue: any) => {
  const formRef = React.useRef();
  if (!formRef.current) {
    formRef.current = initValue;
  }
  return formRef.current;
};
