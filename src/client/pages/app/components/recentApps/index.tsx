/**
 * 最近应用
 */
import React from "react";

const RecentApps = () => {
  return (
    <div className="recent-apps">
      <div className="recent-apps-header">
        <div className="recent-apps-header-icon"></div>
        <div className="recent-apps-header-title">最近使用的应用</div>
      </div>
      <div className="recent-apps-body">
        <div className="recent-apps-body-item">
          <div className="recent-apps-body-item-icon"></div>
          <div className="recent-apps-body-item-title">应用名称</div>
        </div>
      </div> 
    </div>
  )
}

export default RecentApps;