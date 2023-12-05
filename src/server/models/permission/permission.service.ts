import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { baseApi, Global } from 'src/server/config';
import { AddModulesDto } from './dto/add-modules.dto';
import { UniqueModulesDto } from './dto/unique-modules.dto';
import { GetModulesDto } from './dto/get-modules.dto';
import { AddFuncsDto } from './dto/add-funcs.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { GetPermissionsDto } from './dto/get-permissions.dto';
import { UniquePermissionsDto } from './dto/unque-permissions.dto';
import { AddRolesDto } from './dto/add-roles.dto';
import { GetRolesDto } from './dto/get-roles.dto';
import { GetRolesInfoDto } from './dto/get-roles-info.dto';
import { AddUsersDto } from './dto/add-users.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { AddDeptsDto } from './dto/add-depts.dto';
import { GetDeptsDto } from './dto/get-depts.dto';

@Injectable()
export class PermissionService {
  async addModules(body: AddModulesDto) {
    console.log("222222-addModules", body)
    const res = await axios.request({
      url: `${baseApi}/api-module/add`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async uniqueModules(body: UniqueModulesDto) {
    const res = await axios.request({
      url: `${baseApi}/api-module/is-moduleKey-unique`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async getModules(body: GetModulesDto) {
    const res = await axios.request({
      url: `${baseApi}/api-module/list`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async addFuncs(body: AddFuncsDto) {
    const res = await axios.request({
      url: `${baseApi}/api-permission/add`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async getFuncs(body: CreatePermissionDto) {
    const res = await axios.request({
      url: `${baseApi}/api-module/list-selected`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async uniquePermissions(body: UniquePermissionsDto) {
    const res = await axios.request({
      url: `${baseApi}/api-permission/list`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async getPermissions(body: GetPermissionsDto) {
    const res = await axios.request({
      url: `${baseApi}/api-permission/list`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async addRoles(body: AddRolesDto) {
    const res = await axios.request({
      url: `${baseApi}/role/add`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async getRoles(body: GetRolesDto) {
    const res = await axios.request({
      url: `${baseApi}/role/list`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async getRolesInfo(body: GetRolesInfoDto) {
    const res = await axios.request({
      url: `${baseApi}/role/get`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async getRolesOption(body: GetRolesInfoDto) {
    const res = await axios.request({
      url: `${baseApi}/api-permission/list-tree`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async addUsers(body: AddUsersDto) {
    const res = await axios.request({
      url: `${baseApi}/user/add`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async getUsers(body: GetUsersDto) {
    const res = await axios.request({
      url: `${baseApi}/user/list`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async addDepts(body: AddDeptsDto) {
    const res = await axios.request({
      url: `${baseApi}/dept/add`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async getDepts(body: GetDeptsDto) {
    const res = await axios.request({
      url: `${baseApi}/dept/list`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }

  async getAddress(body: CreatePermissionDto) {
    const res = await axios.request({
      url: `${baseApi}/address/tree`,
      method: "post",
      data: body,
      headers: {
        withCredentials: true,
        "ltpatoken": Global.token
      }
    })
    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 200,
        data: data.data
      }
    } else {
      return {
        code: data.code,
        data: data.data,
        message: data.message,
        success: data.success
      }
    }
  }
}
