"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersection = exports.genCrypt = exports.encryptPassword = exports.generateRandomPassword = exports.randomString = void 0;
const tslib_1 = require("tslib");
const bcryptjs_1 = require("bcryptjs");
const crypto = tslib_1.__importStar(require("crypto"));
async function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
exports.randomString = randomString;
async function generateRandomPassword() {
    const PASSWORD_LENGTH = 8;
    return await randomString(PASSWORD_LENGTH, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
}
exports.generateRandomPassword = generateRandomPassword;
async function encryptPassword(password) {
    const salt = await (0, bcryptjs_1.genSalt)();
    return await (0, bcryptjs_1.hash)(password, salt);
}
exports.encryptPassword = encryptPassword;
function genCrypt() {
    var shasum = crypto.createHash("sha1");
    var rand = crypto.randomBytes(127);
    shasum.update(rand);
    //console.log(shasum.digest("hex"));
    return shasum.digest("hex");
}
exports.genCrypt = genCrypt;
async function intersection(a, b) {
    var t;
    if (b.length > a.length)
        t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    }).filter(function (e, i, c) {
        return c.indexOf(e) === i;
    });
}
exports.intersection = intersection;
//# sourceMappingURL=common.services.js.map