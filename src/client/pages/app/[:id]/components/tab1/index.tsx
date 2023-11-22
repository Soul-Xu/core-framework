/**
 * 第一个tab页面
 */
/** external library */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import FormLayout from "../../../../../components/formLayout"
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
  getItem('数据总览', 'app', <AppstoreFilled />),
  getItem('库存看板', 'todo', <CheckCircleOutlined />),
  getItem('销售看板', 'integration', <GoldFilled />),
  getItem('采购看板', 'usercenter', <UserOutlined />),
  getItem('财务看板', 'stock', <UserOutlined />),
];

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
  const [collapsed, setCollapsed] = useState(false)
  const [selectKey, setSelectKey] = useState([''])

  const onMenuClick = (menu: any) => {
    setSelectKey([`${menu.key}`])
  }

  const formObj1 = {
    name: 'basic-form1',
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'input',
        type: "text",
        key: 'fdSubject',
        // value: fdSubject,
        defaultValue: "0928001",
        label: (
          // <span className={classNames("form-item-label")}>标题</span>
          <span className={classNames("form-item-label-option")}>
            <span className={classNames("form-item-require")}>*</span>
            标题
          </span>
        ),
        name: 'fdSubject',
        // require: 1,
        onChange: (e: any) => {
          // onHandleChange('fdSubject', e.target.value.trim())
        }
      },
      {
        kind: 'input',
        type: "area",
        key: 'fdDesc',
        // value: fdDesc,
        defaultValue: "0928001",
        label: (
          <span className={classNames("form-item-label-option")}>
            <span className={classNames("form-item-require")}>*</span>
            描述
          </span>
        ),
        name: 'fdDesc',
        // require: 1,
        // placeholder: '请输入描述',
        onChange: (e: any) => {
          // onHandleChange('fdDesc', e.target.value.trim())
        }
      },
    ]
  }

  const formObj2 = {
    name: 'basic-form2',
    inRow: 3,
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'input',
        type: "text",
        key: 'fdNo',
        // value: fdNo,
        defaultValue: "SJ-2023092800001",
        label: (
          <span className={classNames("form-item-label-option")}>事件编号</span>
        ),
        name: 'fdNo',
        disabled: true,
        // placeholder: '自动获取',
        onChange: (e: any) => {
          // onHandleChange('fdNo', e.target.value.trim())
        }
      },
      {
        kind: 'input',
        type: "text",
        key: 'fdAuthor',
        // value: fdAuthor,
        defaultValue: "廖",
        label: (
          <span className={classNames("form-item-label-option")}>登记人</span>
        ),
        name: 'fdAuthor',
        disabled: true,
        placeholder: '自动获取',
        onChange: (e: any) => {
          // onHandleChange('fdAuthor', e.target.value.trim())
        }
      },
      {
        kind: 'datepicker',
        key: 'fdInputTime',
        // value: fdInputTime,
        label: (
          <span className={classNames("form-item-label-option")}>登记时间</span>
        ),
        name: 'fdInputTime',
        style: { width: "228px" },
        format: "YYYY-MM-DD HH:mm:ss",
        disabled: true,
        placeholder: '自动获取'
      },
      {
        kind: 'select',
        key: 'fdFindWay',
        // value: fdFindWay,
        defaultValue: "监控工具",
        label: (
          // <span className={classNames("form-item-label")}>发现渠道</span>
          <span className={classNames("form-item-label-option")}>
            <span className={classNames("form-item-require")}>*</span>
            发现渠道
          </span>
        ),
        name: 'fdFindWay',
        // require: 1,
        // placeholder: '请输入发现渠道',
        onChange: (value: any) => {
          // onHandleChange('fdFindWay', value)
        }
      },
      {
        kind: 'select',
        key: 'fdReportor',
        // value: fdReportor,
        label: (
          <span className={classNames("form-item-label-option")}>报告人</span>
        ),
        name: 'fdReportor',
        onChange: (value: any) => {
          // onHandleChange('fdReportor', value)
        }
      }
    ],
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
          width: collapsed ? "calc(100vw - 80px)" : "calc(100vw - 200px)",
          height: "100vh",
          padding: 24,
          margin: 0,
          marginLeft: collapsed ? "80px" : "200px",
          minHeight: 280,
          background: "#fff",
        }}
      >
        <FormLayout formObj={formObj1} />
        <FormLayout formObj={formObj2} />
      </Content>
    </>
  )
}

export default TabsContent1



