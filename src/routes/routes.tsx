import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "pages/Home";
import { supportLazyElement } from "utils/util";
import ComingSoon from "@/components/ComingSoon";

const FormItemSection = () => import("pages/form/FormItemSection");
const FormListSection = () => import("pages/form/FormListSection");
const AntdTableSection = () => import("pages/table/AntdTableSection");
const AliTableSection = () => import("pages/table/AliTableSection");
const DualColouredBall = () => import("pages/welfareLottery/DualColouredBall");

const contentRoutes: Record<string, any>[] = [
  {
    path: "/form",
    children: [
      {
        path: "/form/formItemSection",
        element: FormItemSection,
      },
      {
        path: "/form/formListSection",
        element: FormListSection,
      },
    ],
  },
  {
    path: "/table",
    children: [
      {
        path: "/table/antdTableSection",
        element: AntdTableSection,
      },
      {
        path: "/table/aliTableSection",
        element: AliTableSection,
      },
    ],
  },
  {
    path: "/welfareLottery",
    children: [
      {
        path: "/welfareLottery/dualColouredBall",
        element: DualColouredBall,
      },
      {
        path: "/welfareLottery/bigLotto",
        element: <ComingSoon />,
      },
      {
        path: "/welfareLottery/3D",
        element: <ComingSoon />,
      },
    ],
  },
];

supportLazyElement(contentRoutes);
export { contentRoutes };

const routes: RouteObject[] = [
  {
    path: "/*",
    element: <Home />,
  },
];

export default routes;
