export const mockCode = `
export const mockData = (date: string) => {
  if (date === "year") {
    return new Promise((resolve) =>
      resolve({
        statusCode: "200",
        message: "操作成功",
        data: {
          segmented1: {
            rows: [
              {
                date: "2025-01",
                forecastEnergy: "20485.647",
                cabinEnergy: "1052.632",
              },
              {
                date: "2025-02",
                forecastEnergy: "17828.665",
                cabinEnergy: "1403.509",
              },
            ],
          },
          forecastCabinChart: {
            type: "CategorySeries",
            series: [
              {
                title: "预测数据",
                values: [
                  "20485.647",
                  "17828.665",
                ],
                unit: "xx/xx",
              },
              {
                title: "对比数据",
                values: [
                  "1052.632",
                  "1403.509",
                ],
                unit: "xx/xx",
              },
            ],
            xAxis: {
              name: "时间",
              series: [
                "2025-01",
                "2025-02",
              ],
            },
          },
          segmented2: {
            rows: [
              {
                date: "2025-01",
                openEnergy: "19433.015",
              },
              {
                date: "2025-02",
                openEnergy: "16425.156",
              },
            ],
          },
          openEnergyChart: {
            type: "CategorySeries",
            series: [
              {
                title: "数据1",
                values: [
                  "19433.015",
                  "16425.156",
                ],
                unit: "xx/xx",
              },
            ],
            xAxis: {
              name: "时间",
              series: [
                "2025-01",
                "2025-02",
              ],
            },
          },
          segmented3: {
            rows: [
              {
                date: "00:15",
                openEnergy: "--",
              },
              {
                date: "00:30",
                openEnergy: "--",
              },
            ],
          },
          dailyOpenEnergyChart: {
            type: "CategorySeries",
            series: [
              {
                title: "数据2",
                values: [
                  "2.27",
                  "2.29",
                ],
                unit: "xx/xx",
              },
            ],
            xAxis: {
              name: "时间",
              series: [
                "00:15",
                "00:30",
              ],
            },
          },
          segmented4: {
            rows: [
              {
                date: "00:15",
                cabinPrice: "2.27",
              },
              {
                date: "00:30",
                cabinPrice: "2.29",
              },
            ],
          },
          weightAvgPriceChart: {
            type: "CategorySeries",
            series: [
              {
                title: "数据3",
                values: [
                  "2.27",
                  "2.29",
                ],
                unit: "元/MWh",
              },
            ],
            xAxis: {
              name: "时间",
              series: [
                "00:15",
                "00:30",
              ],
            },
          },
          totalOpenEnergy: "80319.558",
        },
      })
    );
  } else {
    return new Promise((resolve) =>
      resolve({
        statusCode: "200",
        message: "操作成功",
        data: {
          segmented1: {
            rows: [
              {
                date: "2025-06-01",
                forecastEnergy: "--",
                cabinEnergy: "58.480",
              },
              {
                date: "2025-06-02",
                forecastEnergy: "--",
                cabinEnergy: "58.480",
              },
            ],
          },
          forecastCabinChart: {
            type: "CategorySeries",
            series: [
              {
                title: "预测数据",
                values: [
                  "--",
                  "--",
                ],
                unit: "x/x",
              },
              {
                title: "对比数据",
                values: [
                  "58.480",
                  "58.480",
                ],
                unit: "x/x",
              },
            ],
            xAxis: {
              name: "日期",
              series: [
                "2025-06-01",
                "2025-06-02",
              ],
            },
          },
          segmented2: {
            rows: [
              {
                date: "2025-06-01",
                openEnergy: "--",
              },
              {
                date: "2025-06-02",
                openEnergy: "--",
              },
            ],
          },
          openEnergyChart: {
            type: "CategorySeries",
            series: [
              {
                title: "数据1",
                values: [
                  "--",
                  "--",
                ],
                unit: "x/x",
              },
            ],
            xAxis: {
              name: "日期",
              series: [
                "2025-06-01",
                "2025-06-02",
              ],
            },
          },
          segmented3: {
            rows: [
              {
                date: "00:15",
                openEnergy: "174.938",
              },
              {
                date: "00:30",
                openEnergy: "165.770",
              },
            ],
          },
          dailyOpenEnergyChart: {
            type: "CategorySeries",
            series: [
              {
                title: "数据2",
                values: [
                  "174.938",
                  "165.770",
                ],
                unit: "x/x",
              },
            ],
            xAxis: {
              name: "时间",
              series: [
                "00:15",
                "00:30",
              ],
            },
          },
          segmented4: {
            rows: [
              {
                date: "00:15",
                cabinPrice: "2.27",
              },
              {
                date: "00:30",
                cabinPrice: "2.29",
              },
            ],
          },
          weightAvgPriceChart: {
            type: "CategorySeries",
            series: [
              {
                title: "数据3",
                values: [
                  "2.27",
                  "2.29",
                ],
                unit: "x/x",
              },
            ],
            xAxis: {
              name: "时间",
              series: [
                "00:15",
                "00:30",
              ],
            },
          },
          totalOpenEnergy: "184090.375",
        },
      })
    );
  }
};
`;

export const EchartsTableHelper = `
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
      title: '数据1【总 ' + totalOpenEnergy + 'XX/xx】',
      segmentKey: "segmented2",
    },
    {
      name: "three",
      title: "数据2",
      segmentKey: "segmented3",
    },
    {
      name: "four",
      title: "数据3",
      segmentKey: "segmented4",
    },
  ];
}
`;

export const useStaticState = `
import React from "react";

/**
 *  *******************  用法  *********************
 *   import { useStaticState } from "@/hooks/useStaticState"; //导入方法
 *   const staticState = useStaticState({
 *     'name':'小明'
 *   });
 *   console.log(staticState.name)  // 输出内容为小明
 *   staticState.name = '小西';
 *   console.log(staticState.name)  // 输出内容为小西
 */

/**
 * 通用静态数据存放方式
 * @param initValue  任意类型初始化数据
 * @returns {any}  返回任何类型数据对象
 */
export const useStaticState = (initValue: any) => {
  const formRef = React.useRef();
  if (!formRef.current) {
    formRef.current = initValue;
  }
  return formRef.current;
};
`;

export const useTRState = `import React from "react";

/**
 *  *******************  用法  *********************
 *  import { useTRState } from "@/hooks/useTRState"; // 导入方法
 *  const [state, setState] = useTRState({
 *    name: '小明'
 *  });
 *  console.log(state.name);  // 输出内容为小明
 *  setState({ name: '小西' });
 *  console.log(state.name);  // 此时 state.name 已变为小西（需在组件内使用最新 state）
 */

/**
 * 通用可变数据状态管理 Hook
 * @param initValue  任意类型的初始化数据对象
 * @param reduce     可选，自定义 reducer 处理函数
 * @returns {[any, Function]}  返回 [state, setState]，state 为当前状态，setState 用于更新状态
 */

export const useTRState = (initValue = {}, reduce?: any) => {
  const reduceHandle = React.useCallback((data: any, action: any) => {
    if (action.type === "changeData") {
      return { ...data, ...action.data };
    }
    reduce && reduce(data, action);
  }, []);
  const [state, dispatch] = React.useReducer(reduceHandle, {
    isLoading: false,
    errorMsg: "",
    ...initValue,
  });

  const setState = React.useCallback((m: any, type = "changeData") => {
    dispatch({ type: type, data: m });
  }, []);
  return [state, setState];
};
`;

export const EchartsTable = `
import React, { useMemo } from "react";
import { defaultChart } from "./components/Charts/helper";
import Default from "./components/Default/index";
import { EchartsComp, Segmented, Table, Title } from "./components/index";
import {
  dataOptions,
  dateOptions,
  itemContentInfo,
  monthColumns,
  yearColumns,
} from "./helper";
import styles from "./index.module.scss";

interface EchartsTableProps {
  staticData: any;
  state: any;
  setState: (v: any) => void;
  loading?: boolean;
}

const EchartsTable: React.FC<EchartsTableProps> = ({
  staticData,
  state,
  setState,
  loading = false,
}) => {
  const getChartOption = (itemChart: any, type: string) => {
    if (!itemChart) return;
    const chartData = itemChart;
    const defaultOption = defaultChart();

    const baseXAxisConfig = {
      type: "category",
      data: chartData.xAxis?.series,
    };

    if (type === "four") {
      return {
        ...defaultOption,
        color: ["#A978CC"],
        xAxis: baseXAxisConfig,
        yAxis: {
          type: "value",
          name: "预测(单位xxx)",
        },
        series: [
          {
            type: "line",
            name: "数据3",
            data: chartData.series?.[0]?.values || [],
            smooth: true,
            symbol: "circle",
            symbolSize: 6,
          },
        ],
      };
    }

    return {
      ...defaultOption,
      color: ["#5F9FF8", "#54AFB1"],
      xAxis: baseXAxisConfig,
      yAxis: {
        type: "value",
        name: "数据(单位xxx)",
      },
      series:
        chartData.series?.map((item: { title: any; values: any }) => ({
          name: item.title,
          type: "bar",
          barWidth: "30%",
          data: item.values,
        })) || [],
    };
  };

  const RenderContent = useMemo(() => {
    const { contentBoxTable, contentBoxChart } = staticData;
    const itemContent = itemContentInfo(state.totalOpenEnergy);
    return itemContent.map((item: any) => (
      <React.Fragment key={item.name}>
        <Title
          title={item.title}
          style={{ marginBottom: "16px" }}
          right={
            <Segmented
              value={state[item.segmentKey]}
              options={dataOptions}
              onChange={(value) => setState({ [item.segmentKey]: value })}
            />
          }
        />
        <div className={styles.renderContentBoxItem}>
          {state[item.segmentKey] === "chart" ? (
            contentBoxChart?.[item.name] ? (
              <div
                style={{ width: "100%", height: "100%", overflow: "hidden" }}
              >
                <EchartsComp
                  config={getChartOption(
                    contentBoxChart?.[item.name],
                    item.name
                  )}
                />
              </div>
            ) : (
              <Default className={styles.minEmptsysm} type="emptysm" />
            )
          ) : contentBoxTable?.[item.name]?.length ? (
            <Table
              columns={
                state.monthOrYear === "month"
                  ? // @ts-ignore
                    monthColumns?.[item.name]
                  : // @ts-ignore
                    yearColumns?.[item.name]
              }
              dataSource={contentBoxTable?.[item.name]}
            />
          ) : (
            <Default className={styles.minEmptsysm} type="emptysm" />
          )}
        </div>
      </React.Fragment>
    ));
  }, [
    staticData.contentBoxTable,
    staticData.contentBoxChart,
    state.totalOpenEnergy,
    state.segmented1,
    state.segmented2,
    state.segmented3,
    state.segmented4,
    state.monthOrYear,
  ]);

  return (
    <>
      <div className={styles.mOy}>
        <Segmented
          value={state.monthOrYear}
          options={dateOptions}
          onChange={(value) => setState({ monthOrYear: value })}
        />
      </div>
      <div className={styles.renderContentBox}>{RenderContent}</div>
    </>
  );
};

export default EchartsTable;
`;

export const EchartsTableScss = `.mOy {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}
.renderContentBox {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
   .renderContentBoxItem {
     display: flex;
     height: 300px;
     overflow: auto;
     margin-bottom: 20px;
     .minEmptsysm {
       display: flex;
       flex-direction: column;
       justify-content: center;
      padding: 0 !important;
     }
  }
}
`;

export const EchartsTableCompIndex = `
import EchartsComp from "./Charts/echarts";
import Title from "./Title/index";
import Segmented from "./Segmented/index";
import Table from "./Table/index";
import Default from "./Default/index";

export { EchartsComp, Title, Segmented, Table, Default };
`;

export const EchartsTableChartsIndex = `
import React, { useRef, useEffect } from "react";
import echarts from "utils/echarts.config";
import { defaultChart } from "./helper";
import EventEmitter from "events";
import PropTypes from "prop-types";

declare global {
  interface Window {
    emitter?: EventEmitter;
  }
}

const emitter = window.emitter ? window.emitter : new EventEmitter();
emitter.setMaxListeners(200);

const EchartsComp = ({
  config = {},
  getRef = (chartInstance: echarts.ECharts | null) => {},
}) => {
  let chartInstance: echarts.ECharts | null = null;
  const chartRef = useRef(null);
  const resizeHelper = () => {
    setTimeout(() => {
      chartInstance?.resize();
    }, 200);
  };
  useEffect(() => {
    renderChart();
  }, [JSON.stringify(config)]);

  useEffect(() => {
    mounted();
    return () => {
      destoryed();
    };
  }, []);

  function destoryed() {
    chartInstance?.dispose();
    window.removeEventListener("resize", resizeHelper);
    emitter.removeListener("onChangeMnue", resizeHelper);
  }

  function mounted() {
    window.addEventListener("resize", resizeHelper);
    emitter.addListener("onChangeMnue", resizeHelper);
    getRef(chartInstance);
  }

  function renderChart() {
    const chartDom = chartRef.current;
    const themeConfig = defaultChart();
    if (!chartDom) return;
    if (chartInstance) {
      chartInstance.dispose();
    }
    if (chartRef.current) {
      chartInstance =
        echarts.getInstanceByDom(chartRef.current as HTMLElement) ||
        echarts.init(chartRef.current as HTMLElement);
    }

    const mergedConfig = {
      ...themeConfig,
      ...config,
    };

    chartInstance?.setOption(mergedConfig, true);
    chartInstance?.resize();
  }

  return (
    <div id="charts" ref={chartRef} style={{ width: "100%", height: "100%" }} />
  );
};
EchartsComp.propTypes = {
  config: PropTypes.object,
  getRef: PropTypes.func,
};
export default EchartsComp;
`;

export const EchartsTableChartsHelper = `
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
`;

export const EchartsTableDefaultIndex = `
import React from "react";
import cls from "classnames";
import styles from "./index.module.scss";

const MESSAGE_MAP = {
  empty: "暂无数据",
  error: "系统异常",
  lock: "暂无权限",
  emptysm: "暂无数据",
};

/**
 * 缺省图
 * @param type ['empty', 'emptysm', 'error', 'lock']
 */

type DefaultType = "empty" | "error" | "lock" | "emptysm";

interface DefaultProps {
  type?: DefaultType;
  message?: string;
  size?: number;
  theme?: any;
  className?: string;
}

export default (props: DefaultProps) => {
  const {
    type = "empty",
    message = "",
    size = 0,
    theme,
    className = "",
  } = props;

  const msg = message || MESSAGE_MAP[type];
  const isSmall = type.indexOf("sm") > -1;
  const imageStyle = {
    height: size ? size : isSmall ? 100 : 250,
  };

  return (
    <div
      className={cls({
        [styles.tr_default]: true,
        [className]: true,
      })}
    >
      <div
        className={cls({
          [styles.tr_default_img]: true,
          [styles[type]]: true,
        })}
        style={{ ...imageStyle }}
      />
      <div
        className={cls({
          [styles.tr_default_desc]: true,
        })}
      >
        {msg}
      </div>
    </div>
  );
};
`;

export const EchartsTableDefaultIndexScss = `
.tr_default {
  width: 100%;
  height: 100%;
  padding: 14% 0;
  overflow: hidden;
  &.is_small {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    > div {
      width: 100%;
    }
  }
  &_desc {
    font-size: 14px;
    line-height: 24px;
    text-align: center;
  }
}

.tr_default_img {
  width: 100%;
  margin-bottom: 8px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  &.empty {
    background-image: url("../../../../images/EchartsTableDefault/empty.png");
    &.dark,
    &.gre {
      background-image: url("../../../../images/EchartsTableDefault/empty_dark.png") !important;
    }
  }
  &.error {
    background-image: url("../../../../images/EchartsTableDefault/error.png");
    &.dark,
    &.gre {
      background-image: url("../../../../images/EchartsTableDefault/error_dark.png") !important;
    }
  }
  &.lock {
    background-image: url("../../../../images/EchartsTableDefault/lock.png");
    &.dark,
    &.gre {
      background-image: url("../../../../images/EchartsTableDefault/lock_dark.png") !important;
    }
  }
  &.emptysm {
    background-image: url("../../../../images/EchartsTableDefault/emptysm.png");
    transform: translateX(8px);
    &.dark,
    &.gre {
      background-image: url("../../../../images/EchartsTableDefault/emptysm_dark.png") !important;
    }
  }
}
`;

export const EchartsTableSegmentedIndex = `
import React from "react";
import styles from "./index.module.scss";

interface OptionType {
  value: string | number;
  label?: React.ReactNode;
  [key: string]: any;
}

interface SegmentedProps {
  value: string | number;
  options?: OptionType[];
  onChange?: (value: string | number, item: OptionType) => void;
}

const Segmented: React.FC<SegmentedProps> = ({
  value,
  options = [],
  onChange = () => {},
}) => {
  return (
    <div className={styles.segmented}>
      {options.map((item) => (
        <div
          key={item.value}
          className={value === item?.value ? styles.active : ""}
          onClick={() => {
            if (value === item.value) return;
            onChange?.(item.value, item);
          }}
        >
          {item?.label || ""}
        </div>
      ))}
    </div>
  );
};

export default Segmented;
`;

export const EchartsTableSegmentedIndexScss = `
.segmented {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 6px;
  color: #3c3c3c;
  border: 1px solid rgba(229, 229, 229, 0.7);
  border-radius: 5px;
  > div {
    height: 20px;
    padding: 0 6px;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    word-break: keep-all;
    border-radius: 5px;
    cursor: pointer;
    &.active {
      color: #ffffff;
      font-weight: 500;
      background: #3b7ee0;
    }
  }
  > div + div {
    margin-left: 6px;
  }
}
`;

export const EchartsTableTitleIndex = `
import React from "react";
import styles from "./index.module.scss";

interface TitleProps {
  title: React.ReactNode;
  tooltip?: React.ReactNode;
  right?: React.ReactNode;
  style?: React.CSSProperties;
}

const Title: React.FC<TitleProps> = ({
  title,
  tooltip,
  right = null,
  style = {},
}) => {
  return (
    <div className={styles.tj_title} style={style}>
      <div className={styles.flex}>
        <div>{title}</div>
      </div>
      {!!right && <div className={styles.flex}>{right}</div>}
    </div>
  );
};

export default Title;
`;

export const EchartsTableTitleIndexScss = `
.tj_title {
  display: flex;
  justify-content: space-between;
  height: 32px;
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  .flex {
    display: flex;
    align-items: center;
  }
  .icon {
    margin-left: 8px;
    font-size: 16px;
    cursor: pointer;
  }
}
`;
