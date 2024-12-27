import React, { useMemo } from "react";
import { getGraphic } from "@/utils/echarts.config";
import type { ChartOptions } from "@/utils/echarts.config";
import { ECHART_COMMON_COLOR } from "constants/common";
import BasicEchart from "../BasicEchart";

interface ColumnBarProps {
  data: {
    dataSource: any[];
  };
  color?: string;
  style?: Record<string, any>;
  onHoverChange?: (params: any) => void;
  onClickChange?: (params: any) => void;
}

// 获取整个图表的基础配置
const getBaseOptions = (color?: string) => {
  const baseOptions: ChartOptions = {
    color: ECHART_COMMON_COLOR,
    // @ts-ignore
    graphic: getGraphic(),
    tooltip: {
      show: true,
      trigger: "axis",
      enterable: true, // 鼠标可进入提示框浮层中
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    grid: {
      left: 14,
      right: 60,
      top: 40,
      bottom: 16,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "号码",
      nameTextStyle: {
        color: "#444444",
        fontSize: 14,
      },
      axisPointer: {
        show: true, // hoverX轴时显示默认的tooltip和指示器
        type: "shadow", // 阴影指示器
        label: {
          show: true, // 显示指示器的文字
        },
      },
      axisLabel: {
        color: "#444444",
        fontFamily: "SourceHanSansCN-Medium",
        fontWeight: 500,
        fontSize: 14,
      },
      axisLine: {
        show: true,
      },
    },
    yAxis: {
      type: "value",
      name: "次数",
      nameTextStyle: {
        color: "#444444",
        fontSize: 14,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ["rgba(159,173,242,0.2)"],
          width: 1,
          type: "dashed",
        },
      },
      axisLabel: {
        color: "#808191",
        fontFamily: "SourceHanSansCN-Medium",
        fontWeight: 500,
      },
    },
    series: [
      {
        type: "bar",
        barWidth: 30,
        label: {
          show: false, // 每个图形块上不显示数值
          color: "#808191",
          fontFamily: "SourceHanSansCN-Medium",
          fontWeight: 500,
          position: "top",
        },
        itemStyle: {
          normal: { color: color || "#F72C5B" },
        },
      },
    ],
    dataset: {
      source: [],
    },
  };
  return baseOptions;
};

const ColumnBar = ({
  data, // 数据
  color, // 柱子颜色
  style, // 样式
  onHoverChange, // 鼠标hover事件
  onClickChange, // 点击事件
}: ColumnBarProps) => {
  // 图表最终的配置数据
  const chartOptions = useMemo(() => {
    const options = getBaseOptions(color);
    const { dataSource } = data;
    if (!dataSource) return options;
    options.dataset = { source: dataSource };
    return options;
  }, [data]);

  return (
    <BasicEchart
      options={chartOptions}
      style={style}
      onClickChange={onClickChange}
      onHoverChange={onHoverChange}
    />
  );
};

export default ColumnBar;
