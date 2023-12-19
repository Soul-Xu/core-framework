import React from 'react'
import FormLayout from '../../components/formLayout';
import CustomLayout from '../customLayout/index';
import { Checkbox } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import styles from "./index.module.scss"
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);
import debounce from 'lodash/debounce';
import { setRecovery } from '../../store/modules/recoverySlice';

import { useImmerReducer } from "use-immer";
import { reducer } from "../../utils/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import { Divider } from 'antd';

const initialState = {
  fdRestoreCode: "", // 恢复代码
  fdHasProblem: false, // 潜在问题
  fdRestoreDesc: "", // 恢复过程描述
  fdEffectEstimate: "", // 可用性影响初步评估
  fdFollowTeam: "", // 主要跟进团队
  fdFollowUser: "", // 可用性跟进人 
  fdAssistTeam: "", // 协助跟进团队
  fdRestoreTime: "", // 业务恢复时间
  fdEffectDuration: "", // 受影响时长
  fdUsabilityLevel: "", // 可用性定级
  fdEffectPercent: "", // 业务影响比例
  fdBearPercent: "", // 责任团队及承担比例
  fdEffectDesc: "" // 业务影响概述
}

const RecoveryProcess = (props) => {
  const { form4, showForm5 } = props
  const dispatchRedux = useDispatch();
  const recovery = useSelector((state: any) => state.recovery.recovery)
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { 
    fdRestoreCode, fdRestoreDesc, fdEffectEstimate,
    fdFollowTeam, fdFollowUser, fdAssistTeam,
    fdRestoreTime, fdEffectDuration, fdUsabilityLevel,
    fdEffectPercent, fdBearPercent,
    fdEffectDesc, fdHasProblem
  } = data as any;
  const setState = (type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  };

  const onHandleChange = debounce((key: string, value: string) => {
    setState("update", { [key]: value})
    dispatchRedux(setRecovery({
      ...recovery,
      [key]: value
    }))
  }, 1000)

  const formObj1 = {
    inRow: 2,
    name: 'recovery-form-one',
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'select',
        key: 'fdRestoreCode',
        value: fdRestoreCode,
        label: (
          <span className={classNames("form-item-label-option")}>恢复代码</span>
        ),
        name: 'fdRestoreCode',
        onChange: (value: any) => {
          onHandleChange("fdRestoreCode", value)
        },
      },
      {
        kind: 'checkout',
        key: 'fdHasProblem',
        checked: fdHasProblem,
        name: '潜在问题',
        onChange: (e: any) => {
          onHandleChange("fdHasProblem", e.target.checked)
        }
      },
    ],
  }

  const formObj2 = {
    name: 'recovery-form-one',
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'input',
        type: "area",
        key: 'fdRestoreDesc',
        value: fdRestoreDesc,
        label: (
          <span className={classNames("form-item-label-option")}>恢复过程描述</span>
        ),
        name: 'fdRestoreDesc',
        onChange: (e: any) => {
          onHandleChange("fdRestoreDesc", e.target.value.trim())
        }
      },
    ],
  }

  const formObj3 = {
    name: 'recovery-form-two',
    inRow: 2,
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'select',
        key: 'fdEffectEstimate',
        value: fdEffectEstimate,
        label: (
          <span className={classNames("form-item-label-option")}>可用性影响初步评估</span>
        ),
        name: 'fdEffectEstimate',        
        onChange: (value: any) => {
          onHandleChange("fdEffectEstimate", value)
        }
      },
    ],
  }

  const formObj4 = {
    name: 'recovery-form-three',
    inRow: 2,
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'select',
        key: 'fdFollowTeam',
        value: fdFollowTeam,
        label: (
          <span className={classNames("form-item-label-option")}>主要跟进团队</span>
        ),
        name: 'fdFollowTeam',        
        onChange: (value: any) => {
          onHandleChange("fdFollowTeam", value)
        }
      },
      {
        kind: 'select',
        key: 'fdFollowUser',
        value: fdFollowUser,
        label: (
          <span className={classNames("form-item-label-option")}>可用性跟进人</span>
        ),
        name: 'fdFollowUser',
        onChange: (value: any) => {
          onHandleChange("fdFollowUser", value)
        }
      },
      {
        kind: 'select',
        key: 'fdAssistTeam',
        value: fdAssistTeam,
        label: (
          <span className={classNames("form-item-label-option")}>协助跟进团队</span>
        ),
        name: 'fdAssistTeam',
        onChange: (value: any) => {
          onHandleChange("fdAssistTeam", value)
        }
      },
      {
        kind: 'input',
        type: "text",
        key: 'fdRestoreTime',
        value: fdRestoreTime,
        label: (
          <span className={classNames("form-item-label-option")}>业务恢复时间</span>
        ),
        name: 'fdRestoreTime',
        onChange: (e: any) => {
          onHandleChange("fdRestoreTime", e.target.value.trim())
        }
      },
      {
        kind: 'select',
        key: 'fdEffectDuration',
        value: fdEffectDuration,
        label: (
          <span className={classNames("form-item-label-option")}>受影响时长</span>
        ),
        name: 'fdEffectDuration',
        onChange: (value: any) => {
          onHandleChange("fdEffectDuration", value)
        }
      },
      {
        kind: 'select',
        key: 'fdUsabilityLevel',
        value: fdUsabilityLevel,
        label: (
          <span className={classNames("form-item-label-option")}>可用性定级</span>
        ),
        name: 'fdUsabilityLevel',        
        onChange: (value: any) => {
          onHandleChange("fdUsabilityLevel", value)
        }
      },
      {
        kind: 'input',
        type: "text",
        key: 'fdEffectPercent',
        value: fdEffectPercent,
        label: (
          <span className={classNames("form-item-label-option")}>业务影响比例</span>
        ),
        name: 'fdEffectPercent',
        onChange: (e: any) => {
          onHandleChange("fdEffectPercent", e.target.value.trim())
        }
      },
      {
        kind: 'input',
        type: "text",
        key: 'fdBearPercent',
        value: fdBearPercent,
        label: (
          <span className={classNames("form-item-label-option")}>责任团队及承担比例</span>
        ),
        name: 'fdBearPercent',
        onChange: (e: any) => {
          onHandleChange("fdBearPercent", e.target.value.trim())
        }
      }
    ],
  }

  const formObj5 = {
    name: 'recovery-form-four',
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'input',
        type: "area",
        key: 'fdEffectDesc',
        value: fdEffectDesc,
        label: (
          <span className={classNames("form-item-label-option")}>业务影响概述</span>
        ),
        name: 'fdEffectDesc',
        onChange: (e: any) => {
          onHandleChange("fdEffectDesc", e.target.value.trim())
        }
      },
    ],
  }

  const formRender4 = form4 || formObj4
  const formRender5 = showForm5 === undefined ? true : false 

  return (
    <>
      {/* <CustomLayout title="恢复过程" /> */}
      <div>
        <FormLayout formObj={formObj1} />
        <FormLayout formObj={formObj2} />
        <FormLayout formObj={formObj3} />
        <FormLayout formObj={formRender4} />
        { formRender5 && <FormLayout formObj={formObj5} /> }
      </div>
    </>
  )
}

export default RecoveryProcess