import {BindingScope, injectable} from '@loopback/core';
import * as nodemailer from 'nodemailer';

//import params from '../data/params'
import {SentMessageInfo} from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import * as config from '../configurations';
import {GB_ADMIN, GB_DEV, GB_SUPPORT} from '../constants';


@injectable({scope: BindingScope.TRANSIENT})
export class EmailService {
  constructor() { }

  async sendMail(mailOptions: Mail.Options): Promise<SentMessageInfo> {
    // const configOption = Utils.getSiteOptions();
    //console.log(`config.email: `)
    //console.log(config.email);
    //console.log(`process.env.MAILCONFIG: ${process.env.MAILCONFIG}`)
    if (process.env.NODE_ENV != "prod") {
      mailOptions.subject += " -" + process.env.NODE_ENV
    }
    const transporter = nodemailer.createTransport(config.email);
    return await transporter.sendMail(mailOptions);
  }

  async sendMailTo(to: any, subject: string, body: string, attachments: any, cc: any, bcc: any): Promise<SentMessageInfo> {
    let mailOptions: Mail.Options = {};

    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.html = body;

    if (attachments) {
      for (const attachment of attachments)
        mailOptions.attachments?.push(attachment)
    }

    if (cc) {
      mailOptions.cc = cc;
    }

    if (bcc) {
      mailOptions.bcc = bcc;
    }

    mailOptions.from = GB_ADMIN;

    if (process.env.NODE_ENV != "prod") {
      mailOptions.subject += " -" + process.env.NODE_ENV
    }

    await this.sendMail(mailOptions);
  }

  async sendMailToAdmin(subject: string, body: string, attachments: any): Promise<SentMessageInfo> {
    let admin = config.SYS_ADMIN.email
    let bcc = [GB_SUPPORT];
    let dev = GB_DEV;
    if (admin != dev) {
      bcc.push(dev);
    }

    if (process.env.NODE_ENV != "prod") {
      subject += " -" + process.env.NODE_ENV
    }

    if (process.env.NODE_ENV != "prod") //remove or comment this line once ok with the sanitization/confirmation
      await this.sendMailTo(admin, subject, body, attachments, null, bcc);
    else
      await this.sendMailTo(bcc, subject, body, attachments, null, dev);
  }

  async sendMailToDev(subject: string, body: string, attachments: any): Promise<SentMessageInfo> {
    let admin = config.SYS_ADMIN.email
    let bcc = null;
    let dev = GB_DEV;

    await this.sendMailTo(dev, subject, body, attachments, null, bcc);
  }
}
