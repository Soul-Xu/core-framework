import React, { useEffect } from 'react'
import { NextPage } from 'next'
import styles from "./index.module.scss";
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);
import { Tabs, message, Button } from 'antd'
const { TabPane } = Tabs;

/** components */
import BasicInformation from '../../../../../funcComponents/basicInformation/index';
import HandleInformation from '../../../../../funcComponents/handleInformation/index';
import ReasonAnalysis from '../../../../../funcComponents/reasonAnalysis/index';
import RecoveryProcess from '../../../../../funcComponents/recoveryProcess/index';
import EffectAnalysis from '../../../../../funcComponents/effectAnalysis/index';
import AttachmentUpload from '../../../../../funcComponents/attachmentUpload/index';
import ProcessIframe from "../../../../../funcComponents/processIframe"
import CustomLayout from "../../../../../funcComponents/customLayout/index"

interface EventManageProps {
}

const frontendURL = "https://yunsucoding.landray.com.cn/web"
const processId = "1hbcove6fw3mwqa6w268kv4hofm0l21b88w2"

const EventManage: NextPage = () => {
  const fnMaps = [
    {
      id: "reasonAnalysis",
      label: "原因分析",
      value: () => {
        return (
          <>
            {/* @ts-ignore */}
            <ReasonAnalysis />
          </>
        )
      }
    },
    {
      id: "recoveryProcess",
      label: "恢复过程",
      value: () => {
        return (
          <>
            {/* @ts-ignore */}
            <RecoveryProcess />
          </>
        )
      }
    },
    {
      id: "attachmentUpload",
      label: "附件上传",
      value: () => {
        return (
          <>
          {/* @ts-ignore */}
          <AttachmentUpload />
          </>
        )
      }
    },
    {
      id: "auditNotes",
      label: "流程审批意见",
      value: () => {
        return (
          <>
          {/* @ts-ignore */}
          <ProcessIframe type="auditNotes" processId={processId} />
          </>
        )
      }
    },
    {
      id: "processStatus",
      label: "流程状态",
      value: () => {
        return (
          <>
            {/* @ts-ignore */}
            <ProcessIframe type="processStatus" processId={processId} />
          </>
        )
      }
    },
    {
      id: "auditChart",
      label: "流程图",
      value: () => {
        return (
          <>
            {/* @ts-ignore */}
            <ProcessIframe type="auditChart" processId={processId} />
          </>
        )
      }
    },
    {
      id: "auditLogs",
      label: "流程操作日志",
      value: () => {
        return (
          <>
            {/* @ts-ignore */}
            <ProcessIframe type="auditLogs" processId={processId} />
          </>
        )
      }
    },
  ]

  const onChange = (key: string) => {
    console.log(key);
  };

  const onSubmit = () => {

  }

  return(
    <div>
           <div className={classNames("container")}>
        <section className={classNames("container-form")}>
          <div className={classNames("content")}>
            <BasicInformation />
            <HandleInformation />
            <div className={classNames("content-tabs")}>
              <Tabs
                onChange={onChange}
                type="card"
                items={fnMaps.map((item, i) => {
                  return {
                    label: item.label,
                    key: item.id,
                    children: item.value(),
                  };
                })}
              />
            </div>
          </div>
        </section>
        <section className={classNames("container-process")}>
          <CustomLayout title="流程引擎" />
          <iframe
            id="auditForm"
            className={classNames("process")}
            width="1300"
            src={`${frontendURL}/sys-lbpm/desktop/#/lbpmIntegrate/integrate/auditForm?fdProcessId=${processId}`}
          />
        </section>
      </div>
      <div className={classNames("action")}>
        <Button 
          type="primary" 
          className={classNames("action-submit")}
          onClick={onSubmit}
        >提交</Button>
        <Button className={classNames("action-btn")}>暂存</Button>
        <Button className={classNames("action-btn")}>保存</Button>
        <Button className={classNames("action-btn")}>取消</Button>
        <Button className={classNames("action-btn")}>重置</Button>
      </div>
    </div>
  )
}

export default EventManage