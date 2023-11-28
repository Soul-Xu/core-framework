/**
 * 新建应用
 */
/** external library */
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useImmerReducer } from "use-immer";
import { Modal, Form, Input } from "antd"

/** utils */
import { reducer } from "../../../../utils/reducer";
import asyncThunk from "../../../../store/asyncThunk"
import axios from "axios";
import { baseApi } from "../../../../config";
import _ from "lodash"

/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

/**
 * interface
 * @param props 
 * @returns 
 */
interface Props {
  appId: string,
  detail: any,
  title?: string,
  open: boolean,
  onOk?: () => void,
  onCancel: () => void
}

const initialState = {
  fdAppName: "",
  fdIcon: "",
  fdUrl: "",
  fdRemark: ""
}

const UpdateApps = (props: Props) => {
  const form = Form.useForm()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { open, appId, detail, onCancel } = props
  const { fdAppName, fdIcon, fdUrl, fdRemark } = data

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
  const setState = useCallback((type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  }, [dispatch]);
  
  const onHandleChange = (type: string, e: any) => {
    setState("update", {
      [type]: e.target.value
    })
  }

  /**
   * @description 编辑应用确认逻辑
   * @param
   */
  const onOk = async () => {
    const params = {
      fdId: appId,
      fdAppName: fdAppName,
      fdIcon: fdIcon,
      fdUrl: fdUrl,
      fdRemark: fdRemark
    }

    console.log("update-app", params)

    // axios原生方式
    const res:any = await axios.request({
      url: `${baseApi}/app-permission/update`,
      method: "post",
      data: params,
      withCredentials: true,  
      headers: {
        'Content-Type': 'application/json' // 设置为 application/json
      },
    }).then((res: any) => {
      const data = res.data
      console.log("axios-app-update-data", data)
      if (data.code === 200) {
        onCancel()
      }

    }).catch((err: any) => {
      console.log("axios-app-catch", err)
    })

    // // const res = await dispatchRedux(asyncThunk.createApp(params) as any);

    onCancel()
  }

  useEffect(() => {
    console.log("update-modal", detail)
    if (!_.isEmpty(detail)) {
      const { fdAppName, fdIcon, fdUrl, fdRemark } = detail
      // setState("update", {
      //   fdAppName,
      //   fdIcon,
      //   fdUrl,
      //   fdRemark
      // })
    }
  }, [])

  return (
    <Modal 
      title="编辑应用"
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="提交"
    >
      <div className={classNames("app-detail")}>
        <div className={classNames("app-detail-item")}>
          <div className={classNames("app-detail-item-label")}>应用名称</div>
          <div className={classNames("app-detail-item-value")}>
            <Input defaultValue={detail?.fdAppName} onClick={(e: any) => onHandleChange("fdAppName", e)} />
          </div>
        </div>
        <div className={classNames("app-detail-item")}>
          <div className={classNames("app-detail-item-label")}>图标名称</div>
          <div className={classNames("app-detail-item-value")}>
            <Input defaultValue={detail?.fdIcon} onClick={(e: any) => onHandleChange("fdAppName", e)} />
          </div>
        </div>
        <div className={classNames("app-detail-item")}>
          <div className={classNames("app-detail-item-label")}>图标地址</div>
          <div className={classNames("app-detail-item-value")}>
            <Input defaultValue={detail?.fdUrl} onClick={(e: any) => onHandleChange("fdAppName", e)} />
          </div>
        </div>
        <div className={classNames("app-detail-item")}>
          <div className={classNames("app-detail-item-label")}>备注说明</div>
          <div className={classNames("app-detail-item-value")}>
            <Input defaultValue={detail?.fdRemark} onClick={(e: any) => onHandleChange("fdAppName", e)} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateApps