import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "pages/Home";
import FormItemSection from "pages/form/FormItemSection";
import FormListSection from "pages/form/FormListSection";
import TableSection from "pages/table";
import SplitterSection from "pages/splitter";
import ComingSoon from "@/components/ComingSoon";

export const contentRoutes: RouteObject[] = [
  {
    path: "/form",
    children: [
      {
        path: "/form/formItemSection",
        element: <FormItemSection />,
      },
      {
        path: "/form/formListSection",
        element: <FormListSection />,
      },
    ],
  },
  {
    path: "/table",
    element: <TableSection />,
  },
  {
    path: "/splitter",
    element: <SplitterSection />,
  },
];

const routes: RouteObject[] = [
  {
    path: "/*",
    element: <Home />,
  },
];

export default routes;
