import { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
export declare class EmailService {
    constructor();
    sendMail(mailOptions: Mail.Options): Promise<SentMessageInfo>;
    sendMailTo(to: any, subject: string, body: string, attachments: any, cc: any, bcc: any): Promise<SentMessageInfo>;
    sendMailToAdmin(subject: string, body: string, attachments: any): Promise<SentMessageInfo>;
    sendMailToDev(subject: string, body: string, attachments: any): Promise<SentMessageInfo>;
}
