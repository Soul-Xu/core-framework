/**
 * 新建应用
 */
/** external library */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Input } from "antd"

/** utils */
// import asyncThunk from "store/asyncThunk";
import asyncThunk from "../../../../store/asyncThunk"

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

const AddApps = (props: Props) => {
  // const form = useForm()
  const dispatchRedux = useDispatch();
  const { open, onCancel } = props
  const [fdAppNam, setFdAppNam] = useState("")
  const [fdIcon, setFdIcon] = useState("")
  const [fdUrl, setFdUrl] = useState("")

  const onChangeAppName = (e: any) => {
    setFdAppNam(e.target.value)
  }

  const onChangeIcon = (e: any) => {
    setFdIcon(e.target.value)
  }

  const onChangeIconUrl = (e: any) => {
    setFdUrl(e.target.value)
  }

  /**
   * @description 新建应用确认逻辑
   * @param
   */
  const onOk = async () => {
    console.log("新建应用确认逻辑")

    const params = {
      fdAppNam: fdAppNam,
      fdIcon: fdIcon,
      fdUrl: fdUrl
    }

    console.log("create-app", params)
    const res = await dispatchRedux(asyncThunk.createApp(params) as any);

    console.log("create-app-res", res)
    onCancel()
  }

  return (
    <Modal 
      title="新建应用"
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="提交"
    >
      <Form name="addApps" style={{ marginTop: "30px" }}>
        <Form.Item label="应用名称" name="fdAppNam">
          <Input placeholder="请输入应用名称" onChange={onChangeAppName} />
        </Form.Item>
        <Form.Item label="图标名称" name="fdIcon">
          <Input placeholder="请输入图标名称" onChange={onChangeIcon} />
        </Form.Item>
        <Form.Item label="图标地址" name="fdUrl">
          <Input placeholder="请输入图标地址" onChange={onChangeIconUrl} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddApps