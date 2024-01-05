import { Controller, Get, Post, Res, Req, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ViewService } from './view.service';

@Controller('/')
@ApiTags('Views')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('/')
  @ApiTags('/')
  public async showIndex(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  // page
  @Get('app')
  @ApiTags('App')
  @ApiResponse({ status: 200, description: '应用' })
  public async showApp(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('app/:id')
  @ApiTags('App/:id')
  @ApiResponse({ status: 200, description: '应用' })
  public async showAppId(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('app/:id/vue3')
  @ApiTags('App/:id')
  @ApiResponse({ status: 200, description: 'vue3子应用' })
  public async showAppIdVue3(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('app/:id/vue2')
  @ApiTags('App/:id')
  @ApiResponse({ status: 200, description: 'vue2子应用' })
  public async showAppIdVue2(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('app/:id/react')
  @ApiTags('App/:id')
  @ApiResponse({ status: 200, description: 'react子应用' })
  public async showAppIdReact(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('appConfig')
  @ApiTags('AppConfig')
  @ApiResponse({ status: 200, description: '应用配置' })
  public async showAppConfig(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('todo')
  @ApiTags('Todo')
  @ApiResponse({ status: 200, description: '我的待办' })
  public async showTodo(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('integration')
  @ApiTags('Integration')
  @ApiResponse({ status: 200, description: '集成中心' })
  public async showIntegration(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('personalCenter')
  @ApiTags('PersonalCenter')
  @ApiResponse({ status: 200, description: '个人中心' })
  public async showPersonalCenter(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('permission')
  @ApiTags('Permission')
  @ApiResponse({ status: 200, description: '权限管理' })
  public async showPermission(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('systemSetting')
  @ApiTags('SystemSetting')
  @ApiResponse({ status: 200, description: '系统设置' })
  public async showSystemSetting(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('login')
  @ApiTags('Login')
  @ApiResponse({ status: 200, description: '登录页' })
  public async showLogin(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('charts')
  @ApiTags('Charts')
  @ApiResponse({ status: 200, description: '图表' })
  public async showCharts(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('404')
  @ApiTags('404')
  @ApiResponse({ status: 200, description: '404' })
  public async show404(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('500')
  @ApiTags('500')
  @ApiResponse({ status: 200, description: '500' })
  public async show500(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('_next*')
  @ApiTags('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('favicon.ico')
  @ApiTags('favicon.ico')
  public async favicon(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }
}
