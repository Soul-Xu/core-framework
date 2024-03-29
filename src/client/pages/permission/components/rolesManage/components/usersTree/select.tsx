/**
 * 用户选择器
 */
/** external library */
import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import { Tree, Table, Radio } from "antd";
/** css */
import classnames from "classnames/bind";
import style from "./index.module.scss";
const classNames = classnames.bind(style);
/** utlis */
import { reducer } from "../../../../../../utils/reducer";
import asyncThunk from "../../../../../../store/asyncThunk";
import { setSelectUsers } from "../../../../../../store/modules/permissionsSlice";
const { TreeNode } = Tree;

/** http */
import axios from 'axios';
import { baseApi, baseApiOrg } from "../../../../../../config"

const initialState = {
  deptsList: [],
  usersList: [],
  treeData: [],
};

const UsersSelector = () => {
  const router = useRouter();
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { deptsList, usersList, treeData } = data;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const token = useSelector((state: any) => state.common.token)

  const setState = useCallback((type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  }, [dispatch]);

  const onSelect = async (selectedKeys, info) => {
    const selectedDeptId = selectedKeys[0];
    await getUsers(selectedDeptId);
  };

  const getUsers = async (deptId: string) => {
    // await axios.request({
    //   url: `${baseApiOrg}/user/list`,
    //   method: "post",
    //   data: {
    //     deptId
    //   },
    //   withCredentials: true,  
    //   headers: {
    //     'Content-Type': 'application/json', // 设置为 application/json
    //     'X-AUTH-TOKEN': token
    //   },
    // }).then((res: any) => {
    //   const data = res.data
    //   if (data.code === 200) {
    //     const { content } = data.data;
    //     const users = content.map((contentItem: any, index: number) => {
    //         return {
    //           ...contentItem,
    //           sort: index + 1
    //         }
    //     })
    //     setState("update", { usersList: users });
    //   }
    // }).catch((err: any) => {
    //   console.log("add-module", err)
    // })
  
    const res = await dispatchRedux(asyncThunk.getUsers({ deptId }) as any);
    const data = res?.payload;
    if (data.code === 200) {
      const { content } = data.data;
      const users = content.map((contentItem: any, index: number) => {
        return {
          ...contentItem,
          sort: index + 1
        }
      })
      setState("update", { usersList: users });
    }  else if (
      data.code === 401 && 
      data.success === false &&
      data.message === "请先登录后再操作!") {
    router.push("/login")
  }
  }

  useEffect(() => {
    getDepts();
  }, []);

  const getDepts = async () => {
    const params = {
      page: 1,
      pageSize: 20
    }

    try {
      // await axios.request({
      //   url: `${baseApiOrg}/dept/list`,
      //   method: "post",
      //   data: {},
      //   withCredentials: true,  
      //   headers: {
      //     'Content-Type': 'application/json', // 设置为 application/json
      //     'X-AUTH-TOKEN': token
      //   },
      // }).then((res: any) => {
      //   const data = res.data
      //   if (data.code === 200) {
      //     const { content } = data.data;
      //     const treeData = buildTree(content);
      //     setState("update", { deptsList: treeData });
      //   }
      // }).catch((err: any) => {
      //   console.log("add-module", err)
      // })
      const res = await dispatchRedux(asyncThunk.getDepts(params) as any);
      const data = res?.payload;
      if (data.code === 200) {
        const { content } = data.data;
        const treeData = buildTree(content);
        setState("update", { deptsList: treeData });
      }  else if (
        data.code === 401 && 
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login")
    }
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  const buildTree = (flatList) => {
    const map = new Map();
    const tree: any = [];

    flatList.forEach((item) => {
      map.set(item.fdId, { ...item, children: [] });
    });

    flatList.forEach((item) => {
      const node: any = map.get(item.fdId);
      if (item.fdParent) {
        const parent = map.get(item.fdParent.fdId);
        parent.children.push(node);
      } else {
        tree.push(node);
      }
    });

    return tree;
  };

  const renderTreeNodes = (data) => {
    const rootNode = {
      fdId: "root", // 为根节点设置一个唯一标识符，你可以根据实际情况修改
      fdName: "云速易连", // 根节点的名称
      children: data, // 将原来的虚拟部门作为根节点的子节点
    };
  
    return (
      <TreeNode title={rootNode.fdName} key={rootNode.fdId}>
        {renderTreeNodesRecursive(rootNode)}
      </TreeNode>
    );
  };

  const renderTreeNodesRecursive = (node) => {
    return node.children.map((item) => (
      <TreeNode title={item.fdName} key={item.fdId}>
        {item.children && renderTreeNodesRecursive(item)}
      </TreeNode>
    ));
  };

  const columns = [
    // {
    //   title: '帐号',
    //   dataIndex: 'fdId',
    //   key: 'fdId',
    // },
    {
      title: '昵称',
      dataIndex: 'fdNickName',
      key: 'fdNickName',
    },
    {
      title: '姓名',
      dataIndex: 'fdUserName',
      key: 'fdUserName',
    },
    {
      title: '邮箱',
      dataIndex: 'fdEmail',
      key: 'fdEmail',
    },
    {
      title: '电话',
      dataIndex: 'fdCellphone',
      key: 'fdCellphone',
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
    const usersSelect = transformUsers(selectedRowKeys, usersList)
    dispatchRedux(setSelectUsers({
      selectUsers: usersSelect
    }))
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const transformUsers = (userSelect, users) => {
    return userSelect.map(fdId => {
      const user = users.find(user => user.fdId === fdId);
      return {
        fdId: user.fdId,
        fdName: user.fdUserName
      };
    });
  };

  const clearSelected = () => {
    setSelectedRowKeys([]); // 清空已选中的行
    dispatchRedux(setSelectUsers({ selectUsers: [] })); // 清空选择的用户
  };

  return (
    <div className={classNames("container")}>
      <div className={classNames("content")}>
        <section className={classNames("content-tree")}>
          <Tree onSelect={onSelect}>{renderTreeNodes(deptsList)}</Tree>
        </section>
        <section className={classNames("content-list")}>
          <div className={classNames("content-list-title")}>
            <div>
              <span style={{ marginRight: "8px" }}>共{usersList.length}项</span>
              <span>已选{selectedRowKeys.length}项</span>
            </div>
            <span className={classNames("content-list-title-action")} onClick={clearSelected}>
              清空所选
            </span>
          </div>
          <div className={classNames("content-list-main")}>
            {/* 使用Table组件替代div列表 */}
            <Table
              dataSource={usersList}
              columns={columns}
              rowSelection={rowSelection}
              pagination={false}
              rowKey="fdId" // 设置每一行的唯一标识字段
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UsersSelector
