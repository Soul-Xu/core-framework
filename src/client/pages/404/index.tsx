import styles from "./index.module.scss";
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);

const customPage = () => {
  return (
    <div className={classNames("container")}></div>
  )
}

export default customPage