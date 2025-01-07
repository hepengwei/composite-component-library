import React, { useEffect, useState } from "react";
import { Table, Button, Tooltip } from "antd";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { columns } from "../index.data";
import {
  sortRedNumber,
  removeDuplicateRed,
  getForecastWinPrize,
  getSortDataSource,
} from "utils/welfareLottery";
import ForecastNextModal from "./ForecastNextModal";

const Forecast2 = () => {
  const { dualColouredBallDataSource } = useGlobalContext();
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [forecastNumberList, setForecastNumberList] = useState<string[]>([]);

  const createNumberList = (numberOccurrenceNum: Record<string, number>[]) => {
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
          numberList.push(top6Data[5]);
        } else {
          numberList.push(top6Data[index]);
        }
        if (index === 5) {
          numberList = sortRedNumber(numberList);
        }
      }
    );

    numberList = removeDuplicateRed(numberList);

    return numberList;
  };

  const getTableData = () => {
    const datSource = getSortDataSource(dualColouredBallDataSource);

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

      const numberList = createNumberList(numberOccurrenceNum);

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

  // 预测下一期
  const forecast = () => {
    const datSource = getSortDataSource(dualColouredBallDataSource);

    const numberOccurrenceNum: Record<string, number>[] = [];
    datSource.forEach((item: Record<string, any>) => {
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

    const numberList = createNumberList(numberOccurrenceNum);
    setForecastNumberList(numberList);
  };

  useEffect(() => {
    getTableData();
  }, [dualColouredBallDataSource]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          marginBottom: "4px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginRight: "12px" }}>
          <span style={{ color: "#FF4D4F", whiteSpace: "nowrap" }}>
            预测号码方法：
          </span>
          将第1个红球到第6个红球分别计算出其所在位置红球出现次数最多的前6个号码，然后取第1个红球数组中的第1个号码为预测的第1个号码，取第2个红球数组中的第2个号码为预测的第2个号码,取红球以此类推；计算出所有蓝球出现次数最多的前6个号码，取第6个号码作为预测的蓝球号码；最后给红球去重，不够的随机生成号码
        </div>
        <Tooltip title='使用该方法预测下一期'>
          <Button type='primary' onClick={forecast}>
            预测下一期
          </Button>
        </Tooltip>
      </div>
      <Table
        bordered
        scroll={{ y: 540 }}
        dataSource={tableData}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
      <ForecastNextModal
        numberList={forecastNumberList}
        onCancel={() => setForecastNumberList([])}
      />
    </div>
  );
};

export default Forecast2;
