/**
 * 双色球 菜单页
 */
import React, { useState, useEffect } from "react";
import { Button, message, Table } from "antd";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import RandomOneModal from "./components/RandomOneModal";
import OccurrenceFrequencyModal from "./components/OccurrenceFrequencyModal";
import EchartAnalyzeModal from "./components/EchartAnalyzeModal";
import ForecastModal from "./components/ForecastModal";
import AddDataModal from "./components/AddDataModal";
import RuleModal from "./components/RuleModal";
import { dateSorter, moneySorter } from "utils/welfareLottery";
import styles from "./index.module.scss";

const DualColouredBall = () => {
  const { dualColouredBallDataSource, setDualColouredBallDataSource } =
    useGlobalContext();
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [randomOneModalOpen, setRandomOneModalOpen] = useState<boolean>(false);
  const [occurrenceFrequencyModalOpen, setOccurrenceFrequencyModalOpen] =
    useState<boolean>(false);
  const [echartAnalyzeModalOpen, setEchartAnalyzeModalOpen] =
    useState<boolean>(false);
  const [forecastModalOpen, setForecastModalOpen] = useState<boolean>(false);
  const [addDataModalOpen, setAddDataModalOpen] = useState<boolean>(false);
  const [ruleModalOpen, setRuleModalOpen] = useState<boolean>(false);

  const getTableData = async () => {
    if (dualColouredBallDataSource && dualColouredBallDataSource.length > 0) {
      const finalDataSource = dualColouredBallDataSource.map(
        (item: Record<string, any>) => {
          const { prizegrades } = item;
          let typenum1 = "";
          let typenum2 = "";
          let typemoney1 = "";
          let typemoney2 = "";
          if (prizegrades && prizegrades.length > 0) {
            typenum1 = prizegrades[0].typenum || "";
            typenum2 = prizegrades[1].typenum || "";
            typemoney1 = prizegrades[0].typemoney || "";
            typemoney2 = prizegrades[1].typemoney || "";
          }
          return { ...item, typenum1, typenum2, typemoney1, typemoney2 };
        }
      );
      setTableData(finalDataSource);
    } else {
      setTableData([]);
    }
  };

  const onAddDataModalOk = (newText: string) => {
    if (newText) {
      try {
        const newData = JSON.parse(newText);
        if (newData) {
          let newArr = newData;
          if (!Array.isArray(newData)) {
            newArr = newData.result;
          }
          if (
            dualColouredBallDataSource &&
            dualColouredBallDataSource.length > 0
          ) {
            let finalList: Record<string, any>[] = [];
            newArr.forEach((item: Record<string, any>) => {
              if (item.name === "双色球") {
                const isExist = dualColouredBallDataSource.some(
                  (item2: Record<string, any>) => {
                    if (item2.name === item.name && item2.code === item.code)
                      return true;
                    return false;
                  }
                );
                // 将原来不存在的放入finalList
                if (!isExist) {
                  // 添加红色号码和数字段
                  item.sum = item.red
                    ?.split(",")
                    .reduce(
                      (sum: number, next: string) => sum + Number(next),
                      0
                    );
                  finalList.push(item);
                }
              }
            });
            // 将新增的和原来的数据合并
            finalList = dualColouredBallDataSource.concat(finalList);
            setDualColouredBallDataSource(finalList);
          } else {
            setDualColouredBallDataSource(newArr);
          }
        }
        message.success("添加成功");
        setAddDataModalOpen(false);
      } catch (e: any) {
        message.warning("解析数据失败");
        console.log("解析数据失败:", e.message);
      }
    }
  };

  const columns: Record<string, any>[] = [
    {
      title: "期号",
      dataIndex: "code",
      width: 90,
    },
    {
      title: "开奖日期",
      dataIndex: "date",
      width: 150,
      sorter: (
        prevRecord: Record<string, any>,
        nextRecord: Record<string, any>
      ) => dateSorter("date", prevRecord, nextRecord),
    },
    {
      title: "开奖号码",
      dataIndex: "number",
      width: 256,
      render: (_: any, record: Record<string, any>) => {
        const { red, blue } = record;
        const numberList = `${red},${blue}`.split(",");
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {numberList && numberList.length > 0
              ? numberList.map((number: string, index: number) => (
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      marginRight: "6px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#FFFFFF",
                      backgroundColor:
                        index === numberList.length - 1 ? "#0A5EB0" : "#F72C5B",
                    }}
                    key={index}
                  >
                    {number}
                  </div>
                ))
              : null}
          </div>
        );
      },
    },
    {
      title: "红色号码和数",
      dataIndex: "sum",
      width: 110,
    },
    {
      title: "一等奖",
      width: 170,
      children: [
        {
          title: "注数",
          dataIndex: "typenum1",
          key: "typenum1",
          width: 70,
        },
        {
          title: "金额",
          dataIndex: "typemoney1",
          key: "typemoney1",
          width: 100,
          sorter: (
            prevRecord: Record<string, any>,
            nextRecord: Record<string, any>
          ) => moneySorter("typemoney1", prevRecord, nextRecord),
          render: (value: string) => {
            if (value) {
              return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            return "";
          },
        },
      ],
    },
    {
      title: "二等奖",
      width: 170,
      children: [
        {
          title: "注数",
          dataIndex: "typenum2",
          key: "typenum2",
          width: 70,
        },
        {
          title: "金额",
          dataIndex: "typemoney2",
          key: "typemoney2",
          width: 100,
          sorter: (
            prevRecord: Record<string, any>,
            nextRecord: Record<string, any>
          ) => moneySorter("typemoney2", prevRecord, nextRecord),
          render: (value: string) => {
            if (value) {
              return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            return "";
          },
        },
      ],
    },
    {
      title: "销售额（元）",
      dataIndex: "sales",
      width: 150,
      sorter: (
        prevRecord: Record<string, any>,
        nextRecord: Record<string, any>
      ) => moneySorter("sales", prevRecord, nextRecord),
      render: (value: string) => {
        if (value) {
          return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return "";
      },
    },
    {
      title: "奖池金额（元）",
      dataIndex: "poolmoney",
      width: 150,
      sorter: (
        prevRecord: Record<string, any>,
        nextRecord: Record<string, any>
      ) => moneySorter("poolmoney", prevRecord, nextRecord),
      render: (value: string) => {
        if (value) {
          return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return "";
      },
    },
  ];

  useEffect(() => {
    getTableData();

    return () => {
      // 将双色球开奖源数据保存到localStorage中
      try {
        if (
          dualColouredBallDataSource &&
          dualColouredBallDataSource.length > 0
        ) {
          window.localStorage.setItem(
            "dualColouredBallDataSource",
            JSON.stringify(dualColouredBallDataSource)
          );
        }
      } catch (e: any) {
        console.log("保存双色球开奖源数据失败：", e.message);
      }
    };
  }, [dualColouredBallDataSource]);

  return (
    <div className={styles.container}>
      <div className={styles.topBox}>
        <div className={styles.left}>
          <Button
            type='primary'
            ghost
            onClick={() => setRandomOneModalOpen(true)}
          >
            随机一注
          </Button>
          <Button
            type='primary'
            ghost
            onClick={() => setOccurrenceFrequencyModalOpen(true)}
          >
            各色球号码出现频次情况
          </Button>
          <Button
            type='primary'
            ghost
            onClick={() => setEchartAnalyzeModalOpen(true)}
          >
            图表分析
          </Button>
          <Button
            type='primary'
            ghost
            onClick={() => setForecastModalOpen(true)}
          >
            预测往期号码及其中奖情况
          </Button>
          <Button
            type='primary'
            ghost
            onClick={() => setAddDataModalOpen(true)}
          >
            添加数据
          </Button>
        </div>
        <Button type='link' onClick={() => setRuleModalOpen(true)}>
          《游戏规则》
        </Button>
      </div>
      <Table
        bordered
        dataSource={tableData}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        sortDirections={["descend", "ascend"]}
      />
      <RandomOneModal
        open={randomOneModalOpen}
        onCancel={() => setRandomOneModalOpen(false)}
      />
      <OccurrenceFrequencyModal
        open={occurrenceFrequencyModalOpen}
        onCancel={() => setOccurrenceFrequencyModalOpen(false)}
      />
      <EchartAnalyzeModal
        open={echartAnalyzeModalOpen}
        onCancel={() => setEchartAnalyzeModalOpen(false)}
      />
      <ForecastModal
        open={forecastModalOpen}
        onCancel={() => setForecastModalOpen(false)}
      />
      <AddDataModal
        open={addDataModalOpen}
        onOk={onAddDataModalOk}
        onCancel={() => setAddDataModalOpen(false)}
      />
      <RuleModal
        open={ruleModalOpen}
        onCancel={() => setRuleModalOpen(false)}
      />
    </div>
  );
};

export default DualColouredBall;
