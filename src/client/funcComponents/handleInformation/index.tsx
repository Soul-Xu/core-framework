import React, { useEffect } from "react"
import FormLayout from '../../components/formLayout';
import CustomLayout from '../customLayout/index';
import styles from "./index.module.scss"
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);
import debounce from 'lodash/debounce';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'; // 设置 Day.js 使用的地区

import { useImmerReducer } from "use-immer";
import { reducer } from "../../utils/reducer";
import { useDispatch, useSelector } from "react-redux";
import { setHandleInfo } from "../../store/modules/handleInfoSlice"

const initialState = {
  fdStatus: "", // 状态
  fdEffectSystem: "", // 影响系统
  fdFindTime: "", // 发现时间
  fdProcessDept: "", // 处理组
  fdSubCate: "", // 子类
  fdHappendTime: "", // 发生时间
  fdProcessUser: "", // 处理人
  fdArea: "", // 区域
  fdReportTime: "", // 上报时间
  fdEffect: "", // 影响
  fdPriority: "", // 处理优先级
  fdFinishTime: "", // 处理完成时间
  fdUrgency: "", // 紧急程度
  fdsolveTime: "" // 问题解决时间
}

const HandleInformation = (props) => {
  const { handleForm } = props
  const dispatchRedux = useDispatch();
  const handleInfo = useSelector((state: any) => state.handle.handleInfo)
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { 
    fdStatus, fdEffectSystem, fdFindTime, fdProcessDept, fdSubCate, fdHappendTime, 
    fdProcessUser, fdArea, fdReportTime, fdEffect, fdPriority, fdFinishTime,
    fdUrgency, fdsolveTime
  } = data as any;
  const setState = (type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  };

  const onHandleChange = debounce((key: string, value: string) => {
    const newValue = key.indexOf("Time") > -1
      ? dayjs().locale('zh-cn').toString()
      : value;
  
    setState("update", { [key]: value });
  
    const updatedHandleInfo = { ...handleInfo, [key]: newValue };
    dispatchRedux(setHandleInfo(updatedHandleInfo));
  }, 1000);

  const formObj = {
    name: 'handle-form',
    inRow: 2,
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'input',
        type: "text",
        key: 'fdStatus',
        value: fdStatus,
        defaultValue: "未处理",
        label: (
          <span className={classNames("form-item-label-option")}>状态</span>
        ),
        name: 'fdStatus',
        disabled: true,
        onChange: (e: any) => {
          onHandleChange("fdStatus", e.target.value.trim())
        }
      },
      {
        kind: 'select',
        key: 'fdEffectSystem',
        value: fdEffectSystem,
        defaultValue: "融资融劵系统",
        label: (
          <span className={classNames("form-item-label-option")}>影响系统</span>
        ),
        name: 'fdEffectSystem',
        onChange: (value: any) => {
          onHandleChange("fdEffectSystem", value)
        }
      },
      {
        kind: 'datepicker',
        key: 'fdFindTime',
        value: fdFindTime,
        defaultValue: "2023-09-28 10:13",
        label: (
          // <span className={classNames("form-item-label")}>发现时间</span>
          <span className={classNames("form-item-label-option")}>
            <span className={classNames("form-item-require")}>*</span>
            发现时间
          </span>
        ),
        name: 'fdFindTime',
        // require: 1,
        onChange: (value: any) => {
          onHandleChange("fdFindTime", value)
        }
      },
      {
        kind: 'select',
        key: 'fdProcessDept',
        value: fdProcessDept,
        defaultValue: "运维三室",
        label: (
          // <span className={classNames("form-item-label")}>处理组</span>
          <span className={classNames("form-item-label-option")}>
            <span className={classNames("form-item-require")}>*</span>
            处理组
          </span>
        ),
        name: 'fdProcessDept',
        // require: 1,
        onChange: (value: any) => {
          onHandleChange("fdProcessDept", value)
        }
      },
      {
        kind: 'select',
        key: 'fdSubCate',
        value: fdSubCate,
        defaultValue: "--",
        label: (
          <span className={classNames("form-item-label-option")}>子类</span>
        ),
        name: 'fdSubCate',
        onChange: (value: any) => {
          onHandleChange("fdSubCate", value)
        }
      },
      {
        kind: 'datepicker',
        key: 'fdHappendTime',
        value: fdHappendTime,
        label: (
          <span className={classNames("form-item-label-option")}>发生时间</span>
        ),
        name: 'fdHappendTime',
        onChange: (value: any) => {
          onHandleChange("fdHappendTime", value)
        }
      },
      {
        kind: 'select',
        key: 'fdProcessUser',
        value: fdProcessUser,
        defaultValue: "徐工",
        label: (
          // <span className={classNames("form-item-label")}>处理人</span>
          <span className={classNames("form-item-label-option")}>
            <span className={classNames("form-item-require")}>*</span>
            处理人
          </span>
        ),
        name: 'fdProcessUser',
        // require: 1,
        onChange: (value: any) => {
          onHandleChange("fdProcessUser", value)
        }
      },
      {
        kind: 'select',
        key: 'fdArea',
        value: fdArea,
        defaultValue: "华南地区",
        label: (
          <span className={classNames("form-item-label-option")}>区域</span>
        ),
        name: 'fdArea',
        onChange: (value: any) => {
          onHandleChange("fdArea", value)
        }
      },
      {
        kind: 'datepicker',
        key: 'fdReportTime',
        value: fdReportTime,
        label: (
          <span className={classNames("form-item-label-option")}>上报时间</span>
        ),
        name: 'fdReportTime',
        onChange: (value: any) => {
          onHandleChange("fdReportTime", value)
        }
      },
      {
        kind: 'select',
        key: 'fdEffect',
        value: fdEffect,
        defaultValue: "华南地区证劵交易市场",
        label: (
          <span className={classNames("form-item-label-option")}>影响</span>
        ),
        name: 'fdEffect',
        onChange: (value: any) => {
          onHandleChange("fdEffect", value)
        }
      },
      {
        kind: 'select',
        key: 'fdPriority',
        value: fdPriority,
        defaultValue: "最高",
        label: (
          <span className={classNames("form-item-label-option")}>处理优先级</span>
        ),
        name: 'fdPriority',
        disabled: true,
        onChange: (value) => {
          onHandleChange("fdPriority", value)
        }
      },
      {
        kind: 'datepicker',
        key: 'fdFinishTime',
        value: fdFinishTime,
        label: (
          <span className={classNames("form-item-label-option")}>处理完成时间</span>
        ),
        name: 'fdFinishTime',
        onChange: (value: any) => {
          onHandleChange("fdFinishTime", value)
        }
      },
      {
        kind: 'select',
        key: 'fdUrgency',
        value: fdUrgency,
        defaultValue: "紧急",
        label: (
          <span className={classNames("form-item-label-option")}>紧急程度</span>
        ),
        name: 'fdUrgency',
        onChange: (value: any) => {
          onHandleChange("fdUrgency", value)
        }
      },
      {
        kind: 'datepicker',
        key: 'fdsolveTime',
        value: fdsolveTime,
        label: (
          <span className={classNames("form-item-label-option")}>问题解决时间</span>
        ),
        name: 'fdsolveTime',
        onChange: (value: any) => {
          onHandleChange("fdsolveTime", value)
        }
      },
    ],
  }

  useEffect(() => {
    setState("update", { 
      fdFindTime: dayjs(),
      fdHappendTime: dayjs(),
      fdFinishTime: dayjs(),
      fdsolveTime: dayjs(),
      fdReportTime: dayjs()
    })
  }, [])

  const handleRender = handleForm || formObj

  return (
    <>
      {/* @ts-ignore */}
      <CustomLayout title="处理信息" />
      <div>
        {/* @ts-ignore */}
        <FormLayout formObj={handleRender} />
      </div>
    </>
  )
}

export default HandleInformation