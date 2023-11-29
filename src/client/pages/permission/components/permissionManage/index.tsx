import React from 'react'
import { NextPage } from 'next'
import SearchLayout from '../../../../components/searchLayout/'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Button, Tag, Modal, message } from "antd";
import classnames from 'classnames/bind';
import style from './index.module.scss';
const classNames = classnames.bind(style);
const { confirm } = Modal;

/** components */
import AddPermission from './addPermission';

const initialState = {
  role: "", // 用户名
  description: "", // 组织
  page: 1,
  pageSize: 10,
  total: 0
}

const data = [
  {
    key: "userAdd",
    sort: 1,
    permission: "用户新增权限",
    description: "拥有此权限，可以新增用户数据",
  },
  {
    key: "userCheck",
    sort: 2,
    permission: "用户查看权限",
    description: "拥有此权限，可以查看用户数据",
  },
  {
    key: "userDelete",
    sort: 3,
    permission: "用户删除权限",
    description: "拥有此权限，可以删除用户数据",
  },
  {
    key: "userEdit",
    sort: 4,
    permission: "用户编辑权限",
    description: "拥有此权限，可以编辑用户数据",
  },
  {
    key: "appConfig",
    sort: 5,
    permission: "应用维护权限",
    description: "拥有此权限，可以对应用进行新增，编辑，查看，删除",
  },
  {
    key: "tabConfig",
    sort: 5,
    permission: "顶部菜单维护权限",
    description: "拥有此权限，可以对顶部菜单进行新增",
  },
  {
    key: "menuConfig",
    sort: 6,
    permission: "左侧菜单维护权限",
    description: "拥有此权限，可以对顶部菜单进行新增",
  },
]

const PermissionManage: NextPage = () => {
  const [state, setState] = useState<any>(initialState)
  const [dataList, setDataList] = useState(data)
  const [showAddModal, setShowAddModal] = useState(false)

  // 更新数据列表的函数，根据当前页码和每页显示的条数来截取数据
  const updateDataList = (page: number, pageSize: number) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const updatedData = data.slice(startIndex, endIndex);
    setState({...state, page: page})
    setDataList(updatedData);
  }

  const onChangePagination = (page: number, pageSize: number) => {
    // 更新数据列表
    updateDataList(page, pageSize);
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
        const updatedDataList = dataList.filter(item => item.key !== record.key);
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
    name: 'review-list',
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
      { title: "权限名称", dataIndex: "permission", key: "permission" },
      { title: "描述", dataIndex: "description", key: "description" },
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
    total: data.length,
    api: 'db/appid',
    pagination: {
      page: state.page,
      pageSize: state.pageSize,
      total: data.length
    },
    onChangePage: (page: number, pageSize: number) => onChangePagination(page, pageSize)
  }

  return (
    <div>
      <section className={classNames("container")}>
        <div className={classNames("container-content")}>
          <SearchLayout formObj={formObj} tabelObj={tabelObj} />
        </div>
      </section>
      <AddPermission open={showAddModal} onCancel={() => onHideAddModal()}/>
    </div>
  )
}

export default PermissionManage