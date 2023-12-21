/**
 * 系统设置
 */
/** external library */
import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import { Divider, Card, Row, Col, Form, Switch, Table } from "antd";
/** component */
import AppContainer from "../../layout/appContainer"
/** utils */
import { reducer } from "../../utils/reducer";
import { setConfig } from "../../store/modules/settingSlice";
/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const initialState = {

}

const SystemSetting = () => {
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const config = useSelector((state: any) => state.setting.config)

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
  const setState = useCallback((type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  }, [dispatch]);

  return (
    <>
      <AppContainer>
        <div className={classNames("container")}>
          <section className={classNames("module")}>
            <div className={classNames("title")}>系统设置</div>
            <Divider />
            <div className={classNames("setting-content")}>
            </div>
            <div></div>
          </section>
        </div>
      </AppContainer>
    </>
  )
}

export default SystemSetting