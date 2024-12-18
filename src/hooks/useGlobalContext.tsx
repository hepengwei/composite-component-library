import React, {
  PropsWithChildren,
  useContext,
  useState,
  RefObject,
  useCallback,
  useEffect,
} from "react";
import dualColouredBallData from "@/pages/welfareLottery/dualColouredBallData";

export interface GlobalContextProps {
  headHeight: number;
  setHeadHeight: (headHeight: number) => void;
  menuWidth: number;
  setMenuWidth: (menuWidth: number) => void;
  scrollTop: number;
  setScrollTop: (y?: number) => void;
  scrollContentRef: RefObject<HTMLDivElement | null>;
  setScrollContentRef: (scrollRef: RefObject<HTMLDivElement>) => void;
  dualColouredBallDataSource: Record<string, any>[]; // 双色球开奖源数据
  setDualColouredBallDataSource: (dataSourec: Record<string, any>[]) => void;
}

const GlobalContext = React.createContext<GlobalContextProps>({
  headHeight: 0,
  setHeadHeight: () => {},
  menuWidth: 0,
  setMenuWidth: () => {},
  scrollTop: 0,
  setScrollTop: () => {},
  scrollContentRef: React.createRef(),
  setScrollContentRef: () => {},
  dualColouredBallDataSource: [],
  setDualColouredBallDataSource: () => {},
});

let scrollContentRef = React.createRef<HTMLDivElement | null>();

export const GlobalProvider = (props: PropsWithChildren<{}>) => {
  const [headHeight, setHeadHeight] = useState<number>(0);
  const [menuWidth, setMenuWidth] = useState<number>(0);
  const [scrollTop, setSTop] = useState<number>(0);
  const [dualColouredBallDataSource, setDualColouredBallDataSource] = useState<
    Record<string, any>[]
  >([]);

  const setScrollTop = useCallback((y: number = 0) => {
    setSTop(y);
    if (scrollContentRef.current) {
      if ((scrollContentRef.current as HTMLDivElement).scrollTop !== y) {
        (scrollContentRef.current as HTMLDivElement).scrollTop = y;
      }
    }
  }, []);

  const setScrollContentRef = (scrollRef: RefObject<HTMLDivElement>) => {
    if (scrollRef) {
      scrollContentRef = scrollRef;
    }
  };

  useEffect(() => {
    const dualColouredBallDataSourceStr = window.localStorage.getItem(
      "dualColouredBallDataSource"
    );
    try {
      if (dualColouredBallDataSourceStr) {
        const dataSource = JSON.parse(dualColouredBallDataSourceStr);
        if (dataSource && dataSource.length > 0) {
          setDualColouredBallDataSource(dataSource);
          return;
        }
      }
      const data = JSON.parse(dualColouredBallData);
      if (data?.result) {
        setDualColouredBallDataSource(data.result);
      }
    } catch (e: any) {
      console.log("获取双色球开奖源数据失败：", e.message);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        headHeight,
        menuWidth,
        scrollTop,
        setHeadHeight,
        setMenuWidth,
        setScrollTop,
        scrollContentRef,
        setScrollContentRef,
        dualColouredBallDataSource,
        setDualColouredBallDataSource,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
