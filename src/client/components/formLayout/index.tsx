import React, { useState } from 'react'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { 
  Form, Input, Select, DatePicker, Upload, 
  Checkbox, Button, Row, Col, Space, 
  Progress
} from 'antd'
import classnames from 'classnames/bind';
import style from './index.module.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入中文语言环境

dayjs.locale('zh-cn'); // 设置全局的语言环境为中文

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input
const { Dragger } = Upload;
const classNames = classnames.bind(style);

const localeCN = {}

interface ItemProps {
  kind: string, // input、select、datepicker
}

interface IFormObjProps {
  name: string,
  layout?: string | any,
  inRow?: number,
  labelAlign?: string | any,
  items: Array<any>,
  customElements?: any
}

interface FormLayoutProps {
  formObj: IFormObjProps,
}

const FormLayout = ({
  formObj = {
    name: '', // Form名称
    layout: 'inline', // Form布局
    items: [], // FormItem类型
    customElements: (params: any) => (<></>) // 附加的dom，eg: button
  }
}: FormLayoutProps) => {
  const getFields = (items: any, cols) => {
    const children = [];
    items.map((item: any, index: number) => {
      children.push(
        <Col 
          span={24 / cols} 
          key={item.key} 
          style={(index) % cols === 0 ? { 
            paddingLeft: "0", paddingRight: "8px"
          }: { 
            paddingLeft: "8px", paddingRight: "8px"
          }}>
          <Form.Item 
            colon={false}
            required={item?.require} 
            label={item.label} 
            key={item.key} 
            name={item.name}
            rules={item?.rules}
            >
              { item.kind === "input" && item.type !== "area"&& <Input {...item} /> }
              { item.kind === "input" && item.type === "area" && <TextArea {...item}/> }
              { item.kind === "select" && <Select {...item} /> }
              { item.kind === "checkout" && 
                <span>
                  <Checkbox {...item} />
                  <span style={{marginLeft: "8px"}}>{item.name}</span>
                </span>
              }
              { item.kind === "datepicker" && 
                <Space direction="vertical">
                  {/* @ts-ignore */}
                  <DatePicker
                    // style={{ width: "228px"}}
                    // 如果需要时间选择器，也可以设置时间格式
                    showTime={{
                      format: 'HH:mm',
                    }}
                   {...item} 
                   />
                </Space>
              }
              { item.kind === "progress" && <Progress {...item} />}
            </Form.Item>
        </Col>,
      );
    })
    return children;
  }

  const FormComponent = () => {
    const { items, layout, labelAlign, customElements, inRow, ...rest } = formObj
    const [form] = Form.useForm();

    // 配置inRow不为1, 则以一行三列的形式进行布局
    if (inRow && inRow !== 1) {
      return (
        <Form
          {...rest} 
          form={form} 
          labelAlign={labelAlign} 
          id={formObj.name} 
          name={formObj.name} 
          key={formObj.name}
        >
          <Row>{getFields(items, inRow)}</Row>
        </Form>
      )
    }

    return (
      <Form 
        {...rest} 
        form={form} 
        layout={layout} 
        labelAlign={labelAlign} 
        id={formObj.name} 
        name={formObj.name} 
        key={formObj.name}
      >
        { items.length > 0 && items.map((item: any, index: number) => {
          if (item.kind === 'input') {
            const itemRequire = item?.require
            delete item.require
            return (
              <Row>
                <Col span={24} className={item?.classname}>
                  <Form.Item 
                    colon={false}
                    required={itemRequire} 
                    label={item.label} 
                    key={item.key} 
                    name={item.name} 
                    rules={item?.rules}
                  >
                    { item?.type !== "area" && (
                      <Input value={item?.value} {...item}/>
                    )}
                    { item?.type === "area" && (
                      <TextArea {...item}/>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            )
          }
          if (item.kind === 'select') {
            return (
              <Row>
                <Col span={24}>
                  <Form.Item 
                    colon={false}
                    required={item?.require} 
                    label={item.label} 
                    key={item.key} 
                    name={item.name} 
                  >
                    <Select />
                    {item?.customElement}
                  </Form.Item>
                </Col>
              </Row>
            )
          }
          if (item.kind === 'datepicker') {
            return (
              <Row>
                <Col span={24}>
                  <Form.Item 
                    colon={false}
                    label={item.label} 
                    key={item.key} 
                    name={item.name} 
                  >
                    {/* @ts-ignore */}
                    <DatePicker {...item} />
                  </Form.Item>
                </Col>
              </Row>
            )
          }
          if (item.kind === 'uploadFile') {
            return (
              <Form.Item 
                colon={false}
                required={item?.require} 
                label={item.label} 
                key={item.key} 
                name={item.name} 
              >
                <Upload {...item}>
                  {/* @ts-ignore */}
                  <Button icon={<UploadOutlined />}>{item.title}</Button>
                </Upload>
              </Form.Item>
            )
          }
          if (item.kind === 'uploadImage') {
            return (
              <Form.Item 
                colon={false}
                required={item?.require} 
                label={item.label} 
                key={item.key} 
                name={item.name} 
                style={{ width: "300px", height: "300px" }}
              >
                <Dragger>
                  <p className="ant-upload-drag-icon">
                    {/* @ts-ignore */}
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-hint">{item.title}</p>
                  {/* <p className="ant-upload-hint" style={item.styleTip}>{item.tip}</p> */}
                </Dragger>
              </Form.Item>
            )
          }
          if (item.kind === 'progress') {
            return (
              <Form.Item
                colon={false} 
                required={item?.require} 
                label={item.label} 
                key={item.key} 
                name={item.name} 
              >
                <div style={{width: item?.width}}>
                  <Progress {...item} />
                </div>
              </Form.Item>
            )
          }
          if (item.kind === 'action') {
            return (
              <Form.Item 
                colon={false}
                required={item?.require} 
                label={item.label || ""} key={item.key} name={item.name}>
                { item.customElement }
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

  return (
    <div>
      {FormComponent()}
    </div>
  )
}

export default FormLayout
