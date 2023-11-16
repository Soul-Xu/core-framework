/** 第三方库 */
import { NextPage } from 'next';
import React from 'react';

/** 样式 */
import classnames from "classnames/bind";
import PageLayout from '../../layout/PageLayout';
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const Home: NextPage = () => {
  return(
    // <PageLayout>
    //   <section className={classNames("container")}>
    //     <div className={classNames("content")}>
    //       111
    //     </div>
    //   </section>
    // </PageLayout>
    <div>111</div>
  )
}

export default Home