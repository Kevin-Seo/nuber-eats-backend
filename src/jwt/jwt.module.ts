import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Module({})
@Global() // Global Module 이면 따로 Import 해주지 않아도 Service 접근 가능
export class JwtModule {
  static forRoot(): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [JwtService],
    }
  }
}
