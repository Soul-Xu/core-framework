import { ViewModule } from './view/view.module';
import { HomeModule } from './home/home.module';
import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [
    ViewModule,
    HomeModule,
    LoginModule,
    TemplateModule,
  ],
  exports: [
    ViewModule,
    HomeModule,
    LoginModule,
    TemplateModule,
  ],
})
export class CommonModule {}
