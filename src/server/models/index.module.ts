import { ViewModule } from './view/view.module';
import { HomeModule } from './home/home.module';
import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { AppsModule } from './apps/apps.module';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [
    ViewModule,
    HomeModule,
    LoginModule,
    AppsModule,
    TemplateModule,
  ],
  exports: [
    ViewModule,
    HomeModule,
    LoginModule,
    AppsModule,
    TemplateModule,
  ],
})
export class CommonModule {}
