/**
 * 表格开发组件
 */
import { Table } from 'antd';
import classnames from 'classnames/bind';
import React from "react";
import style from './index.module.scss';

const classNames = classnames.bind(style);

interface IPagination {
  page: number,
  pageSize: number,
  total: number
}

interface IChangePageFunc {
  (page: number, pageSize: number): void
}

interface ITableObjProps {
  columns?: Array<any>,
  datasource?: any,
  rowKey?: string,
  api?: string,
  customElements?: any,
  pagination: IPagination,
  onChangePage: IChangePageFunc
}

interface TableLayoutProps {
  tableObj: ITableObjProps
}

const TableLayout = ({
  tableObj = {
    columns: [],
    datasource: [],
    rowKey: "",
    api: '',
    customElements: () => (<></>),
    pagination: {
      page: 1,
      pageSize: 50,
      total: 0
    },
    onChangePage: (page: number, pageSize: number) => {}
  }
}: TableLayoutProps) => {
  const TableComponent = () => {
    const { columns, datasource, rowKey, customElements, pagination, onChangePage } = tableObj
    const { page, pageSize, total } = pagination

    return (
        <>
          { typeof customElements === 'function' && (
            <div className={classNames("table-status")}>{customElements(datasource)}</div>
          ) }
          <div>
            <Table
              columns={columns}
              dataSource={datasource}
              pagination={{
                hideOnSinglePage: true,
                current: page,
                pageSize,
                total,
                onChange: (page, pageSize) => {
                  onChangePage(page, pageSize)
                }
              }}
              rowKey={rowKey}
            />
          </div>
        </>
    )
  }

  return (
    <div>
      <div className={classNames("basic-wrap")}>
        <div className={classNames("table-wrap")}>
          {TableComponent()}
        </div>
      </div>
    </div>
  )
}

export default TableLayout
