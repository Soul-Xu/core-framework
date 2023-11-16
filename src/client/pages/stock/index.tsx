import React from 'react'
import { NextPage } from 'next'
import styles from "./index.module.scss";
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);
import { useImmerReducer } from "use-immer";
import { reducer } from "../../utils/reducer";
import { useDispatch, useSelector } from "react-redux";
import type { DatePickerProps } from 'antd';
import { Checkbox } from 'antd'

/** components */
import PageLayout from '../../layout/PageLayout'
import FormLayout from '../../components/formLayout';
import TableLayout from '../../components/tableLayout';

const dataList = [
  {
    id: 1,
    limitTime: "",
    label: <></>,
    operationItem: "到岗检查项",
    confirm: false,
    reConfirm: false,
    error: "",
    images: ""
  },
  {
    id: 2,
    limitTime: "08:05",
    label: <></>,
    operationItem: "行动行情启动项检查",
    confirm: false,
    reConfirm: false,
    error: "",
    images: ""
  },
  {
    id: 3,
    limitTime: "08:20",
    label: <></>,
    operationItem: "基本户监控系统启动",
    confirm: false,
    reConfirm: false,
    error: "",
    images: ""
  },
  {
    id: 4,
    limitTime: "08:25",
    label: <></>,
    operationItem: "交易系统启动前检查项",
    confirm: false,
    reConfirm: false,
    error: "",
    images: ""
  },
  {
    id: 5,
    limitTime: "08:30",
    label: <></>,
    operationItem: "重点核心资产启动项",
    confirm: false,
    reConfirm: false,
    error: "",
    images: ""
  },
  {
    id: 6,
    limitTime: "09:20",
    label: <></>,
    operationItem: "中小企业交易系统启动",
    confirm: false,
    reConfirm: false,
    error: "",
    images: ""
  },
  {
    id: 7,
    limitTime: "09:25",
    label: <></>,
    operationItem: "生产系统启动",
    confirm: false,
    reConfirm: false,
    error: "",
    images: ""
  },
  {
    id: 8,
    limitTime: "09:25",
    label: <></>,
    operationItem: "日志系统是否正常启动",
    confirm: false,
    reConfirm: false,
    error: "",
    images: ""
  },
  {
    id: 9,
    limitTime: "09:25",
    label: <></>,
    operationItem: "PB系统检查项",
    confirm: false,
    reConfirm: false,
    error: "",
    images: ""
  },
  {
    id: 10,
    limitTime: "09:25",
    label: <></>,
    operationItem: "基本户监控系统启动",
    confirm: false,
    reConfirm: false,
    error: "",
    images: ""
  },
]

const initialState = {
  date: "", // 日期
  progress: 0, // 进度
  description: "", // 说明
}

const Stock:React.FC = () => {
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { date, progress, description } = data as any;
  const setState = (type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  };

  const onHandleChange = (key: string, value: string) => {
    setState("update", { [key]: value})
  }

  const onDatePickerChange:DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const formObjTop = {
    name: "stock-top-form",
    inRow: 2,
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: "datepicker",
        key: "date",
        label: (
          <span className={classNames("form-item-label-option")}>日期</span>
        ),
        onChange: onDatePickerChange,
      },
      {
        kind: "progress",
        key: "progress",
        label: "",
        percent: 30,
        size: "small"
      }
    ]
  }

  const formObjArea = {
    name: "stock-area-form",
    inRow: 1,
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'input',
        type: "area",
        key: 'description',
        value: description,
        label: (
          <span className={classNames("form-item-label-option")}>说明</span>
        ),
        disabled: true,
        name: 'description',
        onChange: (e: any) => {
          onHandleChange('description', e.target.value.trim())
        }
      },
      {
        kind: 'input',
        type: "area",
        key: 'area',
        // value: description,
        label: (
          <span className={classNames("form-item-label-option")}>单行文本</span>
        ),
        name: 'area',
        // onChange: (e: any) => {
        //   onHandleChange('description', e.target.value.trim())
        // }
      },
    ]
  }

  const tableObj = {
    columns: [
      { title: "序号", dataIndex: "id", key: "id" },
      { title: "截止时间", dataIndex: "limitTime", key: "limitTime" },
      { title: "标签", dataIndex: "label", key: "label" },
      { title: "操作项目", dataIndex: "operationItem", key: "operationItem" },
      {
        title: "确认",
        dataIndex: "confirm",
        key: "confirm",
        render: (_: any, record: any) => {
          return (
            <>
              {/* @ts-ignore */}
              <Checkbox checked={record.confirm} />
            </>
          )
        }
      },
      {
        title: "复核",
        dataIndex: "reConfirm",
        key: "reConfirm",
        render: (_: any, record: any) => {
          return (
            <>
              {/* @ts-ignore */}
              <Checkbox checked={record.reConfirm} />
            </>
          )
        }
      },
      { title: "异常问题", dataIndex: "error", key: "error" },
      { title: "图片上传", dataIndex: "images", key: "images" },
    ],
    datasource: dataList,
    api: '',
    customElements: () => (<></>),
    pagination: {
      page: 1,
      pageSize: 10,
      total: dataList.length
    },
    onChangePage: (page: number, pageSize: number) => {}
  }

  return (
    <div>
      {/* @ts-ignore */}
      <PageLayout>
        <section className={classNames("container")}>
          <div className={classNames("container-content")}>
            {/* @ts-ignore */}
            <FormLayout formObj={formObjTop} />
            {/* @ts-ignore */}
            <FormLayout formObj={formObjArea} />
            {/* @ts-ignore */}
            <TableLayout tabelObj={tableObj} />
          </div>
        </section>
      </PageLayout>
    </div>
  )
} 

export default Stock