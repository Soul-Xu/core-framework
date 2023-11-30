/**
 * 权限管理
 */
import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import { Divider, Tabs } from "antd";
import type { TabsProps } from 'antd';
/** component */
import AppContainer from "../../layout/appContainer"
import RolesManage from "./components/rolesManage";
import PermissionManage from "./components/permissionManage";
/** utils */
import { reducer } from "../../utils/reducer";
import { setConfig } from "../../store/modules/settingSlice";
import { setAppsList } from "../../store/modules/appsSlice";
import { setRolesList, setPermissionList } from "../../store/modules/permissionSlice";
import axios from 'axios';
import { baseApi } from '../../config';
/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '角色管理',
    children: <RolesManage />,
  },
  {
    key: '2',
    label: '权限管理',
    children: <PermissionManage />,
  },
];

const initialState = {

}

const Permission = () => {
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const config = useSelector((state: any) => state.setting.config)

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
  const setState = useCallback((type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  }, [dispatch]);

  const onChange = (key: string) => {
    console.log(key);
  };

    /**
   * 角色管理 - 获取功能权限列表
   */
    const getRoleFunc = async () => {
      const params = {
        page: 1,
        pageSize: 20
      }
  
      const token = localStorage.getItem("token")
  
      // axios原生方式
      await axios.request({
        url: `${baseApi}/api-permission/list`,
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
          let roles = [];
          content.forEach((contentItem: any) => {
            roles = roles.concat(contentItem?.fdRoleEntities); // 使用 concat 的返回值更新 roles
          });

          dispatchRedux(setPermissionList({
            permissionList: content
          }))
          dispatchRedux(setRolesList({
            rolesList: roles
          }))
        }
  
      }).catch((err: any) => {
        console.log("axios-role-err", err)
      })
    }

  useEffect(() => {
    getRoleFunc()
  }, [])

  return (
    <>
      <AppContainer>
        <div className={classNames("container")}>
          <section className={classNames("tabs")}>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </section>
        </div>
      </AppContainer>
    </>
  )
}

export default Permission