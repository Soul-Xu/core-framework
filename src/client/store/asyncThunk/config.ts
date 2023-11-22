import { Method } from "axios";

export interface AsyncThunkValueObject {
  method: Method;
  url: string;
}

export type AsyncThunkValue = AsyncThunkValueObject | Method;

/**
 * 默认url为 ''
 * 如果不使用默认url则需要传对象，否则传请求方式即可
 *
 * 需要将thunk名手动添加到 AsyncThunkMap 中，方便代码提示
 */

// demo
const demo: Record<string, AsyncThunkValue> = {
  getDemo: {
    method: "get",
    url: "/api/demo"
  },
  batchDemo: {
    method: "post",
    url: "/api/demo/"
  },
  postDemo: {
    method: "post",
    url: "/api/demo"
  },
  deleteDemo: {
    method: "delete",
    url: "/api/demo/:id"
  }
};

// 应用
const apps: Record<string, AsyncThunkValue> = {
  // 获取应用列表
  getApps: {
    method: "post",
    url: "/api/apps/getApps"
  },
  // 新建应用
  createApp: {
    method: "post",
    url: "/api/apps/createApp"
  },
  // 编辑应用
  updateApp: {
    method: "post",
    url: "/api/apps/updateApp/:id"
  },
  // 删除应用
  deleteApp: {
    method: "delete",
    url: "/api/apps/deleteApp/:id"
  }
};

const asyncThunkMap: Record<string, AsyncThunkValue> = {
  login: {
    method: "post",
    url: "/api/login"
  },
  ...demo,
  ...apps
};

export type AsyncThunkMap =
  | "login" 
  | "getApps"
  | "createApp"
  | "updateApp"
  | "deleteApp"


export default asyncThunkMap;
