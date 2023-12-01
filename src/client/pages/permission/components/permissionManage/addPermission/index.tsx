/**
 * 新建应用
 */
/** external library */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, message, Row, Col, Checkbox, Divider, Select } from "antd"
import { useRouter } from "next/router";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import axios from "axios";
// import { baseApi } from "../../../../../config";
import asyncThunk from "../../../../../store/asyncThunk";

const CheckboxGroup = Checkbox.Group;

// 后台管理
const plainOptions = ['用户新增权限', '用户编辑权限', '用户查看权限', '部门新增权限', '应用维护权限', '菜单维护权限', '基础配置权限'];
const defaultCheckedList = ['用户新增权限', '用户编辑权限'];

// ITIL事件流程
const processOptions = ['流程发起权限', '流程查看权限', '流程特权处理', '流程维护处理'];

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

const AddPermission = (props: Props) => {
  // const form = useForm()
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const { open, onCancel } = props
  const curApp = useSelector((state: any) => state.apps.curApp)
  const appsList = useSelector((state: any) => state.apps.appsList)
  const baseApi = useSelector((state: any) => state.common.baseApi)
  const [fdComponentName, setFdComponentName] = useState("")
  const [fdRemark, setFdRemark] = useState("")
  const [fdUrl, setFdUrl] = useState("")
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
  const [modules, setModules] = useState([])
  const [apps, setApps] = useState([])

  /**
   * @description 新建应用确认逻辑
   * @param
   */
  const onOk = async () => {
    const params = {

    }

    onCancel()
  }

  /**
   * 
   */
  const onHandleModule = (items: any) => {
    return items.map(item => ({
      value: item.fdId,
      label: item.fdName
    }));
  }

  const onHandleApps = (items: any) => {
    return items.map(item => ({
      value: item.fdId,
      label: item.fdAppName || "demo"
    }));
  }

  /**
   * @description 获取所属分类列表
   */
  const getModules = async () => {
    const params = {}

    const res = await dispatchRedux(asyncThunk.getFuncs(params) as any);
      const data = res?.payload
      if (data.code === 200) {
        const options: any = onHandleModule(data.data)
        setModules(options)
      }
  }

  useEffect(() => {
    getModules()
  }, [])

  useEffect(() => {
    const apps = onHandleApps(appsList)
    setApps(apps)
  }, [appsList])

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
        <Form.Item label="所属模块" name="fdComponentName">
          <Select style={{ textAlign: "left" }} options={modules} placeholder="请选择所属模块" />
        </Form.Item>
        <Form.Item label="权限名称" name="fdRemark">
          <Input placeholder="请选择权限名称" onChange={() => console.log("请选择角色组成员")} />
        </Form.Item>
        <Form.Item label="权限标识" name="fdUrl">
          <Input placeholder="请输入权限标识" onChange={() => console.log("请选择角色组成员")} />
        </Form.Item>
        <Form.Item label="权限描述" name="fdUrl">
          <Input placeholder="请输入权限描述" onChange={() => console.log("请选择角色组成员")} />
        </Form.Item>
        <Form.Item label="绑定应用" name="fdUrl">
          <Select style={{ textAlign: "left" }} options={apps} placeholder="请选择需要绑定的应用" />
        </Form.Item>
        <Form.Item label="绑定菜单" name="fdUrl">
          <Input placeholder="请输入绑定菜单" onChange={() => console.log("请选择角色组成员")} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddPermission