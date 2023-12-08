import { NextPage } from 'next'
import SearchLayout from '../../../../components/searchLayout/'
import { ExclamationCircleFilled } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import asyncThunk from "../../../../store/asyncThunk";
import { setRolesList, setPermissionsList } from "../../../../store/modules/permissionSlice";
import { Button, Tag, Modal, message } from "antd";
import { reducer } from "../../../../utils/reducer";
import classnames from 'classnames/bind';
import style from './index.module.scss';
const classNames = classnames.bind(style);
const { confirm } = Modal;

/** components */
import AddPermissions from './components/addPermissions';
import UpdatePermissions from './components/updatePermissions';

const initialState = {
  req: {
    fdApiName: "", // 用户名
    description: "", // 组织
    page: 1,
    pageSize: 10,
  },
  dataList: [], // 权限列表
  detail: {}
}

const PermissionManage: NextPage = () => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { req, dataList, detail } = data
  const { page, pageSize, fdApiName } = req
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
    const setState = useCallback((type: string, val: Record<string, any>) => {
      dispatch({ type, payload: val });
    }, [dispatch]);

  const onChangePagination = (page: number, pageSize: number) => {
    // 更新数据列表
    console.log("onChangePagination")
    // updateDataList(page, pageSize);
  }

  // 新增弹窗
  const onShowAddModal = () => {
    setShowAddModal(true)
  }

  const onHideAddModal = () => {
    setShowAddModal(false)
  }

  // 编辑弹窗
  const onShowUpdateModal = (record: any) => {
    setState("update", {
      detail: record
    })
    setShowUpdateModal(true)
  }

  const onHideUpdateModal = () => {
    getPermissions()
    setShowUpdateModal(false)
  }

   // 删除数据的函数
  const handleDelete = (record: any) => {
    // 弹出确认框，确保用户确认删除操作
    confirm({
      title: "确认删除",
      icon: <ExclamationCircleFilled />,
      content: (
        <div>
          是否确定删除权限
          <span style={{ color: "red" }}>{record.fdApiName}</span>
          ？
        </div>
      ),
      onOk() {
        deleteModules(record?.fdId)
      },
      onCancel() {
        // 用户取消删除操作
        message.info("取消删除");
      }
    });
  }

  /**
   * @description 模块管理 - 删除模块
   */
   const deleteModules = async (fdId: string) => {
    const params = {
      fdId: fdId
    }

    const res = await dispatchRedux(asyncThunk.deleteModules(params) as any);
    const data = res?.payload
    if (data.code === 200) {
      getPermissions()
      message.success("删除成功")
    }
  }

  /**
   * 权限管理 - 获取权限列表
   */
  const getPermissions = async (req?: any) => {
    const params = {
      page: 1,
      pageSize: 20,
      ...req
    }

    const res = await dispatchRedux(asyncThunk.getPermissions(params) as any);
    const data = res?.payload
    if (data.code === 200) {
      const { content } = data.data;
      const permissions = content.map((contentItem: any, index: number) => {
        return {
          ...contentItem,
          sort: index + 1
        }
     })
      setState("update", {
        dataList: permissions
      })
      dispatchRedux(setRolesList({
        permissionsList: permissions
      }))
    } else if (
        data.code === 401 && 
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login")
    }
  }

  const formObj = {
    name: 'permission-list',
    layout: 'inline',
    items: [
      {
        type: 'input',
        key: 'fdApiName',
        value: fdApiName,
        label: '权限名称',
        name: 'fdApiName',
        placeholder: '请输入权限名称',
        callback: (e: any) => {
          setState("req", {
            fdApiName: e.target.value.trim()
          })
        }
      },
    ],
    customElements: () => (
      <section>
        <Button className={classNames("btn-action")} onClick={() => console.log("search")} type='primary'>查询</Button>
        <Button className={classNames("btn-action")} onClick={() => onShowAddModal()}>添加</Button>
      </section>
    )
  }
  
  const tabelObj = {
    columns: [
      { title: "序号", dataIndex: "sort", key: "sort" },
      { title: "权限名称", dataIndex: "fdApiName", key: "fdApiName" },
      { 
        title: "描述", 
        dataIndex: "fdRemark", 
        key: "fdRemark",
        render: (_: any, record: any) => {
          return (
            <div style={{ width: "650px" }}>{record?.fdRemark}</div>
          ) 
        }
      },
      { title: "所属模块", dataIndex: "fdModuleName", key: "fdModuleName" },
      { 
        title: "系统权限", 
        dataIndex: "fdIsSystem", 
        key: "fdIsSystem",
        render: (_: any, record: any) => {
          return (
            <div>{record?.fdModuleName ? "是" : "否"}</div>
          ) 
        }
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        render: (_: any, record: any) => {
          return (
            <>
              <Button className={classNames("btn-action")} onClick={() => onShowUpdateModal(record)}>编辑</Button>
              <Button className={classNames("btn-action")} onClick={() => handleDelete(record)}>删除</Button>
            </>
          )
        }
      }
    ],
    datasource: dataList,
    total: dataList.length,
    api: 'db/appid',
    pagination: {
      page: page,
      pageSize: pageSize,
      total: dataList.length
    },
    onChangePage: (page: number, pageSize: number) => onChangePagination(page, pageSize)
  }

  useEffect(() => {
    getPermissions()
  }, [])

  return (
    <div>
      <section className={classNames("container")}>
        <div className={classNames("container-content")}>
          <SearchLayout formObj={formObj} tabelObj={tabelObj} />
        </div>
      </section>
      <AddPermissions open={showAddModal} onCancel={() => onHideAddModal()}/>
      <UpdatePermissions open={showUpdateModal} detail={detail} onCancel={() => onHideUpdateModal()}/>
    </div>
  )
}

export default PermissionManage