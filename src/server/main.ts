import { LoggingInterceptor } from './core/interceptor/logging.interceptor';
// import { RolesGuard } from './core/guards/roles.guard';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { generateDocument } from './core/swagger/index';
import { AppModule } from './app.module';
import { logger } from './core/middleware/logger.middleware';
import { HttpExceptionFilter } from 'src/server/core/filter/http-exception.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置全局路由前缀
  // app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.use(cookieParser());
  // app.useGlobalGuards(new RolesGuard());
  // 设置全局日志
  app.use(logger);
  // 创建swagger文档
  generateDocument(app);

  // await app.listen(3015)
  await app.listen(3015, () => {
    console.log(`项目运行在http:localhost:3015/api/docs`);
  });
}
bootstrap();
