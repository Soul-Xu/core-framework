/**
 * 开发文档
 */
/** external library */
import React, { useState, useEffect } from "react"
/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);
/** microApp */
import microApp from '@micro-zoe/micro-app'
/** components */
import AppContainer from "../../layout/appContainer";

const OpenAPI = () => {
  const [show, changeShow] = useState(false)

  useEffect(() => {
    changeShow(true)
  }, [])

  return (
    <AppContainer>
      {
        // name：应用名称, url：应用地址
        show && (<micro-app name='core-framework-docs' url='http://8.135.113.65:3001/'></micro-app>)
      }
    </AppContainer>
  )
}

export default OpenAPI