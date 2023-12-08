/**
 * 搜索应用组件
 */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import { Input, Tooltip, Drawer } from 'antd';
import { ControlOutlined } from '@ant-design/icons';
const { Search } = Input;

/** components */
import SettingApps from "../settingApps"

/** utils */
import { reducer } from "../../../../utils/reducer";

/** 
 * css 
 */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

interface Props {
  getAppList?: (params: any) => void
}

const initialState = {
  req: {
    fdAppName: ""
  }
}

const SearchApps = (props: Props) => {
  const { getAppList } = props
  const dispatchRedux = useDispatch();
  const appsConfig = useSelector((state: any) => state.apps.appsConfig)
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { req } = data
  const { fdAppName } = req as any
  const [setting, setSetting] = useState(false);

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
    const setState = useCallback((type: string, val: Record<string, any>) => {
      dispatch({ type, payload: val });
    }, [dispatch]);

  /**
   * @description: 搜索应用
   * @param: 
   */
  const onSearch = (value: any) => {
    setState("req", {
      fdAppName: value
    })
  }

  const showDrawer = () => {
    setSetting(true);
  };

  const onClose = () => {
    setSetting(false);
  };

  useEffect(() => {
    // @ts-ignore
    getAppList(req)
  }, [req])

  return (
    <div className={classNames("search-apps")}>
      <Search
        className={classNames("search-apps-input")}
        placeholder="请输入搜索应用名" 
        allowClear 
        onSearch={(e: any) => onSearch(e)}
        />
      <div 
        className={classNames("search-apps-setting")}
        onClick={showDrawer}
      >
        <Tooltip placement="bottom" title={"自定义应用"}>
          <ControlOutlined />
        </Tooltip>
      </div>
      {
        setting && (
          <>
            <SettingApps open={setting} onClose={onClose} />
          </>
        )
      }
    </div>
  )
}

export default SearchApps;