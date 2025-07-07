import React from "react";
import { BarChartOutlined, TableOutlined } from "@ant-design/icons";

export const dateOptions = [
  {
    value: "year",
    label: "年",
  },
  {
    value: "month",
    label: "月",
  },
];

export const dataOptions = [
  {
    value: "chart",
    label: <BarChartOutlined />,
  },
  {
    value: "table",
    label: <TableOutlined />,
  },
];

export const yearColumns = {
  one: [
    {
      name: "月份",
      code: "date",
    },
    {
      name: "预测1",
      code: "forecastEnergy",
    },
    {
      name: "预测2",
      code: "cabinEnergy",
    },
  ],
  two: [
    {
      name: "月份",
      code: "date",
    },
    {
      name: "数据1",
      code: "openEnergy",
    },
  ],
  three: [
    {
      name: "时间",
      code: "date",
    },
    {
      name: "数据2",
      code: "openEnergy",
    },
  ],
  four: [
    {
      name: "时间",
      code: "date",
    },
    {
      name: "数据3",
      code: "cabinPrice",
    },
  ],
};

export const monthColumns = {
  one: [
    {
      name: "日期",
      code: "date",
    },
    {
      name: "预测1",
      code: "forecastEnergy",
    },
    {
      name: "预测2",
      code: "cabinEnergy",
    },
  ],
  two: [
    {
      name: "日期",
      code: "date",
    },
    {
      name: "数据1",
      code: "openEnergy",
    },
  ],
  three: [
    {
      name: "时间",
      code: "date",
    },
    {
      name: "数据2",
      code: "openEnergy",
    },
  ],
  four: [
    {
      name: "时间",
      code: "date",
    },
    {
      name: "数据3",
      code: "cabinPrice",
    },
  ],
};

export function itemContentInfo(totalOpenEnergy: any) {
  return [
    {
      name: "one",
      title: "预测/对比",
      segmentKey: "segmented1",
    },
    {
      name: "two",
      title: `数据1【总 ${totalOpenEnergy}XX/xx】`,
      segmentKey: "segmented2",
    },
    {
      name: "three",
      title: `数据2`,
      segmentKey: "segmented3",
    },
    {
      name: "four",
      title: `数据3`,
      segmentKey: "segmented4",
    },
  ];
}
