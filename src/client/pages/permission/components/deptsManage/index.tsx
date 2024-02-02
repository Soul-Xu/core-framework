import { NextPage } from 'next'
import SearchLayout from '../../../../components/searchLayout/'
import { ExclamationCircleFilled } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import asyncThunk from "../../../../store/asyncThunk";
import { setDeptsList } from "../../../../store/modules/permissionsSlice";
import { Button, Tag, Modal, message } from "antd";
import { reducer } from "../../../../utils/reducer";

const { confirm } = Modal;

/** components */
import AddDepts from './components/addDepts';
import UpdateDepts from './components/updateDepts'

/** css */
import classnames from 'classnames/bind';
import style from './index.module.scss';
const classNames = classnames.bind(style);

/** http */
import axios from 'axios';
import { baseApiOrg } from "../../../../config"

const initialState = {
  req: {
    fdName: "",
    fdNo: "",    
    fdCellphone: "",
  },
  page: 1,
  pageSize: 20,
  dataList: [], // 部门列表
  detail: {}, // 部门详情
}

const DeptsManage: NextPage = () => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { page, pageSize, dataList, detail, req } = data
  const { fdName, fdNo, fdCellphone } = req
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const token = useSelector((state: any) => state.common.token)

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
    const setState = useCallback((type: string, val: Record<string, any>) => {
      dispatch({ type, payload: val });
    }, [dispatch]);

  const onSearch = () => {
    dispatchRedux(getDepts(req) as any);
  };

  const onChangePagination = (page: number, pageSize: number) => {
    // 更新数据列表
    console.log("onChangePagination")
  }

  // 新增弹窗
  const onShowAddModal = () => {
    setShowAddModal(true)
  }

  const onHideAddModal = () => {
    getDepts()
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
    getDepts()
    setShowUpdateModal(false)
  }

  /**
   * @description 编辑数据的函数
   * @param record 
   */

  /**
   * @description 删除数据的函数
   * @param record 
   */
  const handleDelete = (record: any) => {
    // 弹出确认框，确保部门确认删除操作
    confirm({
      title: "确认删除",
      icon: <ExclamationCircleFilled />,
      content: (
        <div>
          是否确定删除部门
          <span style={{ color: "red" }}>{record.fdName}</span>
          ？
        </div>
      ),
      onOk() {
        deleteDepts(record?.fdId)
      },
      onCancel() {
        // 用户取消删除操作
        message.info("取消删除");
      }
    });
  }

  /**
   * @description 部门管理 - 删除部门
   */
  const deleteDepts = async (fdId: string) => {
    const params = {
      fdId: fdId
    }

    // await axios.request({
    //   url: `${baseApiOrg}/dept/delete`,
    //   method: "post",
    //   data: params,
    //   withCredentials: true,  
    //   headers: {
    //     'Content-Type': 'application/json', // 设置为 application/json
    //     'X-AUTH-TOKEN': token
    //   },
    // }).then((res: any) => {
    //   const data = res.data
    //   if (data.code === 200) {
    //     getDepts()
    //     message.success("删除成功")
    //   }
    // }).catch((err: any) => {
    //   console.log("axios-app-err", err)
    // })
    const res = await dispatchRedux(asyncThunk.deleteDepts(params) as any);
    const data = res?.payload
    if (data.code === 200) {
      getDepts()
      message.success("删除成功")
    }  else if (
      data.code === 401 && 
      data.success === false &&
      data.message === "请先登录后再操作!") {
    router.push("/login")
    }
  }

  /**
   * @description 部门管理 - 获取部门列表
   */
  const getDepts = async (req?: any) => {
    const params = {
      page: 1,
      pageSize: 20,
      conditions: {
        ...req
      }
    }

    // await axios.request({
    //   url: `${baseApiOrg}/dept/list`,
    //   method: "post",
    //   data: params,
    //   withCredentials: true,  
    //   headers: {
    //     'Content-Type': 'application/json', // 设置为 application/json
    //     'X-AUTH-TOKEN': token
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
      const Depts = content.map((contentItem: any, index: number) => {
        return {
          ...contentItem,
          sort: index + 1
        }
     })
      setState("update", {
        dataList: Depts
      })
      dispatchRedux(setDeptsList({
        DeptsList: Depts
      }))
    }  else if (
      data.code === 401 && 
      data.success === false &&
      data.message === "请先登录后再操作!") {
    router.push("/login")
  }
  }

  const formObj = {
    name: 'depts-form',
    layout: 'inline',
    items: [
      {
        type: 'input',
        key: 'fdName',
        value: fdName,
        label: '部门名称',
        name: 'fdName',
        placeholder: '请输入部门名称',
        callback: (e: any) => {
          setState("req", {
            fdName: e.target.value.trim()
          })
        }
      },
      {
        type: 'input',
        key: 'fdNo',
        value: fdNo,
        label: '部门编号',
        name: 'fdNo',
        placeholder: '请输入部门编号',
        callback: (e: any) => {
          setState("req", {
            fdNo: e.target.value.trim()
          })
        }
      },
      {
        type: 'input',
        key: 'fdCellphone',
        value: fdCellphone,
        label: '电话号码',
        name: 'fdCellphone',
        placeholder: '请输入电话号码',
        callback: (e: any) => {
          setState("req", {
            fdCellphone: e.target.value.trim()
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
      // { title: "部门ID", dataIndex: "fdId", key: "fdId" },
      { title: "部门名称", dataIndex: "fdName", key: "fdName" },
      { title: "部门编号", dataIndex: "fdNo", key: "fdNo" },
      { title: "联系方式", dataIndex: "fdCellphone", key: "fdCellphone" },
      { 
        title: "上级部门", 
        dataIndex: "fdParent", 
        key: "fdParent",
        render: (_: any, record: any) => {
          return (
            <div>{record?.fdParent ? record?.fdParent?.fdName : "无"}</div>
          ) 
        }
      },
      { 
        title: "备注描述", 
        dataIndex: "fdRemark", 
        key: "fdRemark",
        render: (_: any, record: any) => {
          return (
            <div style={{ width: "350px" }}>{record?.fdRemark}</div>
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
    rowKey: "fdId",
    api: 'db/appid',
    pagination: {
      page: page,
      pageSize: pageSize,
      total: dataList.length
    },
    onChangePage: (page: number, pageSize: number) => onChangePagination(page, pageSize)
  }

  useEffect(() => {
    getDepts()
  }, [])

  return (
    <div>
      <section className={classNames("container")}>
        <div className={classNames("container-content")}>
          <SearchLayout formObj={formObj} tabelObj={tabelObj} />
        </div>
      </section>
      <AddDepts open={showAddModal} onCancel={() => onHideAddModal()}/>
      <UpdateDepts open={showUpdateModal} detail={detail} onCancel={() => onHideUpdateModal()}/>
    </div>
  )
}

export default DeptsManage