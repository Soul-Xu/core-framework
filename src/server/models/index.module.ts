import { ViewModule } from './view/view.module';
import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { AppsModule } from './apps/apps.module';
import { MenuModule } from './menu/menu.module';
import { PermissionModule } from './permission/permission.module';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [
    ViewModule,
    LoginModule,
    MenuModule,
    PermissionModule,
    AppsModule,
    TemplateModule,
  ],
  exports: [
    ViewModule,
    LoginModule,
    MenuModule,
    PermissionModule,
    AppsModule,
    TemplateModule,
  ],
})
export class CommonModule {}
