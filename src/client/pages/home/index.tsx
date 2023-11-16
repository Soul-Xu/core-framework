/** 第三方库 */
import { NextPage } from 'next';

/** 样式 */
import classnames from "classnames/bind";
import PageLayout from '../../layout/PageLayout';
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const Home: NextPage = () => {
  return(
    // @ts-expect-error


    <PageLayout>
      <section className={classNames("container")}>
        <div className={classNames("content")}>
          111
        </div>
      </section>
    </PageLayout>
  )
}

export default Home