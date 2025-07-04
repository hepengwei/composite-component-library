import React, { useEffect } from "react";
import EchartsTable from "@/components/EchartsTable";
import { mockData } from "@/components/EchartsTable/mock";
import { useTRState } from "@/hooks/useTRState";
import { useStaticState } from "@/hooks/useStaticState";
import { dateOptions } from "@/components/EchartsTable/helper";

const Content = () => {
  const [state, setState] = useTRState({
    contentLoading: false,
    segmented1: "chart",
    segmented2: "chart",
    segmented3: "chart",
    segmented4: "chart",
    totalOpenEnergy: "0",
    monthOrYear: dateOptions[0].value,
    shouldFetchData: false,
  });

  const staticData: any = useStaticState({
    contentBoxTable: { one: [], two: [], three: [], four: [] },
    contentBoxChart: { one: {}, two: {}, three: {}, four: {} },
  });

  useEffect(() => {
    fetchData(state.monthOrYear);
  }, [state.shouldFetchData]);

  useEffect(() => {
    setState({ shouldFetchData: !state.shouldFetchData });
  }, [state.monthOrYear]);

  const fetchData = async (my: string) => {
    setState({ contentLoading: true });
    let contentDataRes: any;
    contentDataRes = await mockData(my);
    if (contentDataRes?.statusCode === "200") {
      const resData = contentDataRes?.data;
      if (staticData) {
        staticData.contentBoxTable = {
          one: resData?.segmented1?.rows || [],
          two: resData?.segmented2?.rows || [],
          three: resData?.segmented3?.rows || [],
          four: resData?.segmented4?.rows || [],
        };
        staticData.contentBoxChart = {
          one: resData?.forecastCabinChart || {},
          two: resData?.openEnergyChart || {},
          three: resData?.dailyOpenEnergyChart || {},
          four: resData?.weightAvgPriceChart || {},
        };
      }
      setState({
        totalOpenEnergy: resData?.totalOpenEnergy || "0",
        contentLoading: false,
      });
    }
  };

  return (
    <EchartsTable
      staticData={staticData}
      state={state}
      setState={setState}
      loading={state.contentLoading}
    />
  );
};

export default Content;
