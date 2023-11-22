/** external library */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from 'next';
import axios from "axios"
import { setTab } from '../../../../../store/modules/menuSlice'
import type { TabsProps } from 'antd';
import { Layout, Tabs } from 'antd';
const { Header } = Layout;

/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

interface PageContainerProps {
  children?: React.ReactNode
}

const AppIdContainer: NextPage<PageContainerProps> = ({ children }: any) => {
  const dispatchRedux = useDispatch();
  const tab = useSelector((state: any) => state.menu.tab)
  const [selectTab, setSelectTab] = useState("1")

  const getTabs = async () => {
    const params = {
      fdId: "211"
    }

    const res = await axios.request({
      url: "http://120.79.58.103:8080/api/sys-auth/component-permission/top-menu",
      method: "POST",
      data: params,
      // headers: {
      //   cookie: "JSESSIONID=9a7f9037-8369-45e1-a8d6-408f7ec85aa1"
      // }
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
      key: '4',
      label: '库存'
    },
    {
      key: '5',
      label: '账单'
    },
  ];

  const onTabsChange = (key: string) => {
    setSelectTab(key)
    dispatchRedux(setTab({
      tab: key
    }))
  }

  return (
    <Layout>
      <Header className={classNames("header")}>
        <div className={classNames("header-container")}>
          <div className={classNames("header-container-title", "ellipsis")}>体验项目</div>
          <div className={classNames("header-container-tabs")}>
            {
              tabItems.map((item: any) => {
                return (
                  (<div
                    key={item?.key}
                    className={classNames(item.key === selectTab ? "tabs-container-select" : "tabs-container")} 
                    onClick={() => onTabsChange(item.key)}>
                    <div className={classNames(item.key === selectTab ? "tabs-container-select-label" : "tabs-container-label")}>{item.label}</div>
                    <div className={classNames(item.key === selectTab ? "tabs-container-select-line": "tabs-container-line")}></div>
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
    </Layout>
  );
};

export default AppIdContainer;