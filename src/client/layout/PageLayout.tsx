import Image from "next/image"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Layout, theme, Breadcrumb } from 'antd';
import MenuLayout from './MenuLayout';
import styles from "./index.module.scss"
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);

/** image */
import ImgFormLogo from 'public/images/common/form_logo.png';
const { Header, Content, Footer, Sider } = Layout;

// @ts-ignore
const PageLayout: React.FC = ({children}) => {
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