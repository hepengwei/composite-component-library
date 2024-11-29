import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "pages/Home";
import FormItemSection from "pages/form/FormItemSection";
import FormListSection from "pages/form/FormListSection";
import AntdTableSection from "pages/table/AntdTableSection";
import AliTableSection from "pages/table/AliTableSection";

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
    children: [
      {
        path: "/table/antdTableSection",
        element: <AntdTableSection />,
      },
      {
        path: "/table/aliTableSection",
        element: <AliTableSection />,
      },
    ],
  },
];

const routes: RouteObject[] = [
  {
    path: "/*",
    element: <Home />,
  },
];

export default routes;
