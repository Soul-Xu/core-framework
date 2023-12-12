/**
 * 新增角色
 */
/** external library */
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import { Modal, Form, Input, message, Row, Col, Checkbox, Divider, Select } from "antd"
import { useRouter } from "next/router";
import { reducer } from "../../../../../../utils/reducer";

const Textarea = Input

/** components */
import UsersTree from "../usersTree";
import asyncThunk from "../../../../../../store/asyncThunk";
import { setPermissionsList } from "../../../../../../store/modules/permissionsSlice";

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
    fdRoleName: "",
    fdRemark: "",
    fdUserList: [],
    fdPermissionList: []
  },
  permissionsList: [],
  modulesList: [],
  usersList: [],
  treeData: [],
  roles: ""
}

const AddRoles = (props: Props) => {
  const { open, onCancel } = props
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { req, permissionsList, modulesList, usersList, roles } = data
  const { fdRoleName, fdRemark, fdUserList, fdPermissionList } = req
  const permissions = useSelector((state: any) => state.permission.permissionsList)
  const selectUsers = useSelector((state: any) => state.permission.selectUsers)
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
      setState("req", {
        [type]: e.target.value
      })
    }

  /**
   * 将permissions转化成select组件所需数据
   */
  const onHandlePermissions = (items: any) => {
    return items?.map(item => ({
      value: item.fdId,
      label: item.fdApiName
    }));
  }

  /**
   * 将select组件选中的数据转化成接口所需数据
   */
  const onHandleData = (data, idsToFilter) => {
    return data.filter(item => idsToFilter.includes(item.value))
      .map(({ value, label }) => ({ fdId: value, fdName: label }));
  }

  /**
   * @description 新增角色确认逻辑
   * @param
   */
  const onOk = async () => {
    const params = {
      fdRoleName: fdRoleName,
      fdRemark: fdRemark,
      fdUserList: selectUsers,
      fdPermissionList: fdPermissionList
    }

    // await axios.request({
    //   url: `${baseApi}/api-module/add`,
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
    //   console.log("add-module", err)
    // })

    const res = await dispatchRedux(asyncThunk.addRoles(params) as any)
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

  /**
   * @description 获取权限列表
   */
  const getPermissions = async () => {
    const params = {
      page: 1,
      pageSize: 20,
    }

    // await axios.request({
    //   url: `${baseApi}/api-permission/list`,
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
    //     const permissions = content.map((contentItem: any, index: number) => {
    //       return {
    //         ...contentItem,
    //         sort: index + 1
    //       }
    //    })
    //     setState("update", {
    //       dataList: permissions
    //     })
    //     dispatchRedux(setPermissionsList({
    //       permissionsList: permissions
    //     }))
    //   }
    // }).catch((err: any) => {
    //   console.log("add-permission", err)
    // })

    const res = await dispatchRedux(asyncThunk.getPermissions(params) as any);
    const data = res?.payload
    if (data.code === 200) {
      const { content } = data.data;
      const permissions = onHandlePermissions(content)
      setState("update", {
        permissionsList: permissions
      })
      dispatchRedux(setPermissionsList({
        permissionsList: permissions
      }))
    } else if (
        data.code === 401 && 
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login")
    }
  }

  /**
   * select选择器处理函数
   */
  const onHandleSelect = (value: string[]) => {
    const data = onHandleData(permissions, value)
    setState("req", {
      fdPermissionList: data
    })
  }

  useEffect(() => {
    getPermissions()
  }, [])

  useEffect(() => {
    if (selectUsers.length > 0) {
      const res = selectUsers.map(user => user.fdName).join(', ');
      setState("update", {
        roles: res
      })
    }
  }, [selectUsers])

  return (
    <section>
      <Modal 
        title="添加角色"
        style={{ textAlign: "center" }}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        okText="提交"
      >
        <Form name="AddRoles" style={{ marginTop: "30px" }}>
          <Form.Item label="角色组名称" name="fdRoleName">
            <Input placeholder="请输入角色组名称" onChange={(e: any) => onHandleChange("fdRoleName", e)} />
          </Form.Item>
          <Form.Item label="角色组描述" name="fdRemark">
            <Textarea placeholder="请输入角色组描述" onChange={(e: any) => onHandleChange("fdRemark", e)} />
          </Form.Item>
          <Form.Item label="角色组成员" name="fdUserList">
            <div style={{ display: "flex" }}>
              <Input style={{ marginRight: "10px" }} value={roles} disabled  placeholder="请选择角色组成员" />
              <UsersTree />
            </div>
          </Form.Item>
          <Form.Item label="角色组权限" name="fdPermissionList">
            <Select 
              mode="multiple"
              allowClear
              options={permissionsList}
              onChange={onHandleSelect}
            />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  )
}

export default AddRoles

const users = [
  {
    "fdId": "110",
    "fdUserId": "6",
    "fdUserName": "user3@126.com",
    "fdNickName": "user3",
    "fdPassword": "ae2a2f18656334fab7d3ea71c6bc55ce",
    "fdEmail": "user3@126.com",
    "fdCellphone": "",
    "fdGender": 0,
    "fdCity": null,
    "fdEducation": null,
    "fdCreateTime": "2023-07-18 16:20:58",
    "fdAvatarURL": "",
    "fdSalt": "ec764e",
    "fdStatus": 1,
    "fdRemark": "",
    "fdParent": null,
    "fdImportInfo": null
  },
  {
      "fdId": "112",
      "fdUserId": "5",
      "fdUserName": "user2@126.com",
      "fdNickName": "user2",
      "fdPassword": "4f9c512e8ca73e1285a5617fb843e609",
      "fdEmail": "user2@126.com",
      "fdCellphone": "",
      "fdGender": 0,
      "fdCity": null,
      "fdEducation": null,
      "fdCreateTime": "2023-07-18 15:10:22",
      "fdAvatarURL": "",
      "fdSalt": "558d9a",
      "fdStatus": 1,
      "fdRemark": "",
      "fdParent": null,
      "fdImportInfo": null
  }
]

const userSelect = [
  "110", "112"
]

const user2 = [
  {
    "fdId": "110",
    "fdName": "user3@126.com"
  },
  {
    "fdId": "112",
    "fdName": "user3@126.com"
  },
]

const res = "user3@126.com, user3@126.com"