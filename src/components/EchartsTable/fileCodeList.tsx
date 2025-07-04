/**
 * 图表与表格联动应用
 *  */
import {
  mockCode,
  EchartsTable,
  EchartsTableHelper,
  EchartsTableScss,
  EchartsTableCompIndex,
  EchartsTableChartsIndex,
  EchartsTableChartsHelper,
  EchartsTableDefaultIndex,
  EchartsTableDefaultIndexScss,
  EchartsTableSegmentedIndex,
  EchartsTableSegmentedIndexScss,
  EchartsTableTitleIndex,
  EchartsTableTitleIndexScss,
} from "./code";

export const fileCodeList = [
  { fileName: "EchartsTable.tsx", code: EchartsTable },
  { fileName: "EchartsTable.scss", code: EchartsTableScss },
  { fileName: "mock.ts", code: mockCode },
  { fileName: "EchartsTableHelper.ts", code: EchartsTableHelper },
  { fileName: "EchartsTableCompIndex.tsx", code: EchartsTableCompIndex },
  { fileName: "EchartsTableChartsIndex.tsx", code: EchartsTableChartsIndex },
  { fileName: "EchartsTableChartsHelper.ts", code: EchartsTableChartsHelper },
  { fileName: "EchartsTableDefaultIndex.tsx", code: EchartsTableDefaultIndex },
  {
    fileName: "EchartsTableDefaultIndexScss.scss",
    code: EchartsTableDefaultIndexScss,
  },
  {
    fileName: "EchartsTableSegmentedIndex.tsx",
    code: EchartsTableSegmentedIndex,
  },
  {
    fileName: "EchartsTableSegmentedIndexScss.scss",
    code: EchartsTableSegmentedIndexScss,
  },
  { fileName: "EchartsTableTitleIndex.tsx", code: EchartsTableTitleIndex },
  {
    fileName: "EchartsTableTitleIndexScss.scss",
    code: EchartsTableTitleIndexScss,
  },
];
