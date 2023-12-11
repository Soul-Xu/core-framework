import { NextPage } from 'next'
import SearchLayout from '../../../../components/searchLayout/'
import { ExclamationCircleFilled } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import asyncThunk from "../../../../store/asyncThunk";
import { setModulesList, setPermissionsList } from "../../../../store/modules/permissionSlice";
import { Button, Tag, Modal, message } from "antd";
import { reducer } from "../../../../utils/reducer";
import classnames from 'classnames/bind';
import style from './index.module.scss';
const classNames = classnames.bind(style);
const { confirm } = Modal;

/** components */
import AddModules from './components/addModules';
import UpdateModules from './components/updateModules';

/** http */
import axios from 'axios';
import { baseApi } from "../../../../config"

const initialState = {
  req: {
    fdName: "", // 组织名称
    page: 1,
    pageSize: 10,
  },
  dataList: [],
  detail: {}
}

const ModulesManage: NextPage = () => {
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const token = useSelector((state: any) => state.common.token)
  const { req, dataList, detail } = data
  const { page, pageSize, fdName } = req
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

  const onSearch = () => {
    getModules(req)
  };

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
    getModules()
    setShowUpdateModal(false)
  }

   // 删除数据的函数
  const handleDelete = (record: any) => {
    // 弹出确认框，确保模块确认删除操作
    confirm({
      title: "确认删除",
      icon: <ExclamationCircleFilled />,
      content: (
        <div>
          是否确定删除模块
          <span style={{ color: "red" }}>{record.fdName}</span>
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

    await axios.request({
      url: `${baseApi}/api-module/delete`,
      method: "post",
      data: params,
      withCredentials: true,  
      headers: {
        'Content-Type': 'application/json', // 设置为 application/json
        'ltpatoken': token
      },
    }).then((res: any) => {
      const data = res.data
      if (data.code === 200) {
        getModules()
        message.success("删除成功")
      }
    }).catch((err: any) => {
      console.log("axios-app-err", err)
    })
    // const res = await dispatchRedux(asyncThunk.deleteModules(params) as any);
    // const data = res?.payload
    // if (data.code === 200) {
    //   getModules()
    //   message.success("删除成功")
    // }
  }

  /**
   * @description 模块管理 - 获取模块列表
   */
  const getModules = async (req?: any) => {
    const params = {
      page: 1,
      pageSize: 20,
      ...req
    }

    await axios.request({
      url: `${baseApi}/api-module/list`,
      method: "post",
      data: params,
      withCredentials: true,  
      headers: {
        'Content-Type': 'application/json', // 设置为 application/json
        'ltpatoken': token
      },
    }).then((res: any) => {
      const data = res.data
      if (data.code === 200) {
        const { content } = data.data;
        const modules = content.map((contentItem: any, index: number) => {
          return {
            ...contentItem,
            sort: index + 1
          }
        })
        setState("update", {
          dataList: modules
        })
        dispatchRedux(setModulesList({
          modulesList: modules
        }))
      }
    }).catch((err: any) => {
      console.log("update-module", err)
    })

    // const res = await dispatchRedux(asyncThunk.getModules(params) as any);
    // const data = res?.payload
    // if (data.code === 200) {
    //   const { content } = data.data;
    //   const modules = content.map((contentItem: any, index: number) => {
    //     return {
    //       ...contentItem,
    //       sort: index + 1
    //     }
    //   })
    //   setState("update", {
    //     dataList: modules
    //   })
    //   dispatchRedux(setModulesList({
    //     modulesList: modules
    //   }))
    // }
  }

  const formObj = {
    name: 'modules-form',
    layout: 'inline',
    items: [
      {
        type: 'input',
        key: 'fdName',
        value: fdName,
        label: '模块名称',
        name: 'fdName',
        placeholder: '请输入模块名称',
        callback: (e: any) => {
          setState("req", {
            fdName: e.target.value.trim()
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
      <UpdateModules open={showUpdateModal} detail={detail} onCancel={() => onHideUpdateModal()}/>
    </div>
  )
}

export default ModulesManage