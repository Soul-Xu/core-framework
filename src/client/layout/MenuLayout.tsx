import React, { useState, useEffect } from 'react';
import {
  HomeOutlined,
  ApartmentOutlined,
  ForkOutlined,
  HistoryOutlined,
  PartitionOutlined,
  ScheduleOutlined,
  TableOutlined,
  SolutionOutlined,
  TransactionOutlined,
  AreaChartOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps, MenuTheme } from 'antd/es/menu';
import { useRouter } from 'next/router';

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
  // @ts-ignore
  getItem('首页', '0', <HomeOutlined />),
  // @ts-ignore
  getItem('图表示例', '1', <AreaChartOutlined />),
  //  // @ts-ignore
  getItem('搜索示例', '2', <AreaChartOutlined />),
  // // @ts-ignore
  // getItem('证劵运维值班', '3', <LineChartOutlined />),
];

const itemsMap = {
  "0": "home",
  "1": "charts",
  "2": "search",
  "3": "stock"
}

const transferMaps = (obj: any) => {
  let res = {}
  for (let key in obj) {
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
