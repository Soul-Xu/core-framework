import classnames from "classnames/bind";
import React from "react";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const customPage = () => {
  return (
    <div className={classNames("container")}></div>
  )
}

export default customPage