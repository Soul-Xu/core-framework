/**
 * 新建应用
 */
/** external library */
import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Input } from "antd"
import { WarningOutlined } from "@ant-design/icons";

/** utils */
import axios from "axios";
import { baseApi } from "../../../../config";

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
  const { open, appId, onCancel } = props
  
  /**
   * @description 删除应用确认逻辑
   * @param
   */
  const onOk = async () => {
    const params = {
      fdId: appId,
    }

    // axios原生方式
    const res:any = await axios.request({
      url: `${baseApi}/app-permission/delete`,
      method: "post",
      data: params,
      withCredentials: true,  
      headers: {
        'Content-Type': 'application/json' // 设置为 application/json
      },
    }).then((res: any) => {
      const data = res.data
      if (data.code === 200) {
        onCancel()
      }

    }).catch((err: any) => {
      console.log("axios-app-catch", err)
    })

    // const res = await dispatchRedux(asyncThunk.createApp(params) as any);
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