import React from "react"
/** css */
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const OpenAPI = () => {
  const renderUpload = (status: any) => {
    switch(status) {
      case "loading": {

      }
      case "done": {

      }
      case "fail": {

      }
      default: 
        return
    }
  }

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
            {/* <Upload>
              {renderUpload("done")}
            </Upload> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default OpenAPI