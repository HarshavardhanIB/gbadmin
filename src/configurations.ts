export const app: any = {

  name: process.env.APP_NAME || "GroupBenefitz Admin API",
  company: process.env.COMPANY_NAME || "The Groupbenefitz Platform Inc.",
  version: "v0.4.3", //process.env.APP_VERSION ||
  env: process.env.NODE_ENV || "local",
}

export const mail: any = {
  regards: process.env.MAIL_REGARDS || "GroupBenefitz Admin"
}


export const gmail: any = {
  "type": "smtp",
  "host": "smtp.gmail.com",
  "secure": true,
  "port": 465,
  "tls": {
    "rejectUnauthorized": false
  },
  "auth": {
    "user": process.env.GMAIL_USER, //|| "aitestpro@gmail.com",
    "pass": process.env.GMAIL_PASSWORD //|| "aitestpro@12"
  }
}

export const outlook: any = {
  "type": "smtp",
  "host": "smtp-mail.outlook.com",
  "secure": false,
  "port": 587,
  "tls": {
    "rejectUnauthorized": false
  },
  "auth": {
    "user": process.env.OUTLOOK_USER,// || "admin@aitestpro.com",
    "pass": process.env.OUTLOOK_PASSWORD,// || "AiTP0&adm"
  }
}

export const aws: any = {
  "type": "smtp",
  "host": process.env.AWS_HOST_REGION,// || "email-smtp.us-west-2.amazonaws.com",
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
}

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


export const email = getSMTPdetails(process.env.MAILCONFIG || '')

function getSMTPdetails(smtpType: string) {

  switch (smtpType) {
    case 'GMAIL':
      return gmail;
      break;
    case 'AWS':
      return aws;
      break;
    case 'OUTLOOK':
    default:
      return outlook;
      break;
  }

}

export const SYS_ADMIN = {
  name: process.env.SYS_ADMIN_NAME || 'SysAdmin',
  email: process.env.SYS_ADMIN_EMAIL || 'admin@aitestpro.com',
}
