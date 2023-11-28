/**
 * 我的应用
 */
/** external library */
import Image from "next/image";
import Link from "next/link"
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Modal, message } from "antd"
const confirm = Modal
import { 
  CaretDownOutlined,
  CaretRightOutlined,
  AppstoreOutlined,
  TagOutlined,
  RedEnvelopeOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled
} from "@ant-design/icons";

/** components */
import AddApps from "../addApps";
import UpdateApps from "../updateApps";
import DeleteApps from "../deleteApps"

/** utils */
import { getRandomColor } from "../../../../utils/index";

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
  appList: Array<AppProps>,
  onRefresh: () => void
}

const MyApps = (props: Props) => {
  const { appList, onRefresh } = props
  const [isExpend, setIsExpanded] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDelelteModal] = useState(false)
  const [selectId, setSelectId] = useState("")
  const [selectDetail, setSelectDetail] = useState(null)

  /**
   * @description 控制新建应用弹窗
   * @param
   */
  const onShowAddModal = (type: string) => {
    type === "show" &&  setShowAddModal(true)
    type === "hide" && setShowAddModal(false)
  }

  const onHideAddModal = () => {
    onRefresh()
    setShowAddModal(false)
  }

  /**
   * @description 编辑应用弹窗
   * @param
   */
  const onUpdateAppModal = (record: any) => {
    setSelectId(record.fdId)
    setSelectDetail(record)
  }

  const onHideUpdateModal = () => {
    onRefresh()
    setShowUpdateModal(false)
  }

  /**
   * @description 控制删除应用弹窗
   * @param
   */
  const onHideDeleteModal = () => {
    onRefresh()
    setShowDelelteModal(false)
  }

  /**
   * @description 删除应用弹窗
   * @param
   */
  const onDeleteAppModal = (record: any) => {
    // Event.preventDefault()
    setSelectId(record.fdId)
  }

  useEffect(() => {
    selectId !== "" && selectDetail === null && setShowDelelteModal(true)
  }, [selectId])

  useEffect(() => {
    console.log("update", selectId, selectDetail)
    selectId !== "" && selectDetail !== null && setShowUpdateModal(true)
  }, [selectDetail])

  return (
    <div className={classNames("my-apps")}>
    <div className={classNames("my-apps-header")}>
      <div className={classNames("my-apps-header-icon")}>
        <div className={classNames("my-apps-header-icon-arrow")} onClick={() => setIsExpanded(!isExpend)}>
          { isExpend ? <CaretDownOutlined /> : <CaretRightOutlined />  }
        </div>
      </div>
      <div className={classNames("my-apps-header-icon")}>
        <div className={classNames("my-apps-header-icon-img")}>
          <AppstoreOutlined />
        </div>
      </div>
      <div className={classNames("my-apps-header-title")}>我的应用</div>
      <div className={classNames("my-apps-header-number")}>{appList.length}</div>
    </div>
    { isExpend && (
      <div className={classNames("my-apps-list")}>
        { appList.map((app: any, index: number) => (
          <div className={classNames("my-apps-list-item")}>
            <div className={classNames("my-apps-list-item-btn")}>
              <span onClick={() => onUpdateAppModal(app)}><EditOutlined /></span>
              {index !== 0 && <span onClick={() => onDeleteAppModal(app)}><DeleteOutlined /></span>}
            </div>
            <Link href={`/app/${app.fdId}`} key={app.fdId}>
              <div className={classNames("my-apps-list-item-icon")} 
                style={{ backgroundColor: app.navColor || getRandomColor(), color: app.iconColor || "#000"}}> 
                {app.iconUrl || <RedEnvelopeOutlined />}
              </div>
              <div className={classNames("my-apps-list-item-title")}>{app.fdAppName || "demo"}</div>
            </Link>
          </div>
        )) }
        <div className={classNames("my-apps-list-add")} onClick={() => onShowAddModal("show")}>
          <div className={classNames("my-apps-list-add-icon")}></div>
          <div className={classNames("my-apps-list-add-title")}>新建应用</div>
        </div>
      </div>
    )}
    <AddApps open={showAddModal} onCancel={() => onHideAddModal()} />
    <UpdateApps appId={selectId} detail={selectDetail} open={showUpdateModal}  onCancel={() => onHideUpdateModal()} />
    <DeleteApps appId={selectId} open={showDeleteModal} onCancel={() => onHideDeleteModal()} />
  </div>
  )
}

export default MyApps;