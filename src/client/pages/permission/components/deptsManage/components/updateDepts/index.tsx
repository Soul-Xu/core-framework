import React, { useCallback, useEffect } from "react";
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import { useImmerReducer } from "use-immer";
import { reducer } from "../../../../../../utils/reducer";
import { Modal, Form, Input, InputNumber } from "antd";
const Textarea = Input;
import asyncThunk from "../../../../../../store/asyncThunk";

import classnames from 'classnames/bind';
import style from '../../index.module.scss';
const classNames = classnames.bind(style);

interface Props {
  title?: string;
  detail: any;
  open: boolean;
  onOk?: () => void;
  onCancel: () => void;
}

const initialState = {
  fdName: "",
  fdNo: "",    
  fdCellphone: "",
  fdDisplayOrder: 1,
  fdRemark: "",
  fdId: ""
}

const UpdateDepts = (props: Props) => {
  const router = useRouter();
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { fdName, fdNo, fdCellphone, fdDisplayOrder, fdRemark, fdId } = data;
  const { detail, open, onCancel } = props;

  const setState = useCallback((type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  }, [dispatch]);

  const onHandleChange = (type: string, e: any) => {
    if (type === "fdDisplayOrder") {
      setState("update", {
        [type]: e
      });
    } else {
      setState("update", {
        [type]: e.target.value
      });
    }
  };

  const onOk = async () => {
    const params = {
      fdId: detail?.fdId,
      fdName: fdName || detail?.fdName,
      fdNo: fdNo || detail?.fdNo,
      fdCellphone: fdCellphone || detail?.fdCellphone,
      fdDisplayOrder: fdDisplayOrder || detail?.fdDisplayOrder,
      fdRemark: fdRemark || detail?.fdRemark,
      fdParent: detail?.fdParent || null
    };

    console.log("onOk", params)

    const res = await dispatchRedux(asyncThunk.updateDepts(params) as any);
    const data = res?.payload;
    if (data.code === 200) {
      onCancel();
    } else if (
        data.code === 401 &&
        data.success === false &&
        data.message === "请先登录后再操作!") {
      router.push("/login");
    }
    onCancel();
  };

  useEffect(() => {
    if (detail) {
      // 将 detail 中的值赋给表单的初始值
      dispatch({ type: "update", payload: detail });
    }

    // 清空 data 的状态为初始值
    return () => {
      setState("update", {
        fdName: "",
        fdNo: "",    
        fdCellphone: "",
        fdDisplayOrder: 1,
        fdRemark: "",
        fdId: ""
      })
    };
  }, [detail, dispatch]);

  return (
    <Modal 
      title="添加部门"
      style={{ textAlign: "center" }}
      visible={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="提交"
    >
      <Form name="UpdateDepts" style={{ marginTop: "30px" }} initialValues={detail}>
        <Form.Item 
          name="fdName"
          label={(
            <div className={classNames("form-item-label")}>部门名称</div>
          )}
        >
          <Input disabled placeholder="请输入部门名称" onChange={(e: any) => onHandleChange("fdName", e)} />
        </Form.Item>
        <Form.Item 
          name="fdNo"
          label={(
            <div className={classNames("form-item-label")}>部门编号</div>
          )} 
        >
          <Input placeholder="请输入部门编号" onChange={(e: any) => onHandleChange("fdNo", e)} />
        </Form.Item>
        <Form.Item 
          name="fdCellphone"
          label={(
            <div className={classNames("form-item-label")}>联系方式</div>
          )} 
        >
          <Input placeholder="请输入联系方式" onChange={(e: any) => onHandleChange("fdCellphone", e)} />
        </Form.Item>
        <Form.Item 
          name="fdDisplayOrder"
          label={(
            <div className={classNames("form-item-label")}>排序</div>
          )} 
        >
          <InputNumber style={{ width: "378px", textAlign: "left" }} placeholder="请输入排序" onChange={(e: any) => onHandleChange("fdDisplayOrder", e)} />
        </Form.Item>
        <Form.Item 
          name="fdRemark"
          label={(
            <div className={classNames("form-item-label")}>备注说明</div>
          )} 
        >
          <Textarea placeholder="请输入备注说明" onChange={(e: any) => onHandleChange("fdRemark", e)} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateDepts;
