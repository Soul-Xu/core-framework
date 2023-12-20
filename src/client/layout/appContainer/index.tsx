/** external library */
import Image from "next/image"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { 
  AppstoreFilled,
  UserOutlined,
  ClusterOutlined,
  ProjectOutlined
 } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

/** images */
import ImgTodo from "public/images/common/todo_icon.png"
import ImgIntegration from "public/images/common/integration_icon.png"
import { useSelector } from "react-redux";

const items: MenuItem[] = [
  getItem('应用', 'app', <AppstoreFilled />),
  getItem('我的待办', 'todo', <Image src={ImgTodo} width={20} height={20} alt="ImgTodo"/>),
  getItem('集成中心', 'integration', <Image src={ImgIntegration} width={20} height={20} alt="ImgIntegration"/>),
  getItem('个人中心', 'personalCenter', <UserOutlined />),
  getItem('权限设置', 'permission', <ClusterOutlined />),
  // getItem('系统设置', 'systemSetting', <SettingOutlined />),
  getItem('开发文档', 'openAPI', <ProjectOutlined />),
];

const commonItems: MenuItem[] = [
  getItem('应用', 'app', <AppstoreFilled />),
  getItem('我的待办', 'todo', <Image src={ImgTodo} width={20} height={20} alt="ImgTodo"/>),
  getItem('个人中心', 'personalCenter', <UserOutlined />),
  getItem('开发文档', 'openAPI', <ProjectOutlined />),
];

const itemsMap: any = {
  app: "app",
  todo: "todo",
  integration: "app",
  personalCenter: "personalCenter",
  systemSetting: "systemSetting"
}

const transferMaps = (obj: any) => {
  const res = {}
  for (const key in obj) {
    res[obj[key]] = key
  }
  return res
}

const pathsMap = transferMaps(itemsMap)

interface PageContainerProps {
  children?: React.ReactNode
}

const AppContainer: NextPage<PageContainerProps> = ({ children }: any) => {
  const router: any = useRouter();
  const [collapsed, setCollapsed] = useState("");
  const [selectKey, setSelectKey] = useState(['']);
  const [renderMenus, setRenderMenus] = useState<any>([])
  const userInfo = useSelector((state: any) => state.login.userInfo)

  const onMenuClick = (menu: any) => {
    if (menu.key !== "openAPI") {
      setSelectKey([`${menu.key}`]);
      router.push(`/${menu.key}`);
    } else {
      window.open("http://localhost:3030/", "_blank");
    }
  };

  useEffect(() => {
    const currentPath = router.pathname.split("/")[1];
    setSelectKey([`${currentPath}`]);
  }, [router.pathname]);

  useEffect(() => {
    const isAdmin = userInfo?.fdUserName?.includes("admin")
    isAdmin ? setRenderMenus(items) : setRenderMenus(commonItems)
  }, [])

  return (
    <Layout>
      <Header className={classNames("header")}>
        <div className={classNames("header-container")}>
          <div className={classNames("header-container-logo")}></div>
        </div>
      </Header>
      <Layout className={classNames("container-wrapper")}>
        <Sider
          className={classNames("sider")}
          collapsible
          // @ts-ignore
          collapsed={collapsed.toString()}
          // @ts-ignore
          onCollapse={(value) => setCollapsed(value)}
          style={{
            height: "100vh",
            fontSize: "18px",
            left: 0,
            width: collapsed ? "60px" : "200px"
          }}
        >
          <Menu 
            selectedKeys={selectKey} 
            style={{ fontSize: "18px" }} 
            defaultSelectedKeys={['app']} 
            mode="inline" 
            // @ts-ignore
            collapsed={collapsed}
            onClick={onMenuClick}
            items={renderMenus}
          />
        </Sider>
        <Content
          style={{
            padding: 24,
            margin: 0,
            // marginLeft: collapsed ? "80px" : "200px",
            minHeight: 280,
            background: "#fff",
          }}
        >
          { children }
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppContainer;
