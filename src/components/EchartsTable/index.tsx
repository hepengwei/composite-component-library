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
