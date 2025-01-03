import React, { useEffect, useState } from "react";
import { Table } from "antd";
import dayjs from "dayjs";
import { cloneDeep } from "lodash-es";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { columns } from "../index.data";
import {
  sortRedNumber,
  removeDuplicateRed,
  getForecastWinPrize,
} from "utils/welfareLottery";

const Forecast1 = () => {
  const { dualColouredBallDataSource } = useGlobalContext();
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);

  const getTableData = () => {
    let datSource = cloneDeep(dualColouredBallDataSource);
    datSource = datSource.sort((prev, next) => {
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

    const newTableData: Record<string, any>[] = [];
    const numberOccurrenceNum: Record<string, number>[] = [];
    for (let i = Math.floor(datSource.length / 2); i >= 0; i--) {
      if (i === Math.floor(datSource.length / 2)) {
        const data = datSource.slice(i + 1);
        data.forEach((item: Record<string, any>) => {
          const { red, blue } = item;
          const numberList = `${red},${blue}`.split(",");
          numberList.forEach((number: string, index: number) => {
            if (numberOccurrenceNum[index]) {
              if (numberOccurrenceNum[index][number]) {
                numberOccurrenceNum[index][number] += 1;
              } else {
                numberOccurrenceNum[index][number] = 1;
              }
            } else {
              numberOccurrenceNum[index] = { [number]: 1 };
            }
          });
        });
      } else {
        const { red, blue } = datSource[i + 1];
        const numberList = `${red},${blue}`.split(",");
        numberList.forEach((number: string, index: number) => {
          if (numberOccurrenceNum[index]) {
            if (numberOccurrenceNum[index][number]) {
              numberOccurrenceNum[index][number] += 1;
            } else {
              numberOccurrenceNum[index][number] = 1;
            }
          } else {
            numberOccurrenceNum[index] = { [number]: 1 };
          }
        });
      }

      let numberList: string[] = [];
      numberOccurrenceNum.forEach(
        (occurrenceNum: Record<string, number>, index: number) => {
          const sortData: string[] = [];
          const occurrenceKeys = Object.keys(occurrenceNum);
          for (let i = 0, l = occurrenceKeys.length; i < l; i++) {
            const number = occurrenceKeys[i];
            const num = occurrenceNum[number];
            for (let j = 0; j < 6; j++) {
              if (sortData[j]) {
                if (num > occurrenceNum[sortData[j]]) {
                  sortData.splice(j, 0, number);
                  break;
                }
              } else {
                sortData.push(number);
                break;
              }
            }
          }
          const top6Data = sortData.slice(0, 6);
          if (index === 6) {
            numberList.push(top6Data[0]);
          } else {
            numberList.push(top6Data[5 - index]);
          }
          if (index === 5) {
            numberList = sortRedNumber(numberList);
          }
        }
      );

      numberList = removeDuplicateRed(numberList);

      const dataItem = datSource[i];
      const forecastWinPrize = getForecastWinPrize(
        numberList,
        `${dataItem.red},${dataItem.blue}`.split(",")
      );

      newTableData.unshift({
        code: dataItem.code,
        date: dataItem.date,
        forecastNumber: numberList.join(","),
        red: dataItem.red,
        blue: dataItem.blue,
        forecastWinPrize,
      });
    }

    setTableData(newTableData);
  };

  useEffect(() => {
    getTableData();
  }, [dualColouredBallDataSource]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "4px" }}>
        <span style={{ color: "#FF4D4F" }}>预测号码方法：</span>
        将第1个红球到第6个红球分别计算出其所在位置红球出现次数最多的前6个号码，然后取第1个红球数组中的第6个号码为预测的第1个号码，取第2个红球数组中的第5个号码为预测的第2个号码,取红球以此类推；计算出所有蓝球出现次数最多的前6个号码，取第1个号码作为预测的蓝球号码；最后给红球去重，不够的随机生成号码
      </div>
      <Table
        bordered
        scroll={{ y: 480 }}
        dataSource={tableData}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </div>
  );
};

export default Forecast1;
