/**
 * 设置应用组件
 */
import React, {useCallback} from 'react';
import { Input, Tooltip, Drawer, Switch, Divider } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
/** store */
import { setAppsConfig } from "../../../../store/modules/appsSlice"
/** utils */
import { reducer } from "../../../../utils/reducer"

/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

/** interface */
interface Props {
  open: boolean | any,
  onClose: () => void
}

const initialState = {
  showCurrent: true, // 显示最近使用
  showMine: true // 显示我的
}

const SettingApps = (props: Props) => {
  const { open, onClose } = props
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { showCurrent, showMine } = data as any;
  const appsConfig = useSelector((state: any) => state.apps.appsConfig)

  /**
   * @description 数据处理函数
   * @param key data字段
   * @param value data字段值
   */
  const setState = useCallback((type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  }, [dispatch]);

  /**
   * @description 开关控件处理
   * @param type 对应的类型
   * @param value 对应的值
   */
  const onSwitchChange = (type: string, value: any) => {
    if (type === "current") {
      setState("update", { 
        showCurrent: value
      })
      dispatchRedux(setAppsConfig({
        showCurrent: value,
        showMine: appsConfig.showMine
      }))
    } else {
      setState("update", { 
        showMine: value
      })
      dispatchRedux(setAppsConfig({
        showCurrent: appsConfig.showCurrent,
        showMine: value
      }))
    }
  }

  return (
    <>
      <Drawer title="自定义应用" placement="right" onClose={onClose} open={open}>
        <div className={classNames("setting-container")}>
          <div className={classNames("setting-container-item")}>
            <span className={classNames("item-title")}>显示最近使用</span>
            <div className={classNames("item-switch")}>
              <Switch checked={showCurrent} onChange={(value: any) => onSwitchChange("current", value)} />
            </div>
          </div>
          <Divider />
          <div className={classNames("setting-container-item")}>
            <span className={classNames("item-title")}>显示我的应用</span>
            <div className={classNames("item-switch")}>
              <Switch checked={showMine} onChange={(value: any) => onSwitchChange("mine", value)} />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default SettingApps