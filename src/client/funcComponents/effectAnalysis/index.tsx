import React from 'react'
import FormLayout from '../../components/formLayout';
import CustomLayout from '../customLayout/index';
import styles from "./index.module.scss"
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);
import debounce from 'lodash/debounce';
import { setEffect } from '../../store/modules/effectSlice';

import { useImmerReducer } from "use-immer";
import { reducer } from "../../utils/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

const initialState = {
  fdLegal: "", // 合法合规
  fdBusiness: "", // 公司业务
  fdItSystem: "", // 信息系统
  fdReputation: "", // 影响声誉
  fdOther: "" // 其他
}

const EffectAnalysis = () => {
  const dispatchRedux = useDispatch();
  const effect = useSelector((state: any) => state.effect.effect)
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { fdLegal, fdBusiness, fdItSystem, fdReputation, fdOther } = data as any;
  const setState = (type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  };
  
  const onHandleChange = debounce((key: string, value: string) => {
    setState("update", { [key]: value})
    dispatchRedux(setEffect({
      ...effect,
      [key]: value
    }))
  }, 1000)

  const formObj = {
    name: 'effect-form',
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'input',
        type: "area",
        key: 'fdLegal',
        value: fdLegal,
        label: (
          <span className={classNames("form-item-label-option")}>合法合规</span>
        ),
        name: 'fdLegal',
        onChange: (e: any) => {
          onHandleChange("fdLegal", e.target.value.trim())
        }
      },
      {
        kind: 'input',
        type: "area",
        key: 'fdBusiness',
        value: fdBusiness,
        label: (
          <span className={classNames("form-item-label-option")}>公司业务</span>
        ),
        name: 'fdBusiness',
        onChange: (e: any) => {
          onHandleChange("fdBusiness", e.target.value.trim())
        }
      },
      {
        kind: 'input',
        type: "area",
        key: 'fdItSystem',
        value: fdItSystem,
        label: (
          <span className={classNames("form-item-label-option")}>信息系统</span>
        ),
        name: 'fdItSystem',
        onChange: (e: any) => {
          onHandleChange("fdItSystem", e.target.value.trim())
        }
      },
      {
        kind: 'input',
        type: "area",
        key: 'fdReputation',
        value: fdReputation,
        label: (
          <span className={classNames("form-item-label-option")}>影响声誉</span>
        ),
        name: 'fdReputation',
        onChange: (e: any) => {
          onHandleChange("fdReputation", e.target.value.trim())
        }
      },
      {
        kind: 'input',
        type: "area",
        key: 'fdOther',
        value: fdOther,
        label: (
          <span className={classNames("form-item-label-option")}>其他</span>
        ),
        name: 'fdOther',
        onChange: (e: any) => {
          onHandleChange("fdOther", e.target.value.trim())
        }
      },
    ],
  }

  return (
    <>
      {/* <CustomLayout title="影响分析" /> */}
      <div>
        <FormLayout formObj={formObj} />
      </div>
    </>
  )
}

export default EffectAnalysis