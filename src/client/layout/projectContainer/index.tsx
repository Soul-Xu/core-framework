/** external library */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from 'next';
import axios from "axios"
import { setTab } from '../../store/modules/menuSlice'
import { setCurApp } from '../../store/modules/appsSlice';
import type { TabsProps } from 'antd';
import { Layout, Tabs, Dropdown } from 'antd';
const { Header } = Layout;
/** components */
import AddTabs from "../../pages/app/[:id]/components/addTabs"

/** utils */
import { baseApi } from '../../config';

/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
import { PlusOutlined, LeftCircleOutlined } from '@ant-design/icons';
const classNames = classnames.bind(styles);

interface PageContainerProps {
  children?: React.ReactNode
}

const ProjectContainer: NextPage<PageContainerProps> = ({ children }: any) => {
  const router = useRouter()
  const curAppId = router.query[":id"]
  const dispatchRedux = useDispatch();
  const tab = useSelector((state: any) => state.menu.tab)
  const appsList = useSelector((state: any) => state.apps.appsList)
  const [AppName, setAppName] = useState("")
  const [selectTab, setSelectTab] = useState("1")
  const [showAddModal, setShowAddModal] = useState(false)
  const [tabsList, setTabsList] = useState([])

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

    await axios.request({
      url: `${baseApi}/component-permission/top-menu`,
      method: "post",
      data: params,
      withCredentials: true,  
      headers: {
        'Content-Type': 'application/json' // 设置为 application/json
      },
    }).then((res: any) => {
      const data = res.data
      if (data.code === 200) {
        const tabs: any = onHandleTabs(data.data)
        const renderTabs: any = [...tabs].concat(tabAdd)
        setSelectTab(renderTabs[0].key)
        setTabsList(renderTabs)
        dispatchRedux(setTab({
          tab: renderTabs[0].key
        }))
      }
      
    }).catch((err: any) => {
      console.log("err", err)
    })
  } 

  const onGoBack = () => {
    router.push("/app")
  }

  const onTabsChange = (item: any) => {
    setSelectTab(item.key)
    dispatchRedux(setTab({
      tab: item.key
    }))
    router.push(`${router.asPath}?tabId=${item.fdId}`)
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
    dispatchRedux(setCurApp({
      curApp: curConfig
    }))
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
              tabsList.map((item: any) => {
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