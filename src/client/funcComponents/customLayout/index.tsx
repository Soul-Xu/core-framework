import React from 'react'
import { Divider } from "antd"
import styles from "./index.module.scss"
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);

interface customLayoutProps {
  title: string
}

const CustomLayout = (props: customLayoutProps) => {
  const { title } = props

  return (
    <div className={classNames("form")}>
      <section className={classNames("form-title")}>
        <div className={classNames("form-title-line")}></div>
        <div className={classNames("form-title-main")}>{title}</div>
      </section>
      <Divider />
    </div>
  )
}

export default CustomLayout
