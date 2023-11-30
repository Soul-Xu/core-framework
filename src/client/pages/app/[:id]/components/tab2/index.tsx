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
  PlusOutlined
 } from '@ant-design/icons';
import type { MenuProps, TabsProps } from 'antd';
import { Breadcrumb, Layout, Menu, Tabs, Row, Col } from 'antd';
const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

/** components */
import AddMenus from '../addMenus';
import SearchDemo from '../demos/search';

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

const TabsContent2 = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectKey, setSelectKey] = useState([''])
  const [showAddModal, setShowAddModal] = useState(false)

  const onMenuClick = (menu: any) => {
    setSelectKey([`${menu.key}`])
    // router.push(`/${itemsMap[menu.key]}`)
  }

  /**
   * @description 控制新建tab弹窗
   * @param
   */
  const onShowAddModal = (type: string) => {
    type === "show" &&  setShowAddModal(true)
    type === "hide" && setShowAddModal(false)
  }

  const items: MenuItem[] = [
    getItem('供应商', 'app', <AppstoreFilled />),
    getItem('供应商报价', 'todo', <CheckCircleOutlined />),
    getItem('采购订单', 'integration', <GoldFilled />),
    getItem('采购订单明细', 'usercenter', <UserOutlined />),
    getItem(
      <div 
        style={{ paddingLeft: "8px", color: "#beb2b2" }}
        onClick={() => onShowAddModal("show")}
      >新建菜单</div>, 
      'add',
      <div 
        style={{ paddingLeft: "6px", width: "14px", height: "14px", color: "#beb2b2" }}
        onClick={() => onShowAddModal("show")}
      >
        <PlusOutlined />
      </div> 
    ),
  ];

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
          width: collapsed ? "calc(100vw - 80px)" : "calc(100vw - 200px)",
          height: "100vh",
          padding: 24,
          margin: 0,
          marginLeft: collapsed ? "80px" : "200px",
          minHeight: 280,
          background: "#fff",
        }}
      >
        <SearchDemo />
        <div className={classNames("demo")}>
          <div className={classNames("demo-title")}>代码示例</div>
          <Row>
            <Col span="12">
              <div className={classNames("demo-demo1")}></div>
            </Col>
            <Col span="12">
              <div className={classNames("demo-demo3")}></div>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <div className={classNames("demo-demo2")}></div>
            </Col>
            <Col span="12">
              <div className={classNames("demo-demo4")}></div>
            </Col>
          </Row>
        </div>
      </Content>
      <AddMenus tabName='测试' open={showAddModal} onCancel={() => onShowAddModal("hide")} />
    </>
  )
}

export default TabsContent2