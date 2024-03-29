/**
 * 登录页面
 */
/** external library */
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import { Button, message } from 'antd';
/** components */
import FormLayout from "../../components/formLayout";
/** store */
import { setAuthState } from "../../store/modules/authSlice";
import { setUserInfo } from "../../store/modules/loginSlice"
import { setToken } from "../../store/modules/commonSlice"
/** utils */
import asyncThunk from "../../store/asyncThunk";
import { reducer } from "../../utils/reducer";
/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);
/** http */
import axios from 'axios';
import { baseApi } from "../../config"

type FieldType = {
  username?: string;
  password?: string;
};

const initialState = {
  username: "", // 账号
  password: "" // 密码
}

const Login: React.FC = () => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { username, password } = data as any;

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
  const setState = useCallback((type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  }, [dispatch]);

  /**
   * @description input组件onChange函数
   * @param key 
   * @param value 
   */
  const onHandleChange = (key: string, value: string) => {
    setState("update", { [key]: value.trim() });
  }

  /**
   * @description 登录成功
   * @param data 
   */
  const onLoginSuccess = (data: any) => {
    dispatchRedux(setAuthState({ authState: true }));
    dispatchRedux(setUserInfo({ userInfo: data.data }));
    // dispatchRedux(setUserInfo({ username: username }));
    // window.localStorage.setItem("username", username);
    message.success("登录成功");
    router.push("/app");
  }

  /**
   * @description 登录校验
   * @param key 
   * @param value 
   */
  const onLogin = useCallback(async () => {
    if (!username || !password) {
      message.warning("账号和密码不能为空");
      return;
    }
    const params = {
      username,
      password,
      rememberMe: false
    }

    // axios原生方式
    // await axios.request({
    //   url: `${baseApi}/login`,
    //   method: "post",
    //   data: params,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // }).then((res) => {
    //   const data = res?.data
    //   const X-AUTH-TOKEN = res.headers["X-AUTH-TOKEN"]

    //   if (data?.code === 200) {
    //     dispatchRedux(setAuthState({
    //       authState: true
    //     }))
    //     dispatchRedux(setUserInfo({
    //       userInfo: data.data
    //     }))
    //     dispatchRedux(setToken({
    //       token: X-AUTH-TOKEN
    //     }))

    //     message.success("登录成功")
    //     router.push("/app")
    //   } else {
    //     message.error("登录失败，请重试")
    //     return
    //   }
    // }).catch((err: any) => {
    //   console.log("axios-login-catch", err)
    // })

    // redux-toolkit方式
    const res = await dispatchRedux(asyncThunk.login(params) as any);
    const data = res?.payload;

    // onLoginSuccess(data)

    if (data?.code === 200) {
      onLoginSuccess(data)
    } else {
      message.error("登录失败，请重试")
      return
    }
  }, [password, username, dispatchRedux, router])

  /**
   * @description 登录表单配置
   */
  const formObj = {
    name: 'login-form',
    layout: 'vertical',
    labelAlign: "right",
    style: { maxWidth: 600 },
    items: [
      {
        kind: 'input',
        type: "text",
        key: 'username',
        value: username,
        style: {
          boxSizing: "border-box",
          width: "268px",
          height: "40px",
          padding: "8px 10px",
          background: "#FFFFFF",
          borderRadius: "2px",
          border: "1px solid #B4B9C2"
        },
        label: '账号',
        placeholder: '请输入账号',
        onChange: (e: any) => {
          onHandleChange("username", e.target.value.trim())
        }
      },
      {
        kind: 'input',
        type: "password",
        key: 'password',
        value: password,
        style: {
          boxSizing: "border-box",
          width: "268px",
          height: "40px",
          padding: "8px 10px",
          background: "#FFFFFF",
          borderRadius: "2px",
          border: "1px solid #B4B9C2"
        },
        label: '密码',
        name: 'password',
        placeholder: '请输入密码',
        onChange: (e: any) => {
          onHandleChange("password", e.target.value.trim())
        }
      }
    ],
    customElements: () => (
      <section style={{ textAlign: "center" }}>
        <Button style={{ width: "268px", height: "40px" }} type="primary" onClick={() => onLogin()}>登录</Button>
      </section>
    )
  }

  return (
    <section className={classNames("login-container")}>
      <div className={classNames("login-form")}>
        <div className={classNames("form-container")}>
          <div className={classNames("form-title")}></div>
          <div className={classNames("form-corner")}></div>
        </div>
        <div className={classNames("form-content")}>
          <FormLayout formObj={formObj} />
        </div>
      </div>
    </section>
  )
}

export default Login