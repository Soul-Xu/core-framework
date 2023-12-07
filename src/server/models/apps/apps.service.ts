import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { baseApi, Global } from 'src/server/config';
import { AddAppsDto, UpdateAppsDto, DeleteAppsDto, GetAppsDto } from './dto/apps.dto';

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
      return data
    }
  }

  async addApps(body: AddAppsDto) {
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
      return data
    }
  }

  async updateApps(body: UpdateAppsDto) {
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
      return data
    }
  }

  async deleteApps(body: DeleteAppsDto) {
    const res = await axios.request({
      url: `${baseApi}/app-permission/delete`,
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
