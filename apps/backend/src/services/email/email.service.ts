import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow(`resend.apiKey`);
    this.resend = new Resend(apiKey);
  }

  async send({
    email,
    subject,
    html,
  }: {
    email: string[];
    subject: string;
    html: string;
  }) {
    console.log(`EmailService.send`, email, subject, html);
    // await this.resend.emails.send({
    //   from: 'Tom <contact@tomray.dev>',
    //   to: email,
    //   subject: subject,
    //   html: html,
    // });
  }
}
