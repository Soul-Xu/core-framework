/**
 * 新建应用
 */
/** external library */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, message } from "antd"
import { WarningOutlined } from "@ant-design/icons";

/** utils */
import axios from "axios";
import asyncThunk from "../../../../store/asyncThunk"
// import { baseApi } from "../../../../config";

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
  // const form = useForm()
  const dispatchRedux = useDispatch();
  const baseApi = useSelector((state: any) => state.common.baseApi)
  const { open, appId, onCancel } = props
  
  /**
   * @description 删除应用确认逻辑
   * @param
   */
  const onOk = async () => {
    const params = {
      fdId: appId,
    }

    const res = await dispatchRedux(asyncThunk.deleteApp(params) as any);
    const data = res?.payload;
    if (data.code === 200) {
      message.success("删除成功")
      onCancel()
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