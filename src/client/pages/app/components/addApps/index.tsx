/**
 * 新建应用
 */
/** external library */
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useImmerReducer } from "use-immer";
import { Modal, Form, Input, InputNumber } from "antd"

/** utils */
import { reducer } from "../../../../utils/reducer";
import asyncThunk from "../../../../store/asyncThunk"
import axios from "axios";
import { baseApi } from "../../../../config";

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
  fdAppName: "",
  fdIcon: "",
  fdUrl: "",
  fdRemark: "",
  fdDisplayOrder: 1
}

const AddApps = (props: Props) => {
  // const form = useForm()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { open, onCancel } = props
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
   * @description 新建应用确认逻辑
   * @param
   */
  const onOk = async () => {
    const params = {
      fdAppName: fdAppName,
      fdIcon: fdIcon,
      fdUrl: fdUrl,
      fdRemark: fdRemark,
      fdDisplayOrder: fdDisplayOrder
    }

    // axios原生方式
    const res:any = await axios.request({
      url: `${baseApi}/app-permission/add`,
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

    // // const res = await dispatchRedux(asyncThunk.createApp(params) as any);
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
        <Form.Item label="备注说明" name="fdRemark">
          <Input placeholder="请输入备注说明" onChange={(e: any) => onHandleChange("fdRemark", e)} />
        </Form.Item>
        <Form.Item label="应用排序" name="fdDisplayOrder">
          <div style={{ textAlign: "left", width: "402px" }}>
            <InputNumber style={{ width: "100%" }} placeholder="请输入应用排序" min={1} max={99} onChange={(e: any) => onHandleChange("fdDisplayOrder", e)} />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddApps