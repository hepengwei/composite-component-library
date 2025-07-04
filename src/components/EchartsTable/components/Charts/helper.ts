const tooltipBase = {
  trigger: "axis",
  backgroundColor: "#161A1D",
  textStyle: {
    fontSize: 14,
    lineHeight: 14,
    color: "#A7A8A9",
  },
  borderWidth: 0,
  axisPointer: {
    type: "line",
    lineStyle: {
      color: "#A7A8A9",
      width: 1,
      type: "solid",
    },
  },
};

export const defaultChart = () => ({
  grid: {
    left: "2%",
    right: "2%",
    bottom: "16%",
    top: "12%",
    containLabel: true,
  },
  tooltip: { ...tooltipBase },
  xAxis: {
    type: "category",
    nameTextStyle: {},
    axisLine: {
      show: true,
      onZero: true,
      lineStyle: {
        type: "solid",
      },
    },
    axisTick: {
      alignWithLabel: true,
      lineStyle: {},
    },
    axisLabel: {
      fontSize: 12,
    },
    axisPointer: {
      type: "line",
      lineStyle: {},
    },
  },
  yAxis: {
    type: "value",
    nameTextStyle: {},
    splitLine: {
      lineStyle: {},
    },
    axisLabel: {},
  },
  legend: {
    padding: [0, 35, 0, 35],
    itemWidth: 16,
    itemHeight: 8,
    right: "center",
    top: "bottom",
    textStyle: {},
    show: true,
  },
});
