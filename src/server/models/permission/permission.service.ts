import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { baseApi, baseApiOrg, Global } from 'src/server/config';
import { AddModulesDto, UpdateModulesDto, DeleteModulesDto, UniqueModulesDto, GetModulesDto } from './dto/modules.dto'
import { AddFuncsDto, UpdateFuncsDto, DeleteFuncsDto, GetFuncsDto } from './dto/funcs.dto';
import { AddPermissionDto, UpdatePermissionDto, DeletePermissionDto, UniquePermissionsDto, GetPermissionsDto } from './dto/permissions.dto'
import { AddRolesDto, UpdateRolesDto, DeleteRolesDto, GetRolesDto, GetRolesInfoDto, GetRolesOptionDto } from './dto/roles.dto'
import { AddUsersDto, UpdateUsersDto, DeleteUsersDto, GetUsersDto } from './dto/users.dto';
import { AddDeptsDto, UpdateDeptsDto, DeleteDeptsDto, GetDeptsDto } from './dto/depts.dto';

@Injectable()
export class PermissionService {
  async addModules(body: AddModulesDto) {
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
      return data
    }
  }

  async updateModules(body: UpdateModulesDto) {
    const res = await axios.request({
      url: `${baseApi}/api-module/update`,
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
      return data
    }
  }

  async deleteModules(body: DeleteModulesDto) {
    const res = await axios.request({
      url: `${baseApi}/api-module/delete`,
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
      return data
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
      return data
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
      return data
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
      return data
    }
  }

  async getFuncs(body: GetFuncsDto) {
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
      return data
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
      return data
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
      return data
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
      return data
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
      return data
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
      return data
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
      return data
    }
  }

  async addUsers(body: AddUsersDto) {
    const res = await axios.request({
      url: `${baseApiOrg}/user/add`,
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
      return data
    }
  }

  async updateUsers(body: UpdateUsersDto) {
    const res = await axios.request({
      url: `${baseApiOrg}/user/update`,
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
      return data
    }
  }

  async deleteUsers(body: DeleteUsersDto) {
    const res = await axios.request({
      url: `${baseApiOrg}/user/delete`,
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
      return data
    }
  }

  async getUsers(body: GetUsersDto) {
    const res = await axios.request({
      url: `${baseApiOrg}/user/list`,
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
      return data
    }
  }

  async addDepts(body: AddDeptsDto) {
    const res = await axios.request({
      url: `${baseApiOrg}/dept/add`,
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
      return data
    }
  }

  async updateDepts(body: UpdateDeptsDto) {
    const res = await axios.request({
      url: `${baseApiOrg}/dept/update`,
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
      return data
    }
  }

  async deleteDepts(body: DeleteDeptsDto) {
    const res = await axios.request({
      url: `${baseApiOrg}/dept/delete`,
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
      return data
    }
  }

  async getDepts(body: GetDeptsDto) {
    const res = await axios.request({
      url: `${baseApiOrg}/dept/list`,
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
      return data
    }
  }

  async getAddress(body: AddPermissionDto) {
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
      return data
    }
  }
}
