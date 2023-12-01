import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { baseApi, Global } from 'src/server/config';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
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

  async getPermissions(body: CreatePermissionDto) {
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

  async getRoles(body: CreatePermissionDto) {
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
