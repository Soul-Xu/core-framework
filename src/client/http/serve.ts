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

export const settingServe = async (agrs: SettingServe) => {
  console.log("111111111-client-headers", agrs)
  const cookie = localStorage.getItem("cookie")
  const res = await request(
    agrs.url,
    agrs.data,
    {
      method: agrs.method,
      headers: Object.assign({
        "cookie": cookie
      }, agrs.headers)
    }
  )?.catch((e) => {
    console.log(300, e);
    throw Error(e);
  });
  return res;
};
