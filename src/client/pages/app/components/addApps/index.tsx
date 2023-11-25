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

const initialState = {
  fdAppNam: "",
  fdIcon: "",
  fdUrl: ""
}

const AddApps = (props: Props) => {
  // const form = useForm()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { open, onCancel } = props
  const [fdAppNam, setFdAppNam] = useState("")
  const [fdIcon, setFdIcon] = useState("")
  const [fdUrl, setFdUrl] = useState("")

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
        <Form.Item label="应用名称" name="fdAppName">
          <Input placeholder="请输入应用名称" onChange={(e: any) => onHandleChange("fdAppName", e)} />
        </Form.Item>
        <Form.Item label="图标名称" name="fdIcon">
          <Input placeholder="请输入图标名称" onChange={(e: any) => onHandleChange("fdIcon", e)} />
        </Form.Item>
        <Form.Item label="图标地址" name="fdUrl">
          <Input placeholder="请输入图标地址" onChange={(e: any) => onHandleChange("fdUrl", e)} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddApps