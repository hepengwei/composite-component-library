import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { getRandomNumber } from "utils/util";

type RandomOneModalProps = {
  open: boolean;
  onCancel: () => void;
};

const RED_NUMBER_NUM = 6;
const BLUE_NUMBER_NUM = 1;

const RandomOneModal = (props: RandomOneModalProps) => {
  const { open, onCancel } = props;
  const [randomList, setRandomList] = useState<string[]>([]);

  const handleCancel = () => {
    onCancel();
    setRandomList([]);
  };

  const randomNumber = () => {
    const newRandomList = [];
    for (let i = 0; i < RED_NUMBER_NUM; i++) {
      const number = getRandomNumber(1, 33).toString().padStart(2, "00");
      newRandomList.push(number);
    }
    for (let i = 0; i < BLUE_NUMBER_NUM; i++) {
      const number = getRandomNumber(1, 16).toString().padStart(2, "00");
      newRandomList.push(number);
    }
    setRandomList(newRandomList);
  };

  useEffect(() => {
    if (open) {
      randomNumber();
    } else {
      setRandomList([]);
    }
  }, [open]);

  return (
    <Modal
      title='随机一个'
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
          {randomList && randomList.length > 0
            ? randomList.map((number: string, index: number) => (
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
                      index === randomList.length - 1 ? "#0A5EB0" : "#F72C5B",
                  }}
                  key={index}
                >
                  {number}
                </div>
              ))
            : null}
        </div>
        <Button
          type='primary'
          size='large'
          onClick={randomNumber}
          style={{ marginTop: "30px" }}
        >
          换一个
        </Button>
      </div>
    </Modal>
  );
};

export default RandomOneModal;
