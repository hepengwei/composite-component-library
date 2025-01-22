import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import AliMainTable from "@/components/AliTable/AliMainTable";
import type { ArtColumn2 } from "@/components/AliTable";
import { requestMockData } from "utils/util";
import styles from "./index.module.scss";

const INIT_PAGINATION = {
  pageNum: 1,
  pageSize: 10,
  total: 0,
};

const Content = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [footerDataSource, setFooterDataSource] = useState<
    Record<string, any>[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([]);
  const [pagination, setPagin] = useState<Record<string, any>>(INIT_PAGINATION);

  const setPagination = (pagin: Record<string, any>) => {
    setPagin({ ...pagination, ...pagin });
  };

  const getTableData = async (pain?: Record<string, any>) => {
    setLoading(true);
    pain = pain || pagination;
    const res = await requestMockData({
      pageNum: pain.pageNum,
      pageSize: pain.pageSize,
    });
    setLoading(false);
    setSelectedRows([]);
    if (res) {
      // 汇总数值
      const sum = res.data.reduce(
        (result: number, record: Record<string, any>) => result + record.number,
        0
      );
      setPagination({
        ...pain,
        total: res.total,
      });
      setTableData(res.data);
      setFooterDataSource([{ id: "footer", num: "汇总行", number: sum }]);
      footerDataSource;
    } else {
      setPagination({ ...pain, total: 0 });
      setTableData([]);
      setFooterDataSource([]);
    }
  };

  const onEditClick = () => {
    if (!selectedRows || selectedRows.length === 0) {
      message.warning("请先选择一条数据");
      return;
    }
    message.success(`当前选择的数据序号为: ${selectedRows[0].num}`);
  };

  const columns: ArtColumn2[] = [
    {
      name: "序号",
      code: "num",
      width: 80,
      lock: "left",
    },
    {
      name: "邮箱",
      code: "email",
      width: 180,
    },
    {
      name: "日期",
      code: "date",
      width: 180,
    },
    {
      name: "日期类型",
      code: "dateType",
      width: 150,
      render: (value: string) => {
        if (value === "workingDay") {
          return "工作日";
        } else if (value === "naturalDay") {
          return "自然日";
        }
        return "";
      },
    },
    {
      name: "数值",
      code: "number",
      width: 180,
      align: "right",
    },
    {
      name: "备注",
      code: "remark",
      width: 300,
      ellipsis: true,
    },
    {
      name: "字段1",
      code: "email",
      width: 150,
    },
    {
      name: "字段2",
      code: "email",
      width: 150,
    },
    {
      name: "字段3",
      code: "email",
      width: 150,
    },
    {
      name: "字段4",
      code: "email",
      width: 150,
    },
    {
      name: "字段5",
      code: "email",
      width: 150,
    },
    {
      name: "字段6",
      code: "email",
      width: 150,
    },
  ];

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <>
      <div className={styles.itemTitleRow}>
        <Button type='primary' ghost onClick={onEditClick}>
          编辑
        </Button>
      </div>
      <div className={styles.content}>
        <AliMainTable
          rowKey='id'
          isLoading={loading}
          columns={columns}
          dataSource={tableData}
          getDataSource={getTableData}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          pagination={pagination}
          setPagination={setPagination}
          footerDataSource={footerDataSource}
          isStickyFooter
        />
      </div>
    </>
  );
};

export default Content;
