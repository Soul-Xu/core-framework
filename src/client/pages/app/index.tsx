/**
 * 主页
 */
/** external library */
import { NextPage } from 'next';
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
/** utils */
import { reducer } from "../../utils/reducer";
import asyncThunk from "../../store/asyncThunk";
/** store */
import { setAppsList } from '../../store/modules/appsSlice';
/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);
/** http */
import axios from 'axios';
import { baseApi } from "../../config"
import { adminAppList, commonAppList } from './constants'

/** components */
import AppContainer from '../../layout/appContainer';
import SearchApps from './components/searchApps';
import RecentApps from './components/recentApps';
import MyFavorApps from './components/myFavor';
import MyApps from './components/myApps';
import { message } from 'antd';

const initialState = {
  req: {
    fdAppName: ""
  },
  appsList: []
}

const App: NextPage = () => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const appsConfig = useSelector((state: any) => state.apps.appsConfig)
  const userInfo = useSelector((state: any) => state.login.userInfo)
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { showCurrent, showMyFavor, showMine } = appsConfig
  const token = useSelector((state: any) => state.common.token)
  const { req, appsList } = data

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
  const setState = useCallback((type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  }, [dispatch]);

  /**
   * @description 获取当前应用列表
   * @param page: 当前页，pageSize: 每页显示数量，sort: 排序方式
   */
  const getAppList = async (req?: any) => {
    const params = {
      page: 1,
      pageSize: 999, // 默认size为20, 出于页面UI考虑，设定为999，即拿到所有的apps
      sort: {
        fdDisplayOrder: "desc"
      },
      conditions: {
        ...req
      }
    }

    try {
      const res = await dispatchRedux(asyncThunk.getApps(params) as any);
      const data = res?.payload
      if (data.code === 200) {
        const { content } = data.data
        setState("update", {
          appsList: data.data
        }) 
        dispatchRedux(setAppsList({
          appsList: data.data
        }))
      } else if (
          data.code === 401 && 
          data.success === false &&
          data.message === "请先登录后再操作!") {
        router.push("/login")
      } else if (
        data.code === 403
      ) {
        message.warning("您没有权限访问该应用，请联系管理员！")
      }
    } catch(err) {
      console.log("app-err", err)
      // const username = window.localStorage.getItem("username")
      // const dataList = username === 'admin' ? adminAppList : commonAppList
      // setState("update", {
      //   appsList: dataList.data
      // }) 
    }
  }

  useEffect(() => {
    getAppList()
  }, [])

  return (
    <>
      <AppContainer>
        <div className={classNames("container")}>
          <SearchApps onSearch={getAppList} />
          { showCurrent && <RecentApps appList={appsList}/> }
          { showMyFavor && <MyFavorApps appList={appsList}/> }
          { showMine && <MyApps appList={appsList} onRefresh={() => getAppList()} /> }
        </div>
      </AppContainer>
    </>
  )
}

export default App