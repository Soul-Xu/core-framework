import { DatePicker, Form, Input, Radio, Select, Table } from 'antd';
import classnames from 'classnames/bind';
import React from "react";
import style from './index.module.scss';

const { RangePicker } = DatePicker;
const classNames = classnames.bind(style);

interface IPagination {
  page: number,
  pageSize: number,
  total: number
}

interface IFormObjProps {
  name: string,
  layout?: string | any,
  items: Array<any>,
  customElements: any
}

interface IChangePageFunc {
  (page: number, pageSize: number): void
}

interface ITableObjProps {
  columns?: Array<any>,
  datasource?: any,
  api?: string,
  customElements?: any,
  pagination: IPagination,
  onChangePage?: IChangePageFunc
}

interface SearchLayoutProps {
  formObj: IFormObjProps,
  tabelObj: ITableObjProps
}

const SearchLayout = ({
  formObj = {
    name: '', // Form名称
    layout: 'inline',
    items: [], // FormItem类型
    customElements: (params: any) => (<></>) // 附加的dom，eg: button
  },
  tabelObj = {
    columns: [],
    datasource: [],
    api: '',
    customElements: () => (<></>),
    pagination: {
      page: 1,
      pageSize: 50,
      total: 0
    },
    onChangePage: (page: number, pageSize: number) => {}
  }
}: SearchLayoutProps) => {
  const FormComponent = () => {
    const { items, layout, customElements } = formObj
    const [form] = Form.useForm();

    return (
      <Form form={form} layout={layout} id={formObj.name} name={formObj.name} className={classNames("form-content")}>
        { items.length > 0 && items.map((item: any, index: number) => {
          if (item.type === 'input') {
            return (
              <Form.Item label={item.label} key={item.key} name={item.name} className={classNames("form-item")}>
                <Input placeholder={item.placeholder} value={item.value} onChange={(e) => item.callback(e)} />
              </Form.Item>
            )
          }
          if (item.type === 'select') {
            return (
              <Form.Item label={item.label} key={item.key} name={item.name} className={classNames("form-item")}>
                <Select
                  allowClear
                  placeholder={item.placeholder}
                  options={item.options}
                  onChange={(data: number) => item.callback(data)}
                 />
              </Form.Item>
            )
          }
          if (item.type === 'datepicker') {
            return (
              <Form.Item label={item.label} key={item.key} name={item.name} className={classNames("form-item")}>
                {/* 

 */}
                <RangePicker
                  onChange={(time: any) => {
                    item.callback(time)
                  }}
                />
              </Form.Item>
            )
          }
          if (item.type === 'radio') {
            return (
              <Form.Item label={item.label} key={item.key} name={item.name} className={classNames("form-item")}>
                <Radio.Group options={item.options} onChange={item.callback}/>
              </Form.Item>
            )
          }
          return null
        }) }
        <div>
          { typeof customElements === 'function' && (
            <>{customElements()}</>
          ) }
        </div>
      </Form>
    )
  }

  const TableComponent = () => {
    const { columns, datasource, customElements, pagination, onChangePage } = tabelObj
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
                current: page,
                pageSize,
                total,
                defaultPageSize: 10,
                onChange: (page, pageSize) => {
                  onChangePage && onChangePage(page, pageSize)
                }
              }}
            />
          </div>
        </>
    )
  }

  return (
    <div>
      <div className={classNames("basic-wrap")}>
        <div className={classNames("form-wrap")}>
          {FormComponent()}
        </div>
        <div className={classNames("table-wrap")}>
          {TableComponent()}
        </div>
      </div>
    </div>
  )
}

export default SearchLayout
