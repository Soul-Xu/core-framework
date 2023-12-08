/** external library */
import Image from "next/image"
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { 
  AppstoreFilled,
  CheckCircleOutlined,
  GoldFilled,
  UserOutlined,
 } from '@ant-design/icons';
import { Layout, Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';
const { Header, Content } = Layout;

/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

/** images */
import ImgTodo from "public/images/common/todo_icon.png"

interface PageContainerProps {
  children?: React.ReactNode
}

const TodoContainer: NextPage<PageContainerProps> = ({ children }: any) => {
  const router = useRouter()

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '待审批'
    },
    {
      key: '2',
      label: '待填写',
    },
    {
      key: '3',
      label: '待查看',
    },
    {
      key: '4',
      label: '我发起的',
    },
    {
      key: '5',
      label: '已完成',
    },
  ];

  const onTabsChange = (key: string) => {
    // console.log(key);
  };
  

  const onBack = () => {
    router.push("/app")
  }

  return (
    <Layout>
      <Header className={classNames("header")}>
        <div className={classNames("header-container")}>
          <div className={classNames("header-container-icon")}>
            {/* <CheckCircleOutlined /> */}
            <Image src={ImgTodo} width={20} height={20} alt="ImgTodo"/>
          </div>
          <div className={classNames("header-container-title", "ellipsis")}>我的待办</div>
          <div className={classNames("header-container-tabs")}>
            <Tabs defaultActiveKey="1" size="large" items={items} onChange={onTabsChange} />
          </div>
          <div className={classNames("header-container-back")}>
            <Button type="default" onClick={onBack}>返回</Button>
          </div>
        </div>
      </Header>
      <Layout className={classNames("container-wrapper")}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: "100vh",
            background: "#f5f5f5",
          }}
        >
          { children }
        </Content>
      </Layout>
    </Layout>
  );
};

export default TodoContainer;