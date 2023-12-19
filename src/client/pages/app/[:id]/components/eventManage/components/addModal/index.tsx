/**
 * 新建菜单
 */
/** external library */
import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useImmerReducer } from "use-immer";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, InputNumber, Select } from "antd"
const { TextArea } = Input

/** utils */
import { reducer } from "../../../../../../../utils/reducer";
import asyncThunk from "../../../../../../../store/asyncThunk"

/** components */
import EventManageForm from "../../../event";

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
  fdDisplayOrder: 1
}

const AddModal = (props: Props) => {
  const {  open, onCancel } = props
  const router = useRouter()
  const selectTabs = useSelector((state: any) => state.menus.selectTabs)
  const token = useSelector((state: any) => state.common.token)
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
        fdId: selectTabs?.fdId
      }
    }

    // const res = await dispatchRedux(asyncThunk.addEvent(params) as any);
    // const data = res?.payload;
    // if (data.code === 200) {
    //   onCancel()
    // } else if (
    //     data.code === 401 && 
    //     data.success === false &&
    //     data.message === "请先登录后再操作!") {
    //   router.push("/login")
    // }
    onCancel()
  }

  return (
    <Modal 
      title="新建事件"
      width={1200}
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="提交"
    >
      <EventManageForm />
    </Modal>
  )
}

export default AddModal