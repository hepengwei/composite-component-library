import React from "react";
import { useRoutes } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import routesConfig from "routes/routes";
import "./app.scss";

dayjs.locale("zh-cn");

const App = () => {
  const routes = useRoutes(routesConfig);

  return (
    <div className='app_container' translate='no'>
      <ConfigProvider locale={zhCN}>{routes}</ConfigProvider>
    </div>
  );
};

export default App;
