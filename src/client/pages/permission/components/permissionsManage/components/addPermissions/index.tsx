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
import { setModulesList } from "../../../../../../store/modules/permissionsSlice";

const TextArea = Input

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

const AddPermissions = (props: Props) => {
  const { open, onCancel } = props
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { req, modules } = data
  const { fdApiName, fdModuleId, fdPermission, fdRemark } = req
  const token = useSelector((state: any) => state.common.token)

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

    // await axios.request({
    //   url: `${baseApi}/api-permission/add`,
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
    //   console.log("add-permission", err)
    // })

    const res = await dispatchRedux(asyncThunk.addPermissions(params) as any);
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

    // await axios.request({
    //   url: `${baseApi}/api-module/list`,
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
    //     const { content } = data.data;
    //     const modules = content.map((contentItem: any, index: number) => {
    //       return {
    //         ...contentItem,
    //         sort: index + 1
    //       }
    //     })
    //     setState("update", {
    //       dataList: modules
    //     })
    //     dispatchRedux(setModulesList({
    //       modulesList: modules
    //     }))
    //   }
    // }).catch((err: any) => {
    //   console.log("update-module", err)
    // })

    const res = await dispatchRedux(asyncThunk.getModules(params) as any);
      const data = res?.payload
      if (data.code === 200) {
        const { content } = data.data
        const options: any = onHandleModules(content)
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

  return (
    <Modal 
      title="功能授权定义"
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="提交"
    >
      <Form name="AddPermission" style={{ marginTop: "30px" }}>
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

export default AddPermissions