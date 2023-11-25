/**
 * 最近应用
 */
/** external library */
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { 
  CaretDownOutlined,
  CaretRightOutlined,
  ClockCircleOutlined } from "@ant-design/icons";

/** 样式 */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

/**
 * interface
 * @param props 
 * @returns 
 */

interface AppProps {
  id: string | number,
  icon?: string,
  name: string,

}

interface Props {
  appList: Array<AppProps>
}

const RecentApps = (props: Props) => {
  const { appList } = props
  const [isExpend, setIsExpanded] = useState(true)

  useEffect(() => {
    console.log("recent-apps", appList)
  }, [appList])

  return (
    <div className={classNames("recent-apps")}>
      <div className={classNames("recent-apps-header")}>
        <div className={classNames("recent-apps-header-icon")}>
          <div className={classNames("recent-apps-header-icon-arrow")} onClick={() => setIsExpanded(!isExpend)}>
            { isExpend ? <CaretDownOutlined /> : <CaretRightOutlined />  }
          </div>
        </div>
        <div className={classNames("recent-apps-header-icon")}>
          <div className={classNames("recent-apps-header-icon-img")}>
            <ClockCircleOutlined />
          </div>
        </div>
        <div className={classNames("recent-apps-header-title")}>最近使用</div>
      </div>
      { isExpend && (
        <div className={classNames("recent-apps-list")}>
          { appList.reverse().map((app: any) => (
            <div className={classNames("recent-apps-list-item")} key={app.id}>
              <div className={classNames("recent-apps-list-item-icon")} 
                style={{ backgroundColor: app.navColor }}> 
                {app.iconUrl}
              </div>
              <div className={classNames("recent-apps-list-item-title")}>{app.name}</div>
            </div>
          )) }
        </div>
      )}
    </div>
  )
}

export default RecentApps;