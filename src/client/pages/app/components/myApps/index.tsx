/**
 * 我的应用
 */
/** external library */
import Image from "next/image";
import Link from "next/link"
import React, { useState, useEffect } from "react";
import { Modal, message, Dropdown, Menu } from "antd"
const confirm = Modal
import { 
  CaretDownOutlined,
  CaretRightOutlined,
  AppstoreOutlined,
  TagOutlined,
  RedEnvelopeOutlined,
  UserOutlined,
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

/** images */
import ImgMineIcon from "public/images/apps/mine-icon.png"
import ImgCollect from "public/images/apps/collect.png"
import ImgActions from "public/images/apps/actions.png"

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
    setSelectId(record.fdId)
    setShowDelelteModal(true)
  }

  useEffect(() => {
    selectId !== "" && selectDetail === null && setShowDelelteModal(true)
  }, [selectId])

  useEffect(() => {
    selectId !== "" && selectDetail !== null && setShowUpdateModal(true)
  }, [selectDetail])

  const getDropdownMenu = (app, index) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => onUpdateAppModal(app)}>
        <span style={{ marginRight: "4px" }}><EditOutlined /></span>
        <span>编辑</span>
      </Menu.Item>
      {index !== 0 && (
        <Menu.Item key="delete" onClick={() => onDeleteAppModal(app)}>
          <span style={{ marginRight: "4px" }}><DeleteOutlined /></span>
          <span>删除</span>
        </Menu.Item>
      )}
    </Menu>
  );

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
          <Image src={ImgMineIcon} width={18} height={18} alt="ImgMineIcon" />
        </div>
      </div>
      <div className={classNames("my-apps-header-title")}>我的应用</div>
      <div className={classNames("my-apps-header-number")}>{appList.length}</div>
    </div>
    { isExpend && (
      <div className={classNames("my-apps-list")}>
        { appList.map((app: any, index: number) => (
          <div className={classNames("my-apps-list-item")} key={app?.fdId}>
            <section className={classNames("my-apps-list-item-btn")}>
              <div className={classNames("btn-collect")}>
                <Image src={ImgCollect} width={16} height={16} alt={"ImgCollect"} />
              </div>
              <div>
                {/* @ts-ignore */}
                <Dropdown menu={getDropdownMenu(app, index)} trigger={['click']} placement="bottomRight">
                  <span>
                    <Image src={ImgActions} width={16} height={16} alt={"ImgActions"} />
                  </span>
                </Dropdown>
              </div>
            </section>
            <Link href={`/app/${app.fdId}`} key={app.fdId}>
              <div className={classNames("my-apps-list-item-icon")} 
                style={{ backgroundColor: app.navColor || getRandomColor(), color: app.iconColor || "#000"}}> 
                {app.fdIcon || <RedEnvelopeOutlined />}
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