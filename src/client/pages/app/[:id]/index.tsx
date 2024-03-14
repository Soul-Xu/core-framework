/** external library */
import { NextPage } from 'next'
import { Layout, Menu, theme, Button} from 'antd'
const { Header, Content, Sider } = Layout
import { PlusOutlined, LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import microApp from '@micro-zoe/micro-app'
import { useRouter } from 'next/router'
import _ from 'lodash'

import asyncThunk from '../../../store/asyncThunk'
/** css */
import classnames from "classnames/bind"
import styles from "./index.module.scss"
const classNames = classnames.bind(styles)

const { SubMenu } = Menu;
import { adminChildMenu, commonChildMenu } from '../constants'

/** component */
import ProjectContainer from '../../../layout/projectContainer'
import EventManage from './components/eventManage'

const AppById: NextPage = () => {
  const [menuData, setMenuData] = useState([])
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const router = useRouter()
  const dispatchRedux = useDispatch()
  const selectTabs = useSelector((state: any) => state.menus.selectTabs)
  const userInfo = useSelector((state: any) => state.login.userInfo)
  const menuList = useSelector((state: any) => state.menus.menuList)
  const [selectMenu, setSelectMenu] = useState<any>({})

  const renderContent = (key: string) => {
    switch(key) {
      case "Vue2":
        return <micro-app name='vue2-app' url='http://localhost:8080/' style={{ marginTop: "60px", width: "100vw", height: "100vh" }}></micro-app>
      case "Vue3":
        return <micro-app name='vue3-app' url='http://localhost:8081/' style={{ marginTop: "60px", width: "100vw", height: "100vh" }}></micro-app>
      case "React":
        return <micro-app name='react-app' url='http://localhost:3001/' style={{ marginTop: "60px", width: "100vw", height: "100vh" }} iframe></micro-app>
      case "Documents": 
        return <div style={{ marginTop: "60px" }}>
          <micro-app name='documents' url='http://8.135.113.65:3001/' style={{ marginTop: "60px", width: "100vw", height: "100vh" }}></micro-app>
        </div>
      case "Vite-Vue": 
        return <micro-app name='vite-vue3' url='http://localhost:5173/' style={{ marginTop: "60px", width: "100vw", height: "100vh" }} iframe></micro-app>
      case "Next":
        return <micro-app name='next-app' url='http://localhost:3002/' style={{ marginTop: "60px", width: "100vw", height: "100vh" }} ssr></micro-app>
      case "图形编辑器":  
        return <micro-app name='drawio' url='http://localhost:8080' style={{ marginTop: "60px", width: "100vw", height: "100vh" }} iframe></micro-app> 
      case "应急中心": 
        return  <div style={{ marginTop: "80px" }}>
           <micro-app name='emergency-center' url='http://localhost:3001/' style={{ marginTop: "60px", width: "100vw", height: "100vh" }}></micro-app>
        </div>
      case "演练记录": 
        return  <micro-app 
          name='emergency' 
          url='http://localhost:3031/emergency-plan/detail' 
          style={{ width: "calc(100vw - 250px)", height: "calc(100vh - 60px)", background: '#fff' }}
        ></micro-app>
      case "技术处理方案": 
        return  <micro-app 
          name='emergency' 
          url='http://localhost:3031/emergency-exercise/detail' 
          style={{ width: "calc(100vw - 250px)", height: "calc(100vh - 60px)", background: '#fff' }}
        ></micro-app> 
      default:
        return <EventManage />
    }
  }

  const getMenus = async () => {
    const params = {
      fdId: selectTabs.fdId
    }

    const res = await dispatchRedux(asyncThunk.getMenus(params) as any)
    const data:any = res?.payload

    if (data?.code === 200) {
      const menuData: any = data.data
      const updatedMenuItems = menuData.map((item: any) => {
        return {
          key: item.fdComponentName,
          label: item.fdComponentName,
          children: !_.isEmpty(item.children) ? item.children : null,
        }
      })

    const renderMenuItem:any = [
      ...updatedMenuItems.reverse(),
      // { key: 'add', icon: <PlusOutlined />, label: '新建菜单', children: [] }
    ]
    setMenuData(renderMenuItem) // 更新菜单项
    } else if (
      data.code === 401 && 
      data.success === false &&
      data.message === "请先登录后再操作!") {
    router.push("/login")
   }
  } 

  const onChangeMenu = (menu: any) => {
    setSelectMenu(menu)
  }

  useEffect(() => {
    if (selectTabs?.fdId) {
      getMenus()
    }
  }, [selectTabs])

  const renderSubMenuItems = (subMenuItems) => {
    return subMenuItems.map(item => (
      <Menu.Item key={item.fdId}>{item.fdComponentName}</Menu.Item>
    ));
  };

  const renderMenuItems = (items) => {
    return items.map(item => {
      if (item.children && item.children.length > 0 && item.children[0].fdType == null) {
        return (
          <SubMenu key={item.key} title={item.label}>
            {renderSubMenuItems(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key}>
            {item.label}
          </Menu.Item>
        );
      }
    });
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const handleClick = (e:any) => {
    console.log('click ', e);
    // setSelectMenu(e.keyPath[1])
    setSelectedKeys(e.keyPath[0])
  };

  return (
    <>
      <ProjectContainer>
        <div className={classNames("content-container")}>
          <Sider className={classNames("content-sider")} width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              selectedKeys={selectedKeys}
              onClick={handleClick}
            >
              {renderMenuItems(menuData)}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280, background: '#fff' }}>
            {renderContent(selectedKeys)}
          </Content>
        </div>
      </ProjectContainer>
    </>
  )
}

export default AppById
