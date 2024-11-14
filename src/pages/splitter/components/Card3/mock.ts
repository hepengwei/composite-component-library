const mock = [
  {
    id: 999,
    label: "四川测试公司",
    value: "sichuan",
    type: null,
    children: [
      {
        id: 1,
        label: "成都市",
        value: "chengdu",
        type: null,
        children: [
          {
            id: 1,
            label: "示例1",
            value: "示例1",
            type: null,
            children: [
              {
                id: 1,
                label: "示例1-1",
                value: "示例1-1",
                type: 3,
                children: null,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "眉山市",
        value: "meishan",
        type: null,
        children: [
          {
            id: 1,
            label: "示例2",
            value: "示例2",
            type: null,
            children: [
              {
                id: 1,
                label: "示例2-1",
                value: "示例2-1",
                type: 3,
                children: null,
              },
            ],
          },
        ],
      },
      {
        id: 3,
        label: "乐山市",
        value: "leshan",
        type: null,
        children: [
          {
            id: 1,
            label: "示例3",
            value: "示例3",
            type: null,
            children: [
              {
                id: 1,
                label: "示例3-1",
                value: "示例3-1",
                type: 3,
                children: null,
              },
            ],
          },
        ],
      },
    ],
  },
  { id: 1, title: "山西测试公司", key: "shanxi" },
  { id: 2, title: "山东测试公司", key: "shandong" },
  { id: 3, title: "河南测试公司", key: "henan" },
  { id: 5, title: "江苏测试公司", key: "jiangsu" },
  { id: 6, title: "上海测试公司", key: "shanghai" },
  { id: 7, title: "北京测试公司", key: "beijing" },
  { id: 8, title: "广东测试公司", key: "guangdong" },
  { id: 9, title: "广西测试公司", key: "guangxi" },
  { id: 10, title: "湖南测试公司", key: "hunan" },
  { id: 11, title: "湖北测试公司", key: "hubei" },
  { id: 12, title: "重庆测试公司", key: "chongqing" },
];
export default mock;
