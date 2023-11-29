/**
 * 新建应用
 */
/** external library */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, message, Row, Col, Checkbox, Divider } from "antd"
import { useRouter } from "next/router";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const CheckboxGroup = Checkbox.Group;

// 后台管理
const plainOptions = ['用户新增权限', '用户编辑权限', '用户查看权限', '部门新增权限', '应用维护权限', '菜单维护权限', '基础配置权限'];
const defaultCheckedList = ['用户新增权限', '用户编辑权限'];

// ITIL事件流程
const processOptions = ['流程发起权限', '流程查看权限', '流程特权处理', '流程维护处理'];

/**
 * interface
 * @param props 
 * @returns 
 */
interface Props {
  title?: string,
  open: boolean,
  onOk?: () => void,
  onCancel: () => void
}

const AddPermission = (props: Props) => {
  // const form = useForm()
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const { open, onCancel } = props
  const curApp = useSelector((state: any) => state.apps.curApp)
  const [fdComponentName, setFdComponentName] = useState("")
  const [fdRemark, setFdRemark] = useState("")
  const [fdUrl, setFdUrl] = useState("")
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const onChangeITIL = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChangeITIL = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? processOptions : []);
  };

  /**
   * @description 新建应用确认逻辑
   * @param
   */
  const onOk = async () => {
    if (curApp?.fdId) {
      message.warning("当前应用id缺失")
      return
    }

    const params = {

    }

    onCancel()
  }

  return (
    <Modal 
      title="功能授权定义"
      style={{ textAlign: "center" }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="提交"
    >
      <Form name="AddPermission" style={{ marginTop: "30px" }}>
        <Form.Item label="所属分类" name="fdComponentName">
          <Input placeholder="请选择所属分类" onChange={() => console.log("请输入角色组名称")} />
        </Form.Item>
        <Form.Item label="权限名称" name="fdRemark">
          <Input placeholder="请选择权限名称" onChange={() => console.log("请选择角色组成员")} />
        </Form.Item>
        <Form.Item label="权限标识" name="fdUrl">
          <Input placeholder="请输入权限标识" onChange={() => console.log("请选择角色组成员")} />
        </Form.Item>
        <Form.Item label="权限描述" name="fdUrl">
          <Input placeholder="请输入权限描述" onChange={() => console.log("请选择角色组成员")} />
        </Form.Item>
        <Form.Item label="绑定应用" name="fdUrl">
          <Input placeholder="请输入绑定应用" onChange={() => console.log("请选择角色组成员")} />
        </Form.Item>
        <Form.Item label="绑定菜单" name="fdUrl">
          <Input placeholder="请输入绑定菜单" onChange={() => console.log("请选择角色组成员")} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddPermission