/**
 * 双色球 菜单页
 */
import React, { useState, useEffect } from "react";
import { Button, message, Table } from "antd";
import type { TableColumnProps } from "antd";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import RandomOneModal from "./components/RandomOneModal";
import AddDataModal from "./components/AddDataModal";
import styles from "./index.module.scss";

const DualColouredBall = () => {
  const { dualColouredBallDataSource, setDualColouredBallDataSource } =
    useGlobalContext();
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [randomOneModalOpen, setRandomOneModalOpen] = useState<boolean>(false);
  const [addDataModalOpen, setAddDataModalOpen] = useState<boolean>(false);

  const getTableData = async () => {
    if (dualColouredBallDataSource && dualColouredBallDataSource.length > 0) {
      setTableData(dualColouredBallDataSource);
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

  const onAddDataModalClose = () => {
    setAddDataModalOpen(false);
  };

  const columns: TableColumnProps[] = [
    {
      title: "期号",
      dataIndex: "code",
      width: 100,
    },
    {
      title: "开奖日期",
      dataIndex: "date",
      width: 150,
    },
    {
      title: "开奖号码",
      dataIndex: "number",
      width: 200,
      render: (_: any, record: Record<string, any>) => {
        const { red, blue } = record;
        const result = `${red},${blue}`;
        return result;
      },
    },
  ];

  useEffect(() => {
    getTableData();
  }, [dualColouredBallDataSource]);

  useEffect(() => {
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
  }, []);

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
          <Button type='primary' ghost onClick={() => {}}>
            查看各号码出现频次情况
          </Button>
          <Button
            type='primary'
            ghost
            onClick={() => setAddDataModalOpen(true)}
          >
            添加数据
          </Button>
        </div>
        <Button type='link' onClick={() => {}}>
          《中奖规则》
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
      />
      <RandomOneModal
        open={randomOneModalOpen}
        onCancel={onRandomOneModalClose}
      />
      <AddDataModal
        open={addDataModalOpen}
        onOk={onAddDataModalOk}
        onCancel={onAddDataModalClose}
      />
    </div>
  );
};

export default DualColouredBall;
