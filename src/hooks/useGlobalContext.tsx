import React, {
  PropsWithChildren,
  useContext,
  useState,
  RefObject,
  useCallback,
  useEffect,
} from "react";
import dualColouredBallData from "@/pages/welfareLottery/dualColouredBallData";
import lottery3DData from "@/pages/welfareLottery/lottery3DData";

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
  lottery3DDataSource: Record<string, any>[]; // 福彩3D开奖源数据
  setLottery3DDataSource: (dataSourec: Record<string, any>[]) => void;
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
  lottery3DDataSource: [],
  setLottery3DDataSource: () => {},
});

let scrollContentRef = React.createRef<HTMLDivElement | null>();

export const GlobalProvider = (props: PropsWithChildren<{}>) => {
  const [headHeight, setHeadHeight] = useState<number>(0);
  const [menuWidth, setMenuWidth] = useState<number>(0);
  const [scrollTop, setSTop] = useState<number>(0);
  const [dualColouredBallDataSource, setDualColouredBallDataSource] = useState<
    Record<string, any>[]
  >([]);
  const [lottery3DDataSource, setLottery3DDataSource] = useState<
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
          const data = JSON.parse(dualColouredBallData);
          if (data?.result) {
            // 将localStorage中保存的数据与本地文件中的数据进行合并
            let finalList: Record<string, any>[] = [];
            dataSource.forEach((item: Record<string, any>) => {
              const isExist = data.result.some((item2: Record<string, any>) => {
                if (item2.name === item.name && item2.code === item.code)
                  return true;
                return false;
              });
              // 将原来不存在的放入finalList
              if (!isExist) {
                finalList.push(item);
              }
            });
            finalList = finalList.concat(data.result);
            setDualColouredBallDataSource(finalList);
          } else {
            setDualColouredBallDataSource(dataSource);
          }
        }
      } else {
        const data = JSON.parse(dualColouredBallData);
        if (data?.result) {
          setDualColouredBallDataSource(data.result);
        }
      }
    } catch (e: any) {
      console.log("获取双色球开奖源数据失败：", e.message);
    }
  }, []);

  useEffect(() => {
    const lottery3DDataSourceStr = window.localStorage.getItem(
      "lottery3DDataSource"
    );
    try {
      if (lottery3DDataSourceStr) {
        const dataSource = JSON.parse(lottery3DDataSourceStr);
        if (dataSource && dataSource.length > 0) {
          const data = JSON.parse(lottery3DData);
          if (data?.result) {
            // 将localStorage中保存的数据与本地文件中的数据进行合并
            let finalList: Record<string, any>[] = [];
            dataSource.forEach((item: Record<string, any>) => {
              const isExist = data.result.some((item2: Record<string, any>) => {
                if (item2.name === item.name && item2.code === item.code)
                  return true;
                return false;
              });
              // 将原来不存在的放入finalList
              if (!isExist) {
                finalList.push(item);
              }
            });
            finalList = finalList.concat(data.result);
            setLottery3DDataSource(finalList);
          } else {
            setLottery3DDataSource(dataSource);
          }
        }
      } else {
        const data = JSON.parse(lottery3DData);
        if (data?.result) {
          setLottery3DDataSource(data.result);
        }
      }
    } catch (e: any) {
      console.log("获取福彩3D开奖源数据失败：", e.message);
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
        lottery3DDataSource,
        setLottery3DDataSource,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
