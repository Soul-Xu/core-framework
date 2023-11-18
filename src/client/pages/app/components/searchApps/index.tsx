/**
 * 搜索应用组件
 */
import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input } from 'antd';
const { Search } = Input;

/** 
 * css 
 */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const SearchApps = () => {

  /**
   * @description: 搜索应用
   * @param: 
   */
  const onSearch = (e: any) => {
    console.log(e)
  };

  return (
    <div className="search-apps">
      <Search
        className={classNames("search-apps-input")}
        placeholder="请输入搜索应用名" 
        allowClear 
        onSearch={onSearch}
        />
    </div>
  )
}

export default SearchApps;