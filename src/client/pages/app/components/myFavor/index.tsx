/**
 * 最近应用
 */
/** external library */
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { 
  CaretDownOutlined,
  CaretRightOutlined,
  ClockCircleOutlined,
  RedEnvelopeOutlined
} from "@ant-design/icons";

/** utils */
import { getRandomColor } from "../../../../utils/index";

/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

/** images */
import ImgCollectIcon from "public/images/apps/collect-icon.png"

/**
 * interface
 * @param props 
 * @returns 
 */

interface AppProps {
  id: string | number,
  icon?: string,
  name: string,

}

interface Props {
  appList: Array<AppProps>
}

const MyFavorApps = (props: Props) => {
  const { appList } = props
  const [isExpend, setIsExpanded] = useState(true)
  const [renderAppList, setRenderAppList] = useState([])

  useEffect(() => {
    if (appList?.length > 0) {
      const list: any = [...appList].reverse()
      setRenderAppList(list)
    }
  }, [appList])

  return (
    <div className={classNames("recent-apps")}>
      <div className={classNames("recent-apps-header")}>
        <div className={classNames("recent-apps-header-icon")}>
          <div className={classNames("recent-apps-header-icon-arrow")} onClick={() => setIsExpanded(!isExpend)}>
            { isExpend ? <CaretDownOutlined /> : <CaretRightOutlined />  }
          </div>
        </div>
        <div className={classNames("recent-apps-header-icon")}>
          <div className={classNames("recent-apps-header-icon-img")}>
            <Image src={ImgCollectIcon} width={18} height={18} alt="ImgCollectIcon" />
          </div>
        </div>
        <div className={classNames("recent-apps-header-title")}>我的收藏</div>
      </div>
      { isExpend && (
        <div className={classNames("recent-apps-list")}>
          { renderAppList?.map((app: any) => (
            <div className={classNames("recent-apps-list-item")} key={app.fdId}>
              <div className={classNames("recent-apps-list-item-icon")} 
                style={{ backgroundColor: app.navColor || getRandomColor() }}> 
                {app.fdIcon || <RedEnvelopeOutlined />} 
              </div>
              <div className={classNames("recent-apps-list-item-title")}>{app.fdAppName || "demo"}</div>
            </div>
          )) }
        </div>
      )}
    </div>
  )
}

export default MyFavorApps;