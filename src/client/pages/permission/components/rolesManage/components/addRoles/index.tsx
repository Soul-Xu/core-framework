/**
 * 新增角色
 */
/** external library */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, message, Row, Col, Checkbox, Divider } from "antd"
import { useRouter } from "next/router";

/** components */
import OrganizationTree from "../../../../../../components/organizationSelect";
import asyncThunk from "../../../../../../store/asyncThunk";

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

const AddRoles = (props: Props) => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const { open, onCancel } = props
  const curApp = useSelector((state: any) => state.apps.curApp)

  /**
   * @description 新增角色确认逻辑
   * @param
   */
  const onOk = async () => {
    console.log("新建tab确认逻辑", curApp)

    const params = {
      fdRoleName: "事件管理普通用户",
      fdRemark: "事件管理普通用户",
      fdUserList: [                   //用户列表
          {
              "fdId": "211",
              "fdName": "admin"
          }
      ],
      fdPermissionList: [            //权限列表
          {
              "fdName": "系统管理",
              "fdId": "authapi1"
          }
      ]
    }

    const res = await dispatchRedux(asyncThunk.addRoles(params) as any)
    console.log("addRoles", res)
    const data = res?.payload
    if (data.code === 200) {
      message.success("添加角色成功")
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
    <section>
      <Modal 
        title="角色授权定义"
        style={{ textAlign: "center" }}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        okText="提交"
      >
        <Form name="AddRoles" style={{ marginTop: "30px" }}>
          <Form.Item label="角色组名称" name="fdComponentName">
            <Input placeholder="请输入角色组名称" onChange={() => console.log("请输入角色组名称")} />
          </Form.Item>
          <Form.Item label="角色组成员" name="fdRemark">
            <div style={{ display: "flex" }}>
              <Input style={{ marginRight: "10px" }} placeholder="请选择角色组成员" onChange={() => console.log("请选择角色组成员")} />
              <OrganizationTree />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  )
}

export default AddRoles