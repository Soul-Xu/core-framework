import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import { Tree, Table, Radio } from "antd";
import classnames from "classnames/bind";
import style from "./index.module.scss";
const classNames = classnames.bind(style);
import { useRouter } from "next/router";
import axios from 'axios';
import { baseApi, baseApiOrg } from "../../../../../../config"
import { reducer } from "../../../../../../utils/reducer";
import asyncThunk from "../../../../../../store/asyncThunk";
import { setSelectDepts } from "../../../../../../store/modules/permissionsSlice";

const { TreeNode } = Tree;

const initialState = {
  deptsList: [],
  deptsAllList: []
};

const DeptsSelector = () => {
  const router = useRouter();
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { deptsList, deptsAllList } = data;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const token = useSelector((state: any) => state.common.token)
  // const depts = useSelector((state: any) => state.permission.deptsList)

  const setState = useCallback((type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  }, [dispatch]);

  const onSelect = async (selectedKeys, info) => {
    const selectedDeptId = selectedKeys[0];
  };

  useEffect(() => {
    getDepts();
  }, []);

  const getAllDepts = async (req?: any) => {
    const params = {
      page: 1,
      pageSize: 20,
      ...req
    }

    try {
      // await axios.request({
      //   url: `${baseApiOrg}/dept/list`,
      //   method: "post",
      //   data: params,
      //   withCredentials: true,  
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'ltpatoken': token
      //   },
      // }).then((res: any) => {
      //   const data = res.data
      //   if (data.code === 200) {
      //     const { content } = data.data;
      //     setState("update", { deptsAllList: content });
      //   }
      // }).catch((err: any) => {
      //   console.log("add-module", err)
      // })
      const res = await dispatchRedux(asyncThunk.getDepts(params) as any);
      const data = res?.payload
      if (data.code === 200) {
        const { content } = data.data;
        const depts = content.map((contentItem: any, index: number) => {
          return {
            ...contentItem,
            sort: index + 1
          }
      })
        setState("update", {
          deptsAllList: depts
        })
        // dispatchRedux(setDeptsList({
        //   deptsList: Depts
        // }))
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

  const getDepts = async (req?: any) => {
    const params = {
      page: 1,
      pageSize: 20,
      ...req
    }

    try {
      // await axios.request({
      //   url: `${baseApiOrg}/dept/list`,
      //   method: "post",
      //   data: params,
      //   withCredentials: true,  
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'ltpatoken': token
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
      const data = res?.payload
      if (data.code === 200) {
        const { content } = data.data;
        const depts = content.map((contentItem: any, index: number) => {
          return {
            ...contentItem,
            sort: index + 1
          }
        })
        const treeData = buildTree(content);
        setState("update", { deptsList: treeData });
        setState("update", {
          deptsAllList: depts
        })
        // dispatchRedux(setDeptsList({
        //   deptsList: Depts
        // }))
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
    const tree = [];

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
    {
      title: '部门名称',
      dataIndex: 'fdName',
      key: 'fdName',
    },
    {
      title: '部门编号',
      dataIndex: 'fdNo',
      key: 'fdNo',
    },
    // {
    //   title: '上级部门',
    //   dataIndex: 'fdParent',
    //   key: 'fdParent',
    //   render: (_: any, record: any) => {
    //     return (
    //       <div>{record?.fdParent?.fdName}</div>
    //     ) 
    //   }
    // },
    {
      title: '备注',
      dataIndex: 'fdRemark',
      key: 'fdRemark',
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
    const deptsSelect = transformDeps(selectedRowKeys, deptsAllList)
    dispatchRedux(setSelectDepts({
      selectDepts: deptsSelect
    }))
  };

  const clearSelected = () => {
    setSelectedRowKeys([]); // 清空已选中的行
    dispatchRedux(setSelectDepts({ selectDepts: [] })); // 清空选择的用户
  };

  const rowSelection = {
    type: "radio", // 设置为单选
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const transformDeps = (deptsSelect, depts) => {
    return deptsSelect.map(fdId => {
      const dept = depts.find(dept => dept.fdId === fdId);
      return {
        fdId: dept.fdId,
        fdName: dept.fdName
      };
    });
  };

  useEffect(() => {
    getAllDepts()
  }, [])

  return (
    <div className={classNames("container")}>
      <div className={classNames("content")}>
        <section className={classNames("content-tree")}>
          <Tree onSelect={onSelect}>{renderTreeNodes(deptsList)}</Tree>
        </section>
        <section className={classNames("content-list")}>
          <div className={classNames("content-list-title")}>
            <div>
              <span style={{ marginRight: "8px" }}>共{deptsList.length}项</span>
            </div>
            <span className={classNames("content-list-title-action")} onClick={() => clearSelected()}>
              清空所选
            </span>
          </div>
          <div className={classNames("content-list-main")}>
            {/* 使用Table组件替代div列表 */}
            <Table
              dataSource={deptsList}
              columns={columns}
              // @ts-ignore
              rowSelection={rowSelection}
              pagination={false}
              rowKey="fdId" // 设置每一行的唯一标识字段
              expandedRowRender={undefined}  // 禁用展开行为
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DeptsSelector;