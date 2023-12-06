/**
 * 权限管理
 */
import React from "react"
import { Tabs } from "antd";
import type { TabsProps } from 'antd';
/** component */
import AppContainer from "../../layout/appContainer"
import RolesManage from "./components/rolesManage";
import PermissionManage from "./components/permissionManage";
import ModulesManage from "./components/modulesManage";
import UsersManage from "./components/usersManage";
/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const items: TabsProps['items'] = [
  {
    key: 'roles',
    label: '角色管理',
    children: <RolesManage />,
  },
  {
    key: 'permissions',
    label: '权限管理',
    children: <PermissionManage />,
  },
  {
    key: 'modules',
    label: '模块管理',
    children: <ModulesManage />,
  },
  {
    key: 'users',
    label: '人员管理',
    children: <UsersManage />,
  },
];


const Permission = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

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