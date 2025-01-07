import BigNumber from "bignumber.js";
import dayjs from "dayjs";
import { cloneDeep } from "lodash-es";

/**
 * 获取一个随机整数
 * @param {number} min 最小整数
 * @param {number} max 最大整数
 */
export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 日期排序函数
 * @param field 字段
 */
export const dateSorter = (
  field: string,
  prevRecord: Record<string, any>,
  nextRecord: Record<string, any>
) => {
  if (!prevRecord?.[field]) {
    return -1; // 没有值的，降序时排最后，升序时排最前
  } else if (!nextRecord?.date) {
    return 1; // 没有值的，降序时排最后，升序时排最前
  } else {
    const prevDate = dayjs(prevRecord[field].split("(")[0], "YYYY-MM-DD");
    const nextDate = dayjs(nextRecord[field].split("(")[0], "YYYY-MM-DD");
    if (prevDate > nextDate) {
      return 1;
    } else if (prevDate < nextDate) {
      return -1;
    }
  }
  return 0;
};

/**
 * 金额排序函数
 * @param field 字段
 */
export const moneySorter = (
  field: string,
  prevRecord: Record<string, any>,
  nextRecord: Record<string, any>
) => {
  if (!prevRecord?.[field]) {
    return -1; // 没有值的，降序时排最后，升序时排最前
  } else if (!nextRecord?.[field]) {
    return 1; // 没有值的，降序时排最后，升序时排最前
  } else {
    const prevNum = new BigNumber(prevRecord[field]);
    const nextNum = new BigNumber(nextRecord[field]);
    if (prevNum.gt(nextNum)) {
      return 1;
    } else if (prevNum.lt(nextNum)) {
      return -1;
    }
  }
  return 0;
};

/**
 * 将红色号码从小到大排列
 * @param redNumberList 红色号码数组
 */
export const sortRedNumber = (redNumberList: string[]) => {
  return redNumberList.sort((prev: string, next: string) => {
    if (Number(prev) > Number(next)) {
      return 1;
    } else if (Number(prev) < Number(next)) {
      return -1;
    }
    return 0;
  });
};

/**
 * 给双色球红球去重，不够的随机生成号码
 * @param numberList 预测号码数组
 */
export const removeDuplicateRed = (numberList: string[]) => {
  let redNumberList: string[] = numberList.slice(0, 6);
  const newRedNumberList = new Set(redNumberList);
  redNumberList = [...newRedNumberList];
  while (redNumberList.length < 6) {
    const number = getRandomNumber(1, 33).toString().padStart(2, "00");
    if (!redNumberList.includes(number)) {
      redNumberList.push(number);
    }
  }
  redNumberList = sortRedNumber(redNumberList);
  return [...redNumberList, numberList[6]];
};

/**
 * 获取双色球预测号码中奖情况
 * @param forecastNumberList 预测号码数组
 * @param finalNumberList 开奖号码数组
 */
export const getForecastWinPrize = (
  forecastNumberList: string[],
  finalNumberList: string[]
) => {
  let forecastWinPrize = "未中奖";
  let sameRedNum = 0;
  for (let i = 0; i < 7; i++) {
    if (forecastNumberList[i] === finalNumberList[i]) {
      sameRedNum++;
    }
  }
  if (forecastNumberList[6] === finalNumberList[6]) {
    forecastWinPrize = "六等奖";
    if (sameRedNum === 3) {
      forecastWinPrize = "五等奖";
    } else if (sameRedNum === 4) {
      forecastWinPrize = "四等奖";
    } else if (sameRedNum === 5) {
      forecastWinPrize = "三等奖";
    } else if (sameRedNum === 6) {
      forecastWinPrize = "一等奖";
    }
  } else {
    if (sameRedNum === 4) {
      forecastWinPrize = "五等奖";
    } else if (sameRedNum === 5) {
      forecastWinPrize = "四等奖";
    } else if (sameRedNum === 6) {
      forecastWinPrize = "二等奖";
    }
  }
  return forecastWinPrize;
};

/**
 * 从一组号码中随机返回n个号码
 * @param numberList 原号码数组
 * @param num 返回多少个号码(num如果大于等于numberList.length, 则返回原号码)
 */
export const getNumNumber = (numberList: string[], num: number) => {
  if (numberList && numberList.length > 0 && num >= 1) {
    const originList = cloneDeep(numberList);
    if (num >= numberList.length) {
      return originList;
    }
    const indexList: number[] = [];
    while (indexList.length < num) {
      const index = getRandomNumber(0, numberList.length - 1);
      if (!indexList.includes(index)) {
        indexList.push(index);
      }
    }
    return indexList.map((index: number) => numberList[index]);
  }
  return [];
};

/**
 * 将源数据进行按时间从大到小排序
 * @param dataSource 源数据
 */
export const getSortDataSource = (dataSource: Record<string, any>[]) => {
  let newDatSource = cloneDeep(dataSource);
  newDatSource = newDatSource.sort((prev, next) => {
    if (!prev.date || !next.date) {
      return 1; // 没有值的，排最后
    } else {
      const prevDate = dayjs(prev.date.split("(")[0], "YYYY-MM-DD");
      const nextDate = dayjs(next.date.split("(")[0], "YYYY-MM-DD");
      if (prevDate > nextDate) {
        return -1;
      } else if (prevDate < nextDate) {
        return 1;
      }
    }
    return 0;
  });
  return newDatSource;
};
