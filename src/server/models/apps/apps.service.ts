import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { baseApi } from 'src/server/config';
import { GetAppsDto } from './dto/getApps.dto'; 
import { CreateAppDto } from './dto/createApp.dto';
import { UpdateAppDto } from './dto/updateApp.dto';

@Injectable()
export class AppsService {
  async getApps(body: GetAppsDto) {
    const res = await axios.request({
      url: `${baseApi}/app-permission/list`,
      data: body,
      headers: {
        withCredentials: true
      }
    })
    const data = res.data
    console.log("server-app-list-11111", data)
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
      data: body,
      headers: {
        withCredentials: true
      }
    })
    const data = res.data
    return 'This action adds a new template';
  }

  updateApp(id: number, body: UpdateAppDto) {
    return `This action updates a #${id} template`;
  }

  remove(id: number) {
    return `This action removes a #${id} template`;
  }
}
