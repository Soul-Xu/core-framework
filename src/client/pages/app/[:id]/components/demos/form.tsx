/**
 * form表单
 */
/** external library */
import React from "react"
/** components */
import FormLayout from "../../../../../components/formLayout"
/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const FormDemo = () => {
  const formObj1 = {
    name: 'basic-form1',
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'input',
        type: "text",
        key: 'fdSubject',
        defaultValue: "0928001",
        label: (
          <span className={classNames("form-item-label-option")}>
            <span className={classNames("form-item-require")}>*</span>
            标题
          </span>
        ),
        name: 'fdSubject',
        // require: 1,
        onChange: (e: any) => {
          // onHandleChange('fdSubject', e.target.value.trim())
        }
      },
      {
        kind: 'input',
        type: "area",
        key: 'fdDesc',
        // value: fdDesc,
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
          // onHandleChange('fdDesc', e.target.value.trim())
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
        // value: fdNo,
        defaultValue: "SJ-2023092800001",
        label: (
          <span className={classNames("form-item-label-option")}>事件编号</span>
        ),
        name: 'fdNo',
        disabled: true,
        // placeholder: '自动获取',
        onChange: (e: any) => {
          // onHandleChange('fdNo', e.target.value.trim())
        }
      },
      {
        kind: 'input',
        type: "text",
        key: 'fdAuthor',
        // value: fdAuthor,
        defaultValue: "廖",
        label: (
          <span className={classNames("form-item-label-option")}>登记人</span>
        ),
        name: 'fdAuthor',
        disabled: true,
        placeholder: '自动获取',
        onChange: (e: any) => {
          // onHandleChange('fdAuthor', e.target.value.trim())
        }
      },
      {
        kind: 'datepicker',
        key: 'fdInputTime',
        // value: fdInputTime,
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
        // value: fdFindWay,
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
          // onHandleChange('fdFindWay', value)
        }
      },
      {
        kind: 'select',
        key: 'fdReportor',
        // value: fdReportor,
        label: (
          <span className={classNames("form-item-label-option")}>报告人</span>
        ),
        name: 'fdReportor',
        onChange: (value: any) => {
          // onHandleChange('fdReportor', value)
        }
      }
    ],
  }

  return (
    <>
      <FormLayout formObj={formObj1} />
      <FormLayout formObj={formObj2} />
    </>
  )
}

export default FormDemo