/**
 * 新建应用
 */
/** external library */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, message } from "antd"

/** utils */
import asyncThunk from "../../../../../store/asyncThunk"

/** utils */
import { baseApi } from '../../../../../config';
import axios from "axios";
import { useRouter } from "next/router";

/**
 * interface
 * @param props 
 * @returns 
 */
interface Props {
  title?: string,
  open: boolean,
  onOk?: () => void,
  onCancel: () => void
}

const AddTabs = (props: Props) => {
  // const form = useForm()
  const router = useRouter()
  const curAppId = router.query[":id"]
  const dispatchRedux = useDispatch();
  const { open, onCancel } = props
  const curApp = useSelector((state: any) => state.apps.curApp)
  const [fdComponentName, setFdComponentName] = useState("")
  const [fdRemark, setFdRemark] = useState("")
  const [fdUrl, setFdUrl] = useState("")
  console.log("add-tab-cur-id", curAppId)

  const onChangeAppName = (e: any) => {
    setFdComponentName(e.target.value)
  }

  const onChangeRemark = (e: any) => {
    setFdRemark(e.target.value)
  }

  const onChangeIconUrl = (e: any) => {
    setFdUrl(e.target.value)
  }

  /**
   * @description 新建应用确认逻辑
   * @param
   */
  const onOk = async () => {
    console.log("新建tab确认逻辑", curApp)

    if (curApp?.fdId) {
      message.warning("当前应用id缺失")
      return
    }

    const params = {
      fdComponentName: fdComponentName,
      fdRemark: fdRemark,
      fdUrl: fdUrl,
      fdDisplayOrder: "1",
      fdAppEntity: {
        fdId: curAppId
      }
    }

    const res = await axios.request({
      url: `${baseApi}/component-permission/add-data`,
      method: "post",
      data: params,
      withCredentials: true,  
      headers: {
        'Content-Type': 'application/json' // 设置为 application/json
      },
    }).then((res: any) => {
      const data = res.data
      if (data.code === 200) {
        console.log("data-add-tab", data)
      }
      
    }).catch((err: any) => {
      console.log("err", err)
    })

    console.log("create-tabs", params)
    // const res = await dispatchRedux(asyncThunk.createApp(params) as any);
    onCancel()
  }

  return (
    <Modal 
      title="新建一级菜单"
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="提交"
    >
      <Form name="AddTabs" style={{ marginTop: "30px" }}>
        <Form.Item label="菜单名称" name="fdComponentName">
          <Input placeholder="请输入菜单名称" onChange={onChangeAppName} />
        </Form.Item>
        <Form.Item label="菜单说明" name="fdRemark">
          <Input placeholder="请输入菜单说明" onChange={onChangeRemark} />
        </Form.Item>
        <Form.Item label="图标地址" name="fdUrl">
          <Input placeholder="请输入图标地址" onChange={onChangeIconUrl} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddTabs