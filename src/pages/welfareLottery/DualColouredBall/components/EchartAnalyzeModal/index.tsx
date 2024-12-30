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
    const redNumberObj: Record<string, number> = {};

    if (dataSource && dataSource.length > 0) {
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

    return { redData, blueData, redNumberObj };
  };

  const {
    echartData1,
    echartData2,
    echartData3,
    echartData4,
    neverAppearRedData,
  } = useMemo(() => {
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
      .slice(0, 10);
    const {
      redData: recentRedData,
      blueData: recentBlueData,
      redNumberObj,
    } = getTop6(datSource);

    const redNumberList = Object.keys(redNumberObj);
    const neverAppearRedData: string[] = [];
    for (let i = 1; i <= 33; i++) {
      const number = i.toString().padStart(2, "00");
      if (!redNumberList.includes(number)) {
        neverAppearRedData.push(number);
      }
    }

    return {
      echartData1: { dataSource: redData },
      echartData2: { dataSource: blueData },
      echartData3: { dataSource: recentRedData },
      echartData4: { dataSource: recentBlueData },
      neverAppearRedData,
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
          近10期红球出现频次最多的6个号码（红球热号）：
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
          近10期蓝球出现频次最多的6个号码（蓝球热号）：
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
          近10期红球一次都没出现的号码（红球冷号）：
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 80,
            border: "1px dashed #bbbbbb",
            marginTop: "8px",
          }}
        >
          {neverAppearRedData && neverAppearRedData.length > 0
            ? neverAppearRedData.map((number: string, index: number) => (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    margin: "0 20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "#FFFFFF",
                    backgroundColor: "#aaaaaa",
                  }}
                  key={index}
                >
                  {number}
                </div>
              ))
            : null}
        </div>
      </div>
    </Modal>
  );
};

export default EchartAnalyzeModal;
