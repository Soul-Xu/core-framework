/**
 * 应用container
 */
/** external library */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from 'next';
import { setTabsList, setSelectTabs } from '../../store/modules/menusSlice'
import type { TabsProps } from 'antd';
import { Layout, Tabs, Dropdown } from 'antd';
import { PlusOutlined, LeftCircleOutlined } from '@ant-design/icons';
const { Header } = Layout;
/** components */
import AddTabs from "../../pages/app/[:id]/components/addTabs"

/** http */
import axios from "axios"
import { baseApi } from '../../config';

/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

import asyncThunk from '../../store/asyncThunk';

interface PageContainerProps {
  children?: React.ReactNode
}

const ProjectContainer: NextPage<PageContainerProps> = ({ children }: any) => {
  const router = useRouter()
  const curAppId = router.query[":id"]
  const dispatchRedux = useDispatch();
  const appsList = useSelector((state: any) => state.apps.appsList)
  const userInfo = useSelector((state: any) => state.login.userInfo)
  const [AppName, setAppName] = useState("")
  const [selectTab, setSelectTab] = useState("1")
  const [showAddModal, setShowAddModal] = useState(false)
  const [tabs, setTabs] = useState([])

  // 判断当前用户是否为管理员admin
  const isAdmin = () => {
    return userInfo?.fdUserName?.includes("admin")
  }

  // 默认tab添加项
  const tabAdd = {
    key: 'add',
    label: (
      <div onClick={() => onShowAddModal("show")}>
        <PlusOutlined />
      </div>
    )
  }

  // 实用函数，将 tabItem 转换为 TabsProps['items']
  const onHandleTabs = (tabItem) => {
    const res = tabItem.map(item => ({
      key: item.fdId,
      label: item.fdComponentName
    }))
    return res
  };

  const getTabs = async () => {
    const params = {
      fdId: curAppId
    }

    const res = await dispatchRedux(asyncThunk.getTabs(params) as any)
    const data = res?.payload;
    if (data.code === 200) {
      const content: any = data.data
      const tabs: any = onHandleTabs(content)
      isAdmin()
      const renderTabs: any = [...tabs].concat(tabAdd)
      setSelectTab(renderTabs[0].key)
      setTabs(renderTabs)
      dispatchRedux(setTabsList({
        tabsList: content
      }))
      dispatchRedux(setSelectTabs({
        selectTabs: content[0]
      }))
    } else if (
      data.code === 401 && 
      data.success === false &&
      data.message === "请先登录后再操作!") {
    router.push("/login")
   }
  } 

  const onGoBack = () => {
    router.push("/app")
  }

  const onTabsChange = (item: any) => {
    setSelectTab(item.key)
    dispatchRedux(setTabsList({
      tabsList: item.key
    }))
    dispatchRedux(setSelectTabs({
      selectTabs: item
    }))
    router.push(`${router.asPath}`)
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
      getTabs()
      setShowAddModal(false)
    }

  const getAppConfig = () => {
    const curConfig = appsList.find((app: any) => app.fdId === curAppId)
    setAppName(curConfig?.fdAppName)
  }

  useEffect(() => {
    getTabs()
    getAppConfig()
  }, [])

  return (
    <Layout>
      <Header className={classNames("header")} style={{ position: "fixed", top: "0", width: "100vw" }}>
        <div className={classNames("header-container")}>
          <div className={classNames("header-container-title", "ellipsis")}>
            <div className={classNames("header-container-title-back")}
              onClick={onGoBack}
            >
              <LeftCircleOutlined />
            </div>
            <span>{AppName}</span>
          </div>
          <div className={classNames("header-container-tabs")}>
            {
              tabs.map((item: any) => {
                return (
                  (<div
                    key={item?.key}
                    className={classNames(
                      item.key === selectTab && item.key !== "add" 
                      ? "tabs-container-select" 
                      : "tabs-container")
                    } 
                    onClick={() => onTabsChange(item)}>
                    <div className={classNames(
                      item.key === selectTab && item.key !== "add" 
                      ? "tabs-container-select-label" : "tabs-container-label")
                      }>
                        {item.label}
                      </div>
                    <div className={classNames(
                      item.key === selectTab && item.key !== "add" 
                      ? "tabs-container-select-line"
                      : "tabs-container-line")
                      }></div>
                  </div>)
                )
              })
            }
          </div>
        </div>
      </Header>
      <Layout className={classNames("container-wrapper")}>
        { children }
      </Layout>
      <AddTabs open={showAddModal} onCancel={() => onHideAddModal()} />
    </Layout>
  );
};

export default ProjectContainer;