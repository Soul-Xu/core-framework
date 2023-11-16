import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return 'root';
  }
  getHello(): string {
    return 'Hello World!';
  }
}
