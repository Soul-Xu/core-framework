// 仅用于生产。在开发中，您将在调用堆栈中收到错误，以了解错误的来源。
import classnames from 'classnames/bind';
import React from "react";
import styles from './index.module.scss';

const classNames = classnames.bind(styles)

function Error(props: any) {
  const { res, err } = props
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return (
    <div className={classNames('page-error')}>
      {statusCode}
    </div>

  );
}

Error.getInitialProps = async ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
