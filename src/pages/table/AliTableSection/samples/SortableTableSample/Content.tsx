import React, { useEffect, useState } from "react";
import AliMainTable from "@/components/AliTable/AliMainTable";
import type { ArtColumn2 } from "@/components/AliTable";
import { requestMockData } from "utils/util";
import styles from "./index.module.scss";
import dayjs from "dayjs";

const INIT_PAGINATION = {
  pageNum: 1,
  pageSize: 10,
  total: 0,
};

const Content = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
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
    if (res) {
      setPagination({
        ...pain,
        total: res.total,
      });
      setTableData(res.data);
    } else {
      setPagination({ ...pain, total: 0 });
      setTableData([]);
    }
  };

  const columns: ArtColumn2[] = [
    {
      name: "序号",
      code: "id",
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
      features: {
        // 自定义排序比较函数
        sortable: (prev: any, next: any) => {
          if (!prev) {
            return -1; // 没有值的，降序时排最后，升序时排最前
          } else if (!next) {
            return 1; // 没有值的，降序时排最后，升序时排最前
          } else {
            const prevDate = dayjs(prev, "YYYY-MM-DD HH:mm:ss");
            const nextDate = dayjs(next, "YYYY-MM-DD HH:mm:ss");
            if (prevDate > nextDate) {
              return 1;
            } else if (prevDate < nextDate) {
              return -1;
            }
          }
          return 0;
        },
      },
    },
    {
      name: "日期类型",
      code: "dateType",
      width: 150,
      features: {
        sortable: true,
      },
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
      features: {
        sortable: true,
      },
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
    <div className={styles.content}>
      <AliMainTable
        isLoading={loading}
        columns={columns}
        dataSource={tableData}
        getDataSource={getTableData}
        pagination={pagination}
        setPagination={setPagination}
        sort
        sortOptions={{
          keepDataSource: false,
        }}
      />
    </div>
  );
};

export default Content;
