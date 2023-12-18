import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import styles from "./index.module.scss"
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);

/** components */
import ProcessIfame from '../processIframe'
const { TabPane } = Tabs;

const ProcessLayout= (processId: string) => {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div>
      {/* @ts-ignore */}
      <Tabs defaultActiveKey="auditForm" onChange={onChange}>
        <TabPane tab="流程操作" key="auditForm">
          {<ProcessIfame type="submit" processId={processId} />}
        </TabPane>
        <TabPane tab="审批意见" key="auditNotes">
          {<ProcessIfame type="auditNotes" processId={processId} />}
        </TabPane>
        <TabPane tab="流程状态" key="processStatus">
          {<ProcessIfame type="processStatus" processId={processId} />}
        </TabPane>
        <TabPane tab="流程图" key="auditChart">
          {<ProcessIfame type="auditChart" processId={processId} />}
        </TabPane>
        <TabPane tab="操作日志" key="auditLogs">
          {<ProcessIfame type="auditLogs" processId={processId} />}
        </TabPane>
        <TabPane tab="基本信息" key="basicInfo">
          {<ProcessIfame type="basicInfo" processId={processId} />}
        </TabPane>
        <TabPane tab="传阅记录" key="auditcirculated">
          {<ProcessIfame type="auditcirculated" processId={processId} />}
        </TabPane>
        <TabPane tab="流程预估" key="tableEstimated">
          {<ProcessIfame type="tableEstimated" processId={processId} />}
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ProcessLayout