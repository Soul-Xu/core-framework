import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { baseApi, Global } from 'src/server/config';
import { AddAppsDto, UpdateAppsDto, DeleteAppsDto, GetAppsDto } from './dto/apps.dto';

@Injectable()
export class AppsService {
  async getApps(body: GetAppsDto) {
    try {
      const params = {
        url: `${baseApi}/app-permission/list-view`,
        method: "post",
        data: body,
        headers: {
          'Content-Type': 'application/json', // 设置为 application/json
          'Cookie': `X-AUTH-TOKEN=${Global.token}`,
           withCredentials: true,
        }
      }
      const res = await axios.request(params)
      return res.data
    } catch (err) {
      console.log("err-get-apps-11111111111111", err)
      throw new Error(err)
    }
  }

  async addApps(body: AddAppsDto) {
    try {
      const res = await axios.request({
        url: `${baseApi}/app-permission/add`,
        method: "post",
        data: body,
        headers: {
          'Content-Type': 'application/json', // 设置为 application/json
          'X-AUTH-TOKEN': Global.token,
           withCredentials: true,
        }
      })
      return res.data
    } catch(err) {
      console.log("err-add-apps", err)
    }
  }

  async updateApps(body: UpdateAppsDto) {
    try {
      const res = await axios.request({
        url: `${baseApi}/app-permission/update`,
        method: "post",
        data: body,
        headers: {
          withCredentials: true,
          'Cookie': `X-AUTH-TOKEN=${Global.token}`,
        }
      })
      return res.data
    } catch(err) {
      console.log("err-update-apps", err)
    }
  }

  async deleteApps(body: DeleteAppsDto) {
    try {
      const res = await axios.request({
        url: `${baseApi}/app-permission/delete`,
        method: "post",
        data: body,
        headers: {
          withCredentials: true,
          'Cookie': `X-AUTH-TOKEN=${Global.token}`,
        }
      })
      return res.data
    } catch(err) {
      console.log("err-delete-apps", err)
    }
  }
}