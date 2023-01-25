"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonServiceService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const bcryptjs_1 = require("bcryptjs");
const crypto = tslib_1.__importStar(require("crypto"));
let CommonServiceService = class CommonServiceService {
    constructor( /* Add @inject to inject parameters */) { }
    async randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    async generateRandomPassword() {
        const PASSWORD_LENGTH = 8;
        return await this.randomString(PASSWORD_LENGTH, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }
    async encryptPassword(password) {
        const salt = await (0, bcryptjs_1.genSalt)();
        return await (0, bcryptjs_1.hash)(password, salt);
    }
    async genCrypt() {
        var shasum = crypto.createHash("sha1");
        var rand = crypto.randomBytes(127);
        shasum.update(rand);
        //console.log(shasum.digest("hex"));
        return shasum.digest("hex");
    }
    async intersection(a, b) {
        var t;
        if (b.length > a.length)
            t = b, b = a, a = t; // indexOf to loop over shorter
        return a.filter(function (e) {
            return b.indexOf(e) > -1;
        }).filter(function (e, i, c) {
            return c.indexOf(e) === i;
        });
    }
};
CommonServiceService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], CommonServiceService);
exports.CommonServiceService = CommonServiceService;
//# sourceMappingURL=common-service.service.js.map