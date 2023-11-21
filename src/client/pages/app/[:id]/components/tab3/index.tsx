/**
 * 第一个tab页面
 */
/** external library */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { 
  AppstoreFilled,
  CheckCircleOutlined,
  GoldFilled,
  UserOutlined,
 } from '@ant-design/icons';
import type { MenuProps, TabsProps } from 'antd';
import { Breadcrumb, Layout, Menu, Tabs } from 'antd';
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
  getItem('客户', 'app', <AppstoreFilled />),
  getItem('联系人', 'todo', <CheckCircleOutlined />),
  getItem('报价', 'integration', <GoldFilled />),
  getItem('销售订单', 'usercenter', <UserOutlined />),
];

const TabsContent3 = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectKey, setSelectKey] = useState([''])

  const onMenuClick = (menu: any) => {
    setSelectKey([`${menu.key}`])
    // router.push(`/${itemsMap[menu.key]}`)
  }

  return (
    <>
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
        <Menu defaultSelectedKeys={['app']} mode="inline" items={items} onClick={onMenuClick} />
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
        tab3
      </Content>
    </>
  )
}

export default TabsContent3