/**
 * 第一个tab页面
 */
/** external library */
import Image from "next/image"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
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
import FormDemo from "../demos/form";
import SearchDemo from "../demos/search";
import EventManage from "../eventManage";

/** http */
import axios from "axios";
import { baseApi } from '../../../../../config';
import asyncThunk from "../../../../../store/asyncThunk";

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
  fdTabName: "", // 顶部Tab名称
  fdSubject: "", // 标题
  fdDesc: "", // 描述
  fdNo: "", // 事件编号
  fdAuthor: "", // 登记人
  fdInputTime: "", // 登记时间
  fdFindWay: "", // 发现渠道
  fdReportor: "" // 报告人
}

const TabsContent1 = () => {
  const dispatchRedux = useDispatch();
  const router = useRouter()
  const selectTabs = useSelector((state: any) => state.menus.selectTabs)
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

  const onHandleMenus = (menuItem: any) => {
    if (!menuItem || !Array.isArray(menuItem)) {
      return [];
    }
  
    return menuItem.map(item => {
      const antMenuItem: MenuItem = {
        key: item.fdId,
        icon: item.fdIcon,
        label: item.fdComponentName,
        children: item?.children || null
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
      fdId: selectTabs?.fdId
    }

    if (!params.fdId) return

    const res = await dispatchRedux(asyncThunk.getMenus(params) as any)
    const data = res?.payload
    if (data.code === 200) {
      const menus: any = onHandleMenus(data.data)
      const renderMenus: any = [...menus, addMenu]
      const fdTabName = data.data[0]?.fdParentEntity.fdName
      console.log("fdTabName", fdTabName)
      setMenusList(renderMenus)
    } else if (
      data.code === 401 && 
      data.success === false &&
      data.message === "请先登录后再操作!") {
    router.push("/login")
    }
  }

  useEffect(() => {
    getMenus()
  }, [selectTabs?.fdId])

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
        <EventManage />
      </Content>
      <AddMenus open={showAddModal} onCancel={() => onHideAddModal()} />
    </>
  )
}

export default TabsContent1