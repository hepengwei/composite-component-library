import EchartsTable from "@/components/EchartsTable";
import { dateOptions } from "@/components/EchartsTable/helper";
import { mockData } from "@/components/EchartsTable/mock";
import React, { useEffect, useState } from "react";

const Content = () => {
  // 状态数据
  const [state, setState] = useState({
    contentLoading: false,
    segmented1: "chart",
    segmented2: "chart",
    segmented3: "chart",
    segmented4: "chart",
    totalOpenEnergy: "0",
    monthOrYear: dateOptions[0].value,
  });

  // 静态数据
  const [staticData, setStaticData] = useState({
    contentBoxTable: { one: [], two: [], three: [], four: [] },
    contentBoxChart: { one: {}, two: {}, three: {}, four: {} },
  });

  useEffect(() => {
    fetchData(state.monthOrYear);
  }, [state.monthOrYear]);

  const fetchData = async (my: string) => {
    setState((prev) => ({ ...prev, contentLoading: true }));
    const contentDataRes: any = await mockData(my);
    if (contentDataRes?.statusCode === "200") {
      const resData = contentDataRes?.data;
      setStaticData({
        contentBoxTable: {
          one: resData?.segmented1?.rows || [],
          two: resData?.segmented2?.rows || [],
          three: resData?.segmented3?.rows || [],
          four: resData?.segmented4?.rows || [],
        },
        contentBoxChart: {
          one: resData?.forecastCabinChart || {},
          two: resData?.openEnergyChart || {},
          three: resData?.dailyOpenEnergyChart || {},
          four: resData?.weightAvgPriceChart || {},
        },
      });
      setState((prev) => ({
        ...prev,
        totalOpenEnergy: resData?.totalOpenEnergy || "0",
        contentLoading: false,
      }));
    } else {
      setState((prev) => ({ ...prev, contentLoading: false }));
    }
  };

  const handleSetState = (patch: any) => {
    setState((prev) => ({ ...prev, ...patch }));
  };

  return (
    <EchartsTable
      staticData={staticData}
      state={state}
      setState={handleSetState}
      loading={state.contentLoading}
    />
  );
};

export default Content;
