/**
 * 新建应用
 */
/** external library */
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import { Modal, Form, Input } from "antd"

/** utils */
import asyncThunk from "../../../../../store/asyncThunk"
import { baseApi } from '../../../../../config';
import axios from "axios";

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

const AddMenus = (props: Props) => {
  // const form = useForm()
  const router = useRouter()
  const curTabId = router.query["tabId"]
  const dispatchRedux = useDispatch();
  const { open, onCancel } = props
  const [fdComponentName, setFdComponentName] = useState("")
  const [fdRemark, setFdRemark] = useState("")
  const [fdUrl, setFdUrl] = useState("")

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
   * @description 新增左侧菜单确认逻辑
   * @param
   */
  const onOk = async () => {
    console.log("新建应用确认逻辑")

    const params = {
      fdComponentName: fdComponentName,
      fdRemark: fdRemark,
      fdUrl: fdUrl,
      fdDisplayOrder:1,
      fdParentEntity:{
        fdId:curTabId
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
        // const tabs: any = [...data.data, tabAdd]
        // setTabsList(tabs)
      }
      
    }).catch((err: any) => {
      console.log("err", err)
    })

    console.log("create-menus", params)
    // const res = await dispatchRedux(asyncThunk.createApp(params) as any);
    onCancel()
  }

  return (
    <Modal 
      title="新建二级菜单"
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="提交"
    >
      <Form name="AddMenus" style={{ marginTop: "30px" }}>
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

export default AddMenus