/** 第三方库 */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from 'next'

/** 样式 */
import styles from "./index.module.scss";
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);
import PageLayout from '../../layout/PageLayout'

const Home: NextPage = () => {
  return(
    // @ts-ignore
    <PageLayout>
      <section className={classNames("container")}>
        <div className={classNames("content")}>
          111
        </div>
      </section>
    </PageLayout>
  )
}

export default Home