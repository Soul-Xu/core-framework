/** external library */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from 'next';
import axios from "axios"
import { setTab } from '../../../../../store/modules/menuSlice'
import type { TabsProps } from 'antd';
import { Layout, Tabs } from 'antd';
const { Header } = Layout;
/** components */
import AddTabs from "../addTabs"

/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
import { PlusOutlined } from '@ant-design/icons';
const classNames = classnames.bind(styles);

interface PageContainerProps {
  children?: React.ReactNode
}

const AppIdContainer: NextPage<PageContainerProps> = ({ children }: any) => {
  const dispatchRedux = useDispatch();
  const tab = useSelector((state: any) => state.menu.tab)
  const [selectTab, setSelectTab] = useState("1")
  const [showAddModal, setShowAddModal] = useState(false)

  const getTabs = async () => {
    const params = {
      fdId: "211"
    }

    const res = await axios.request({
      url: "http://120.79.58.103:8080/api/sys-auth/component-permission/top-menu",
      method: "POST",
      data: params,
      headers: {
        "cookie": "JSESSIONID=9a7f9037-8369-45e1-a8d6-408f7ec85aa1",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }
    })

    console.log("tabs-11111111", res)
  } 

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: '驾驶仓'
    },
    {
      key: '2',
      label: '采购'
    },
    {
      key: '3',
      label: '销售'
    },
    {
      key: 'add',
      label: (
        <div onClick={() => onShowAddModal("show")}>
          <PlusOutlined />
        </div>
      )
    },
  ];

  const onTabsChange = (key: string) => {
    setSelectTab(key)
    dispatchRedux(setTab({
      tab: key
    }))
  }

  /**
   * @description 控制新建tab弹窗
   * @param
   */
   const onShowAddModal = (type: string) => {
    type === "show" &&  setShowAddModal(true)
    type === "hide" && setShowAddModal(false)
  }

  useEffect(() => {
    // getTabs()
  }, [])

  return (
    <Layout>
      <Header className={classNames("header")} style={{ position: "fixed", top: "0", width: "100vw" }}>
        <div className={classNames("header-container")}>
          <div className={classNames("header-container-title", "ellipsis")}>体验项目</div>
          <div className={classNames("header-container-tabs")}>
            {
              tabItems.map((item: any) => {
                return (
                  (<div
                    key={item?.key}
                    className={classNames(item.key === selectTab && item.key !== "add" ? "tabs-container-select" : "tabs-container")} 
                    onClick={() => onTabsChange(item.key)}>
                    <div className={classNames(item.key === selectTab && item.key !== "add" ? "tabs-container-select-label" : "tabs-container-label")}>{item.label}</div>
                    <div className={classNames(item.key === selectTab && item.key !== "add" ? "tabs-container-select-line": "tabs-container-line")}></div>
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
      <AddTabs open={showAddModal} onCancel={() => onShowAddModal("hide")} />
    </Layout>
  );
};

export default AppIdContainer;