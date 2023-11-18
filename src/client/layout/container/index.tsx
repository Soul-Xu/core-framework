/** external library */
import React, { useState } from 'react';
import { NextPage } from 'next';
import { 
  AppstoreFilled,
  CheckCircleOutlined,
  GoldFilled,
  UserOutlined,
 } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
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


const items: MenuItem[] = [
  getItem('应用', 'app', <AppstoreFilled />),
  getItem('我的待办', 'todoList', <CheckCircleOutlined />),
  getItem('集成中心', 'integration', <GoldFilled />),
  getItem('个人中心', 'usercenter', <UserOutlined />),
];

interface PageContainerProps {
  children?: React.ReactNode
}

const AppContainer: NextPage<PageContainerProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <Header className={classNames("header")}>
        <div className={classNames("header-container")}>
          <div className={classNames("header-container-logo", "ellipsis")}>云速易连</div>
        </div>
      </Header>
      <Layout className={classNames("container-wrapper")}>
        <Sider
          className={classNames("sider")} 
          collapsible 
          collapsed={collapsed} 
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            width: collapsed ? "60px" : "200px"
          }}
        >
          <Menu defaultSelectedKeys={['app']} mode="inline" items={items} />
        </Sider>
        <Content
          style={{
            padding: 24,
            margin: 0,
            marginLeft: collapsed ? "80px" : "200px",
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