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
import AppContainer from '../../layout/container';
import SearchApps from './components/searchApps';
import RecentApps from './components/recentApps';
import MyApps from './components/myApps';

const App: NextPage = () => {
  return (
    <>
      <AppContainer>
        <div>
          <SearchApps />
          <RecentApps />
          <MyApps />
        </div>
      </AppContainer>
    </>
  )
}

export default App