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

// 应用 - apps
const apps: Record<string, AsyncThunkValue> = {
  // 获取应用列表
  getApps: {
    method: "post",
    url: "/apis/apps/getApps"
  },
  // 新建应用
  createApp: {
    method: "post",
    url: "/apis/apps/createApp"
  },
  // 编辑应用
  updateApp: {
    method: "post",
    url: "/apis/apps/updateApp/:id"
  },
  // 删除应用
  deleteApp: {
    method: "delete",
    url: "/apis/apps/deleteApp/:id"
  }
};

// 应用详情
const projects: Record<string, AsyncThunkValue> = {
  // 新建一级菜单
  createTab: {
    method: "post",
    url: "/apis/apps/createApp"
  },
  // 获取一级菜单列表
  getTabs: {
    method: "post",
    url: "/apis/apps/createApp"
  },
  // 新建二级菜单
  createMenu: {
    method: "post",
    url: "/apis/apps/updateApp/:id"
  },
  // 获取一级菜单列表
  getMenus: {
    method: "post",
    url: "/apis/apps/createApp"
  },
};

// 权限设置
const permission: Record<string, AsyncThunkValue> = {
  // 模块新增接口
  addModules: {
    method: "post",
    url: "/apis/permission/addModules"
  },
  // 模块编辑接口
  updateModules: {
    method: "post",
    url: "/apis/permission/updateModules"
  },
  // 模块删除接口
  deleteModules: {
    method: "post",
    url: "/apis/permission/deleteModules"
  },
  // 检查模块标识是否唯一接口
  uniqueModules: {
    method: "post",
    url: "/apis/permission/uniqueModules"
  },
  // 模块列表接口
  getModules: {
    method: "post",
    url: "/apis/permission/getModules"
  },
  // 功能权限定义接口
  addFuncs: {
    method: "post",
    url: "/apis/permission/addFuncs"
  },
  // 功能权限定义--获取可选模块
  getFuncs: {
    method: "post",
    url: "/apis/permission/getFuncs"
  },
  // 权限管理--获取权限列表
  getPermissions: {
    method: "post",
    url: "/apis/permission/getPermissions"
  },
  // 功能权限定义接口
  uniquePermissions: {
    method: "post",
    url: "/apis/permission/uniquePermissions"
  },
  // 角色管理--新增角色
  addRoles: {
    method: "post",
    url: "/apis/permission/addRoles"
  },
  // 角色管理--获取角色列表
  getRoles: {
    method: "post",
    url: "/apis/permission/getRoles"
  },
  // 角色管理--获取角色数据
  getRolesInfo: {
    method: "post",
    url: "/apis/permission/getRolesInfo"
  },
  // 角色管理--获取可选的角色列表
  getRolesOption: {
    method: "post",
    url: "/apis/permission/getRolesOption"
  },
  // 组织架构维护
  // 新增用户
  addUsers: {
    method: "post",
    url: "/apis/permission/addUsers"
  },
  // 编辑用户
  updateUsers: {
    method: "post",
    url: "/apis/permission/updateUsers"
  },
  // 删除用户
  deleteUsers: {
    method: "post",
    url: "/apis/permission/deleteUsers"
  },
  // 用户列表接口
  getUsers: {
    method: "post",
    url: "/apis/permission/getUsers"
  },
  // 新增部门
  addDepts: {
    method: "post",
    url: "/apis/permission/addDepts"
  },
  // 新增部门
  updateDepts: {
    method: "post",
    url: "/apis/permission/updateDepts"
  },
  // 删除部门
  deleteDepts: {
    method: "post",
    url: "/apis/permission/deleteDepts"
  },
  // 部门列表接口
  getDepts: {
    method: "post",
    url: "/apis/permission/getDepts"
  },
  // 地址本接口（用户选择器）
  getAddress: {
    method: "post",
    url: "/apis/permission/getAddress"
  },
};

const asyncThunkMap: Record<string, AsyncThunkValue> = {
  login: {
    method: "post",
    url: "/apis/login"
  },
  ...demo,
  ...apps,
  ...projects,
  ...permission
};

export type AsyncThunkMap =
  | "login" 
  | "getApps"
  | "createApp"
  | "updateApp"
  | "deleteApp"
  | "createTab"
  | "createMenu"
  | "addModules"
  | "updateModules"
  | "deleteModules"
  | "uniqueModules"
  | "getModules"
  | "addFuncs"
  | "getFuncs"
  | "getPermissions"
  | "uniquePermissions"
  | "addRoles"
  | "getRoles"
  | "getRolesInfo"
  | "getRolesOption"
  | "addUsers"
  | "updateDepts"
  | "deleteUsers"
  | "getUsers"
  | "addDepts"
  | "deleteDepts"
  | "getDepts"
  | "getAddress"

export default asyncThunkMap;
