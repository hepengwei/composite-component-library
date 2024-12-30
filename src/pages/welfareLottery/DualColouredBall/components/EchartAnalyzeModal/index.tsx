import React, { useMemo } from "react";
import { Modal } from "antd";
import dayjs from "dayjs";
import { cloneDeep } from "lodash-es";
import ColumnBar from "components/Echarts/ColumnBar";
import { useGlobalContext } from "@/hooks/useGlobalContext";

type EchartAnalyzeModalProps = {
  open: boolean;
  onCancel: () => void;
};

const EchartAnalyzeModal = (props: EchartAnalyzeModalProps) => {
  const { open, onCancel } = props;
  const { dualColouredBallDataSource } = useGlobalContext();

  const getTop6 = (dataSource: Record<string, any>[]) => {
    let redData: [string, number][] = [];
    let blueData: [string, number][] = [];
    
    if (dataSource && dataSource.length > 0) {
      const redNumberObj: Record<string, number> = {};
      const blueNumberObj: Record<string, number> = {};
      dataSource.forEach((item: Record<string, any>) => {
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

      const redSortData: string[] = [];
      const redNumbers = Object.keys(redNumberObj);
      for (let i = 0, l = redNumbers.length; i < l; i++) {
        const number = redNumbers[i];
        const num = redNumberObj[number];
        for (let j = 0; j < 6; j++) {
          if (redSortData[j]) {
            if (num > redNumberObj[redSortData[j]]) {
              redSortData.splice(j, 0, number);
              break;
            }
          } else {
            redSortData.push(number);
            break;
          }
        }
      }

      redData = redSortData
        .slice(0, 6)
        .map((number) => [`${number} 号`, redNumberObj[number]]);

      const blueSortData: string[] = [];
      const blueNumbers = Object.keys(blueNumberObj);
      for (let i = 0, l = blueNumbers.length; i < l; i++) {
        const number = blueNumbers[i];
        const num = blueNumberObj[number];
        for (let j = 0; j < 6; j++) {
          if (blueSortData[j]) {
            if (num > blueNumberObj[blueSortData[j]]) {
              blueSortData.splice(j, 0, number);
              break;
            }
          } else {
            blueSortData.push(number);
            break;
          }
        }
      }

      blueData = blueSortData
        .slice(0, 6)
        .map((number) => [`${number} 号`, blueNumberObj[number]]);
    }

    return { redData, blueData };
  };

  const { echartData1, echartData2, echartData3, echartData4 } = useMemo(() => {
    const { redData, blueData } = getTop6(dualColouredBallDataSource);

    let datSource = cloneDeep(dualColouredBallDataSource);
    datSource = datSource
      .sort((prev, next) => {
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
      })
      .slice(0, 6);
    const { redData: recentRedData, blueData: recentBlueData } =
      getTop6(datSource);

    return {
      echartData1: { dataSource: redData },
      echartData2: { dataSource: blueData },
      echartData3: { dataSource: recentRedData },
      echartData4: { dataSource: recentBlueData },
    };
  }, [dualColouredBallDataSource]);

  return (
    <Modal
      title='图表分析'
      width={800}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          所有红球出现频次最多的6个号码：
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "400px",
            marginTop: "8px",
          }}
        >
          <ColumnBar data={echartData1} />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "15px",
            fontWeight: "600",
            marginTop: "8px",
            paddingTop: "12px",
            borderTop: "1px dashed #bbbbbb",
          }}
        >
          所有蓝球出现频次最多的6个号码：
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "400px",
            marginTop: "8px",
          }}
        >
          <ColumnBar data={echartData2} color='#0A5EB0' />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "15px",
            fontWeight: "600",
            marginTop: "8px",
            paddingTop: "12px",
            borderTop: "1px dashed #bbbbbb",
          }}
        >
          近6期红球出现频次最多的6个号码（红球热号）：
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "400px",
            marginTop: "8px",
          }}
        >
          <ColumnBar data={echartData3} />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "15px",
            fontWeight: "600",
            marginTop: "8px",
            paddingTop: "12px",
            borderTop: "1px dashed #bbbbbb",
          }}
        >
          近6期蓝球出现频次最多的6个号码（蓝球热号）：
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "400px",
            marginTop: "8px",
          }}
        >
          <ColumnBar data={echartData4} color='#0A5EB0' />
        </div>
      </div>
    </Modal>
  );
};

export default EchartAnalyzeModal;
