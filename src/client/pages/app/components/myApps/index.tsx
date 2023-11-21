/**
 * 我的应用
 */
/** external library */
import Link from "next/link"
import React, { useState, useEffect } from "react";
import { 
  CaretDownOutlined,
  CaretRightOutlined,
  AppstoreOutlined,
  PlusOutlined
} from "@ant-design/icons";

/** components */
import AddApps from "../addApps";

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
  const [showAddModal, setShowAddModal] = useState(false)

  /**
   * @description 控制新建应用弹窗
   * @param
   */
  const onShowAddModal = (type: string) => {
    type === "show" &&  setShowAddModal(true)
    type === "hide" && setShowAddModal(false)
  }

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
        { appList.map((app: any) => (
          <Link href={`/app/${app.id}`} key={app.id}>
            <div className={classNames("recent-apps-list-item")} key={app.id}>
              <div className={classNames("recent-apps-list-item-icon")} 
                style={{ backgroundColor: app.navColor, color: app.iconColor }}> 
                <img src={app.iconUrl}/>
              </div>
              <div className={classNames("recent-apps-list-item-title")}>{app.name}</div>
            </div>
          </Link>
        )) }
        <div className={classNames("recent-apps-list-add")} onClick={() => onShowAddModal("show")}>
          <div className={classNames("recent-apps-list-add-icon")}></div>
          <div className={classNames("recent-apps-list-add-title")}>新建应用</div>
        </div>
      </div>
    )}
    <AddApps open={showAddModal} onCancel={() => onShowAddModal("hide")} />
  </div>
  )
}

export default MyApps;