export interface MockItem {
  id: number;
  label: string;
  value: string;
  type: number | null;
  children: MockItem[] | null;
}

export const mock: MockItem[] = [
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
            value: "1",
            type: null,
            children: [
              {
                id: 1,
                label: "示例1-1",
                value: "2",
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
            value: "3",
            type: null,
            children: [
              {
                id: 1,
                label: "示例2-1",
                value: "4",
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
            value: "5",
            type: null,
            children: [
              {
                id: 1,
                label: "示例3-1",
                value: "6",
                type: 3,
                children: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 1,
    label: "云南测试公司",
    value: "yunnan",
    type: null,
    children: [
      {
        id: 1,
        label: "昆明市",
        value: "kunming",
        type: null,
        children: [
          {
            id: 1,
            label: "示例1",
            value: "7",
            type: null,
            children: [
              {
                id: 1,
                label: "示例1-2",
                value: "8",
                type: 3,
                children: null,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "大理市",
        value: "dali",
        type: null,
        children: [
          {
            id: 1,
            label: "示例2",
            value: "9",
            type: null,
            children: [
              {
                id: 1,
                label: "示例2-1",
                value: "10",
                type: 3,
                children: null,
              },
            ],
          },
        ],
      },
    ],
  },
];
