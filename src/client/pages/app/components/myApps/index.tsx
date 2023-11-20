/**
 * 我的应用
 */
/** external library */
import React, { useState, useEffect } from "react";
import { 
  CaretDownOutlined,
  CaretRightOutlined,
  AppstoreOutlined,
  PlusOutlined
} from "@ant-design/icons";

/** css */
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

const MyApps = (props: Props) => {
  const { appList } = props
  const [isExpend, setIsExpanded] = useState(true)

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
          <AppstoreOutlined />
        </div>
      </div>
      <div className={classNames("recent-apps-header-title")}>我的应用</div>
      <div className={classNames("recent-apps-header-number")}>{appList.length}</div>
    </div>
    { isExpend && (
      <div className={classNames("recent-apps-list")}>
        { appList.reverse().map((app: any) => (
          <div className={classNames("recent-apps-list-item")} key={app.id}>
            <div className={classNames("recent-apps-list-item-icon")} 
              style={{ backgroundColor: app.navColor, color: app.iconColor }}> 
              <img src={app.iconUrl}/>
            </div>
            <div className={classNames("recent-apps-list-item-title")}>{app.name}</div>
          </div>
        )) }
        <div className={classNames("recent-apps-list-add")}>
          <div className={classNames("recent-apps-list-add-icon")}></div>
          <div className={classNames("recent-apps-list-add-title")}>新建应用</div>
        </div>
      </div>
    )}
  </div>
  )
}

export default MyApps;