/**
 * 新建应用
 */
/** external library */
import React, { useCallback } from "react";
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import { useImmerReducer } from "use-immer";
import { reducer } from "../../../../../../utils/reducer";
import { Modal, Form, Input, InputNumber } from "antd"
const Textarea = Input
import asyncThunk from "../../../../../../store/asyncThunk";

/** css */
import classnames from 'classnames/bind';
import style from '../../index.module.scss';
const classNames = classnames.bind(style);

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
  fdName: "",
  fdNo: "",    
  fdCellphone: "",
  fdDisplayOrder: "",
  fdRemark: "",
  fdId: ""
}

const AddDepts = (props: Props) => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { fdName, fdNo, fdCellphone, fdDisplayOrder, fdRemark, fdId } = data
  const { open, onCancel } = props

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
   * @description 添加模块确认逻辑
   * @param
   */
  const onOk = async () => {
    const params = {
      fdName: fdName,
      fdNo: fdNo,
      fdCellphone: fdCellphone,
      fdDisplayOrder: fdDisplayOrder,
      fdRemark: fdRemark,
      fdParent: null
    }

    const res = await dispatchRedux(asyncThunk.addDepts(params) as any);
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

  return (
    <Modal 
      title="添加部门"
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="提交"
    >
      <Form name="AddDepts" style={{ marginTop: "30px" }}>
        <Form.Item 
          name="fdName"
          label={(
            <div className={classNames("form-item-label")}>部门名称</div>
          )}
        >
          <Input placeholder="请输入部门名称" onChange={(e: any) => onHandleChange("fdName", e)} />
        </Form.Item>
        <Form.Item 
          name="fdNo"
          label={(
            <div className={classNames("form-item-label")}>部门编号</div>
          )} 
        >
          <Input placeholder="请输入部门编号" onChange={(e: any) => onHandleChange("fdNo", e)} />
        </Form.Item>
        <Form.Item 
          name="fdCellphone"
          label={(
            <div className={classNames("form-item-label")}>联系方式</div>
          )} 
        >
          <Input placeholder="请输入联系方式" onChange={(e: any) => onHandleChange("fdCellphone", e)} />
        </Form.Item>
        <Form.Item 
          name="fdDisplayOrder"
          label={(
            <div className={classNames("form-item-label")}>排序</div>
          )} 
        >
          <InputNumber style={{ width: "378px", textAlign: "left" }} placeholder="请输入排序" onChange={(e: any) => onHandleChange("fdDisplayOrder", e)} />
        </Form.Item>
        <Form.Item 
          name="fdRemark"
          label={(
            <div className={classNames("form-item-label")}>备注说明</div>
          )} 
        >
          <Textarea placeholder="请输入备注说明" onChange={(e: any) => onHandleChange("fdRemark", e)} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddDepts