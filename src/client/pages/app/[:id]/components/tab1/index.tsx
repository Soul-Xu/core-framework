/**
 * 第一个tab页面
 */
/** external library */
import Image from "next/image"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import FormDemo from '../demos/form';
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

/** utils */
import { baseApi } from '../../../../../config';
import axios from "axios";

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

const initialState = {
  fdSubject: "", // 标题
  fdDesc: "", // 描述
  fdNo: "", // 事件编号
  fdAuthor: "", // 登记人
  fdInputTime: "", // 登记时间
  fdFindWay: "", // 发现渠道
  fdReportor: "" // 报告人
}

const TabsContent1 = () => {
  const router = useRouter()
  const curAppId = router.query[":id"]
  const curTabId = router.query["tabId"]
  const [collapsed, setCollapsed] = useState(false)
  const [selectKey, setSelectKey] = useState([''])
  const [showAddModal, setShowAddModal] = useState(false)
  const [menusList, setMenusList] = useState([])

  const addMenu = getItem(
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
  )

  const menuItem = [
    {
      fdId: "1hgacjuc83vtqukb1malp7g19appf42r039h",
      fdComponentName: "测试二级菜单",
      fdCreateTime: null,
      fdIcon: null,
      fdParentEntity: {
        fdId: "1hgaaclhtna6abn3tvrkbgd9bi74q9qfu024",
        fdName: null
      },
      fdAppEntity: null,
      fdPermission: null,
      fdRemark: "测试用左侧菜单",
      fdRoleEntities: null,
      children: [],
      fdUpdateTime: null,
      fdUrl: "默认",
      fdVisiable: 1    
    }
  ]

  const onMenuClick = (menu: any) => {
    setSelectKey([`${menu.key}`])
  }

  /**
   * @description 控制新建tab弹窗
   * @param
   */
  const onShowAddModal = (type: string) => {
    type === "show" &&  setShowAddModal(true)
    type === "hide" && setShowAddModal(false)
  }

  /**
   * @description 隐藏新建tab弹窗
   * @param
   */
  const onHideAddModal = () => {
    getMenus()
    setShowAddModal(false)
  }

  const onHandleMenus = (menus: any) => {
    console.log("1111-onHandleMenus", menus)
    if (!menuItem || !Array.isArray(menuItem)) {
      return [];
    }
  
    return menuItem.map(item => {
      const antMenuItem: MenuItem = {
        key: item.fdId,
        icon: item.fdIcon,
        label: item.fdComponentName,
        children: item?.children
      };
  
      if (item.children && item.children.length > 0) {
        antMenuItem.children = onHandleMenus(item.children);
      }
  
      return antMenuItem;
    });
  }

  /**
   * @description 获取左侧菜单列表
   * @param
   */
  const getMenus = async () => {
    const params = {
      fdId: curTabId
    }

    const res = await axios.request({
      url: `${baseApi}/component-permission/child-menu`,
      method: "post",
      data: params,
      withCredentials: true,  
      headers: {
        'Content-Type': 'application/json' // 设置为 application/json
      },
    }).then((res: any) => {
      const data = res.data
      if (data.code === 200) {
        // const tabs: any = [...data.data, tabAdd]
        // setTabsList(tabs)
        const menus: any = onHandleMenus(data.data)
        const renderMenus: any = [...menus, addMenu]
        setMenusList(renderMenus)
        // console.log("menu-list", data.data)
      }
      
    }).catch((err: any) => {
      console.log("err", err)
    })
  } 

  const items: MenuItem[] = [
    getItem('数据总览', 'app', <AppstoreFilled />),
    getItem('库存看板', 'todo', <CheckCircleOutlined />),
    getItem('销售看板', 'integration', <GoldFilled />),
    getItem('采购看板', 'usercenter', <UserOutlined />),
    getItem('财务看板', 'stock', <UserOutlined />),
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

  useEffect(() => {
    getMenus()
    console.log("route-tab", router.query)
  }, [curAppId])

  useEffect(() => {
    const menus: any = [...menusList, addMenu]
    setMenusList(menus)
  }, [])

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
        <Menu defaultSelectedKeys={['app']} mode="inline" items={menusList} onClick={onMenuClick} />
      </Sider>
      <Content
        style={{
          width: collapsed ? "calc(100vw - 80px)" : "calc(100vw - 200px)",
          height: "100vh",
          padding: 24,
          margin: 0,
          marginTop: "60px",
          marginLeft: collapsed ? "80px" : "200px",
          minHeight: 280,
          background: "#fff",
        }}
      >
        <FormDemo />
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
      <AddMenus open={showAddModal} onCancel={() => onHideAddModal()} />
    </>
  )
}

export default TabsContent1



const menuItem = [
  {
    fdId: "1hgacjuc83vtqukb1malp7g19appf42r039h",
    fdComponentName: "测试二级菜单",
    fdCreateTime: null,
    fdIcon: null,
    fdParentEntity: {
      fdId: "1hgaaclhtna6abn3tvrkbgd9bi74q9qfu024",
      fdName: null
    },
    fdAppEntity: null,
    fdPermission: null,
    fdRemark: "测试用左侧菜单",
    fdRoleEntities: null,
    children: [],
    fdUpdateTime: null,
    fdUrl: "默认",
    fdVisiable: 1    
  },
  {
    fdId: "1hgacjuc83vtqukb1malp7g19appsfafafsa9h",
    fdComponentName: "测试二级菜单1111",
    fdCreateTime: null,
    fdIcon: null,
    fdParentEntity: {
      fdId: "1hgaaclhtna6abn3tvrkbgd9bi74q9qfu024",
      fdName: null
    },
    fdAppEntity: null,
    fdPermission: null,
    fdRemark: "测试用左侧菜单",
    fdRoleEntities: null,
    children: [],
    fdUpdateTime: null,
    fdUrl: "默认",
    fdVisiable: 1    
  },
]