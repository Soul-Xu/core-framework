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
  {
    key: '3',
    label: '功能管理',
    children: 'Content of Tab Pane 3',
  },
  {
    key: '3',
    label: '操作管理',
    children: 'Content of Tab Pane 3',
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

  useEffect(() => {
    console.log("change", config)
  }, [config])

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