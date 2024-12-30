/**
 * 福彩3D 菜单页
 */
import React, { useState, useEffect } from "react";
import { Button, message, Table } from "antd";
import dayjs from "dayjs";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import RandomOneModal from "./components/RandomOneModal";
import OccurrenceFrequencyModal from "./components/OccurrenceFrequencyModal";
import EchartAnalyzeModal from "./components/EchartAnalyzeModal";
import AddDataModal from "./components/AddDataModal";
import RuleModal from "./components/RuleModal";
import styles from "./index.module.scss";
import BigNumber from "bignumber.js";

const Lottery3D = () => {
  const { lottery3DDataSource, setLottery3DDataSource } = useGlobalContext();
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [randomOneModalOpen, setRandomOneModalOpen] = useState<boolean>(false);
  const [occurrenceFrequencyModalOpen, setOccurrenceFrequencyModalOpen] =
    useState<boolean>(false);
  const [echartAnalyzeModalOpen, setEchartAnalyzeModalOpen] =
    useState<boolean>(false);
  const [addDataModalOpen, setAddDataModalOpen] = useState<boolean>(false);
  const [ruleModalOpen, setRuleModalOpen] = useState<boolean>(false);

  const getTableData = async () => {
    if (lottery3DDataSource && lottery3DDataSource.length > 0) {
      setTableData(lottery3DDataSource);
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
          if (lottery3DDataSource && lottery3DDataSource.length > 0) {
            let finalList: Record<string, any>[] = [];
            newArr.forEach((item: Record<string, any>) => {
              if (item.name === "3D") {
                const isExist = lottery3DDataSource.some(
                  (item2: Record<string, any>) => {
                    if (item2.name === item.name && item2.code === item.code)
                      return true;
                    return false;
                  }
                );
                // 将原来不存在的放入finalList
                if (!isExist) {
                  // 添加号码和数字段
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
            finalList = finalList.concat(lottery3DDataSource);
            setLottery3DDataSource(finalList);
          } else {
            setLottery3DDataSource(newArr);
          }
        }
        message.success("添加成功");
        onAddDataModalClose();
      } catch (e: any) {
        message.warning("解析数据失败");
        console.log("解析数据失败:", e.message);
      }
    }
    setAddDataModalOpen(false);
  };

  const onRandomOneModalClose = () => {
    setRandomOneModalOpen(false);
  };

  const onOccurrenceFrequencyModalClose = () => {
    setOccurrenceFrequencyModalOpen(false);
  };

  const onAddDataModalClose = () => {
    setAddDataModalOpen(false);
  };

  const onRuleModalClose = () => {
    setRuleModalOpen(false);
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
      ) => {
        if (!prevRecord?.date) {
          return -1; // 没有值的，降序时排最后，升序时排最前
        } else if (!nextRecord?.date) {
          return 1; // 没有值的，降序时排最后，升序时排最前
        } else {
          const prevDate = dayjs(prevRecord.date.split("(")[0], "YYYY-MM-DD");
          const nextDate = dayjs(nextRecord.date.split("(")[0], "YYYY-MM-DD");
          if (prevDate > nextDate) {
            return 1;
          } else if (prevDate < nextDate) {
            return -1;
          }
        }
        return 0;
      },
    },
    {
      title: "开奖号码",
      dataIndex: "number",
      width: 224,
      render: (_: any, record: Record<string, any>) => {
        const { red } = record;
        const numberList = red.split(",");
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
                      backgroundColor: "#37AFE1",
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
      title: "号码和数",
      dataIndex: "sum",
      width: 90,
    },
    {
      title: "销售额（元）",
      dataIndex: "sales",
      width: 150,
      sorter: (
        prevRecord: Record<string, any>,
        nextRecord: Record<string, any>
      ) => {
        if (!prevRecord?.sales) {
          return -1; // 没有值的，降序时排最后，升序时排最前
        } else if (!nextRecord?.sales) {
          return 1; // 没有值的，降序时排最后，升序时排最前
        } else {
          const prevSales = new BigNumber(prevRecord.sales);
          const nextSales = new BigNumber(nextRecord.sales);
          if (prevSales.gt(nextSales)) {
            return 1;
          } else if (prevSales.lt(nextSales)) {
            return -1;
          }
        }
        return 0;
      },
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
      // 将福彩3D开奖源数据保存到localStorage中
      try {
        if (lottery3DDataSource && lottery3DDataSource.length > 0) {
          window.localStorage.setItem(
            "lottery3DDataSource",
            JSON.stringify(lottery3DDataSource)
          );
        }
      } catch (e: any) {
        console.log("保存福彩3D开奖源数据失败：", e.message);
      }
    };
  }, [lottery3DDataSource]);

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
        onCancel={onRandomOneModalClose}
      />
      <OccurrenceFrequencyModal
        open={occurrenceFrequencyModalOpen}
        onCancel={onOccurrenceFrequencyModalClose}
      />
      <EchartAnalyzeModal
        open={echartAnalyzeModalOpen}
        onCancel={() => setEchartAnalyzeModalOpen(false)}
      />
      <AddDataModal
        open={addDataModalOpen}
        onOk={onAddDataModalOk}
        onCancel={onAddDataModalClose}
      />
      <RuleModal open={ruleModalOpen} onCancel={onRuleModalClose} />
    </div>
  );
};

export default Lottery3D;
