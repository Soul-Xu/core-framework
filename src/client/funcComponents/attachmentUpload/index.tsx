import React from 'react'
import FormLayout from '../../components/formLayout';
import CustomLayout from '../customLayout/index';
import styles from "./index.module.scss"
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);
import debounce from 'lodash/debounce';

import { useImmerReducer } from "use-immer";
import { reducer } from "../../utils/reducer";
import { useDispatch, useSelector } from "react-redux";
import { message } from 'antd';
import type { UploadProps } from 'antd';

const initialState = {
  fdFiles: [], // 文件上传
  fdImages: [] // 图片上传
}

const AttachmentUpload = () => {
  const dispatchRedux = useDispatch();
  const [data, dispatch] = useImmerReducer(reducer, initialState);
  const { fdFiles, fdImages } = data as any;
  const setState = (type: string, val: Record<string, any>) => {
    dispatch({ type, payload: val });
  };
  
  const onHandleChange = debounce((key: string, value: string) => {
    setState("update", { [key]: value})
  }, 1000)

  const propsFile: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const propsImage: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped fdFiles', e.dataTransfer?.fdFiles);
    },
  };

  const formObj = {
    name: 'upload-form',
    layout: "horizontal",
    labelAlign: "right",
    items: [
      {
        kind: 'uploadFile',
        key: 'fdFiles',
        fileList: fdFiles,
        label: (
          <span className={classNames("form-item-label-option")}>上传附件</span>
        ),
        name: 'fdFiles',
        title: "上传附件",
        onChange: (e: any) => {
          console.log("上传附件")
          // onHandleChange("fdFiles", e.target.value.trim())
        },
        ...propsFile
      },
      {
        kind: 'uploadImage',
        key: 'fdImages',
        fileList: fdImages,
        label: (
          <span className={classNames("form-item-label-option")}>图片上传</span>
        ),
        name: 'fdImages',
        title: "点击或拖拽添加图片",
        tip: "注：支持上传jpg/gif/png格式，单张不超过5M",
        styleTip: {
          width: "70%",
          margin: "0 auto"
        },
        onChange: (e: any) => {
          console.log("点击或拖拽添加图片")
          // setState("update", { fdImages: e.target.value.trim()})
        },
        ...propsImage
      },
    ],
  }

  return (
    <>
      {/* <CustomLayout title="附件上传" /> */}
      <div style={{ display: "flex" }}>
        <FormLayout formObj={formObj} />
      </div>
    </>
  )
}

export default AttachmentUpload