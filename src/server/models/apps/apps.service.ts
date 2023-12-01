import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { baseApi, Global } from 'src/server/config';
import { GetAppsDto } from './dto/getApps.dto'; 
import { CreateAppDto } from './dto/createApp.dto';
import { UpdateAppDto } from './dto/updateApp.dto';
import { DeleteAppDto } from './dto/deleteApp.dto';

@Injectable()
export class AppsService {
  async getApps(body: GetAppsDto) {
    const res = await axios.request({
      url: `${baseApi}/app-permission/list`,
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

  async createApp(body: CreateAppDto) {
    const res = await axios.request({
      url: `${baseApi}/app-permission/add`,
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

  async updateApp(body: UpdateAppDto) {
    const res = await axios.request({
      url: `${baseApi}/app-permission/update`,
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

  async remove(body: DeleteAppDto) {
    const res = await axios.request({
      url: `${baseApi}/app-permission/update`,
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
