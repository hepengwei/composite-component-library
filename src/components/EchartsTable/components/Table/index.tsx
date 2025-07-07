/* eslint-disable @typescript-eslint/consistent-type-imports */
import React from "react";
import { BaseTable, BaseTableProps } from "ali-react-table";
import styled, { StyleSheetManager } from "styled-components";
import { Default } from "../index";

const StyledBaseTable = styled(BaseTable)`
  --row-height: 28px;
  --header-row-height: 28px;
  --cell-padding: 6px;
  --font-size: 12px;
  --line-height: 14px;
  --border-color: var(--bd);
  --lock-shadow: var(--ant-cus-base_bg_black_a25) 0 0 6px 2px;
  // 1
  .lock-left .expansion-cell {
    position: sticky;
    left: 7px;
    max-width: 40em;
  }
  .expansion-cell {
    width: 100%;
    .expansion-icon {
      color: #d3d4d4 !important;
    }
  }
  // .art-sticky-scroll {
  //   display: none !important;
  // }
  .art-lock-shadow-mask {
    margin-bottom: 14px !important;
    .show-shadow {
      ${(props) =>
        props.dataSource &&
        props.dataSource.length === 0 &&
        `
        box-shadow: none !important;
        border-right: none !important
        `}
    }
  }
  .art-empty-wrapper {
    width: 120px;
    padding-top: 20px;
  }
  .art-table-cell {
    word-wrap: break-word;
  }
` as unknown as typeof BaseTable;
// --cell-border: string
// --cell-border-horizontal: string
// --cell-border-vertical: string
// --header-cell-border: string;
// --header-cell-border-horizontal: string
// --header-cell-border-vertical: string

const EmptyContent = React.memo(() => <Default size={80} type="emptysm" />);

export default React.forwardRef<BaseTable, BaseTableProps>((props, ref) => {
  const { components, ...others } = props;
  return (
    <StyleSheetManager disableCSSOMInjection>
      <StyledBaseTable
        ref={ref}
        components={{
          EmptyContent: EmptyContent,
          ...components,
        }}
        style={{ height: "100%" }}
        {...others}
      />
    </StyleSheetManager>
  );
});
