/**
 * 新建应用
 */
/** external library */
import React, { useCallback, useEffect } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import { reducer } from "../../../../../../utils/reducer";
import { Modal, Form, Input } from "antd"
import asyncThunk from "../../../../../../store/asyncThunk";

/** http */
import axios from 'axios';
import { baseApi } from "../../../../../../config"

/**
 * interface
 * @param props 
 * @returns 
 */
interface Props {
  title?: string,
  detail: any
  open: boolean,
  onOk?: () => void,
  onCancel: () => void
}

const initialState = {
  fdName: "",
  fdModuleKey: "",
  fdRemark: ""
}

const UpdateModules = (props: Props) => {
  const [form] = Form.useForm();
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { fdName, fdModuleKey, fdRemark } = data
  const token = useSelector((state: any) => state.common.token)
  const { detail, open, onCancel } = props

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
    const setState = useCallback((type: string, val: Record<string, any>) => {
      dispatch({ type, payload: val });
    }, [dispatch]);

  /**
   * @description 处理变量值变化函数
   */
  const onHandleChange = (type: string, e: any) => {
    console.log("eeee", e.target.value)
    setState("update", {
      [type]: e.target.value
    })
  }

  /**
   * @description 校验模块名称是否唯一
   */
  const onUnique = async (fdName: string) => {
    const params = {
      fdId: detail?.fdId,
      fdName: fdName
    }

    // await axios.request({
    //   url: `${baseApi}/api-module/is-moduleKey-unique`,
    //   method: "post",
    //   data: params,
    //   withCredentials: true,  
    //   headers: {
    //     'Content-Type': 'application/json', // 设置为 application/json
    //     'ltpatoken': token
    //   },
    // }).then((res: any) => {
    //   const data = res.data
    //   if (data.code === 200) {
    //     return true
    //   }
    // }).catch((err: any) => {
    //   console.log("uniqueModules", err)
    // })

    const res = await dispatchRedux(asyncThunk.uniqueModules(params) as any);
    const data = res?.payload
    if (data.code === 200 && data.data === true) {
      return true
    } else if (
        data.code === 401 && 
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login")
    }
    return false
  }


  /**
   * @description 添加模块确认逻辑
   * @param
   */
  const onOk = async () => {
    onUnique(fdName)

    const params = {
      fdId: detail?.fdId,
      fdName: fdName || detail.fdName,
      fdModuleKey: fdModuleKey || detail.fdModuleKey,
      fdRemark: fdRemark || detail.fdRemark
    }

    // await axios.request({
    //   url: `${baseApi}/api-module/update`,
    //   method: "post",
    //   data: params,
    //   withCredentials: true,  
    //   headers: {
    //     'Content-Type': 'application/json', // 设置为 application/json
    //     'ltpatoken': token
    //   },
    // }).then((res: any) => {
    //   const data = res.data
    //   if (data.code === 200) {
    //     onCancel()
    //   }
    // }).catch((err: any) => {
    //   console.log("update-module", err)
    // })

    const res = await dispatchRedux(asyncThunk.updateModules(params) as any);
    const data = res?.payload
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

  /**
   * @description 关闭弹窗
   */
  const onClose = () => {
    form.resetFields();
    onCancel()
  }

  useEffect(() => {
    if (detail) {
      // 将 detail 中的值赋给表单的初始值
      form.setFieldsValue({
        fdName: detail.fdName,
        fdModuleKey: detail.fdModuleKey,
        fdRemark: detail.fdRemark,
      });
    }

    // 清空 data 的状态为初始值
    return () => {
      setState("update", {
        fdName: "",
        fdModuleKey: "",
        fdRemark: ""
      })
    };
  }, [detail, dispatch]);

  return (
    <Modal 
      title="编辑模块"
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onClose}
      okText="提交"
    >
      <Form form={form} name="UpdateModules" style={{ marginTop: "30px" }} initialValues={detail}>
        <Form.Item label="模块名称" name="fdName">
          <Input placeholder="请选择模块名称" onChange={(e: any) => onHandleChange("fdName", e)} />
        </Form.Item>
        <Form.Item label="模块标识" name="fdModuleKey">
          <Input placeholder="请输入模块标识" onChange={(e: any) => onHandleChange("fdModuleKey", e)} />
        </Form.Item>
        <Form.Item label="模块描述" name="fdUrl">
          <Input placeholder="请输入模块描述" onChange={(e: any) => onHandleChange("fdRemark", e)} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateModules