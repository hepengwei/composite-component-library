import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useGlobalContext } from "@/hooks/useGlobalContext";

type OccurrenceFrequencyModalProps = {
  open: boolean;
  onCancel: () => void;
};

const OccurrenceFrequencyModal = (props: OccurrenceFrequencyModalProps) => {
  const { dualColouredBallDataSource } = useGlobalContext();
  const { open, onCancel } = props;
  const [top6Data, setTop6Data] = useState<string[][]>([]);

  const handleCancel = () => {
    onCancel();
  };

  const computeTop6Data = () => {
    const newTop6Data: string[][] = [];
    const numberOccurrenceNum: Record<string, number>[] = [];
    if (dualColouredBallDataSource && dualColouredBallDataSource.length > 0) {
      dualColouredBallDataSource.forEach((item: Record<string, any>) => {
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
      numberOccurrenceNum.forEach((occurrenceNum: Record<string, number>) => {
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
        newTop6Data.push(top6Data);
      });
    }
    setTop6Data(newTop6Data);
  };

  useEffect(() => {
    computeTop6Data();
  }, [dualColouredBallDataSource]);

  return (
    <Modal
      title='各色球号码出现频次情况'
      width={600}
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {top6Data.map((numberList: string[], index1: number) => (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
            key={index1}
          >
            <div
              style={{
                fontSize: "15px",
              }}
            >
              第{index1 + 1}个色球出现次数最多的前6个号码：
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                border: "1px dashed #bbbbbb",
                marginTop: "6px",
              }}
            >
              {numberList && numberList.length > 0
                ? numberList.map((number: string, index2: number) => (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        margin: "0 24px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#FFFFFF",
                        backgroundColor:
                          index1 === top6Data.length - 1
                            ? "#0A5EB0"
                            : "#F72C5B",
                      }}
                      key={index2}
                    >
                      {number}
                    </div>
                  ))
                : null}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default OccurrenceFrequencyModal;
