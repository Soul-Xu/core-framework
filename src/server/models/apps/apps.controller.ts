import { Controller, Post, Body } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AddAppsDto, UpdateAppsDto, DeleteAppsDto, GetAppsDto } from './dto/apps.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/apis/apps')
@ApiTags('Apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Post("/addApps")
  addApps(@Body() body: AddAppsDto) {
    return this.appsService.addApps(body);
  }

  @Post('/updateApps')
  updateApps(@Body() body: UpdateAppsDto) {
    return this.appsService.updateApps(body);
  }

  @Post('/deleteApps')
  deleteApps(@Body() body: DeleteAppsDto) {
    return this.appsService.deleteApps(body);
  }

  @Post("/getApps")
  getApps(@Body() body: GetAppsDto) {
    console.log("getApps")
    return this.appsService.getApps(body);
  }
}
