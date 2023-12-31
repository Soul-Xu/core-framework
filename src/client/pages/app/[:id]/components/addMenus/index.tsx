/**
 * 新建菜单
 */
/** external library */
import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useImmerReducer } from "use-immer";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, InputNumber, Select } from "antd"
import _ from "lodash"
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
  open: boolean,
  onOk?: () => void,
  onCancel: () => void
}

const permissonOption = [
  { value: 'add', label: '数据新增功能权限' },
  { value: 'check', label: '数据查询功能权限' },
  { value: 'delete', label: '数据删除功能权限' },
  { value: 'update', label: '数据修改功能权限' },
]

const initialState = {
  fdComponentName: "",
  fdUrl: "",
  fdRemark: "",
  fdDisplayOrder: 1,
  fdTabName: "",
}

const AddMenus = (props: Props) => {
  const { open, onCancel } = props
  const router = useRouter()
  const selectTabs = useSelector((state: any) => state.menus.selectTabs)
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { fdComponentName, fdUrl, fdRemark, fdDisplayOrder, fdTabName } = data

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
      fdDisplayOrder: fdDisplayOrder,
      fdParentEntity:{
        fdId: selectTabs?.fdId
      }
    }

    const res = await dispatchRedux(asyncThunk.addMenus(params) as any);
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

  useEffect(() => {
    if(!_.isEmpty(selectTabs) && selectTabs?.fdComponentName) {
      setState("update", {
        fdTabName: selectTabs?.fdComponentName
      })
    }
  }, [selectTabs])

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
        <Form.Item label="一级菜单" name="fdTabName">
          <div style={{ textAlign: "left" }}>{fdTabName}</div>
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
        {/* <Form.Item label="绑定权限" name="fdPermission">
          <Select style={{ textAlign: "left" }} placeholder="请选择是否绑定权限" options={permissonOption} onChange={(e: any) => onHandleChange("fdPermission", e)} />
        </Form.Item> */}
      </Form>
    </Modal>
  )
}

export default AddMenus