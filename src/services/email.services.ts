import * as nodemailer from 'nodemailer';
import dotenv from "dotenv";
import { nextTick } from 'process';
import * as config from '../configurations';
dotenv.config();
export async function mail(from: string, to: string, subject: string, html: string, text: string, attachments: any) {
    try {
        console.log("mail enter");
        const transportOptions = {
            // host: 'smtp-mail.outlook.com',
            host: 'smtp.office365.com',
            // service:'outlook',
            port: 587,
            secureConnection: false,
            auth: {
                user: config.email.auth.user,
                pass: config.email.auth.pass
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false
            },
            requireTLS: true
        };
        const mailTransport = nodemailer.createTransport(transportOptions);
        console.log(transportOptions)
        await mailTransport.sendMail({
            from:config.email.auth.user,
            to,
            replyTo: from,
            subject,
            html,
            text,
            attachments
        });
        console.log("email sent successfully");
        return true;
    } catch (error) {
        console.log(error);
    }
}
