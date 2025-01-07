import React from "react";
import { Modal } from "antd";

type ForecastNextModalProps = {
  numberList?: string[];
  onCancel: () => void;
};

const ForecastNextModal = (props: ForecastNextModalProps) => {
  const { numberList, onCancel } = props;

  return (
    <Modal
      title='预测'
      width={600}
      open={numberList && numberList.length > 0}
      onCancel={onCancel}
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 100,
            border: "2px dashed #bbbbbb",
            marginTop: "8px",
          }}
        >
          {numberList && numberList.length > 0
            ? numberList.map((number: string, index: number) => (
                <div
                  style={{
                    width: 40,
                    height: 40,
                    margin: "0 8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "#FFFFFF",
                    backgroundColor:
                      index === numberList.length - 1 ? "#0A5EB0" : "#F72C5B",
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

export default ForecastNextModal;
