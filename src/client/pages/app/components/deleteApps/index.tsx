/**
 * 删除应用
 */
/** external library */
import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, message } from "antd"
import { WarningOutlined } from "@ant-design/icons";

/** utils */
import asyncThunk from "../../../../store/asyncThunk"

/** http */
import axios from 'axios';
import { baseApi } from "../../../../config"

/**
 * interface
 * @param props 
 * @returns 
 */
interface Props {
  title?: string,
  appId: string,
  open: boolean,
  onOk?: () => void,
  onCancel: () => void
}


const DeleteApps = (props: Props) => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const token = useSelector((state: any) => state.common.token)
  const { open, appId, onCancel } = props
  
  /**
   * @description 删除应用确认逻辑
   * @param
   */
  const onOk = async () => {
    const params = {
      fdId: appId,
    }

    // await axios.request({
    //   url: `${baseApi}/app-permission/delete`,
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

    const res = await dispatchRedux(asyncThunk.deleteApps(params) as any);
    const data = res?.payload;
    if (data.code === 200) {
      message.success("删除成功")
      onCancel()
    } else if (
        data.code === 401 && 
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login")
    }
    onCancel()
  }

  return (
    <Modal 
      title="删除应用"
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
    >
      <WarningOutlined style={{ color: "red", marginRight: "10px" }}/>
      确定要删除该应用吗?
    </Modal>
  )
}

export default DeleteApps