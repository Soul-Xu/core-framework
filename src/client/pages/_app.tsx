import { Suspense, useEffect } from "react"
import Head from 'next/head'
import type { AppProps } from "next/app"
import { wrapper } from "../store/store"
import "../styles/global.css"
import { ConfigProvider } from "antd"

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'
dayjs.locale('zh-cn'); // 设置全局的语言环境为中文
dayjs.extend(require('dayjs/plugin/utc')); // 可选：如果需要处理 UTC 时间

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback="loading">
      <Head>
        <link rel="icon" href="../public/favicon.ico" />
        <title>基础开发框架</title>
      </Head>
      {/* @ts-ignore */}
      <ConfigProvider locale={zhCN}>
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </ConfigProvider>
      {/* <Component {...pageProps} /> */}
    </Suspense>
  )
}

export default wrapper.withRedux(MyApp)
