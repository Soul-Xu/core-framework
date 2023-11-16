import { Injectable } from '@nestjs/common';

const authMap = ["admin", "leon"]

@Injectable()
export class LoginService {
  login(body: any) {
    const { username, password } = body
    if (authMap.indexOf(username) > -1) {
      return {
        code: 0,
        data: {
          isAuth: true
        },
        message: "登录成功"
      }
    } else {
      return {
        code: 500,
        data: {
          isAuth: false
        },
        message: "登录失败"
      }
    }
  }
}
