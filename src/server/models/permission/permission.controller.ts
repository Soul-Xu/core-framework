import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/apis/permission')
@ApiTags('Permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  // 功能权限定义--获取可选模块
  @Post("/getFuncs")
  getFuncs(@Body() body: CreatePermissionDto) {
    return this.permissionService.getFuncs(body);
  }

  // 权限管理--获取权限列表
  @Post("/getPermissions")
  getPermissions(@Body() body: CreatePermissionDto) {
    return this.permissionService.getPermissions(body);
  }

  // 角色管理--获取角色列表
  @Post("/getRoles")
  getRoles(@Body() body: CreatePermissionDto) {
    return this.permissionService.getRoles(body);
  }

  // 地址本接口（人员选择器）
  @Post("/getAddress")
  getAddress(@Body() body: CreatePermissionDto) {
    return this.permissionService.getAddress(body);
  }
}
