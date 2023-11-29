/**
 * 新建菜单
 */
/** external library */
import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useImmerReducer } from "use-immer";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, InputNumber } from "antd"
const { TextArea } = Input

/** utils */
import { reducer } from "../../../../../utils/reducer";
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

const initialState = {
  fdComponentName: "",
  fdUrl: "",
  fdRemark: "",
  fdDisplayOrder: 1
}

const AddMenus = (props: Props) => {
  const { open, onCancel } = props
  const router = useRouter()
  const selectTab = useSelector((state: any) => state.menu.tab)
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { fdComponentName, fdUrl, fdRemark, fdDisplayOrder } = data

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
   * @description 新增左侧菜单确认逻辑
   * @param
   */
  const onOk = async () => {
    const params = {
      fdComponentName: fdComponentName,
      fdRemark: fdRemark,
      fdUrl: fdUrl,
      fdDisplayOrder:1,
      fdParentEntity:{
        fdId:selectTab
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
          <Input placeholder="请输入菜单名称" onChange={(e: any) => onHandleChange("fdComponentName", e)} />
        </Form.Item>
        <Form.Item label="图标地址" name="fdUrl">
          <Input placeholder="请输入图标地址" onChange={(e: any) => onHandleChange("fdUrl", e)} />
        </Form.Item>
        <Form.Item label="备注说明" name="fdRemark">
          <TextArea placeholder="请输入备注说明" onChange={(e: any) => onHandleChange("fdRemark", e)} />
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

export default AddMenus