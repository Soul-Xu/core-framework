import React from 'react'
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
import { setBasicInfo } from "../../store/modules/basicInfoSlice"

import { Divider, DatePicker } from 'antd';
import { useEffect } from 'react';

const initialState = {
  fdSubject: "", // 标题
  fdDesc: "", // 描述
  fdNo: "", // 事件编号
  fdAuthor: "", // 登记人
  fdInputTime: "", // 登记时间
  fdFindWay: "", // 发现渠道
  fdReportor: "" // 报告人
}

const BasicInformation = (props: any) => {
  const { basicFormDetail } = props
  const dispatchRedux = useDispatch();
  const basicInfo = useSelector((state: any) => state.basic.basicInfo)
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { fdSubject, fdDesc, fdNo, fdAuthor, fdInputTime, fdFindWay, fdReportor } = data as any;
  const setState = (type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  };

  const onHandleChange = debounce((key: string, value: string) => {
    setState("update", { [key]: value})
    dispatchRedux(setBasicInfo({
      ...basicInfo,
      [key]: value
    }))
  }, 1000)

  useEffect(() => {
    setState("update", { 
      fdInputTime: dayjs()
    })
    dispatchRedux(setBasicInfo({
      ...basicInfo,
      fdInputTime: dayjs().toString()
    }))
  }, [])

  const formObj1 = {
    name: 'basic-form1',
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'input',
        type: "text",
        key: 'fdSubject',
        value: fdSubject,
        defaultValue: "0928001",
        label: (
          // <span className={classNames("form-item-label")}>标题</span>
          <span className={classNames("form-item-label-option")}>
            <span className={classNames("form-item-require")}>*</span>
            标题
          </span>
        ),
        name: 'fdSubject',
        // require: 1,
        onChange: (e: any) => {
          onHandleChange('fdSubject', e.target.value.trim())
        }
      },
      {
        kind: 'input',
        type: "area",
        key: 'fdDesc',
        value: fdDesc,
        defaultValue: "0928001",
        label: (
          <span className={classNames("form-item-label-option")}>
            <span className={classNames("form-item-require")}>*</span>
            描述
          </span>
        ),
        name: 'fdDesc',
        // require: 1,
        // placeholder: '请输入描述',
        onChange: (e: any) => {
          onHandleChange('fdDesc', e.target.value.trim())
        }
      },
    ]
  }

  const formObj2 = {
    name: 'basic-form2',
    inRow: 3,
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'input',
        type: "text",
        key: 'fdNo',
        value: fdNo,
        defaultValue: "SJ-2023092800001",
        label: (
          <span className={classNames("form-item-label-option")}>事件编号</span>
        ),
        name: 'fdNo',
        disabled: true,
        // placeholder: '自动获取',
        onChange: (e: any) => {
          onHandleChange('fdNo', e.target.value.trim())
        }
      },
      {
        kind: 'input',
        type: "text",
        key: 'fdAuthor',
        value: fdAuthor,
        defaultValue: "廖",
        label: (
          <span className={classNames("form-item-label-option")}>登记人</span>
        ),
        name: 'fdAuthor',
        disabled: true,
        placeholder: '自动获取',
        onChange: (e: any) => {
          onHandleChange('fdAuthor', e.target.value.trim())
        }
      },
      {
        kind: 'datepicker',
        key: 'fdInputTime',
        value: fdInputTime,
        label: (
          <span className={classNames("form-item-label-option")}>登记时间</span>
        ),
        name: 'fdInputTime',
        style: { width: "228px" },
        format: "YYYY-MM-DD HH:mm:ss",
        disabled: true,
        placeholder: '自动获取'
      },
      {
        kind: 'select',
        key: 'fdFindWay',
        value: fdFindWay,
        defaultValue: "监控工具",
        label: (
          // <span className={classNames("form-item-label")}>发现渠道</span>
          <span className={classNames("form-item-label-option")}>
            <span className={classNames("form-item-require")}>*</span>
            发现渠道
          </span>
        ),
        name: 'fdFindWay',
        // require: 1,
        // placeholder: '请输入发现渠道',
        onChange: (value: any) => {
          onHandleChange('fdFindWay', value)
        }
      },
      {
        kind: 'select',
        key: 'fdReportor',
        value: fdReportor,
        label: (
          <span className={classNames("form-item-label-option")}>报告人</span>
        ),
        name: 'fdReportor',
        onChange: (value: any) => {
          onHandleChange('fdReportor', value)
        }
      }
    ],
  }

  const formRenderMain = formObj1
  const formRenderDetail = basicFormDetail || formObj2

  return (
    <>
      {/* @ts-ignore */}
      <CustomLayout title="基本信息" />
      <div>
        {/* @ts-ignore */}
        <FormLayout formObj={formRenderMain} />
        {/* @ts-ignore */}
        <FormLayout formObj={formRenderDetail} />
      </div>
    </>
  )
}

export default BasicInformation