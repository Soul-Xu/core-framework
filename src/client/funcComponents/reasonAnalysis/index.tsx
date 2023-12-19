import React from 'react'
import FormLayout from '../../components/formLayout';
import CustomLayout from '../customLayout/index';
import styles from "./index.module.scss"
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);
import debounce from 'lodash/debounce';
import { setReason } from '../../store/modules/reasonSlice';

import { useImmerReducer } from "use-immer";
import { reducer } from "../../utils/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

const reasons = [
  {
    value: "humanError",
    label: "人为失误"
  },
  {
    value: "externalities",
    label: "外部因素"
  },
  {
    value: "applicationSystem",
    label: "应用系统"
  },
  {
    value: "process",
    label: "流程"
  },
  {
    value: "equipmentImplementation",
    label: "设备实施"
  },
  {
    value: "supplier",
    label: "供应商"
  },
]

const initialState = {
  fdReasonType: "", // 原因分类
  fdWellDone: "", // 做得好及幸运的地方
  fdReason: "", // 触发条件及原因分析
}

const ReasonAnalysis = () => {
  const dispatchRedux = useDispatch();
  const reason = useSelector((state: any) => state.reason.reason)
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { fdReasonType, fdWellDone, fdReason } = data as any;
  const setState = (type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  };

  const onHandleChange = debounce((key: string, value: string) => {
    setState("update", { [key]: value})
    dispatchRedux(setReason({
      ...reason,
      [key]: value
    }))
  }, 1000)
  
  const formObj = {
    name: 'reason-analysis-form',
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'select',
        key: 'fdReasonType',
        value: fdReasonType,
        label: (
          <span className={classNames("form-item-label-option")}>原因分类</span>
        ),
        name: 'fdReasonType',
        options: reasons,
        placeholder: '请选择原因分类',
        onChange: (value: any) => {
          onHandleChange("fdReasonType", value)
        }
      },
      {
        kind: 'input',
        type: "area",
        key: 'fdWellDone',
        value: fdWellDone,
        label: (
          <span className={classNames("form-item-label-option")}>做得好及幸运的地方</span>
        ),
        name: 'fdWellDone',
        onChange: (e: any) => {
          onHandleChange("fdWellDone", e.target.value.trim())
        }
      },
      {
        kind: 'input',
        type: "area",
        key: 'fdReason',
        value: fdReason,
        label: (
          <span className={classNames("form-item-label-option")}>触发条件及原因分析</span>
        ),
        name: 'fdReason',
        onChange: (e: any) => {
          onHandleChange("fdReason", e.target.value.trim())
        }
      },
    ],
  }

  return (
    <>
      {/* <CustomLayout title="原因分析" /> */}
      <div>
        <FormLayout formObj={formObj} />
      </div>
    </>
  )
}

export default ReasonAnalysis