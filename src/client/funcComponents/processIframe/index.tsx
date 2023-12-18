import React from 'react'
import styles from "./index.module.scss"
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);

const frontendURL = "https://yunsucoding.landray.com.cn/web"
const iframePre = `${frontendURL}/sys-lbpm/desktop/#/lbpmIntegrate/integrate`

const ProcessIframe = (props: any) => {
  const { type, processId } = props

  const renderSrc = () => {
    switch(type) {
      // 嵌入流程操作页面（右侧）
      case "submit": 
        return `${iframePre}/auditForm?fdProcessId=${processId}&submitBtnPosition=top`
      // 嵌入流程操作页面
      case "auditForm":
        return `${iframePre}/auditForm?fdProcessId=${processId}&approveLayout=bottomEmb&submitBtnPosition=top`
      // 嵌入流程审批意见页面
      case "auditNotes":
        return `${iframePre}/auditNotes?fdProcessId=${processId}`
      // 嵌入流程状态页面
      case "processStatus":
        return `${iframePre}/processStatus?fdProcessId=${processId}`
      // 嵌入流程图页面
      case "auditChart":
        return `${iframePre}/auditChart?fdProcessId=${processId}`
      // 嵌入流程操作日志页面
      case "auditLogs":
        return `${iframePre}/auditLogs?fdProcessId=${processId}`
      // 嵌入流程基本信息页面
      case "basicInfo":
        return `${iframePre}/integrate/basicInfo?fdProcessId=${processId}`
      // 嵌入传阅记录页面
      case "auditcirculated":
        return `${iframePre}/integrate/auditcirculated?fdProcessId=${processId}`
      // 嵌入流程预估页面
      case "tableEstimated":
        return `${iframePre}/integrate/tableEstimated?fdProcessId=${processId}`
      default:
        break
    }
  }

  return (
    <div>
      <iframe
        id={`${type}-iframe`}
        style={{ border: "none" }}
        width="100%"
        height="500"
        src={renderSrc()}
      />
    </div>
  )
}

export default ProcessIframe