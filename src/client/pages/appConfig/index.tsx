/**
 * 应用配置 - 子应用
 */
/** external library */
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useImmerReducer } from 'use-immer';
import { reducer } from '../../utils/reducer';
import { Button, Modal, message } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
const confirm = Modal.confirm
/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);
/** constants */
import { subApps } from './constants';
/** components */
import AppContainer from '../../layout/appContainer';
import SearchLayout from '../../components/searchLayout';
import AddSubApps from './components/addSubApps';
import UpdateSubApps from './components/updateSubApps';

const initialState = {
  req: {
    fdAppName: "",
  },
  page: 1,
  pageSize: 20,
  dataList: [], // 应用列表
  detail: {}, // 应用详情
}

const AppConfig = () => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const token = useSelector((state: any) => state.common.token)
  const { page, pageSize, req, dataList, detail } = data
  const { fdAppName } = req
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
    // dispatchRedux(getSubAppsList(req) as any);
  };

    /**
   * @description 获取当前应用列表
   * @param page: 当前页，pageSize: 每页显示数量，sort: 排序方式
   */
    const getSubAppsList = async (req?: any) => {
      const params = {
        page: 1,
        pageSize: 999, // 默认size为20, 出于页面UI考虑，设定为999，即拿到所有的apps
        sort: {
          fdDisplayOrder: "desc"
        },
        conditions: {
          ...req
        }
      }
  
      // await axios.request({
      //   url: `${baseApi}/app-permission/list-view`,
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
      //     const list = data.data
      //     setState("update", {
      //       appsList: list
      //     }) 
      //     dispatchRedux(setAppsList({
      //       appsList: list
      //     }))
      //   }
      // }).catch((err: any) => {
      //   console.log("axios-app-err", err)
      // })
  
      // try {
      //   const res = await dispatchRedux(asyncThunk.getApps(params) as any);
      //   const data = res?.payload
      //   if (data.code === 200) {
      //     const { content } = data.data
      //     setState("update", {
      //       appsList: content
      //     }) 
      //     dispatchRedux(setAppsList({
      //       appsList: content
      //     }))
      //   } else if (
      //       data.code === 401 && 
      //       data.success === false &&
      //       data.message === "请先登录后再操作!") {
      //     router.push("/login")
      //   }
      // } catch(err) {
      //   console.log("app-err", err)
      // }
    }

  // 新增弹窗
  const onShowAddModal = () => {
    setShowAddModal(true)
  }

  const onHideAddModal = () => {
    getSubAppsList()
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
    getSubAppsList()
    setShowUpdateModal(false)
  }

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
            {`是否确定删除${record.fdAppName}应用`}
            <span style={{ color: "red" }}>{record.fdName}</span>
            ？
          </div>
        ),
        onOk() {
          // deleteDepts(record?.fdId)
        },
        onCancel() {
          // 用户取消删除操作
          message.info("取消删除");
        }
      });
    }

  const formObj = {
    name: 'appConfig-form',
    layout: 'inline',
    items: [
      {
        type: 'input',
        key: 'fdAppName',
        value: fdAppName,
        label: '应用名称',
        name: 'fdAppName',
        placeholder: '请输入用户名',
        callback: (e: any) => {
          setState("req", {username: e.target.value })
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
      { title: "应用名称", dataIndex: "fdAppName", key: "fdAppName" },
      { title: "应用路径", dataIndex: "fdAppUrl", key: "fdAppUrl" },
      {
        title: "所属主应用",
        dataIndex: "fdMainApp",
        key: "fdMainApp",
        render: (_: any, record: any) => {
          return (
            <>{record.fdParent.fdAppName}</>
          )
        }
      },
      {
        title: "所属主应用菜单",
        dataIndex: "fdMainAppTab",
        key: "fdMainAppTab",
        render: (_: any, record: any) => {
          return (
            <>{record.fdParent.fdAppTabName}</>
          )
        }
      },
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
    customElements: () => {
      return (
        <>
        </>
      )
    },
    // onChangePage: (page: number, pageSize: number) => onChangePagination(page, pageSize)
  }

  useEffect(() => {
    setState("update", {
      dataList: subApps
    })
  }, [])

  return (
    <AppContainer>
      <section className={classNames("container")}>
        <div className={classNames("container-content")}>
          <SearchLayout formObj={formObj} tabelObj={tabelObj} />
        </div>
      </section>
      <AddSubApps open={showAddModal} onCancel={() => onHideAddModal()}/>
      <UpdateSubApps open={showUpdateModal} detail={detail} onCancel={() => onHideUpdateModal()}/>
    </AppContainer>
  )
}

export default AppConfig