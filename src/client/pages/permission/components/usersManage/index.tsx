import { NextPage } from 'next'
import SearchLayout from '../../../../components/searchLayout/'
import { ExclamationCircleFilled } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import asyncThunk from "../../../../store/asyncThunk";
import { setUsersList } from "../../../../store/modules/permissionSlice";
import { Button, Tag, Modal, message } from "antd";
import { reducer } from "../../../../utils/reducer";
import classnames from 'classnames/bind';
import style from './index.module.scss';
const classNames = classnames.bind(style);
const { confirm } = Modal;

/** components */
import AddUsers from './components/addUsers';

const initialState = {
  fdNickName: "", // 昵称
  fdUserName: "", // 用户名
  fdEmail: "", // 邮箱
  fdCellphone: "", // 电话号码
  fdEducation: "", // 教育背景
  fdCity: "", // 城市
  dataList: [], // 组织列表
  page: 1,
  pageSize: 10,
  total: 0
}

const UsersManage: NextPage = () => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { page, pageSize, dataList, fdNickName, fdUserName, fdEmail, fdCellphone, fdEducation, fdCity } = data
  const [showAddModal, setShowAddModal] = useState(false)

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
   * 人员管理 - 获取用户列表
   */
  const getUsers = async () => {
    const params = {
      page: 1,
      pageSize: 20
    }

    const res = await dispatchRedux(asyncThunk.getUsers(params) as any);
    const data = res?.payload
    if (data.code === 200) {
      const { content } = data.data;
      const users = content.map((contentItem: any, index: number) => {
          return {
            ...contentItem,
            sort: index + 1
          }
      })
      setState("update", {
        dataList: users
      })
      dispatchRedux(setUsersList({
        usersList: users
      }))
    } else if (
        data.code === 401 && 
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login")
    }
  }

  const formObj = {
    name: 'users-list',
    layout: 'inline',
    items: [
      {
        type: 'input',
        key: 'fdNickName',
        value: fdNickName,
        label: '用户昵称',
        name: 'fdNickName',
        placeholder: '请输入用户昵称',
        callback: (e: any) => {
          setState("update", {
            fdNickName: e.target.value.trim()
          })
        }
      },
      {
        type: 'input',
        key: 'fdUserName',
        value: fdUserName,
        label: '用户名称',
        name: 'fdUserName',
        placeholder: '请输入用户名称',
        callback: (e: any) => {
          setState("update", {
            fdUserName: e.target.value.trim()
          })
        }
      },
      {
        type: 'input',
        key: 'fdEmail',
        value: fdEmail,
        label: '邮箱',
        name: 'fdEmail',
        placeholder: '请输入邮箱',
        callback: (e: any) => {
          setState("update", {
            fdEmail: e.target.value.trim()
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
          setState("update", {
            fdCellphone: e.target.value.trim()
          })
        }
      },
      {
        type: 'input',
        key: 'fdEducation',
        value: fdEducation,
        label: '教育背景',
        name: 'fdEducation',
        placeholder: '请输入教育背景',
        callback: (e: any) => {
          setState("update", {
            fdEducation: e.target.value.trim()
          })
        }
      },
      {
        type: 'input',
        key: 'fdCity',
        value: fdCity,
        label: '城市',
        name: 'fdCity',
        placeholder: '请输入城市',
        callback: (e: any) => {
          setState("update", {
            fdCity: e.target.value.trim()
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
      { title: "用户名称", dataIndex: "fdUserName", key: "fdUserName" },
      { title: "昵称", dataIndex: "fdNickName", key: "fdNickName" },
      { title: "密码", dataIndex: "fdPassword", key: "fdPassword" },
      { title: "邮箱", dataIndex: "fdEmail", key: "fdEmail" },
      { title: "电话号码", dataIndex: "fdCellphone", key: "fdCellphone" },
      // { 
      //   title: "性别", 
      //   dataIndex: "fdGender", 
      //   key: "fdGender",
      //   render: (_: any, record: any) => {
      //     return (
      //       <div>{record?.fdGender}</div>
      //     ) 
      //   }
      // },
      { title: "城市", dataIndex: "fdCity", key: "fdCity" },
      { title: "教育背景", dataIndex: "fdEducation", key: "fdEducation" },
      { 
        title: "描述", 
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
    getUsers()
  }, [])

  return (
    <div>
      <section className={classNames("container")}>
        <div className={classNames("container-content")}>
          <SearchLayout formObj={formObj} tabelObj={tabelObj} />
        </div>
      </section>
      <AddUsers open={showAddModal} onCancel={() => onHideAddModal()}/>
    </div>
  )
}

export default UsersManage