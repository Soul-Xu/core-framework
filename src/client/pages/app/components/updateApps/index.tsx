/**
 * 编辑应用
 */
/** external library */
import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import { Modal, Form, Input, InputNumber } from "antd"
const { TextArea } = Input;

/** utils */
import { reducer } from "../../../../utils/reducer";
import asyncThunk from "../../../../store/asyncThunk"
import _ from "lodash"

/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

/** http */
import axios from 'axios';
import { baseApi } from "../../../../config"

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
  fdDisplayOrder: 1,
  fdPermission: ""
}

const UpdateApps = (props: Props) => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const token = useSelector((state: any) => state.common.token)
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { open, appId, detail, onCancel } = props
  const { fdAppName, fdIcon, fdUrl, fdRemark, fdDisplayOrder, fdPermission } = data

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
      fdRemark: fdRemark,
      fdDisplayOrder: fdDisplayOrder
    }

    // await axios.request({
    //   url: `${baseApi}/app-permission/update`,
    //   method: "post",
    //   data: params,
    //   withCredentials: true,  
    //   headers: {
    //     'Content-Type': 'application/json', // 设置为 application/json
    //     'X-AUTH-TOKEN': token
    //   },
    // }).then((res: any) => {
    //   const data = res.data
    //   if (data.code === 200) {
    //     onCancel()
    //   }
    // }).catch((err: any) => {
    //   console.log("axios-app-err", err)
    // })

    const res = await dispatchRedux(asyncThunk.updateApps(params) as any);
    const data = res?.payload;
    if (data.code === 200) {
      onCancel()
    } else if (
        data.code === 401 && 
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login")
    }

    onCancel()
  }

  /**
   * 初始化数据
   */
  useEffect(() => {
    if (!_.isEmpty(detail)) {
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
        <div className={classNames("app-detail-item")}>
          <div className={classNames("app-detail-item-label")}>权限绑定</div>
          <div className={classNames("app-detail-item-value")}>
            <Input value={fdPermission} placeholder="请选择权限绑定" onChange={(e: any) => onHandleChange("fdPermission", e)} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateApps