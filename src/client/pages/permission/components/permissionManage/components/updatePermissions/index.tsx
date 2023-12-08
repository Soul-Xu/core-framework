/**
 * 新建应用
 */
/** external library */
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import { reducer } from "../../../../../../utils/reducer";
import { Modal, Form, Input, Checkbox, Select } from "antd"
import { useRouter } from "next/router";
import asyncThunk from "../../../../../../store/asyncThunk";

const TextArea = Input

/**
 * interface
 * @param props 
 * @returns 
 */
interface Props {
  title?: string,
  detail: any,
  open: boolean,
  onOk?: () => void,
  onCancel: () => void
}

const initialState = {
  req: {
    fdApiName: "",
    fdModuleId: "", //关联模块的Id
    fdPermission: "",		//关联的模块标识
    fdRemark: ""
  },
  modules: []
}

const UpdatePermissions = (props: Props) => {
  const { detail, open, onCancel } = props
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { req, modules } = data
  const { fdApiName, fdModuleId, fdPermission, fdRemark } = req

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
    if (type === "fdModuleId") {
      setState("req", {
        [type]: e
      })
    } else {
      setState("req", {
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
      fdApiName: fdApiName,
      fdModuleId: fdModuleId, //关联模块的Id
      fdPermission: fdPermission,		//关联的模块标识
      fdRemark: fdRemark,
    }

    console.log("adddd", params)

    const res = await dispatchRedux(asyncThunk.addPermissions(params) as any);
    const data = res?.payload
    if (data.code === 200) {
 
      console.log("permission-modules", data)
    } else if (
        data.code === 401 && 
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login")
    }

    onCancel()
  }

  /**
   * 
   */
  const onHandleModules = (items: any) => {
    return items?.map(item => ({
      value: item.fdId,
      label: item.fdName
    }));
  }

  /**
   * @description 获取所属分类列表
   */
  const getModules = async () => {
    const params = {
      page: 1,
      pageSize: 10
    }

    const res = await dispatchRedux(asyncThunk.getModules(params) as any);
      const data = res?.payload
      if (data.code === 200) {

        const { content } = data.data
        const options: any = onHandleModules(content)
        console.log("modules-data", data)
        console.log("modules-content", content)
        console.log("hanlde-modules", options)
        setState("update", {
          modules: options
        })
      } else if (
          data.code === 401 && 
          data.success === false &&
          data.message === "请先登录后再操作!") {
        router.push("/login")
      }
  }

  useEffect(() => {
    getModules()
  }, [])

  useEffect(() => {
    if (detail) {
      // 将 detail 中的值赋给表单的初始值
      dispatch({ type: "update", payload: detail });
    }

    // 清空 data 的状态为初始值
    return () => {
      setState("req", {
        fdApiName: "",
        fdModuleId: "", //关联模块的Id
        fdPermission: "",		//关联的模块标识
        fdRemark: ""
      })
    };
  }, [detail, dispatch]);

  return (
    <Modal 
      title="功能授权定义"
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="提交"
    >
      <Form name="UpdatePermission" style={{ marginTop: "30px" }} initialValues={detail}>
        <Form.Item label="所属模块" name="fdModuleId">
          <Select 
            style={{ textAlign: "left" }} 
            options={modules} 
            placeholder="请选择所属模块"
            onChange={(e: any) => onHandleChange("fdModuleId", e)}
          />
        </Form.Item>
        <Form.Item label="权限名称" name="fdApiName">
          <Input placeholder="请选择权限名称" onChange={(e: any) => onHandleChange("fdApiName", e)} />
        </Form.Item>
        <Form.Item label="权限标识" name="fdPermission">
          <Input placeholder="请输入权限标识" onChange={(e: any) => onHandleChange("fdPermission", e)} />
        </Form.Item>
        <Form.Item label="权限描述" name="fdRemark">
          <TextArea placeholder="请输入权限描述" onChange={(e: any) => onHandleChange("fdRemark", e)} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdatePermissions