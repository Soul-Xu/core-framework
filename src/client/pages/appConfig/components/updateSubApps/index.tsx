/**
 * 新建子应用
 */
/** external library */
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import { reducer } from "../../../../utils/reducer";
import { Modal, Form, Input, Checkbox, Select, message } from "antd"
import { useRouter } from "next/router";
import asyncThunk from "../../../../store/asyncThunk";

const TextArea = Input

/** css */
import classnames from "classnames/bind";
import styles from "../../index.module.scss";
const classNames = classnames.bind(styles);

/** http */
import axios from 'axios';
import { baseApi } from "../../../../config"

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
    fdAppName: "",
    fdAppUrl: "", //关联模块的Id
    fdRemark: "",
    fdParent: {
      fdAppId: "",
      fdAppName: "",
      fdAppTabId: "",
      fdAppTabName: ""
    }
  },
  appsList: [],
  tabsList: [],
}

const UpdateSubApps = (props: Props) => {
  const [form] = Form.useForm();
  const { detail, open, onCancel } = props
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { req, appsList, tabsList } = data
  const { fdAppName, fdAppUrl, fdParent, fdRemark } = req
  const token = useSelector((state: any) => state.common.token)
  const mainAppsList = useSelector((state: any) => state.apps.appsList)

    /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
    const setState = useCallback((type: string, val: Record<string, any>) => {
      dispatch({ type, payload: val });
      // 在这里更新表单字段的值
      if (type === "req" && val.fdPermission !== undefined) {
        form.setFieldsValue({ fdPermission: val.fdPermission });
      }
    }, [dispatch]);

  /**
   * @description 处理变量值变化函数
   */
  const onHandleChange = (type: string, e: any) => {
    if (type === "fdMainAppId") {
      const selectMainApp = mainAppsList.find((item: any) => item.fdId === e)
      setState("req", {
        fdParent: {
          ...req.fdParent,
          fdAppId: selectMainApp.fdId,
          fdAppName: selectMainApp.fdAppName
        }
      })
    } else if (type === "fdMainAppTabId") {
      const selectMainAppTab: any = tabsList.find((item: any) => item.value === e)
      setState("req", {
        fdParent: {
          ...req.fdParent,
          fdAppTabId: selectMainAppTab.value,
          fdAppTabName: selectMainAppTab.label
        }
      })
    }
    
    else {
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
    if (!fdParent.fdAppId) {
      message.warning("请选择所属应用")
      return
    }
    if (!fdParent.fdAppTabId) {
      message.warning("请选择所属应用菜单")
      return
    }
    if (!fdAppName) {
      message.warning("请输入应用名称")
      return
    }
    if (!fdAppUrl) {
      message.warning("请输入应用路径")
      return
    }

    const params = {
      fdId: detail?.fdId,
      fdAppName: fdAppName || detail?.fdAppName,
      fdAppUrl: fdAppUrl || detail?.fdAppUrl,
      fdParent: fdParent || detail?.fdParent,
      fdRemark: fdRemark || detail?.fdRemark,
    }

    console.log("update-params", params)

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

    // const res = await dispatchRedux(asyncThunk.UpdateSubApps(params) as any);
    // const data = res?.payload
    // console.log("add", res)
    // if (data.code === 200) {
    //   form.resetFields();
    //   onCancel()
    // } else if (
    //     data.code === 401 && 
    //     data.success === false &&
    //     data.message === "请先登录后再操作!") {
    //   router.push("/login")
    // }
    onCancel()
  }

  /**
   * @description 关闭弹窗
   */
  const onClose = () => {
    form.resetFields();
    onCancel()
  }

  /**
   * 
   */
  const onHandleSelect = (type: string, items: any) => {
    return items?.map(item => ({
      value: item.fdId,
      label: type === "app" ? item.fdAppName : item.fdComponentName
    }));
  }

   /**
   * @description 获取所属主应用菜单列表
   */
  const getTabs = async () => {
    const params = {
      fdId: fdParent.fdAppId
    }

    const res = await dispatchRedux(asyncThunk.getTabs(params) as any)
    const data = res?.payload;
    if (data.code === 200) {
      const content: any = data.data
      const selectTabs = onHandleSelect("tabs", content)
      setState("update", {
        tabsList: selectTabs
      })
    } else if (
      data.code === 401 && 
      data.success === false &&
      data.message === "请先登录后再操作!") {
    router.push("/login")
   }
  } 

  useEffect(() => {
    if (mainAppsList.length > 0) {
      const selectApps = onHandleSelect("app", mainAppsList)
      setState("update", {
        appsList: selectApps
      })
    }
  }, [])

  useEffect(() => {
    if (fdParent.fdAppId) {
      getTabs()
    }
  }, [fdParent.fdAppId])

  useEffect(() => {
    if (detail) {
      // // 将 detail 中的值赋给表单的初始值
      form.setFieldsValue({
        fdAppName: detail.fdAppName,
        fdAppUrl: detail.fdAppUrl,
        fdMainAppId: detail.fdParent?.fdAppName,
        fdMainAppTabId: detail.fdParent?.fdAppTabName,
        fdRemark: detail.fdRemark,
      });
    }

    // 清空 data 的状态为初始值
    return () => {
      setState("req", {
        fdAppName: "",
        fdAppUrl: "", //关联模块的Id
        fdRemark: "",
        fdParent: {
          fdAppId: "",
          fdAppName: "",
          fdAppTabId: "",
          fdAppTabName: ""
        }
      })
    };
  }, [detail, dispatch]);

  return (
    <Modal 
      title="编辑子应用"
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onClose}
      okText="提交"
    >
      <Form form={form} name="AddPermission" style={{ marginTop: "30px" }} initialValues={detail}>
        <Form.Item 
          label={(
            <div className={classNames("form-item-label-require")}>
              <span className={classNames("require-icon")}>*</span>
              <span>所属应用</span>
            </div>
          )}
          name="fdMainAppId"
        >
          <Select 
            style={{ textAlign: "left" }} 
            options={appsList} 
            placeholder="请选择所属主应用"
            onChange={(e: any) => onHandleChange("fdMainAppId", e)}
          />
        </Form.Item>
        <Form.Item 
          label={(
            <div className={classNames("form-item-label-require")}>
              <span className={classNames("require-icon")}>*</span>
              <span>所属菜单</span>
            </div>
          )}
          name="fdMainAppTabId"
        >
          <Select 
            style={{ textAlign: "left" }} 
            options={tabsList} 
            placeholder="请选择所属主应用菜单"
            onChange={(e: any) => onHandleChange("fdMainAppTabId", e)}
          />
        </Form.Item>
        <Form.Item 
          label={(
            <div className={classNames("form-item-label-require")}>
              <span className={classNames("require-icon")}>*</span>
              <span>应用名称</span>
            </div>
          )} 
          name="fdAppName"
        >
          <Input placeholder="请输入应用名称" onChange={(e: any) => onHandleChange("fdAppName", e)} />
        </Form.Item>
        <Form.Item 
          label={(
            <div className={classNames("form-item-label-require")}>
              <span className={classNames("require-icon")}>*</span>
              <span>应用路径</span>
            </div>
          )} 
          name="fdAppUrl"
        >
          <Input placeholder="请输入应用路径" onChange={(e: any) => onHandleChange("fdAppUrl", e)} />
        </Form.Item>
        <Form.Item 
          label={(
            <div className={classNames("form-item-label")}>
              <span>应用描述</span>
            </div>
          )} 
          name="fdRemark"
        >
          <TextArea placeholder="请输入应用描述" onChange={(e: any) => onHandleChange("fdRemark", e)} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateSubApps