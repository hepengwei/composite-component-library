/**
 * 双色球 菜单页
 */
import React, { useState, useEffect } from "react";
import { Button, message, Table } from "antd";
import dayjs from "dayjs";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import RandomOneModal from "./components/RandomOneModal";
import OccurrenceFrequencyModal from "./components/OccurrenceFrequencyModal";
import AddDataModal from "./components/AddDataModal";
import RuleModal from "./components/RuleModal";
import styles from "./index.module.scss";
import BigNumber from "bignumber.js";

const DualColouredBall = () => {
  const { dualColouredBallDataSource, setDualColouredBallDataSource } =
    useGlobalContext();
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [randomOneModalOpen, setRandomOneModalOpen] = useState<boolean>(false);
  const [occurrenceFrequencyModalOpen, setOccurrenceFrequencyModalOpen] =
    useState<boolean>(false);
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
                  finalList.push(item);
                }
              }
            });
            // 将新增的和原来的数据合并
            finalList = finalList.concat(dualColouredBallDataSource);
            setDualColouredBallDataSource(finalList);
          } else {
            setDualColouredBallDataSource(newArr);
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
      width: 100,
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
      title: "一等奖",
      width: 200,
      children: [
        {
          title: "注数",
          dataIndex: "typenum1",
          key: "typenum1",
          width: 80,
        },
        {
          title: "金额",
          dataIndex: "typemoney1",
          key: "typemoney1",
          width: 120,
          sorter: (
            prevRecord: Record<string, any>,
            nextRecord: Record<string, any>
          ) => {
            if (!prevRecord?.typemoney1) {
              return -1; // 没有值的，降序时排最后，升序时排最前
            } else if (!nextRecord?.typemoney1) {
              return 1; // 没有值的，降序时排最后，升序时排最前
            } else {
              const prevTypemoney = new BigNumber(prevRecord.typemoney1);
              const nextTypemoney = new BigNumber(nextRecord.typemoney1);
              if (prevTypemoney.gt(nextTypemoney)) {
                return 1;
              } else if (prevTypemoney.lt(nextTypemoney)) {
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
      ],
    },
    {
      title: "二等奖",
      width: 200,
      children: [
        {
          title: "注数",
          dataIndex: "typenum2",
          key: "typenum2",
          width: 80,
        },
        {
          title: "金额",
          dataIndex: "typemoney2",
          key: "typemoney2",
          width: 120,
          sorter: (
            prevRecord: Record<string, any>,
            nextRecord: Record<string, any>
          ) => {
            if (!prevRecord?.typemoney2) {
              return -1; // 没有值的，降序时排最后，升序时排最前
            } else if (!nextRecord?.typemoney2) {
              return 1; // 没有值的，降序时排最后，升序时排最前
            } else {
              const prevTypemoney = new BigNumber(prevRecord.typemoney2);
              const nextTypemoney = new BigNumber(nextRecord.typemoney2);
              if (prevTypemoney.gt(nextTypemoney)) {
                return 1;
              } else if (prevTypemoney.lt(nextTypemoney)) {
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
      ],
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
    {
      title: "奖池金额（元）",
      dataIndex: "poolmoney",
      width: 150,
      sorter: (
        prevRecord: Record<string, any>,
        nextRecord: Record<string, any>
      ) => {
        if (!prevRecord?.poolmoney) {
          return -1; // 没有值的，降序时排最后，升序时排最前
        } else if (!nextRecord?.poolmoney) {
          return 1; // 没有值的，降序时排最后，升序时排最前
        } else {
          const prevPoolmoney = new BigNumber(prevRecord.poolmoney);
          const nextPoolmoney = new BigNumber(nextRecord.poolmoney);
          if (prevPoolmoney.gt(nextPoolmoney)) {
            return 1;
          } else if (prevPoolmoney.lt(nextPoolmoney)) {
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
            随机一个
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
      <AddDataModal
        open={addDataModalOpen}
        onOk={onAddDataModalOk}
        onCancel={onAddDataModalClose}
      />
      <RuleModal open={ruleModalOpen} onCancel={onRuleModalClose} />
    </div>
  );
};

export default DualColouredBall;
