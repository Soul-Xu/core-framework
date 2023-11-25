/**
 * 搜索应用组件
 */
import React, { useState } from 'react';
import { Input, Tooltip, Drawer } from 'antd';
import { ControlOutlined } from '@ant-design/icons';
const { Search } = Input;

/** components */
import SettingApps from "../settingApps"

/** 
 * css 
 */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const SearchApps = () => {
  const [setting, setSetting] = useState(false);

  /**
   * @description: 搜索应用
   * @param: 
   */
  const onSearch = (e: any) => {
    console.log(e)
  }

  const showDrawer = () => {
    setSetting(true);
  };

  const onClose = () => {
    setSetting(false);
  };

  return (
    <div className={classNames("search-apps")}>
      <Search
        className={classNames("search-apps-input")}
        placeholder="请输入搜索应用名" 
        allowClear 
        onSearch={onSearch}
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