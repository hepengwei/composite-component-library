import React from "react";

export const columns: Record<string, any>[] = [
  {
    title: "期号",
    dataIndex: "code",
    width: 90,
  },
  {
    title: "开奖日期",
    dataIndex: "date",
    width: 150,
  },
  {
    title: "预测号码",
    dataIndex: "forecastNumber",
    width: 256,
    render: (value: string) => {
      const numberList = value.split(",");
      return (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {numberList && numberList.length > 0
            ? numberList.map((number: string, index: number) => (
                <div
                  style={{
                    width: 26,
                    height: 26,
                    marginRight: "6px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    fontSize: "14px",
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
      );
    },
  },
  {
    title: "开奖号码",
    dataIndex: "number",
    width: 256,
    render: (_: any, record: Record<string, any>) => {
      const { red, blue } = record;
      const numberList = `${red},${blue}`.split(",");
      return (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {numberList && numberList.length > 0
            ? numberList.map((number: string, index: number) => (
                <div
                  style={{
                    width: 26,
                    height: 26,
                    marginRight: "6px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    fontSize: "14px",
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
      );
    },
  },
  {
    title: "预测号码中奖情况",
    dataIndex: "forecastWinPrize",
    width: 150,
    render: (value: string) => {
      if (value !== "未中奖") {
        return (
          <span style={{ color: "#FF4D4F", fontWeight: "600" }}>{value}</span>
        );
      }
      return value;
    },
  },
];
