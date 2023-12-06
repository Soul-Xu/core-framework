/**
 * 新建应用
 */
/** external library */
import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useImmerReducer } from "use-immer";
import { reducer } from "../../../../../../utils/reducer";
import { Modal, Form, Input, message } from "antd"
import asyncThunk from "../../../../../../store/asyncThunk";
const Textarea = Input

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
  fdNickName: "",
  fdUserName: "",
  fdPassword: "", 
  fdEmail: "",
  fdCellphone: "",
  fdEducation: "",
  fdCity: "",
  fdRemark: "",
  // “fdParent":{
  //         "fdId":"xxxx"
  // },
}

const AddUsers = (props: Props) => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { fdNickName, fdUserName, fdPassword, fdEmail, fdCellphone, fdEducation, fdCity, fdRemark } = data
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
    setState("update", {
      [type]: e.target.value
    })
  }

  /**
   * @description 添加用户确认逻辑
   * @param
   */
  const onOk = async () => {
    const params = {
      fdNickName: fdNickName,
      fdUserName: fdUserName,
      fdPassword: fdPassword, 
      fdEmail: fdEmail,
      fdCellphone: fdCellphone,
      fdEducation: fdEducation,
      fdCity: fdCity,
      fdRemark: fdRemark,
      fdParent: {
        fdId: "1hc2iasp01vuk8e93igqvu31g2aamj19"
      }
    }

    const res = await dispatchRedux(asyncThunk.addUsers(params) as any);
    const data = res?.payload
    console.log("addUsers", data)
    if (data.code === 200) {
      message.success("添加用户成功")
      onCancel()
    } else if (
        data.code === 401 && 
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login")
    }
    message.error("添加用户失败")
    onCancel()
  }

  return (
    <Modal 
      title="添加用户"
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="提交"
    >
      <Form name="AddUsers" style={{ marginTop: "30px" }}>
        <Form.Item 
          name="fdNickName"
          label={(
            <div className={classNames("form-item-label")}>用户昵称</div>
          )}
        >
          <Input placeholder="请选择用户昵称" onChange={(e: any) => onHandleChange("fdNickName", e)} />
        </Form.Item>
        <Form.Item 
          name="fdUserName"
          label={(
            <div className={classNames("form-item-label")}>用户名称</div>
          )} 
        >
          <Input placeholder="请输入用户名称" onChange={(e: any) => onHandleChange("fdUserName", e)} />
        </Form.Item>
        <Form.Item 
          name="fdPassword"
          label={(
            <div className={classNames("form-item-label")}>密码</div>
          )} 
        >
          <Input placeholder="请输入密码" onChange={(e: any) => onHandleChange("fdPassword", e)} />
        </Form.Item>
        <Form.Item 
          name="fdEmail"
          label={(
            <div className={classNames("form-item-label")}>邮箱</div>
          )} 
        >
          <Input placeholder="请选择邮箱" onChange={(e: any) => onHandleChange("fdEmail", e)} />
        </Form.Item>
        <Form.Item 
          name="fdCellphone"
          label={(
            <div className={classNames("form-item-label")}>电话号码</div>
          )} 
        >
          <Input placeholder="请输入电话号码" onChange={(e: any) => onHandleChange("fdCellphone", e)} />
        </Form.Item>
        <Form.Item 
          name="fdEducation"
          label={(
            <div className={classNames("form-item-label")}>教育背景</div>
          )} 
        >
          <Input placeholder="请选择教育背景" onChange={(e: any) => onHandleChange("fdEducation", e)} />
        </Form.Item>
        <Form.Item 
          name="fdCity"
          label={(
            <div className={classNames("form-item-label")}>城市</div>
          )} 
        >
          <Input placeholder="请选择城市" onChange={(e: any) => onHandleChange("fdCity", e)} />
        </Form.Item>
        <Form.Item 
          name="fdRemark"
          label={(
            <div className={classNames("form-item-label")}>备注</div>
          )} 
        >
          <Textarea placeholder="请输入备注" onChange={(e: any) => onHandleChange("fdRemark", e)} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddUsers