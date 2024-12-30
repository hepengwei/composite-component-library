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
  const { lottery3DDataSource } = useGlobalContext();

  const getTop6 = (dataSource: Record<string, any>[]) => {
    let data: [string, number][] = [];
    const numberObj: Record<string, number> = {};

    if (dataSource && dataSource.length > 0) {
      dataSource.forEach((item: Record<string, any>) => {
        const { red } = item;
        const numberList = red.split(",");
        numberList.forEach((number: string) => {
          if (numberObj[number]) {
            numberObj[number] += 1;
          } else {
            numberObj[number] = 1;
          }
        });
      });

      const sortData: string[] = [];
      const numbers = Object.keys(numberObj);
      for (let i = 0, l = numbers.length; i < l; i++) {
        const number = numbers[i];
        const num = numberObj[number];
        for (let j = 0; j < 6; j++) {
          if (sortData[j]) {
            if (num > numberObj[sortData[j]]) {
              sortData.splice(j, 0, number);
              break;
            }
          } else {
            sortData.push(number);
            break;
          }
        }
      }

      data = sortData
        .slice(0, 6)
        .map((number) => [`${number} 号`, numberObj[number]]);
    }

    return { data, numberObj };
  };

  const { echartData1, echartData2, neverAppearData } = useMemo(() => {
    const { data } = getTop6(lottery3DDataSource);

    let datSource = cloneDeep(lottery3DDataSource);
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
    const { data: recentData, numberObj } = getTop6(datSource);

    const numberList = Object.keys(numberObj);
    const neverAppearData: string[] = [];
    for (let i = 0; i <= 9; i++) {
      const number = i.toString();
      if (!numberList.includes(number)) {
        neverAppearData.push(number);
      }
    }

    return {
      echartData1: { dataSource: data },
      echartData2: { dataSource: recentData },
      neverAppearData,
    };
  }, [lottery3DDataSource]);

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
          所有球出现频次最多的6个号码
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "400px",
            marginTop: "8px",
          }}
        >
          <ColumnBar data={echartData1} color='#37AFE1' />
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
          近6期出现频次最多的6个号码
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "400px",
            marginTop: "8px",
          }}
        >
          <ColumnBar data={echartData2} color='#37AFE1' />
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
          近6期一次都没出现的号码（冷号）：
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
          {neverAppearData && neverAppearData.length > 0
            ? neverAppearData.map((number: string, index: number) => (
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
