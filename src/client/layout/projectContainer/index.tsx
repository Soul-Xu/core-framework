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
import { Layout, Tabs, Dropdown, Menu } from 'antd';
import { PlusOutlined, LeftCircleOutlined } from '@ant-design/icons';
const { Header } = Layout;
/** components */
import AddTabs from "../../pages/app/[:id]/components/addTabs"
import UpdateTabs from '../../pages/app/[:id]/components/updataTabs';
import DeleteTabs from "../../pages/app/[:id]/components/deleteTabs"

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

const ProjectContainer: NextPage<PageContainerProps> = ({ children, id }: PageContainerProps) => {
  const router = useRouter()
  const curAppId = router.query[":id"]
  const dispatchRedux = useDispatch();
  const appsList = useSelector((state: any) => state.apps.appsList)
  const tabsList = useSelector((state: any) => state.menus.tabsList)
  const selectTabs = useSelector((state: any) => state.menus.selectTabs)
  const [AppName, setAppName] = useState("")
  const [selectTab, setSelectTab] = useState("")
  const [tabs, setTabs] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDelelteModal] = useState(false)

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
      dispatchRedux(setTabsList({
        tabsList: content
      }))
      dispatchRedux(setSelectTabs({
        selectTabs: content[0]
      }))
      const tabs: any = onHandleTabs(content)
      // isAdmin()
      const renderTabs: any = [...tabs].concat(tabAdd)
      setSelectTab(renderTabs[0].key.toLowerCase())
      setTabs(renderTabs)
      const currentPath = router.asPath;
      const initPath = `${currentPath}?tab=${tabs[0].key.toLowerCase()}`
      router.push(initPath);
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

  // 缓存回调函数以避免重新生成
  const onTabsChange = useCallback(
    (item: any) => {
      const tabKey = item.key.toLowerCase();
      const currentPath = router.asPath;
  
      let newTabPath;
  
      if (currentPath.includes('?tab=')) {
        newTabPath = currentPath.replace(/(\?tab=)[^&]+/, `$1${tabKey}`);
      } else {
        newTabPath = `${currentPath}${currentPath.includes('?') ? '&' : '?'}tab=${tabKey}`;
      }
  
      if (router.pathname !== newTabPath) {
        window.history.replaceState({}, '', newTabPath);
        router.replace(newTabPath, undefined, { shallow: true });
      }
  
      // 查找匹配 key 的项
      const selectTabs = tabsList.find(tab => tab.fdComponentName === item.key);
      setSelectTab(tabKey);
      dispatchRedux(setSelectTabs({
        selectTabs: selectTabs
      }));
    },
    [router, dispatchRedux]
  );
  
  // 下拉菜单项的点击事件
  const handleMenuClick = (key, item) => {
    if (key === 'edit') {
      // 处理编辑操作
      setShowUpdateModal(true)
    } else if (key === 'delete') {
      // 处理删除操作
      setShowDelelteModal(true)
    }
  };


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

  /**
   * @description 隐藏编辑tab弹窗
   * @param
   */
  const onHideUpdateModal = () => {
    getTabs()
    setShowUpdateModal(false)
  }

  /**
   * @description 控制删除应用弹窗
   * @param
   */
  const onHideDeleteModal = () => {
    getTabs()
    setShowDelelteModal(false)
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
                      {item.key !== 'add' && ( // 仅在不是 "add" tab 时显示下拉按钮
                      <div className={classNames(
                        item.key.toLowerCase() === selectTab && item.key !== "add" 
                        ? "tabs-container-select-dropdown" : "tabs-container-dropdown")
                      }>
                        <Dropdown
                          placement='bottomLeft'
                          overlay={
                            <Menu onClick={({ key }) => handleMenuClick(key, item)}>
                              <Menu.Item key="edit">编辑</Menu.Item>
                              <Menu.Item key="delete">删除</Menu.Item>
                            </Menu>
                          }
                          trigger={['click']}
                        >
                          <div className={classNames("dropdown-button")}>...</div>
                        </Dropdown>
                      </div>
                    )}
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
      <UpdateTabs detail={selectTabs} open={showUpdateModal}  onCancel={() => onHideUpdateModal()} />
      <DeleteTabs tabId={selectTabs.fdId} open={showDeleteModal} onCancel={() => onHideDeleteModal()} />
    </Layout>
  );
};

export default ProjectContainer;