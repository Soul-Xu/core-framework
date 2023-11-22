/**
 * 我的待办
 */
/** external library */
import { NextPage } from 'next';
import React from 'react';
/** components */
import TodoContainer from './components/container';
import TableLayout from '../../components/tableLayout';

const pagination = {
  page: 0,
  pageSize: 10,
  total: 0
}

const AppById = () => {
  const tableObj = {
    columns: [],
    datasource: [],
    current: 0,
    api: "/api",
    pagination: pagination,
    onChangePage: () => {}
  }

  return (
    <>
      <TodoContainer>
        <TableLayout tableObj={tableObj} />
      </TodoContainer>
    </>
  )
}

export default AppById
