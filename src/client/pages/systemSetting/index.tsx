/**
 * 系统设置
 */
import React, { useEffect } from "react"
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

const appsList = [
  {
    id: "1",
    name: "体验项目",
    canMenu: true,
    canAction: true,
    canMessage: true
  },
  {
    id: "2",
    name: "ERP克隆",
    canMenu: true,
    canAction: false,
    canMessage: false
  },
  {
    id: "3",
    name: "template",
    canMenu: true,
    canAction: false,
    canMessage: false
  },
  {
    id: "4",
    name: "demo",
    canMenu: true,
    canAction: false,
    canMessage: false
  },
  {
    id: "5",
    name: "测试项目",
    canMenu: true,
    canAction: false,
    canMessage: false
  },
]
const SystemSetting = () => {
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, appsList);
  const config = useSelector((state: any) => state.setting.config)

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
  const setState = (type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  };

  const onSwitchChange = (id: string, type: string, value: boolean) => {
    dispatchRedux(setConfig({
      ...config,
      [id]: {
        ...config[id],
        [type]: value
      }
    }))
  }

  useEffect(() => {
    console.log("change", config)
  }, [config])

  const renderAppPerimission = (item: any) => {
    return (
      <>
        <Form name={item?.name} key={item.id}>
          <Form.Item label="菜单显示">
            <div className={classNames("setting-content-switch")}>
              <Switch defaultChecked={item?.canMenu} onChange={(value: any) => onSwitchChange(item.id, "canMenu", value)} />
            </div>
          </Form.Item>
          <Form.Item label="按钮显示">
            <div className={classNames("setting-content-switch")}>
              <Switch defaultChecked={item?.canAction} onChange={(value: any) => onSwitchChange(item.id, "canAction", value)} />
            </div>
          </Form.Item>
          <Form.Item label="消息通知">
            <div className={classNames("setting-content-switch")}>
              <Switch defaultChecked={item?.canMessage} onChange={(value: any) => onSwitchChange(item.id, "canMessage", value)} />
            </div>
          </Form.Item>
        </Form>
      </>
    )
  }

  return (
    <>
      <AppContainer>
        <div className={classNames("container")}>
          <section className={classNames("module")}>
            <div className={classNames("title")}>权限设置</div>
            <Divider />
            <div className={classNames("setting-content")}>
              {
                appsList.map((app: any) => {
                  return (
                    <Card 
                      title={app.name} 
                      className={classNames("setting-content-card")}
                    >
                      {renderAppPerimission(app)}
                    </Card>
                  )
                })
              }
            </div>
            <div></div>
          </section>
        </div>
      </AppContainer>
    </>
  )
}

export default SystemSetting