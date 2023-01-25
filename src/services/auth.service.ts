import { injectable, /* inject, */ BindingScope } from '@loopback/core';

@injectable({ scope: BindingScope.TRANSIENT })
export class AuthService {
  constructor(/* Add @inject to inject parameters */) { }

  async MailContent(type: string, password: string, inActiveUser: any, link: string) {
    let htmlContent = `<h3>Hi,</h3>`;
    if (type == "forgotPassword") {
      htmlContent += `<p>This is your temporary password to login: "${password}" <br></br>
      Please use above temporary password until you change your password from the portal.</p>`;
      if (inActiveUser) {
        htmlContent += `<p>Also, your account is not active yet.<br></br> Please <a href="${link}"> Click here</a> to activate before logging-in.</p>`
      }
    }
    else if (type == "signin") {
      htmlContent += `<p>Your account is not active yet.
       Please <a href="${link}"> Click here</a> to activate your account.</p>`
    }
    htmlContent += `<p>Regards,</p>`
    htmlContent += `Admin GroupBenfitz`
    return htmlContent;
  }
}
