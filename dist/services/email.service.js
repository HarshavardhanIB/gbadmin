"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const nodemailer = tslib_1.__importStar(require("nodemailer"));
const config = tslib_1.__importStar(require("../configurations"));
const constants_1 = require("../constants");
let EmailService = class EmailService {
    constructor() { }
    async sendMail(mailOptions) {
        // const configOption = Utils.getSiteOptions();
        //console.log(`config.email: `)
        //console.log(config.email);
        //console.log(`process.env.MAILCONFIG: ${process.env.MAILCONFIG}`)
        if (process.env.NODE_ENV != "prod") {
            mailOptions.subject += " -" + process.env.NODE_ENV;
        }
        const transporter = nodemailer.createTransport(config.email);
        return await transporter.sendMail(mailOptions);
    }
    async sendMailTo(to, subject, body, attachments, cc, bcc) {
        var _a;
        let mailOptions = {};
        mailOptions.to = to;
        mailOptions.subject = subject;
        mailOptions.html = body;
        if (attachments) {
            for (const attachment of attachments)
                (_a = mailOptions.attachments) === null || _a === void 0 ? void 0 : _a.push(attachment);
        }
        if (cc) {
            mailOptions.cc = cc;
        }
        if (bcc) {
            mailOptions.bcc = bcc;
        }
        mailOptions.from = constants_1.GB_ADMIN;
        if (process.env.NODE_ENV != "prod") {
            mailOptions.subject += " -" + process.env.NODE_ENV;
        }
        await this.sendMail(mailOptions);
    }
    async sendMailToAdmin(subject, body, attachments) {
        let admin = config.SYS_ADMIN.email;
        let bcc = [constants_1.GB_SUPPORT];
        let dev = constants_1.GB_DEV;
        if (admin != dev) {
            bcc.push(dev);
        }
        if (process.env.NODE_ENV != "prod") {
            subject += " -" + process.env.NODE_ENV;
        }
        if (process.env.NODE_ENV != "prod") //remove or comment this line once ok with the sanitization/confirmation
            await this.sendMailTo(admin, subject, body, attachments, null, bcc);
        else
            await this.sendMailTo(bcc, subject, body, attachments, null, dev);
    }
    async sendMailToDev(subject, body, attachments) {
        let admin = config.SYS_ADMIN.email;
        let bcc = null;
        let dev = constants_1.GB_DEV;
        await this.sendMailTo(dev, subject, body, attachments, null, bcc);
    }
};
EmailService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map