import { ConfigProvider } from "antd"
import type { AppProps } from "next/app"
import React, { Suspense } from "react"
import { wrapper } from "../store/store"
import "../styles/global.css"

import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn'); // 设置全局的语言环境为中文
dayjs.extend(require('dayjs/plugin/utc')); // 可选：如果需要处理 UTC 时间

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback="loading">
      <ConfigProvider locale={zhCN}>
        <Component {...pageProps} />
      </ConfigProvider>
    </Suspense>
  )
}

export default wrapper.withRedux(MyApp)
