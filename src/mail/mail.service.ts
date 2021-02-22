import { Inject, Injectable } from '@nestjs/common';
import got from 'got';
import * as FormData from 'form-data';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly options: MailModuleOptions,
    // private readonly configService: ConfigService,
  ) {
    // this.sendEmail('testing', 'test');
  }

  private async sendEmail(subject: string, to: string, template: string, emailVars: EmailVar[]) {
    const form = new FormData();
    form.append('from', `Nico from Nuber Eats <mailgun@${this.options.domain}>`);
    form.append('to', 'keviny.seo@gmail.com'); // 원래는 to 파라미터를 사용해야 하지만, 테스트로 무조건 내 계정으로 쏜다.
    form.append('subject', subject);
    form.append('template', template);
    emailVars.forEach(eVar => form.append(`v:${eVar.key}`, eVar.value));

    try {
      const response = await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`api:${this.options.apiKey}`).toString('base64')}`
        },
        body: form,
      });
    } catch (e) {
      console.log(e)
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail("Verify Your Email", "test", "verify-email", [
      { "key": 'code', "value": code },
      { "key": 'username', "value": email }
    ]);
  }
}
