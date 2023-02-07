"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mail = void 0;
const tslib_1 = require("tslib");
const nodemailer = tslib_1.__importStar(require("nodemailer"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const config = tslib_1.__importStar(require("../configurations"));
dotenv_1.default.config();
async function mail(from, to, subject, html, text, attachments) {
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
        console.log(transportOptions);
        await mailTransport.sendMail({
            from: config.email.auth.user,
            to,
            replyTo: from,
            subject,
            html,
            text,
            attachments
        });
        console.log("email sent successfully");
        return true;
    }
    catch (error) {
        console.log(error);
    }
}
exports.mail = mail;
//# sourceMappingURL=email.services.js.map