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
import { AppsService } from './apps.service';
import { GetAppsDto } from './dto/getApps.dto'; 
import { CreateAppDto } from './dto/createApp.dto';
import { UpdateAppDto } from './dto/updateApp.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/api/apps')
@ApiTags('Apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Post("/getApps")
  getApps(@Body() body: GetAppsDto) {
    console.log("getList-controller", body)
    return this.appsService.getApps(body);
  }

  @Post("/createApp")
  createApp(@Body() body: CreateAppDto) {
    console.log("sssss-body-createApp", body)
    return this.appsService.createApp(body);
  }

  @Post('/updateApp/:id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateAppDto,
  ) {
    return this.appsService.updateApp(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appsService.remove(+id);
  }
}
