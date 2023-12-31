import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request, 
  Response,
  Headers
} from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/apis/login')
@ApiTags('Login')
export class LoginController {
  constructor(private readonly loginService: LoginService ) {}

  @Post()
  async login(@Body() body: any, @Headers() headers) { 
    return this.loginService.login(body);
  }
}
