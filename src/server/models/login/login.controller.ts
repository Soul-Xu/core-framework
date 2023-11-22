import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request, 
  Response
} from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/api/login')
@ApiTags('Login')
export class LoginController {
  constructor(private readonly loginService: LoginService ) {}

  @Post()
  async login(@Body() body: any) { 
    console.log("")
    return this.loginService.login(body);
  }
}
