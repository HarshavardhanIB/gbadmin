"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Corporate = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const bcryptjs_1 = require("bcryptjs");
let Corporate = class Corporate {
    constructor( /* Add @inject to inject parameters */) { }
    async encryptPswrd(password) {
        let encryptedPasswrd = await (0, bcryptjs_1.hash)(password, await (0, bcryptjs_1.genSalt)());
        return encryptedPasswrd;
    }
};
Corporate = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], Corporate);
exports.Corporate = Corporate;
//# sourceMappingURL=corporate.service.js.map