/**
 * 新建应用
 */
/** external library */
import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import { reducer } from "../../../../../../utils/reducer";
import { Modal, Form, Input, message } from "antd"
import asyncThunk from "../../../../../../store/asyncThunk";
import { setDeptsList } from "../../../../../../store/modules/permissionsSlice" 
const Textarea = Input

/** css */
import classnames from 'classnames/bind';
import style from '../../index.module.scss';
const classNames = classnames.bind(style);

/** http */
import axios from 'axios';
import { baseApiOrg } from "../../../../../../config"

/**
 * interface
 * @param props 
 * @returns 
 */
interface Props {
  title?: string
  detail: any
  open: boolean
  onOk?: () => void
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
  fdId: "",
}

const AddUsers = (props: Props) => {
  const [form] = Form.useForm();
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { fdNickName, fdUserName, fdPassword, fdEmail, fdCellphone, fdEducation, fdCity, fdRemark, fdId } = data
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
      fdId: detail?.fdId,
      fdNickName: fdNickName || detail.fdNickName,
      fdUserName: fdUserName || detail.fdNickName,
      fdPassword: fdPassword || detail.fdNickName, 
      fdEmail: fdEmail || detail.fdEmail,
      fdCellphone: fdCellphone || detail.fdCellphone,
      fdEducation: fdEducation || detail.fdEducation,
      fdCity: fdCity || detail.fdCity,
      fdRemark: fdRemark || detail.fdRemark,
      fdParent: {
        fdId: detail.fdParent.fdId
      }
    }

    const res = await dispatchRedux(asyncThunk.updateUsers(params) as any);
    const data = res?.payload
    if (data.code === 200) {
      message.success("编辑用户成功")
      onCancel()
    } else if (
        data.code === 401 && 
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login")
    }
    message.error("编辑用户失败")
    onCancel()
  }

  /**
   * @description 关闭弹窗
   */
  const onClose = () => {
    form.resetFields();
    onCancel()
  }

  const getDepts = async () => {
    const params = {
      page: 1,
      pageSize: 20
    }

    // await axios.request({
    //   url: `${baseApiOrg}/dept/list`,
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
    //     const Depts = content.map((contentItem: any, index: number) => {
    //       return {
    //         ...contentItem,
    //         sort: index + 1
    //       }
    //    })
    //     setState("update", {
    //       dataList: Depts
    //     })
    //     dispatchRedux(setDeptsList({
    //       DeptsList: Depts
    //     }))
    //   }
    // }).catch((err: any) => {
    //   console.log("add-permission", err)
    // })

    const res = await dispatchRedux(asyncThunk.getDepts(params) as any);
    const data = res?.payload
    if (data.code === 200) {
      const { content } = data.data;
      const depts = content.map((contentItem: any, index: number) => {
          return {
            ...contentItem,
            sort: index + 1
          }
      })
      dispatchRedux(setDeptsList({
        deptsList: depts
      }))
    } else if (
        data.code === 401 && 
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login")
    }
  }

  useEffect(() => {
    getDepts()
  }, [])

  useEffect(() => {
    if (detail) {
      // 将 detail 中的值赋给表单的初始值
      form.setFieldsValue({
        fdNickName: detail.fdNickName,
        fdUserName: detail.fdUserName,
        fdPassword: detail.fdPassword, 
        fdEmail: detail.fdEmail,
        fdCellphone: detail.fdCellphone,
        fdEducation: detail.fdEducation,
        fdCity: detail.fdCity,
        fdRemark: detail.fdRemark,
        fdId: detail.fdId,
      });
    }

    // 清空 data 的状态为初始值
    return () => {
      setState("update", {
        fdNickName: "",
        fdUserName: "",
        fdPassword: "", 
        fdEmail: "",
        fdCellphone: "",
        fdEducation: "",
        fdCity: "",
        fdRemark: "",
        fdId: "",
      })
    };
  }, [detail, dispatch]);

  return (
    <Modal 
      title="添加用户"
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onClose}
      okText="提交"
    >
      <Form form={form} name="AddUsers" style={{ marginTop: "30px" }} initialValues={detail}>
        <Form.Item 
          name="fdNickName"
          label={(
            <div className={classNames("form-item-label")}>用户昵称</div>
          )}
        >
          <Input placeholder="请输入用户昵称" onChange={(e: any) => onHandleChange("fdNickName", e)} />
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
          <Input placeholder="请输入邮箱" onChange={(e: any) => onHandleChange("fdEmail", e)} />
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
          <Input placeholder="请输入教育背景" onChange={(e: any) => onHandleChange("fdEducation", e)} />
        </Form.Item>
        <Form.Item 
          name="fdCity"
          label={(
            <div className={classNames("form-item-label")}>城市</div>
          )} 
        >
          <Input placeholder="请输入城市" onChange={(e: any) => onHandleChange("fdCity", e)} />
        </Form.Item>
        <Form.Item 
          name="fdId"
          label={(
            <div className={classNames("form-item-label")}>城市</div>
          )} 
        >
          <Input placeholder="请输入城市" onChange={(e: any) => onHandleChange("fdId", e)} />
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