"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
let AuthService = class AuthService {
    constructor( /* Add @inject to inject parameters */) { }
    async MailContent(type, password, inActiveUser, link) {
        let htmlContent = `<h3>Hi,</h3>`;
        if (type == "forgotPassword") {
            htmlContent += `<p>This is your temporary password to login: "${password}"
      Please use above temporary password until you change your password from the portal.</p>`;
            if (inActiveUser) {
                htmlContent += `<p>Also, your account is not active yet. Please </p><a href="${link}"> Click here</a><p> to activate before logging-in.</p>`;
            }
        }
        else if (type == "signin") {
            htmlContent += `<p>Your account is not active yet. Please </p><a href="${link}"> Click here</a><p> to activate your account.</p>`;
        }
        htmlContent += `<p>Regards,</p>`;
        htmlContent += `Admin GroupBenfitz`;
        return htmlContent;
    }
};
AuthService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map