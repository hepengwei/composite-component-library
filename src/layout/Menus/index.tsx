import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import ReactDOM from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FormOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { useDebounceFn } from "ahooks";
import { Button, Menu } from "antd";
import type { MenuProps } from "antd";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import styles from "./index.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <p className={styles.menuLabel}>{label}</p>,
    type,
  } as MenuItem;
}

const Menus: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { setMenuWidth } = useGlobalContext();
  const containerRef = useRef<HTMLDivElement>(null);

  const items: MenuItem[] = [
    getItem("表单", "form", <FormOutlined />, [
      getItem("FormItem 部分", "formItemSection"),
      getItem("FormList 部分", "formListSection"),
    ]),
    getItem("表格", "table", <TableOutlined />),
  ];

  const updateMenuWidth = useCallback(
    useDebounceFn(
      () => {
        const containerNode = ReactDOM.findDOMNode(
          containerRef.current
        ) as HTMLDivElement;
        if (containerNode) {
          setMenuWidth(containerNode.clientWidth);
        }
      },
      { wait: 360 }
    ).run,
    []
  );

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onMenu = (options: { keyPath: string[] }) => {
    const { keyPath } = options;
    const routePath = keyPath.reduce((result, item) => {
      result = `/${item}${result}`;
      return result;
    }, "");
    navigate(routePath);
  };

  const selectedKeys = useMemo(() => {
    const { pathname } = location;
    const result = [];
    if (pathname) {
      const arr = pathname.split("/");
      const key = arr[arr.length - 1];
      if (key) {
        result.push(key);
      }
    }
    return result;
  }, [location]);

  const defaultOpenKeys = useMemo(() => {
    const { pathname } = location;
    if (pathname) {
      const arr = pathname.split("/");
      if (arr.length >= 2 && arr[1]) {
        return [arr[1]];
      }
    }
    return ["form"];
  }, [location]);

  useEffect(() => {
    updateMenuWidth();
  }, [collapsed]);

  useEffect(() => {
    window.addEventListener("resize", updateMenuWidth);

    return () => {
      window.removeEventListener("resize", updateMenuWidth);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.topBox}>
        <div className={styles.top}>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>

        <Menu
          defaultOpenKeys={defaultOpenKeys}
          selectedKeys={selectedKeys}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          onClick={onMenu}
        />
      </div>

      <div className={styles.bottom}>
        {!collapsed && <span>持续更新, 敬请期待</span>}
      </div>
    </div>
  );
};

export default Menus;
