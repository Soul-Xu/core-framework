/**
 * 个人中心
 */
/** external library */
import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import { Avatar, Space, Form, Divider } from 'antd';
import { UserOutlined } from "@ant-design/icons";
/** component */
import AppContainer from "../../layout/appContainer"
/** utils */
import { reducer } from "../../utils/reducer";

/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const initialState = {
  fdAvatarURL: "",
  fdUserName: "",
  fdUserId: "",
  fdNickName: "",
  fdCellphone: "",
  fdEmail: "",
  fdRemark: ""
}

const PersonalCenter = () => {
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { fdAvatarURL, fdUserName, fdUserId, fdNickName, fdCellphone, fdEmail, fdRemark } = data as any;
  const userInfo = useSelector((state: any) => state.login.userInfo)

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
  const setState = useCallback((type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  }, [dispatch]);

  useEffect(() => {
    const { fdAvatarURL, fdUserName, fdUserId, fdNickName, fdCellphone, fdEmail, fdRemark } = userInfo
    setState("update", { 
      fdAvatarURL,
      fdUserName,
      fdUserId,
      fdNickName,
      fdCellphone,
      fdEmail,
      fdRemark
    })
  }, [userInfo, setState])

  return (
    <>
      <AppContainer>
        <div className={classNames("container")}>
          <div className={classNames("title")}>用户信息</div>
          <Divider />
          <div className={classNames("personal-title")}>
            <Avatar size={40} icon={<UserOutlined />} />
            <div>
              当前用户：<span>{fdUserName}</span>
            </div>
          </div>
          <div className={classNames("personal-info")}>
            <Form name="personl-info" labelAlign="left">
              <Form.Item 
                label={(
                  <div className={classNames("form-item-label")}>用户名</div>
                )}>
                <span>{fdUserName}</span>
              </Form.Item>
              <Form.Item 
                label={(
                  <div className={classNames("form-item-label")}>用户ID</div>
                )}>
                <span>{fdUserId}</span>
              </Form.Item>
              <Form.Item 
                label={(
                  <div className={classNames("form-item-label")}>昵称</div>
                )}>
                <span>{fdNickName}</span>
              </Form.Item>
              <Form.Item
                label={(
                  <div className={classNames("form-item-label")}>手机</div>
                )}>
                <span>{fdCellphone}</span>
              </Form.Item>
              <Form.Item 
                label={(
                  <div className={classNames("form-item-label")}>邮箱</div>
                )}>
                <span>{fdEmail}</span>
              </Form.Item>
              <Form.Item 
                label={(
                  <div className={classNames("form-item-label")}>备注</div>
                )}>
                <span>{fdRemark}</span>
              </Form.Item>
            </Form>
          </div>
        </div>
      </AppContainer>
    </>
  )
}

export default PersonalCenter