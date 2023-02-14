"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationServiceService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const constants_1 = require("../constants");
let RegistrationServiceService = class RegistrationServiceService {
    constructor( /* Add @inject to inject parameters */) { }
    validateBankCode(bankCode) { return constants_1.REGEX.BANK_CODE.test(bankCode); }
    validateBranchCode(branchCode) { return constants_1.REGEX.BRANCH_CODE.test(branchCode); }
    validateAccountNo(accountNo) { return constants_1.REGEX.ACCOUNT_NO.test(accountNo); }
    validateName(name) { return constants_1.REGEX.NAME.test(name); }
    validateEmail(email) { return constants_1.REGEX.EMAIL.test(email); }
};
RegistrationServiceService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], RegistrationServiceService);
exports.RegistrationServiceService = RegistrationServiceService;
//# sourceMappingURL=registration-service.service.js.map