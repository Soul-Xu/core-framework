/**
 * 应用container
 */
/** external library */
import React, { useCallback, useEffect, useState } from 'react';
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
  children?: React.ReactNode;
  id?: string; // 添加 id 属性
}

const initTabs = [
  {
    "fdId": "vue3",
    "fdComponentName": "Vue3",
    "fdIcon": null,
    "fdUrl": "http://www.baidu.com",
    "fdDisplayOrder": 1,
    "fdPermission": null,
    "fdCreateTime": null,
    "fdUpdateTime": null,
    "fdVisiable": 1,
    "fdRemark": "说明",
    "fdParentEntity": null,
    "fdAppEntity": {
        "fdName": null,
        "fdId": "1hfm9uujr1vlgf5r2tmab3tprgr6kuqql1t2"
    },
    "children": [],
    "fdRoleEntities": null
  },
  {
    "fdId": "vue2",
    "fdComponentName": "Vue2",
    "fdIcon": null,
    "fdUrl": "http://www.baidu.com",
    "fdDisplayOrder": 1,
    "fdPermission": null,
    "fdCreateTime": null,
    "fdUpdateTime": null,
    "fdVisiable": 1,
    "fdRemark": "说明",
    "fdParentEntity": null,
    "fdAppEntity": {
        "fdName": null,
        "fdId": "1hfm9uujr1vlgf5r2tmab3tprgr6kuqql1t2"
    },
    "children": [],
    "fdRoleEntities": null
  },
  {
    "fdId": "react",
    "fdComponentName": "React",
    "fdIcon": null,
    "fdUrl": "http://www.baidu.com",
    "fdDisplayOrder": 1,
    "fdPermission": null,
    "fdCreateTime": null,
    "fdUpdateTime": null,
    "fdVisiable": 1,
    "fdRemark": "说明",
    "fdParentEntity": null,
    "fdAppEntity": {
        "fdName": null,
        "fdId": "1hfm9uujr1vlgf5r2tmab3tprgr6kuqql1t2"
    },
    "children": [],
    "fdRoleEntities": null
  },
] 

const ProjectContainer: NextPage<PageContainerProps> = ({ children, id }: PageContainerProps) => {
  const router = useRouter()
  const curAppId = router.query[":id"]
  const dispatchRedux = useDispatch();
  const appsList = useSelector((state: any) => state.apps.appsList)
  const userInfo = useSelector((state: any) => state.login.userInfo)
  const [AppName, setAppName] = useState("")
  const [selectTab, setSelectTab] = useState("")
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
      key: item.fdComponentName,
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
      // isAdmin()
      const renderTabs: any = [...tabs].concat(tabAdd)
      setSelectTab(renderTabs[0].key.toLowerCase())
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

  // 生成新的路径
  const generateNewTabPath = (currentPath, tabKey) => {
    const lowercaseTabKey = tabKey.toLowerCase();

    // 判断是否是 "add"，或者是否已经包含 tabKey
    if (tabKey === "add" || currentPath.includes(`/${lowercaseTabKey}`)) {
      return currentPath;
    }

    // 如果当前路径是 "app/:appId/tabKey" 的形式，则替换掉 tabKey
    if (currentPath.match(/\/app\/[^/]+\/[^/]+$/)) {
      return currentPath.replace(/\/[^/]+$/, `/${lowercaseTabKey}`);
    } else {
    // 否则直接拼接路径
    return `${currentPath}/${lowercaseTabKey}`;
    }
  };

  // 缓存回调函数以避免重新生成
  const onTabsChange = useCallback(
    (item: any) => {
      const tabKey = item.key.toLowerCase();
      const currentPath = router.asPath;
      const newTabPath = generateNewTabPath(currentPath, tabKey);

      if (router.pathname !== newTabPath) {
        router.push(newTabPath);
      }
      setSelectTab(tabKey);
      dispatchRedux(setSelectTabs({
        selectTabs: item
      }));
    },
    [router, dispatchRedux]
  );

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
    getTabs();
    getAppConfig();
  }, []);

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
                      item.key.toLowerCase() === selectTab && item.key !== "add" 
                      ? "tabs-container-select" 
                      : "tabs-container")
                    } 
                    onClick={() => onTabsChange(item)}>
                    <div className={classNames(
                      item.key.toLowerCase() === selectTab && item.key !== "add" 
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
      <Layout className={classNames("container-wrapper")} id={id}>
        { children }
      </Layout>
      <AddTabs open={showAddModal} onCancel={() => onHideAddModal()} />
    </Layout>
  );
};

export default ProjectContainer;