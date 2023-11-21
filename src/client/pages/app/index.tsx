/**
 * 主页
 */
/** 第三方库 */
import { NextPage } from 'next';
import React from 'react';

/** 样式 */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

/** components */
import AppContainer from './components/container';
import SearchApps from './components/searchApps';
import RecentApps from './components/recentApps';
import MyApps from './components/myApps';

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
    iconUrl: "https://fp1.mingdaoyun.cn/customIcon/sys_1_worksheet.svg",
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
    iconUrl: "https://fp1.mingdaoyun.cn/customIcon/8_2_bookmark_ribbon.svg",
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
  return (
    <>
      <AppContainer>
        <div className={classNames("container")}>
          <SearchApps />
          <RecentApps appList={appList}/>
          <MyApps appList={appList} />
        </div>
      </AppContainer>
    </>
  )
}

export default App