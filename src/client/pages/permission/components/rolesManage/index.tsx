import React from 'react'
import { NextPage } from 'next'
import SearchLayout from '../../../../components/searchLayout/'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Button, Tag, Modal, message } from "antd";
import classnames from 'classnames/bind';
import style from './index.module.scss';
const classNames = classnames.bind(style);
const { confirm } = Modal;

/** components */
import AddRoles from './components/addRoles';

const initialState = {
  role: "", // 用户名
  description: "", // 组织
  page: 1,
  pageSize: 10,
  total: 0
}

const RolesManage: NextPage = () => {
  const [state, setState] = useState<any>(initialState)
  const [dataList, setDataList] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const rolesList = useSelector((state: any) => state.permission.rolesList)

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
    setShowAddModal(false)
  }

   // 删除数据的函数
  const handleDelete = (record: any) => {
    // 弹出确认框，确保用户确认删除操作
    confirm({
      title: "确认删除",
      icon: <ExclamationCircleFilled />,
      content: `是否确定删除用户 ${record.role}？`,
      onOk() {
        // 创建新的数据列表，不包含要删除的数据项
        const updatedDataList = dataList.filter((item: any) => item.key !== record.key);
        // 更新数据列表状态
        setDataList(updatedDataList);
        // 在这里可以执行删除请求到服务器，根据情况来更新服务器数据
        message.success("删除成功"); // 可以使用 Ant Design 的消息提示
      },
      onCancel() {
        // 用户取消删除操作
        message.info("取消删除");
      }
    });
  }

  const formObj = {
    name: 'role-list',
    layout: 'inline',
    items: [
      {
        type: 'input',
        key: 'role',
        value: state.role,
        label: '角色名称',
        name: 'role',
        placeholder: '请输入用户名',
        callback: (e: any) => {
          setState({ ...state, role: e.target.value })
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
      { title: "角色名称", dataIndex: "roleName", key: "roleName" },
      { title: "描述", dataIndex: "remark", key: "remark" },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        render: (_: any, record: any) => {
          return (
            <>
              <Button className={classNames("btn-action")} onClick={() => handleDelete(record)}>删除</Button>
            </>
          )
        }
      }
    ],
    datasource: dataList,
    total: dataList.length,
    pagination: {
      page: state.page,
      pageSize: state.pageSize,
      total: dataList.length
    },
    onChangePage: (page: number, pageSize: number) => onChangePagination(page, pageSize)
  }

  useEffect(() => {
    const datalist: any = rolesList.map((role, index) => ({
      sort: index + 1,
      ...role
    }));
    setDataList(datalist)
  }, [rolesList])

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
