import React from 'react'
import { NextPage } from 'next'
import SearchLayout from '../../../../../components/searchLayout'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Button, Tag, Modal, message } from "antd";
import classnames from 'classnames/bind';
import style from './index.module.scss';
const classNames = classnames.bind(style);
const { confirm } = Modal;

const initialState = {
  username: "", // 用户名
  group: "", // 组织
  page: 1,
  pageSize: 10,
  total: 0
}

const data = [
  {
    key: "leon",
    sort: 1,
    username: "leon",
    group: "xxxx",
    createAt: "xxxx-xx-xx"
  },
  {
    key: "lucky",
    sort: 2,
    username: "lucky",
    group: "xxxx",
    createAt: "xxxx-xx-xx"
  },
  {
    key: "lucy",
    sort: 3,
    username: "lucy",
    group: "xxxx",
    createAt: "xxxx-xx-xx"
  },
  {
    key: "king",
    sort: 4,
    username: "king",
    group: "xxxx",
    createAt: "xxxx-xx-xx"
  },
  {
    key: "jacky",
    sort: 5,
    username: "jacky",
    group: "xxxx",
    createAt: "xxxx-xx-xx"
  },
  {
    key: "lemon",
    sort: 6,
    username: "lemon",
    group: "xxxx",
    createAt: "xxxx-xx-xx"
  }
]

const SearchDemo: NextPage = () => {
  const [state, setState] = useState<any>(initialState)
  const [dataList, setDataList] = useState(data)

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

   // 删除数据的函数
  const handleDelete = (record: any) => {
    // 弹出确认框，确保用户确认删除操作
    confirm({
      title: "确认删除",
      icon: <ExclamationCircleFilled />,
      content: `是否确定删除用户 ${record.username}？`,
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
    name: 'demos-form',
    layout: 'inline',
    items: [
      {
        type: 'input',
        key: 'username',
        value: state.username,
        label: '用户名',
        name: 'username',
        placeholder: '请输入用户名',
        callback: (e: any) => {
          setState({ ...state, username: e.target.value })
        }
      },
      {
        type: 'input',
        key: 'group',
        value: state.group,
        label: '组织名称',
        name: 'group',
        placeholder: '请输入组织名称',
        callback: (e: any) => {
          setState({ ...state, group: e.target.value })
        }
      }
    ],
    customElements: () => (
      <section>
        <Button className={classNames("btn-action")} onClick={() => console.log("search")} type='primary'>查询</Button>
        <Button className={classNames("btn-action")} onClick={() => console.log("add")}>添加</Button>
      </section>
    )
  }
  
  const tabelObj = {
    columns: [
      { title: "序号", dataIndex: "sort", key: "sort" },
      { title: "用户名", dataIndex: "username", key: "username" },
      { title: "组织名称", dataIndex: "group", key: "group" },
      { title: "创建时间", dataIndex: "createAt", key: "createAt" },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        render: (_: any, record: any) => {
          return (
            <>
              <Button className={classNames("btn-action")} onClick={() => handleDelete(record)}>编辑</Button>
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
    customElements: () => {
      return (
        <>
          <Button className={classNames("btn-action")}>批量上传</Button>
          <Button className={classNames("btn-action")}>下载</Button>
        </>
      )
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
    </div>
  )
}

export default SearchDemo