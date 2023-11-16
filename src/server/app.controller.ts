/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
// @ApiExcludeController()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
