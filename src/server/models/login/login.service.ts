import { Injectable,  Request, Response } from '@nestjs/common';
import axios from 'axios';
import { baseApi } from 'src/server/config';

@Injectable()
export class LoginService {
  async login(body: any) {
    const { username, password } = body
    const params = {
      username,
      password,
      rememberMe: false
    }
    const res = await axios.post(`${baseApi}/login`, params)
    console.log("222222222222222222-setCookie", res.headers['set-cookie'])

    // 获取cookie的值
    const setCookie = res.headers['set-cookie'][0]
    // 获取JSESSIONID值
    const jsessionId = setCookie.split(";")[0]
    console.log("222222222222222222-Cookie", jsessionId)

    const data = res.data
    if (data.code === 200 && data.success) {
      return {
        code: 0,
        data: data.data,
        cookie: jsessionId,
        message: "登录成功"
      }
    } else {
      return {
        code: 500,
        data: data.data,
        message: "登录失败"
      }
    }
  }
}
