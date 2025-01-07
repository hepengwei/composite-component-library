import React, { useEffect, useState } from "react";
import { Table, Button, Tooltip } from "antd";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { columns } from "../index.data";
import {
  sortRedNumber,
  getForecastWinPrize,
  getSortDataSource,
} from "utils/welfareLottery";
import ForecastNextModal from "./ForecastNextModal";

const Forecast6 = () => {
  const { dualColouredBallDataSource } = useGlobalContext();
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [forecastNumberList, setForecastNumberList] = useState<string[]>([]);

  const createNumberList = (
    redNumberObj: Record<string, number>,
    blueNumberObj: Record<string, number>
  ) => {
    const redMoreSortData: string[] = [];
    const redNumbers = Object.keys(redNumberObj);
    for (let i = 0, l = redNumbers.length; i < l; i++) {
      const number = redNumbers[i];
      const num = redNumberObj[number];
      for (let j = 0; j < 10; j++) {
        if (redMoreSortData[j]) {
          if (num > redNumberObj[redMoreSortData[j]]) {
            redMoreSortData.splice(j, 0, number);
            break;
          }
        } else {
          redMoreSortData.push(number);
          break;
        }
      }
    }
    const blueMoreSortData: string[] = [];
    const blueNumbers = Object.keys(blueNumberObj);
    for (let i = 0, l = blueNumbers.length; i < l; i++) {
      const number = blueNumbers[i];
      const num = blueNumberObj[number];
      for (let j = 0; j < 6; j++) {
        if (blueMoreSortData[j]) {
          if (num > blueNumberObj[blueMoreSortData[j]]) {
            blueMoreSortData.splice(j, 0, number);
            break;
          }
        } else {
          blueMoreSortData.push(number);
          break;
        }
      }
    }

    const numberList: string[] = sortRedNumber(
      redMoreSortData.slice(3, 9)
    ).concat(blueMoreSortData.slice(0, 1));

    return numberList;
  };

  const getTableData = () => {
    const datSource = getSortDataSource(dualColouredBallDataSource);

    const newTableData: Record<string, any>[] = [];
    const redNumberObj: Record<string, number> = {};
    const blueNumberObj: Record<string, number> = {};
    for (let i = Math.floor(datSource.length / 2); i >= 0; i--) {
      if (i === Math.floor(datSource.length / 2)) {
        const data = datSource.slice(i + 1);
        data.forEach((item: Record<string, any>) => {
          const { red, blue } = item;

          const numberList = red.split(",");
          numberList.forEach((number: string) => {
            if (redNumberObj[number]) {
              redNumberObj[number] += 1;
            } else {
              redNumberObj[number] = 1;
            }
          });

          if (blueNumberObj[blue]) {
            blueNumberObj[blue] += 1;
          } else {
            blueNumberObj[blue] = 1;
          }
        });
      } else {
        const { red, blue } = datSource[i + 1];
        const numberList = red.split(",");
        numberList.forEach((number: string) => {
          if (redNumberObj[number]) {
            redNumberObj[number] += 1;
          } else {
            redNumberObj[number] = 1;
          }
        });

        if (blueNumberObj[blue]) {
          blueNumberObj[blue] += 1;
        } else {
          blueNumberObj[blue] = 1;
        }
      }

      const numberList = createNumberList(redNumberObj, blueNumberObj);

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

    const redNumberObj: Record<string, number> = {};
    const blueNumberObj: Record<string, number> = {};
    datSource.forEach((item: Record<string, any>) => {
      const { red, blue } = item;

      const numberList = red.split(",");
      numberList.forEach((number: string) => {
        if (redNumberObj[number]) {
          redNumberObj[number] += 1;
        } else {
          redNumberObj[number] = 1;
        }
      });

      if (blueNumberObj[blue]) {
        blueNumberObj[blue] += 1;
      } else {
        blueNumberObj[blue] = 1;
      }
    });

    const numberList = createNumberList(redNumberObj, blueNumberObj);
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
          计算出往期所有开奖号码中出现红球号码最多的前10个号码,取其中第3到第8个号码，以次取到6个号码作为预测的红球号码；计算出往期所有开奖号码中出现蓝球号码最多的前6个号码，取第1个号码作为预测的蓝球号码
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

export default Forecast6;
