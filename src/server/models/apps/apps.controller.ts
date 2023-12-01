import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Headers} from '@nestjs/common';
import { AppsService } from './apps.service';
import { GetAppsDto } from './dto/getApps.dto'; 
import { CreateAppDto } from './dto/createApp.dto';
import { UpdateAppDto } from './dto/updateApp.dto';
import { DeleteAppDto } from './dto/deleteApp.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/apis/apps')
@ApiTags('Apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Post("/getApps")
  getApps(@Body() body: GetAppsDto, @Headers() headers: any) {
    return this.appsService.getApps(body);
  }

  @Post("/createApp")
  createApp(@Body() body: CreateAppDto) {
    return this.appsService.createApp(body);
  }

  @Post('/updateApp/:id')
  update(
    @Body() body: UpdateAppDto,
  ) {
    return this.appsService.updateApp(body);
  }

  @Post('/updateApp/:id')
  remove(
    @Body() body: DeleteAppDto,
  ) {
    return this.appsService.remove(body);
  }
}
