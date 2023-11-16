import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
// import { ApiExcludeController } from '@nestjs/swagger';
// import { HttpException } from '@nestjs/common';
// import { HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/server/core/filter/http-exception.filter';
import { LoggingInterceptor } from 'src/server/core/interceptor/logging.interceptor';

@Controller('home')
@UseInterceptors(LoggingInterceptor)
@ApiTags('Home')
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    private readonly http: HttpService,
  ) {}
}
