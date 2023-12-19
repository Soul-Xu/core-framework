import React, { useCallback } from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import { NextPage } from 'next'
import SearchLayout from '../../../../../components/searchLayout'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Button, Tag, Modal, message } from "antd";
import classnames from 'classnames/bind';
import style from './index.module.scss';
const classNames = classnames.bind(style);
const { confirm } = Modal;

/** utils */
import { reducer } from '../../../../../utils/reducer';

/** components */
import AddModal from './components/addModal';
import UpdateModal from './components/updateModal'
import DetailModal from './components/detailModal';

const initialState = {
  req: {
    fdEventName: "",
    fdNo: "",
    fdReportor: "",
    fdHandler: ""
  },
  page: 1,
  pageSize: 10,
  dataList: []
}

const mockData = [
  {
    key: "1",
    sort: 1,
    fdEventName: "运维事故",
    fdNo: "1",
    fdReportor: "张三",
    fdCreateAt: "2023-12-09 18:20:32",
    fdLevel: "四级",
    fdHandler: "李四",
    fdHandleAt: "2023-12-09 18:30:11",
    fdRange: "20分钟",
    fdRemark: "日常普通运维事故"
  },
  {
    key: "2",
    sort: 2,
    fdEventName: "P0运维事故",
    fdNo: "2",
    fdReportor: "赵六",
    fdCreateAt: "2023-12-09 16:20:32",
    fdLevel: "一级",
    fdHandler: "王武",
    fdHandleAt: "2023-12-09 18:22:11",
    fdRange: "122分钟",
    fdRemark: "紧急运维事故"
  },
]

const EventManage: NextPage = () => {
  // const [state, setState] = useState<any>(initialState)
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { page, pageSize, req, dataList } = data
  const { fdEventName, fdNo, fdReportor, fdHandler } = req
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
  const setState = useCallback((type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  }, [dispatch]);

  // 更新数据列表的函数，根据当前页码和每页显示的条数来截取数据
  const updateDataList = (page: number, pageSize: number) => {
    // const startIndex = (page - 1) * pageSize;
    // const endIndex = startIndex + pageSize;
    // const updatedData = data.slice(startIndex, endIndex);
    // // setState({...state, page: page})
    // setDataList(updatedData);
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
    name: 'eventManage-form',
    layout: 'inline',
    items: [
      {
        type: 'input',
        key: 'fdEventName',
        value: fdEventName,
        label: '事件名称',
        name: 'fdEventName',
        placeholder: '请输入事件名称',
        callback: (e: any) => {
          setState("req", {
            fdEventName: e.target.value.trim()
          })
        }
      },
      {
        type: 'input',
        key: 'fdNo',
        value: fdNo,
        label: '事件编号',
        name: 'fdNo',
        placeholder: '请输入事件编号',
        callback: (e: any) => {
          setState("req", {
            fdNo: e.target.value.trim()
          })
        }
      },
      {
        type: 'input',
        key: 'fdReportor',
        value: fdReportor,
        label: '上报人',
        name: 'fdReportor',
        placeholder: '请输入上报人',
        callback: (e: any) => {
          setState("req", {
            fdReportor: e.target.value.trim()
          })
        }
      },
      {
        type: 'input',
        key: 'fdHandler',
        value: fdHandler,
        label: '处理人',
        name: 'fdHandler',
        placeholder: '请输入处理人',
        callback: (e: any) => {
          setState("req", {
            fdHandler: e.target.value.trim()
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
      { 
        title: "事件名称", 
        dataIndex: "fdEventName",
        key: "fdEventName",
        render: (_: any, record: any) => {
          return (
            <>
              <Button type="link" onClick={onShowDetailModal}>{record?.fdEventName}</Button>
            </>
          )
        }
      },
      { title: "事件编号", dataIndex: "fdNo", key: "fdNo" },
      { title: "上报人", dataIndex: "fdReportor", key: "fdReportor" },
      { title: "上报时间", dataIndex: "fdCreateAt", key: "fdCreateAt" },
      { title: "处理人", dataIndex: "fdHandler", key: "fdHandler" },
      { title: "事件级别", dataIndex: "fdLevel", key: "fdLevel" },
      { title: "处理时间", dataIndex: "fdHandleAt", key: "fdHandleAt" },
      { title: "处理所用时间", dataIndex: "fdRange", key: "fdRange" },
      { title: "描述", dataIndex: "fdRemark", key: "fdRemark" },
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

  // 新增弹窗
  const onShowAddModal = () => {
    setShowAddModal(true)
  }

  const onHideAddModal = () => {
    // getPermissions()
    setShowAddModal(false)
  }
  
  // 编辑弹窗
  const onShowUpdateModal = (record: any) => {
    // setState("update", {
    //   detail: record
    // })
    setShowUpdateModal(true)
  }

  const onHideUpdateModal = () => {
    // getPermissions()
    setShowUpdateModal(false)
  }

  // 详情弹窗
  const onShowDetailModal = (record: any) => {
    // setState("update", {
    //   detail: record
    // })
    setShowDetailModal(true)
  }

  const onHideDetailModal = () => {
    // getPermissions()
    setShowDetailModal(false)
  }

  useEffect(() => {
    setState("update", {
      dataList: mockData
    })
  }, [])

  return (
    <div>
      <section className={classNames("container")}>
        <div className={classNames("container-content")}>
          <SearchLayout formObj={formObj} tabelObj={tabelObj} />
        </div>
      </section>
      <AddModal open={showAddModal} onCancel={() => onHideAddModal()} />
      <UpdateModal open={showUpdateModal} onCancel={() => onHideUpdateModal()} />
      <DetailModal open={showDetailModal} onCancel={() => onHideDetailModal()} />
    </div>
  )
}

export default EventManage