import {
  AreaChartOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  // @ts-expect-error


  getItem('首页', '0', <HomeOutlined />),
  // @ts-expect-error


  getItem('图表示例', '1', <AreaChartOutlined />),
  //  // @ts-expect-error


  getItem('搜索示例', '2', <AreaChartOutlined />),
  // // @ts-expect-error


  // getItem('证劵运维值班', '3', <LineChartOutlined />),
];

const itemsMap = {
  "0": "home",
  "1": "charts",
  "2": "search",
  "3": "stock"
}

const transferMaps = (obj: any) => {
  const res = {}
  for (const key in obj) {
    res[obj[key]] = key
  }
  return res
}

const pathsMap = transferMaps(itemsMap)

const MenuLayout: React.FC = () => {
  const [selectKey, setSelectKey] = useState([''])
  const router = useRouter()

  useEffect(() => {
    const currentPath = router.pathname.slice(1)
    setSelectKey([`${pathsMap[currentPath]}`])
  }, [])

  const onClick = (menu: any) => {
    setSelectKey([`${menu.key}`])
    router.push(`/${itemsMap[menu.key]}`)
  }

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={selectKey}
        mode={"vertical"}
        theme={"dark"}
        items={items}
      />
    </>
  );
};

export default MenuLayout;
