import { Controller, Get, Post, Res, Req } from '@nestjs/common';
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

  @Get('todo')
  @ApiTags('Todo')
  @ApiResponse({ status: 200, description: '我的待办' })
  public async showTodo(@Req() req: Request, @Res() res: Response) {
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
