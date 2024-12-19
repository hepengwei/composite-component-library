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
  const [top5Data, setTop5Data] = useState<string[][]>([]);

  const handleCancel = () => {
    onCancel();
  };

  const computeTop5Data = () => {
    const newTop5Data: string[][] = [];
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
        const top5Data: string[] = [];
        Object.keys(occurrenceNum).forEach((number: string) => {
          const num = occurrenceNum[number];
          for (let i = 0; i < 5; i++) {
            if (top5Data[i]) {
              if (num > occurrenceNum[top5Data[i]]) {
                top5Data[i] = number;
                break;
              }
            } else {
              top5Data[i] = number;
              break;
            }
          }
        });
        newTop5Data.push(top5Data);
      });
    }
    setTop5Data(newTop5Data);
  };

  useEffect(() => {
    computeTop5Data();
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
        {top5Data.map((numberList: string[], index: number) => (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontSize: "15px",
              }}
            >
              第{index + 1}个色球出现次数最多的前5个号码：
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                border: "2px dashed #cccccc",
                marginTop: "6px",
              }}
            >
              {numberList && numberList.length > 0
                ? numberList.map((number: string) => (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        margin: "0 20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#FFFFFF",
                        backgroundColor:
                          index === top5Data.length - 1 ? "#0A5EB0" : "#F72C5B",
                      }}
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
