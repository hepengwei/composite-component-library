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
