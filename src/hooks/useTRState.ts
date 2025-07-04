import React from "react";

/**
 *  *******************  用法  *********************
 *  import { useTRState } from "@/hooks/useTRState"; // 导入方法
 *  const [state, setState] = useTRState({
 *    name: '小明'
 *  });
 *  console.log(state.name);  // 输出内容为小明
 *  setState({ name: '小西' });
 *  console.log(state.name);  // 此时 state.name 已变为小西（需在组件内使用最新 state）
 */

/**
 * 通用可变数据状态管理 Hook
 * @param initValue  任意类型的初始化数据对象
 * @param reduce     可选，自定义 reducer 处理函数
 * @returns {[any, Function]}  返回 [state, setState]，state 为当前状态，setState 用于更新状态
 */

export const useTRState = (initValue = {}, reduce?: any) => {
  const reduceHandle = React.useCallback((data: any, action: any) => {
    if (action.type === "changeData") {
      return { ...data, ...action.data };
    }
    reduce && reduce(data, action);
  }, []);
  const [state, dispatch] = React.useReducer(reduceHandle, {
    isLoading: false,
    errorMsg: "",
    ...initValue,
  });

  const setState = React.useCallback((m: any, type = "changeData") => {
    dispatch({ type: type, data: m });
  }, []);
  return [state, setState];
};
