"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lengthVerification = exports.isAlphaorNot = exports.AlphaNumberorNot = exports.emailvalidation = void 0;
const tslib_1 = require("tslib");
const validator_1 = tslib_1.__importDefault(require("validator"));
async function emailvalidation(email) {
    let emailIdcheckStatus = validator_1.default.isEmail(email);
    return emailIdcheckStatus;
}
exports.emailvalidation = emailvalidation;
async function AlphaNumberorNot(userName) {
    let userNameValidation = validator_1.default.isAlphanumeric(userName);
    return userNameValidation;
}
exports.AlphaNumberorNot = AlphaNumberorNot;
async function isAlphaorNot(name) {
    let validate = validator_1.default.isAlpha(name);
    return validate;
}
exports.isAlphaorNot = isAlphaorNot;
async function lengthVerification(data, min, max) {
    if (data.length <= min || data.length >= max) {
        return false;
    }
}
exports.lengthVerification = lengthVerification;
//# sourceMappingURL=validation.services.js.map