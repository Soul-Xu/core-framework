/**
 * 新建应用Tabs
 */
/** external library */
import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useImmerReducer } from "use-immer";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, message, InputNumber } from "antd"
const { TextArea } = Input

/** utils */
import { reducer } from "../../../../../utils/reducer";
import asyncThunk from "../../../../../store/asyncThunk"

/** http */
import axios from 'axios';
import { baseApi } from "../../../../../config"

/**
 * interface
 * @param props 
 * @returns 
 */
interface Props {
  title?: string,
  tabId?: string,
  detail?: any,
  open: boolean,
  onOk?: () => void,
  onCancel: () => void
}

const initialState = {
  fdAppName: "",
  fdComponentName: "",
  fdUrl: "",
  fdRemark: "",
  fdDisplayOrder: 1,
}

const UpdateTabs = (props: Props) => {
  const [form] = Form.useForm();
  const { open, detail, onCancel } = props
  const router = useRouter()
  const curAppId = router.query[":id"]
  const dispatchRedux = useDispatch();
  const appsList = useSelector((state: any) => state.apps.appsList)
  const token = useSelector((state: any) => state.common.token)
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { fdAppName, fdComponentName, fdUrl, fdRemark, fdDisplayOrder } = data

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
   * @description 新建tab确认逻辑
   * @param
   */
  const onOk = async () => {
    const params = {
      fdId: detail.fdId,
      fdComponentName: fdComponentName || detail.fdComponentName,
      fdRemark: fdRemark || detail.fdRemark,
      fdUrl: fdUrl || detail.fdUrl,
      fdDisplayOrder: "1" || detail.fdUrl,
      fdAppEntity: {
        fdId: detail.fdAppEntity.fdId
      }
    }

    const res = await dispatchRedux(asyncThunk.updateTabs(params) as any);
    const data = res?.payload;
    if (data.code === 200) {
      onCancel()
    } else if (
        data.code === 401 && 
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login")
    }
    onCancel()
  }

  // 获取当前的appName
  const getCurFdAppName = (curAppId, appsList) => {
    const curApp = appsList.find(app => app.fdId === curAppId);
    return curApp ? curApp.fdAppName : null;
  };

  useEffect(() => {
    const curFdAppName = getCurFdAppName(curAppId, appsList);
    setState("update", {
      fdAppName: curFdAppName
    })
  }, [curAppId, appsList])

  useEffect(() => {
    if (detail) {
      // 将 detail 中的值赋给表单的初始值
      form.setFieldsValue({
        fdAppName: detail?.fdAppEntity?.fdName,
        fdComponentName: detail.fdComponentName,
        fdUrl: detail.fdUrl,
        fdRemark: detail.fdRemark,
        fdDisplayOrder: detail.fdDisplayOrder,
      });
    }

    // 清空 data 的状态为初始值
    return () => {
      setState("update", {
        fdAppName: "",
        fdComponentName: "",
        fdUrl: "",
        fdRemark: "",
        fdDisplayOrder: 1,
      })
    };
  }, [detail, dispatch]);

  return (
    <Modal 
      title="编辑一级菜单"
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="提交"
    >
      <Form form={form} name="UpdateTabs" style={{ marginTop: "30px" }} initialValues={detail}>
        <Form.Item label="所属应用" name="fdAppName">
          <div style={{ textAlign: "left" }}>{fdAppName}</div>
        </Form.Item>
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

export default UpdateTabs