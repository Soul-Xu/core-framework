// serve.ts

import { Method, AxiosRequestHeaders } from "axios";
import request from "./index";

export interface SettingDataServe extends Partial<any> {
  namespace?: "portal" | "dashboard";
}

export interface SettingServe {
  url: string;
  data?: SettingDataServe | any;
  method: Method;
  headers?: AxiosRequestHeaders;
}

export interface SettingServeResponse {
  code: number;
  data?: any;
  message: string;
}

export const settingServe = async (args: SettingServe) => {
  try {
    const response = await request(args.url, args.data, {
      method: args.method,
      headers: Object.assign({}, args.headers),
    }) as SettingServeResponse;

    if (response.code === 200) {
      return response;  // 成功时返回整个响应对象
    } else {
      console.log("server-error", response)
      // throw new Error(response.message);  // 处理非成功状态
    }
  } catch (error) {
    // 处理请求失败的情况
    // throw new Error('Internal Server Error');
  }
};
