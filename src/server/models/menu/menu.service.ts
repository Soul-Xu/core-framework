import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { baseApi, Global } from 'src/server/config';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  async createTab(body: CreateMenuDto) {
    const res = await axios.request({
      url: `${baseApi}/component-permission/add-data`,
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

  async createMenu(body: CreateMenuDto) {
    const res = await axios.request({
      url: `${baseApi}/component-permission/add-data`,
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

  async getTabs(body: any) {
    const res = await axios.request({
      url: `${baseApi}/component-permission/top-menu`,
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

  async getMenus(body: any) {
    const res = await axios.request({
      url: `${baseApi}/component-permission/child-menu`,
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
