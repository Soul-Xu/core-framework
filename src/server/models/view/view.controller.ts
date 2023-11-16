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
  @Get('home')
  @ApiTags('Home')
  @ApiResponse({ status: 200, description: '首页' })
  public async showHome(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('login')
  @ApiTags('Login')
  @ApiResponse({ status: 200, description: '登录页' })
  public async showLogin(@Req() req: Request, @Res() res: Response) {
    console.log("login-server")
    await this.viewService.handler(req, res);
  }

  @Get('receiveAssign')
  @ApiTags('ReceiveAssign')
  @ApiResponse({ status: 200, description: '首页' })
  public async showReceiveAssign(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('diagnosisRecovery')
  @ApiTags('DiagnosisRecovery')
  @ApiResponse({ status: 200, description: '首页' })
  public async showDiagnosisRecovery(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('review')
  @ApiTags('Review')
  @ApiResponse({ status: 200, description: '首页' })
  public async showReview(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('secondLevelAudit')
  @ApiTags('SecondLevelAudit')
  @ApiResponse({ status: 200, description: '首页' })
  public async showSecondLevelAudit(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('eventReportAudit')
  @ApiTags('EventReportAudit')
  @ApiResponse({ status: 200, description: '首页' })
  public async showEventReportAudit(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('departmentCounterSign')
  @ApiTags('DepartmentCounterSign')
  @ApiResponse({ status: 200, description: '首页' })
  public async showDepartmentCounterSign(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('reportCoordination')
  @ApiTags('ReportCoordination')
  @ApiResponse({ status: 200, description: '首页' })
  public async showReportCoordination(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('statement')
  @ApiTags('Statement')
  @ApiResponse({ status: 200, description: '首页' })
  public async showStatement(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('charts')
  @ApiTags('Charts')
  @ApiResponse({ status: 200, description: '图表' })
  public async showCharts(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('search')
  @ApiTags('Search')
  @ApiResponse({ status: 200, description: '搜索页' })
  public async showSearch(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('stock')
  @ApiTags('Stock')
  @ApiResponse({ status: 200, description: '证劵运维值班' })
  public async showStock(@Req() req: Request, @Res() res: Response) {
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
