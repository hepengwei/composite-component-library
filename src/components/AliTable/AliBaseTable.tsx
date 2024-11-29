import React, { forwardRef } from "react";
import { Empty } from "antd";
import { BaseTable, BaseTableProps } from "ali-react-table";
import classnames from "classnames";
import styled from "styled-components";

const BasicTable = styled(BaseTable)`
  &.dark {
    --bgcolor: #132331;
    --header-bgcolor: #182735;
    --hover-bgcolor: #182735;
    --header-hover-bgcolor: #182735;
    --highlight-bgcolor: #191a1b;
    --header-highlight-bgcolor: #191a1b;
    --color: rgba(255, 255, 255, 0.88);
    --header-color: rgba(255, 255, 255, 0.88);
    --lock-shadow: rgb(37 37 37 / 0.5) 0 0 6px 2px;
    --border-color: #0a131b;
  }
  td {
    word-wrap: break-word;
  }
  th {
    font-weight: 600;
    padding-top: 0;
    padding-bottom: 0;
    border-bottom-width: 2px;

    .ant-checkbox-wrapper {
      display: none;
    }
    &:hover {
      background: #e2e7ee;
      .resize-handle {
        background: #d7dbe1;
      }
    }
  }
  &,
  .art-horizontal-scroll-container {
    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
    }

    ::-webkit-scrollbar-thumb {
      background: #ababab;
      border-radius: 4px;

      &:hover {
        background: #6e6e6e;
      }
    }
  }
  ${(props: any) =>
    props.bordered
      ? ""
      : `& {
      --cell-border-vertical: none;
      --header-cell-border-vertical: none;
      thead > tr.first th {
        border-top: none;
      }
      td.first.last {
        border-bottom: none;
      }
    }`}
`;

export const AliBaseTable = forwardRef<
  BaseTable,
  BaseTableProps & { skinColor?: "light" | "dark" }
>(({ skinColor, ...restProps }, ref) => {
  return (
    <BasicTable
      ref={ref}
      stickyScrollHeight={7}
      className={classnames(
        { dark: skinColor === "dark" },
        restProps.className
      )}
      components={{
        EmptyContent: () => <Empty />,
      }}
      estimatedRowHeight={26}
      {...restProps}
    />
  );
});

export default AliBaseTable;
