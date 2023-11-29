/**
 * 新建应用
 */
/** external library */
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useImmerReducer } from "use-immer";
import { Modal, Form, Input, InputNumber } from "antd"
const { TextArea } = Input;

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
  fdRemark: "",
  fdDisplayOrder: 1
}

const UpdateApps = (props: Props) => {
  const form = Form.useForm()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { open, appId, detail, onCancel } = props
  const { fdAppName, fdIcon, fdUrl, fdRemark, fdDisplayOrder } = data

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
  const setState = useCallback((type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  }, [dispatch]);
  
  const onHandleChange = (type: string, e: any) => {
    if (type === "fdDisplayOrder") {
      setState("update", {
        [type]: e
      })
    } else {
      setState("update", {
        [type]: e.target.value
      })
    }
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

  /**
   * 初始化数据
   */
  useEffect(() => {
    if (!_.isEmpty(detail)) {
      console.log("update-modal", detail);
      const { fdAppName, fdIcon, fdUrl, fdRemark } = detail;
      dispatch({
        type: "update",
        payload: { fdAppName, fdIcon, fdUrl, fdRemark }
      });
    }
  }, [detail]);

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
        {/* ... (existing code) */}
        <div className={classNames("app-detail-item")}>
          <div className={classNames("app-detail-item-label")}>应用名称</div>
          <div className={classNames("app-detail-item-value")}>
            <Input value={fdAppName} onChange={(e: any) => onHandleChange("fdAppName", e)} />
          </div>
        </div>
        <div className={classNames("app-detail-item")}>
          <div className={classNames("app-detail-item-label")}>图标名称</div>
          <div className={classNames("app-detail-item-value")}>
            <Input value={fdIcon} onChange={(e: any) => onHandleChange("fdIcon", e)} />
          </div>
        </div>
        <div className={classNames("app-detail-item")}>
          <div className={classNames("app-detail-item-label")}>图标地址</div>
          <div className={classNames("app-detail-item-value")}>
            <Input value={fdUrl} onChange={(e: any) => onHandleChange("fdUrl", e)} />
          </div>
        </div>
        <div className={classNames("app-detail-item")}>
          <div className={classNames("app-detail-item-label")}>备注说明</div>
          <div className={classNames("app-detail-item-value")}>
            <TextArea value={fdRemark} onChange={(e: any) => onHandleChange("fdRemark", e)} />
          </div>
        </div>
        <div className={classNames("app-detail-item")}>
          <div className={classNames("app-detail-item-label")}>应用排序</div>
          <div className={classNames("app-detail-item-value")}>
            <InputNumber style={{ width: "100%" }} placeholder="请输入应用排序" min={1} max={99} value={fdDisplayOrder} onChange={(e: any) => onHandleChange("fdDisplayOrder", e)} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateApps