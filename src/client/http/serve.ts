// import { ServeData } from "@/dto";
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
  const res = await request(
    agrs.url,
    agrs.data,
    {
      method: agrs.method,
      headers: Object.assign({}, agrs.headers)
    }
  )?.catch((e) => {
    console.log(300, e);
    throw Error(e);
  });

  return res;
};
