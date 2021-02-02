import { Inject, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly options: JwtModuleOptions,
    // private readonly configService: ConfigService,
  ) {}

  sign(userId: number): string {
    return jwt.sign({ id: userId }, this.options.privateKey);
    // return jwt.sign(payload, this.configService.get('PRIVATE_KEY'));
    // forRoot 로 가져온 CONFIG_OPTIONS 값을 여기에 options로 가져온 것은 이런 방법도 있다는 것을 보여주기 위함이다.
    // 이미 ConfigService 가 Global Module 이기 때문에 위처럼 바로 ConfigService.get 하면 가져올 수 있다.
  }

  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
