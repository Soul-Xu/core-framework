import { Layout, theme } from 'antd';
import classnames from "classnames/bind";
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

/** image */
const { Header, Content, Footer, Sider } = Layout;

const PageLayout = ({children}: any) => {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      222
    </div>
  );
};

export default PageLayout;