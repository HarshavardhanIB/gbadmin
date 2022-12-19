"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYS_ADMIN = exports.email = exports.aws = exports.outlook = exports.gmail = exports.mail = exports.app = void 0;
exports.app = {
    name: process.env.APP_NAME || "GroupBenefitz Admin API",
    company: process.env.COMPANY_NAME || "The Groupbenefitz Platform Inc.",
    version: "v0.3.0",
    env: process.env.NODE_ENV || "local",
};
exports.mail = {
    regards: process.env.MAIL_REGARDS || "GroupBenefitz Admin"
};
exports.gmail = {
    "type": "smtp",
    "host": "smtp.gmail.com",
    "secure": true,
    "port": 465,
    "tls": {
        "rejectUnauthorized": false
    },
    "auth": {
        "user": process.env.GMAIL_USER,
        "pass": process.env.GMAIL_PASSWORD //|| "aitestpro@12"
    }
};
exports.outlook = {
    "type": "smtp",
    "host": "smtp-mail.outlook.com",
    "secure": false,
    "port": 587,
    "tls": {
        "rejectUnauthorized": false
    },
    "auth": {
        "user": process.env.OUTLOOK_USER,
        "pass": process.env.OUTLOOK_PASSWORD, // || "AiTP0&adm"
    }
};
exports.aws = {
    "type": "smtp",
    "host": process.env.AWS_HOST_REGION,
    "secure": true,
    //"port": 25,
    port: 465,
    //"secure":true,
    "debug": true,
    "tls": {
        "rejectUnauthorized": false
    },
    "auth": {
        "user": process.env.AWS_USER || "usernme",
        "pass": process.env.AWS_PASSWORD || "passwd"
    }
};
// let aws = require("@aws-sdk/client-ses");
// let { defaultProvider } = require("@aws-sdk/credential-provider-node");
// const ses = new aws.SES({
//   apiVersion: "2010-12-01",
//   region: "us-east-1",
//   defaultProvider,
// });
// {
//   SES: { ses, aws },
//   sendingRate: 1 // max 1 messages/second
// }
exports.email = getSMTPdetails(process.env.MAILCONFIG || '');
function getSMTPdetails(smtpType) {
    switch (smtpType) {
        case 'GMAIL':
            return exports.gmail;
            break;
        case 'AWS':
            return exports.aws;
            break;
        case 'OUTLOOK':
        default:
            return exports.outlook;
            break;
    }
}
exports.SYS_ADMIN = {
    name: process.env.SYS_ADMIN_NAME || 'SysAdmin',
    email: process.env.SYS_ADMIN_EMAIL || 'admin@aitestpro.com',
};
//# sourceMappingURL=configurations.js.map