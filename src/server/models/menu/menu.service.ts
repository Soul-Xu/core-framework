import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { baseApi, Global } from 'src/server/config';
import {
  AddTabsDto, UpdateTabsDto, DeleteTabsDto, GetTabsDto,
  AddMenusDto, UpdateMenusDto, DeleteMenusDto, GetMenusDto,
} from "./dto/menus.dto"

@Injectable()
export class MenuService {
  async addTabs(body: AddTabsDto) {
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
      return data
    }
  }

  async updateTabs(body: UpdateTabsDto) {
    const res = await axios.request({
      url: `${baseApi}/component-permission/update`,
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

  async deleteTabs(body: DeleteTabsDto) {
    const res = await axios.request({
      url: `${baseApi}/component-permission/delete`,
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

  async getTabs(body: GetTabsDto) {
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
      return data
    }
  }

  async addMenus(body: AddMenusDto) {
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

  async updateMenus(body: UpdateMenusDto) {
    const res = await axios.request({
      url: `${baseApi}/component-permission/update-data`,
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

  async deleteMenus(body: DeleteMenusDto) {
    const res = await axios.request({
      url: `${baseApi}/component-permission/delete-data`,
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


  async getMenus(body: GetMenusDto) {
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
      return data
    }
  }
}
