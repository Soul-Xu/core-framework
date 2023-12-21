// asyncThunk.js

import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { Method } from "axios";
import { settingServe, SettingServeResponse } from "../../http/serve";
import asyncThunkMap, { AsyncThunkMap, AsyncThunkValueObject } from "./config";

type Thunk = Record<AsyncThunkMap, AsyncThunk<any, SettingServeResponse['data'], any>>;

// 自动生成thunk
const autoAsyncThunk = (name: string, method: Method, url: string) => {
  return createAsyncThunk(name, async (data?: any) => {
    try {
      const response = await settingServe({ data, method, url });
      return response;  // 只返回成功时的数据部分
    } catch (error) {
      console.log("asyncThunk", error)
      throw error;  // 将错误重新抛出，让 Redux Toolkit 处理错误状态
    }
  });
};

const thunk: any = {};
for (const key in asyncThunkMap) {
  let customMethod: Method;
  let url: string;
  if (typeof asyncThunkMap[key] === "string") {
    customMethod = (asyncThunkMap[key] as Method).toLowerCase() as Method;
    url = "";
  } else {
    customMethod = (asyncThunkMap[key] as AsyncThunkValueObject).method.toLowerCase() as Method;
    url = (asyncThunkMap[key] as AsyncThunkValueObject).url;
  }

  const name: AsyncThunkMap = `${key}` as AsyncThunkMap;

  thunk[name] = autoAsyncThunk(name, customMethod, url);
}

export default thunk as Thunk;
