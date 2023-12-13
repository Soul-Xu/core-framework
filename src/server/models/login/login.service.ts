import { Injectable,  Request, Response } from '@nestjs/common';
import axios from 'axios';
import { baseApi, Global } from 'src/server/config';

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

    // 获取token的值
    const token = res.headers['ltpatoken']
    Global.token = token
    return res.data
  }
}
