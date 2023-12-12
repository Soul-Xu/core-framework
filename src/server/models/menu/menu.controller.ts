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
import { MenuService } from './menu.service';
import {
  AddTabsDto, UpdateTabsDto, DeleteTabsDto, GetTabsDto,
  AddMenusDto, UpdateMenusDto, DeleteMenusDto, GetMenusDto,
} from "./dto/menus.dto"
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/apis/menus')
@ApiTags('Menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post("/addTabs")
  addTabs(@Body() body: AddTabsDto) {
    return this.menuService.addTabs(body);
  }

  @Post("/updateTabs")
  updateTabs(@Body() body: UpdateTabsDto) {
    return this.menuService.updateTabs(body);
  }

  @Post("/deleteTabs")
  deleteTabs(@Body() body: DeleteTabsDto) {
    return this.menuService.deleteTabs(body);
  }

  @Post("/getTabs")
  getTabs(@Body() body: GetTabsDto) {
    return this.menuService.getTabs(body);
  }

  @Post("/addMenus")
  addMenus(@Body() body: AddMenusDto) {
    return this.menuService.addMenus(body);
  }

  @Post("/updateMenus")
  updateMenus(@Body() body: UpdateMenusDto) {
    return this.menuService.updateMenus(body);
  }

  @Post("/deleteMenus")
  deleteMenus(@Body() body: DeleteMenusDto) {
    return this.menuService.deleteMenus(body);
  }

  @Post("/getMenus")
  getMenus(@Body() body: GetMenusDto) {
    return this.menuService.getMenus(body);
  }

}
