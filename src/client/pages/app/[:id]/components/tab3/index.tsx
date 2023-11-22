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
import { Breadcrumb, Layout, Menu, Tabs, Row, Col, Card } from 'antd';
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

/** components */
import AddMenus from '../addMenus';
import AreaDemo from "../../../../../components/chartsDemo/area";
import BarDemo from "../../../../../components/chartsDemo/bar";
import ColumnDemo from "../../../../../components/chartsDemo/column";
import LineDemo from "../../../../../components/chartsDemo/line";

/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const TabsContent3 = () => {
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
    getItem('客户', 'app', <AppstoreFilled />),
    getItem('联系人', 'todo', <CheckCircleOutlined />),
    getItem('报价', 'integration', <GoldFilled />),
    getItem('销售订单', 'usercenter', <UserOutlined />),
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
          padding: "24px",
          margin: 0,
          marginTop: "100px",
          marginLeft: collapsed ? "80px" : "200px",
          minHeight: 280,
          background: "#fff",
        }}
      >
        <Row style={{ marginBottom: "30px"}}>
          <Col span="10" style={{ marginRight: "30px"}}>
            <Card title="区域图">
              <AreaDemo />
            </Card>
          </Col>
          <Col span="10">
            <Card title="条形图">
              <BarDemo />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span="10" style={{ marginRight: "30px"}}>
            <Card title="柱状图">
              <ColumnDemo />
            </Card>
          </Col>
          <Col span="10">
            <Card title="折线图">
              <LineDemo />
            </Card>
          </Col>
        </Row>
      </Content>
      <AddMenus open={showAddModal} onCancel={() => onShowAddModal("hide")} />
    </>
  )
}

export default TabsContent3