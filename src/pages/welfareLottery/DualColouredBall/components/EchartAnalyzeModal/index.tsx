import React, { useMemo } from "react";
import { Modal } from "antd";
import ColumnBar from "components/Echarts/ColumnBar";
import { useGlobalContext } from "@/hooks/useGlobalContext";

type EchartAnalyzeModalProps = {
  open: boolean;
  onCancel: () => void;
};

const EchartAnalyzeModal = (props: EchartAnalyzeModalProps) => {
  const { open, onCancel } = props;
  const { dualColouredBallDataSource } = useGlobalContext();

  const echartData = useMemo(() => {
    let data: [string, number][] = [];
    if (dualColouredBallDataSource && dualColouredBallDataSource.length > 0) {
      const numberObj: Record<string, number> = {};
      dualColouredBallDataSource.forEach((item: Record<string, any>) => {
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
    return { dataSource: data };
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
          }}
        >
          所有红球出现频次最多的6个号码
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "400px",
            marginTop: "8px",
          }}
        >
          <ColumnBar
            data={echartData}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EchartAnalyzeModal;