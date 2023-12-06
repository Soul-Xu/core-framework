/**
 * 主页
 */
/** 第三方库 */
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

/** components */
import AppContainer from '../../layout/appContainer';
import SearchApps from './components/searchApps';
import RecentApps from './components/recentApps';
import MyApps from './components/myApps';

const initialState = {
  appsList: []
}

const App: NextPage = () => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const appsConfig = useSelector((state: any) => state.apps.appsConfig)
  const baseApi = useSelector((state: any) => state.common.baseApi)
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { showCurrent, showMine } = appsConfig
  const { appsList } = data

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
  const getAppList = async () => {
    const params = {
      page: 1,
      pageSize: 999, // 默认size为20, 出于页面UI考虑，设定为999，即拿到所有的apps
      sort: {
        fdDisplayOrder: "desc"
      }
    }
    const res = await dispatchRedux(asyncThunk.getApps(params) as any);
    const data = res?.payload
    if (data.code === 200) {
      const { content } = data.data
      setState("update", {
        appsList: content
      }) 
      dispatchRedux(setAppsList({
        appsList: content
      }))
    } else if (
        data.code === 401 && 
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login")
    }
  }

  useEffect(() => {
    getAppList()
  }, [])

  return (
    <>
      <AppContainer>
        <div className={classNames("container")}>
          <SearchApps />
          { showCurrent && <RecentApps appList={appsList}/> }
          { showMine && <MyApps appList={appsList} onRefresh={() => getAppList()} /> }
        </div>
      </AppContainer>
    </>
  )
}

export default App