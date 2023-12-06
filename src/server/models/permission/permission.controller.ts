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
import { AddModulesDto, UpdateModulesDto, DeleteModulesDto, UniqueModulesDto, GetModulesDto } from './dto/modules.dto'
import { AddFuncsDto, UpdateFuncsDto, DeleteFuncsDto, GetFuncsDto } from './dto/funcs.dto';
import { AddPermissionDto, UpdatePermissionDto, DeletePermissionDto, UniquePermissionsDto, GetPermissionsDto } from './dto/permissions.dto'
import { AddRolesDto, UpdateRolesDto, DeleteRolesDto, GetRolesDto, GetRolesInfoDto, GetRolesOptionDto } from './dto/roles.dto'
import { AddUsersDto, UpdateUsersDto, DeleteUsersDto, GetUsersDto } from './dto/users.dto';
import { AddDeptsDto, UpdateDeptsDto, DeleteDeptsDto, GetDeptsDto } from './dto/depts.dto';

@Controller('/apis/permission')
@ApiTags('Permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  // 模块新增接口
  @Post("/addModules")
  addModules(@Body() body: AddModulesDto) {
    return this.permissionService.addModules(body);
  }

  // 模块新增接口
  @Post("/updateModules")
  updateModules(@Body() body: UpdateModulesDto) {
    return this.permissionService.updateModules(body);
  }

  // 模块删除接口
  @Post("/deleteModules")
  deleteModules(@Body() body: DeleteModulesDto) {
    return this.permissionService.deleteModules(body);
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
  getFuncs(@Body() body: GetFuncsDto) {
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
  addUsers(@Body() body: AddUsersDto) {
    return this.permissionService.addUsers(body);
  }

  // 组织架构--编辑用户
  @Post("/updateUsers")
  updateUsers(@Body() body: UpdateUsersDto) {
    return this.permissionService.updateUsers(body);
  }
 

  // 组织架构--新增用户
  @Post("/deleteUsers")
  deleteUsers(@Body() body: AddRolesDto) {
    return this.permissionService.deleteUsers(body);
  }

  // 组织架构--用户列表接口
  @Post("/getUsers")
  getUsers(@Body() body: GetUsersDto) {
    return this.permissionService.getUsers(body);
  }

  // 组织架构--新增部门
  @Post("/addDepts")
  addDepts(@Body() body: AddDeptsDto) {
    return this.permissionService.addDepts(body);
  }

  // 组织架构--新增部门
  @Post("/updateDepts")
  updateDepts(@Body() body: AddDeptsDto) {
    return this.permissionService.updateDepts(body);
  }

  // 组织架构--删除部门
  @Post("/deleteDepts")
  deleteDepts(@Body() body: DeleteDeptsDto) {
    return this.permissionService.deleteDepts(body);
  }

  // 组织架构--部门列表接口
  @Post("/getDepts")
  getDepts(@Body() body: GetDeptsDto) {
    return this.permissionService.getDepts(body);
  }

  // 地址本接口（用户选择器）
  @Post("/getAddress")
  getAddress(@Body() body: AddPermissionDto) {
    return this.permissionService.getAddress(body);
  }
}
