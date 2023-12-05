import { NextPage } from 'next'
import SearchLayout from '../../../../components/searchLayout/'
import { ExclamationCircleFilled } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import asyncThunk from "../../../../store/asyncThunk";
import { setRolesList, setPermissionList } from "../../../../store/modules/permissionSlice";
import { Button, Tag, Modal, message } from "antd";
import { reducer } from "../../../../utils/reducer";
import classnames from 'classnames/bind';
import style from './index.module.scss';
const classNames = classnames.bind(style);
const { confirm } = Modal;

/** components */
import AddModules from './components/addModules';

const initialState = {
  fdName: "", // 组织名称
  dataList: [], // 组织列表
  page: 1,
  pageSize: 10,
  total: 0
}

const ModulesManage: NextPage = () => {
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { page, pageSize, dataList, fdName } = data
  const [showAddModal, setShowAddModal] = useState(false)
  const permissionList = useSelector((state: any) => state.permission.permissionList)

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

   // 删除数据的函数
  const handleDelete = (record: any) => {
    // 弹出确认框，确保用户确认删除操作
    confirm({
      title: "确认删除",
      icon: <ExclamationCircleFilled />,
      content: `是否确定删除用户 ${record.permission}？`,
      onOk() {
        // 创建新的数据列表，不包含要删除的数据项
        const updatedDataList = dataList.filter((item: any) => item.key !== record.key);
        // 更新数据列表状态
        // setDataList(updatedDataList);
        // 在这里可以执行删除请求到服务器，根据情况来更新服务器数据
        message.success("删除成功"); // 可以使用 Ant Design 的消息提示
      },
      onCancel() {
        // 用户取消删除操作
        message.info("取消删除");
      }
    });
  }

  /**
   * 权限管理 - 获取权限列表
   */
  const getModules = async () => {
    const params = {
      page: 1,
      pageSize: 20
    }

    const res = await dispatchRedux(asyncThunk.getModules(params) as any);
    const data = res?.payload
    if (data.code === 200) {
      console.log("permission-11111", data)
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
    }
  }

  const formObj = {
    name: 'permission-list',
    layout: 'inline',
    items: [
      {
        type: 'input',
        key: 'fdName',
        value: fdName,
        label: '权限名称',
        name: 'fdName',
        placeholder: '请输入模块名称',
        callback: (e: any) => {
          setState("update", {
            fdName: e.target.value.trim()
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
      { title: "模块名称", dataIndex: "fdName", key: "fdName" },
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
    getModules()
  }, [])

  return (
    <div>
      <section className={classNames("container")}>
        <div className={classNames("container-content")}>
          <SearchLayout formObj={formObj} tabelObj={tabelObj} />
        </div>
      </section>
      <AddModules open={showAddModal} onCancel={() => onHideAddModal()}/>
    </div>
  )
}

export default ModulesManage