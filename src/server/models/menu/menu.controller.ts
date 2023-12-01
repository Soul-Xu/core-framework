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
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/apis/menu')
@ApiTags('Menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post("/createTab")
  createTab(@Body() body: CreateMenuDto) {
    return this.menuService.createTab(body);
  }

  @Post("/createMenu")
  createMenu(@Body() body: CreateMenuDto) {
    return this.menuService.createMenu(body);
  }

  @Post("/getTabs")
  getTabs(@Body() body: CreateMenuDto) {
    return this.menuService.getTabs(body);
  }

  @Post("/getMenus")
  getMenus(@Body() body: CreateMenuDto) {
    return this.menuService.getMenus(body);
  }
}
