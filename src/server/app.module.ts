import {
  Module,
  Global,
  NestModule,
  MiddlewareConsumer,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './models/index.module';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER, APP_PIPE, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/server/core/filter/http-exception.filter';

@Global()
@Module({
  imports: [
    CommonModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
