import * as nodemailer from 'nodemailer';
import dotenv from "dotenv";
import { nextTick } from 'process';
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
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false
            },
            requireTLS: true
        };
        const mailTransport = nodemailer.createTransport(transportOptions);
        await mailTransport.sendMail({
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
