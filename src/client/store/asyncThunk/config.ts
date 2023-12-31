import { Method } from "axios";

export interface AsyncThunkValueObject {
  method: Method;
  url: string;
}

export type AsyncThunkValue = AsyncThunkValueObject | Method;

/**
 * 需要将thunk名手动添加到 AsyncThunkMap 中，方便代码提示
 */

// 应用 - apps
const apps: Record<string, AsyncThunkValue> = {
  // 应用列表
  getApps: {
    method: "post",
    url: "/apis/apps/getApps"
  },
  // 新建应用
  addApps: {
    method: "post",
    url: "/apis/apps/addApps"
  },
  // 编辑应用
  updateApps: {
    method: "post",
    url: "/apis/apps/updateApps"
  },
  // 删除应用
  deleteApps: {
    method: "post",
    url: "/apis/apps/deleteApps"
  }
};

// 应用详情
const projects: Record<string, AsyncThunkValue> = {
  // 新建一级菜单
  addTabs: {
    method: "post",
    url: "/apis/menus/addTabs"
  },
  // 编辑一级菜单
  updateTabs: {
    method: "post",
    url: "/apis/menus/updateTabs"
  },
  // 删除一级菜单
  deleteTabs: {
    method: "post",
    url: "/apis/menus/deleteTabs"
  },
  // 获取一级菜单列表
  getTabs: {
    method: "post",
    url: "/apis/menus/getTabs"
  },
  // 新建二级菜单
  addMenus: {
    method: "post",
    url: "/apis/menus/addMenus"
  },
  // 编辑二级菜单
  updateMenus: {
    method: "post",
    url: "/apis/menus/updateMenus"
  },
  // 编辑二级菜单
  deleteMenus: {
    method: "post",
    url: "/apis/menus/deleteMenus"
  },
  // 获取二级菜单列表
  getMenus: {
    method: "post",
    url: "/apis/menus/getMenus"
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
  // 权限管理--新增权限
  addPermissions: {
    method: "post",
    url: "/apis/permission/addPermissions"
  },
  // 权限管理--编辑权限
  updatePermissions: {
    method: "post",
    url: "/apis/permission/updatePermissions"
  },
  // 权限管理--编辑权限
  deletePermissions: {
    method: "post",
    url: "/apis/permission/deletePermissions"
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
  // 角色管理--编辑角色
  updateRoles: {
    method: "post",
    url: "/apis/permission/updateRoles"
  },
  // 角色管理--编辑角色
  deleteRoles: {
    method: "post",
    url: "/apis/permission/deleteRoles"
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
  // 编辑部门
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
  ...apps,
  ...projects,
  ...permission
};

export type AsyncThunkMap =
  | "login" 
  | "getApps"
  | "addApps"
  | "updateApps"
  | "deleteApps"
  | "addTabs"
  | "updateTabs"
  | "deleteTabs"
  | "getTabs"
  | "addMenus"
  | "updateMenus"
  | "deleteMenus"
  | "getMenus"
  | "addModules"
  | "updateModules"
  | "deleteModules"
  | "uniqueModules"
  | "getModules"
  | "addPermissions"
  | "updatePermissions"
  | "deletePermissions"
  | "getPermissions"
  | "uniquePermissions"
  | "addRoles"
  | "updateRoles"
  | "deleteRoles"
  | "getRoles"
  | "getRolesInfo"
  | "getRolesOption"
  | "addUsers"
  | "updateUsers"
  | "deleteUsers"
  | "getUsers"
  | "addDepts"
  | "updateDepts"
  | "deleteDepts"
  | "getDepts"
  | "getAddress"

export default asyncThunkMap;