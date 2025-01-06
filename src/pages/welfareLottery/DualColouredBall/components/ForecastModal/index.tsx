import React from "react";
import { Modal, Tabs } from "antd";
import Forecast1 from "./components/Forecast1";
import Forecast2 from "./components/Forecast2";
import Forecast3 from "./components/Forecast3";
import Forecast4 from "./components/Forecast4";
import Forecast5 from "./components/Forecast5";
import Forecast6 from "./components/Forecast6";
import ComingSoon from "@/components/ComingSoon";

type ForecastModalProps = {
  open: boolean;
  onCancel: () => void;
};

const ForecastModal = (props: ForecastModalProps) => {
  const { open, onCancel } = props;

  return (
    <Modal
      title='预测往期号码及其中奖情况'
      width={1400}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Tabs
        style={{ height: "760px" }}
        items={[
          {
            key: "1",
            label: "方法一",
            children: <Forecast1 />,
          },
          {
            key: "2",
            label: "方法二",
            children: <Forecast2 />,
          },
          {
            key: "3",
            label: "方法三",
            children: <Forecast3 />,
          },
          {
            key: "4",
            label: "方法四",
            children: <Forecast4 />,
          },
          {
            key: "5",
            label: "方法五",
            children: <Forecast5 />,
          },
          {
            key: "6",
            label: "方法六",
            children: <Forecast6 />,
          },
          {
            key: "7",
            label: "方法七",
            children: <ComingSoon />,
          },
        ]}
      />
    </Modal>
  );
};

export default ForecastModal;
