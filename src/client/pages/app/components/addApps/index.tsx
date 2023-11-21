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
  const dispatchRedux = useDispatch();
  const { open, onCancel } = props
  const [appName, setAppName] = useState("")

  const onChangeAppName = (e: any) => {
    setAppName(e.target.value)
  }

  /**
   * @description 新建应用确认逻辑
   * @param
   */
  const onOk = async () => {
    console.log("新建应用确认逻辑", appName)

    const params = {
      appName
    }

    const res = await dispatchRedux(asyncThunk.createApp(params) as any);

    console.log("create", appName)
    onCancel()
    // setAppName("")
  }

  /**
   * @description 控制弹窗显示和隐藏时输入框内容
   * @param
   */
  // useEffect(() => {
  //   if (!open) {
  //     setAppName("")
  //   }
  // }, [open])

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
        <Form.Item label="应用名称" name="appName">
          <Input placeholder="请输入应用名称" onChange={onChangeAppName} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddApps