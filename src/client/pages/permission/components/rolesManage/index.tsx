import { NextPage } from 'next'
import SearchLayout from '../../../../components/searchLayout/'
import { ExclamationCircleFilled } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/router';
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
import AddRoles from './components/addRoles';

const initialState = {
  req: {
    fdRoleName: "", // 角色名称
    description: "", // 组织
    page: 1,
    pageSize: 10,
  },
  dataList: [], // 角色列表
  detail: {}
}

const RolesManage: NextPage = () => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { req, dataList } = data
  const { page, pageSize, fdRoleName } = req
  const [showAddModal, setShowAddModal] = useState(false)

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
  const setState = useCallback((type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  }, [dispatch]);

  const onSearch = () => {
    getRoles(req)
  };


  const onChangePagination = (page: number, pageSize: number) => {
    // 更新数据列表
    console.log("page")
    // updateDataList(page, pageSize);
  }

  // 新增弹窗
  const onShowAddModal = () => {
    setShowAddModal(true)
  }

  const onHideAddModal = () => {
    getRoles()
    setShowAddModal(false)
  }

   // 删除数据的函数
  const handleDelete = (record: any) => {
    // 弹出确认框，确保用户确认删除操作
    confirm({
      title: "确认删除",
      icon: <ExclamationCircleFilled />,
      content: (
        <div>
          是否确定删除角色
          <span style={{ color: "red" }}>{record.fdRoleName}</span>
          ？
        </div>
      ),
      onOk() {
        deleteRoles(record?.fdId)
      },
      onCancel() {
        // 用户取消删除操作
        message.info("取消删除");
      }
    });
  }

  /**
   * @description 角色管理 - 删除角色
   */
  const deleteRoles = async (fdId: string) => {
    const params = {
      fdId: fdId
    }

    const res = await dispatchRedux(asyncThunk.deleteRoles(params) as any);
    const data = res?.payload
    if (data.code === 200) {
      getRoles()
      message.success("删除成功")
    }
  }

  /**
   * 权限管理 - 获取角色列表
   */
  const getRoles = async (req?: any) => {
    const params = {
      page: 1,
      pageSize: 20,
      ...req
    }

    const res = await dispatchRedux(asyncThunk.getRoles(params) as any);
    const data = res?.payload
    if (data.code === 200) {
      const { content } = data.data;
      const roles = content.map((contentItem: any, index: number) => {
          return {
            ...contentItem,
            sort: index + 1
          }
      })
      setState("update", {
        dataList: roles
      })
      dispatchRedux(setRolesList({
        rolesList: roles
      }))
    } else if (
        data.code === 401 && 
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login")
    }
  }

  const formObj = {
    name: 'role-list',
    layout: 'inline',
    items: [
      {
        type: 'input',
        key: 'role',
        value: fdRoleName,
        label: '角色名称',
        name: 'role',
        placeholder: '请输入角色名称',
        callback: (e: any) => {
          setState("update", {
            fdRoleName: e.target.value.trim()
          })
        }
      },
    ],
    customElements: () => (
      <section>
        <Button className={classNames("btn-action")} onClick={() => onSearch()} type='primary'>查询</Button>
        <Button className={classNames("btn-action")} onClick={() => onShowAddModal()}>添加</Button>
      </section>
    )
  }
  
  const tabelObj = {
    columns: [
      { title: "序号", dataIndex: "sort", key: "sort" },
      { title: "角色名称", dataIndex: "fdRoleName", key: "fdRoleName" },
      { title: "描述", dataIndex: "fdRemark", key: "fdRemark" },
      { 
        title: "状态", 
        dataIndex: "fdStatus", 
        key: "fdStatus",
        render: (_: any, record: any) => {
          return (
            <span>{record?.fdStatus === 1 ? "启用" : "禁用"} </span>
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
              {/* <Button className={classNames("btn-action")} onClick={() => onShowUpdateModal(record)}>编辑</Button> */}
              <Button className={classNames("btn-action")} onClick={() => handleDelete(record)}>删除</Button>
            </>
          )
        }
      }
    ],
    datasource: dataList,
    total: dataList.length,
    pagination: {
      page: page,
      pageSize: pageSize,
      total: dataList.length
    },
    onChangePage: (page: number, pageSize: number) => onChangePagination(page, pageSize)
  }

  useEffect(() => {
    getRoles()
  }, [])

  return (
    <div>
      <section className={classNames("container")}>
        <div className={classNames("container-content")}>
          <SearchLayout formObj={formObj} tabelObj={tabelObj} />
        </div>
      </section>
      <AddRoles open={showAddModal} onCancel={() => onHideAddModal()}/>
    </div>
  )
}

export default RolesManage
