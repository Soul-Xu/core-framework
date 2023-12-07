import React from "react"
/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const OpenAPI = () => {
  return (
    <>
      <div className={classNames("container")}>
        <div className={classNames("header")}>
          <div className={classNames("header-logo")}>logo</div>
          <div className={classNames("header-avatar")}>avatar</div>
        </div>
        <div className={classNames("body")}>
          <div className={classNames("body-timeline")}>timeline</div>
          <div className={classNames("body-upload")}>
          </div>
        </div>
      </div>
    </>
  )
}

export default OpenAPI