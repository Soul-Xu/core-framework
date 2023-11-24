/**
 * 主页
 */
/** 第三方库 */
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
/** utils */
import asyncThunk from "../../store/asyncThunk";

/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

/** components */
import AppContainer from '../../layout/appContainer';
import SearchApps from './components/searchApps';
import RecentApps from './components/recentApps';
import MyApps from './components/myApps';
import { RedEnvelopeOutlined, TagOutlined } from '@ant-design/icons';

const appList = [
  {
    appDisplay: false,
    appNaviStyle: 0,
    avatarType: 0,
    createType: 0,
    enName: "TiYanXiangMu[TYXM]",
    fixed: false,
    goodsId: "",
    groupIds: [],
    icon: "sys_1_worksheet",
    iconColor: "#D81029",
    iconUrl: <RedEnvelopeOutlined />,
    id: "687eeb02-3894-424d-971e-38e4118838e4",
    isGoods: false,
    isGoodsStatus: true,
    isLock: false,
    isMarked: false,
    isNew: false,
    lightColor: "#ffe7e6",
    name: "体验项目",
    navColor: "#D81029",
    pcDisplay: false,
    pcNaviStyle: 0,
    permissionType: 200,
    projectId: "870b2382-20ed-4607-a7c3-a230d20efe1d",
    selectAppItmeType: 2,
    sourceType: 1,
    webMobileDisplay: false,
  },
  {
    appDisplay: false,
    appNaviStyle: 0,
    avatarType: 0,
    createType: 0,
    enName: "ERPKeLong(JinXiaoCun)[ERPKL(JXC)]",
    fixed: false,
    goodsId: "",
    groupIds: [],
    icon: "8_2_bookmark_ribbon",
    iconColor: "#00BCD4",
    iconUrl: <TagOutlined />,
    id: "62b121c8-a5da-4733-ad21-678e5a97efcd",
    isGoods: false,
    isGoodsStatus: true,
    isLock: false,
    isMarked: false,
    isNew: false,
    name: "ERP克隆(进销存)",
    navColor: "#00BCD4",
    pcDisplay: false,
    pcNaviStyle: 0,
    permissionType: 200,
    projectId: "870b2382-20ed-4607-a7c3-a230d20efe1d",
    selectAppItmeType: 2,
    sourceType: 1,
    webMobileDisplay: false,
  }
]
const App: NextPage = () => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const appsConfig = useSelector((state: any) => state.apps.appsConfig)
  const { showCurrent, showMine } = appsConfig

  /**
   * @description 获取当前应用列表
   * @param page: 当前页，pageSize: 每页显示数量，sort: 排序方式
   */
  const getAppList = async () => {
    const params = {
      page: 1,
      pageSize: 20,
      sort: {
        fdDisplayOrder: "desc"
      }
    }

    const res = await dispatchRedux(asyncThunk.getApps(params) as any)
    const data = res.payload
    console.log("applist-res", data)
    if (data.code === 401 && data.message === "请先登录后再操作!") {
      // setTimeout(() => {
      //   router.push("/login")
      // }, 3000)
    }
  }

  useEffect(() => {
    // getAppList()
  }, [showCurrent, showMine])

  return (
    <>
      <AppContainer>
        <div className={classNames("container")}>
          <SearchApps />
          { showCurrent && <RecentApps appList={appList}/> }
          { showMine && <MyApps appList={appList} /> }
        </div>
      </AppContainer>
    </>
  )
}

export default App