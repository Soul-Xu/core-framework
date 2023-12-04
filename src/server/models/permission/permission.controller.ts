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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddModulesDto } from './dto/add-modules.dto';
import { UniqueModulesDto } from './dto/unique-modules.dto';
import { GetModulesDto } from './dto/get-modules.dto';
import { AddFuncsDto } from './dto/add-funcs.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { UniquePermissionsDto } from './dto/unque-permissions.dto';
import { GetPermissionsDto } from './dto/get-permissions.dto';
import { AddRolesDto } from './dto/add-roles.dto';
import { GetRolesDto } from './dto/get-roles.dto';
import { GetRolesInfoDto } from './dto/get-roles-info.dto';
import { GetRolesOptionDto } from './dto/get-roles-option.dto';
import { AddUsersDto } from './dto/add-users.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { AddDeptsDto } from './dto/add-depts.dto';
import { GetDeptsDto } from './dto/get-depts.dto';

@Controller('/apis/permission')
@ApiTags('Permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  // 模块新增接口
  @Post("/addModule")
  addModules(@Body() body: AddModulesDto) {
    return this.permissionService.addModules(body);
  }

  // 检查模块标识是否唯一接口
  @Post("/uniqueModules")
  uniqueModules(@Body() body: UniqueModulesDto) {
    return this.permissionService.uniqueModules(body);
  }

  // 功能权限定义--获取可选模块
  @Post("/getModules")
  getModules(@Body() body: GetModulesDto) {
    return this.permissionService.getModules(body);
  }

  // 功能权限定义接口
  @Post("/addFuncs")
  addFuncs(@Body() body: AddFuncsDto) {
    return this.permissionService.addFuncs(body);
  }

  // 功能权限定义--获取可选模块
  @Post("/getFuncs")
  getFuncs(@Body() body: CreatePermissionDto) {
    return this.permissionService.getFuncs(body);
  }

  // 权限管理--获取权限列表
  @Post("/getPermissions")
  getPermissions(@Body() body: GetPermissionsDto) {
    return this.permissionService.getPermissions(body);
  }

  // 检查权限标识是否唯一接口
  @Post("/uniquePermissions")
  uniquePermissions(@Body() body: UniquePermissionsDto) {
    return this.permissionService.uniquePermissions(body);
  }

  // 角色管理--获取角色列表
  @Post("/addRoles")
  addRoles(@Body() body: AddUsersDto) {
    return this.permissionService.addRoles(body);
  }

  // 角色管理--新增角色
  @Post("/getRoles")
  getRoles(@Body() body: GetRolesDto) {
    return this.permissionService.getRoles(body);
  }

  // 角色管理--获取角色数据
  @Post("/getRolesInfo")
  getRolesInfo(@Body() body: GetRolesInfoDto) {
    return this.permissionService.getRolesInfo(body);
  }

  // 角色管理--获取可选的角色列表
  @Post("/getRolesOption")
  getRolesOption(@Body() body: GetRolesOptionDto) {
    return this.permissionService.getRolesOption(body);
  }

  // 组织架构--新增用户
  @Post("/addUsers")
  addUsers(@Body() body: AddRolesDto) {
    return this.permissionService.addUsers(body);
  }

  // 组织架构--用户列表接口
  @Post("/getUsers")
  getUsers(@Body() body: GetUsersDto) {
    return this.permissionService.getUsers(body);
  }

  // 组织架构--新增部门
  @Post("/addUsers")
  addDepts(@Body() body: AddDeptsDto) {
    return this.permissionService.addDepts(body);
  }

  // 组织架构--部门列表接口
  @Post("/getDepts")
  getDepts(@Body() body: GetDeptsDto) {
    return this.permissionService.getDepts(body);
  }

  // 地址本接口（人员选择器）
  @Post("/getAddress")
  getAddress(@Body() body: CreatePermissionDto) {
    return this.permissionService.getAddress(body);
  }
}
