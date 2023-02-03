"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileAttributes = exports.createSignature = exports.validateSignatures = exports.getRandomIdBetween = exports.genCrypt = exports.encryptPassword = exports.generateRandomPassword = exports.generateFormLink = exports.randomString = exports.intersection = exports.onlyUnique = exports.objectLength = exports.countDuplicate = exports.getActivationCode = void 0;
const tslib_1 = require("tslib");
const bcryptjs_1 = require("bcryptjs");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const path_1 = tslib_1.__importDefault(require("path"));
const sharedSecret = "ibAitp";
async function getActivationCode() {
    return genCrypt();
}
exports.getActivationCode = getActivationCode;
function countDuplicate(array, element) {
    let i = 0;
    let count = 0;
    while (i < array.length) {
        if (array[i] == element)
            count++;
        i++;
    }
    return count;
}
exports.countDuplicate = countDuplicate;
function objectLength(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key))
            size++;
    }
    return size;
}
exports.objectLength = objectLength;
;
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
exports.onlyUnique = onlyUnique;
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
async function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
exports.randomString = randomString;
async function generateFormLink(userid) {
    const randomStr = await randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    return "/" + randomStr + userid.toString().padStart(4, '0');
}
exports.generateFormLink = generateFormLink;
async function generateRandomPassword() {
    return await randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
}
exports.generateRandomPassword = generateRandomPassword;
async function encryptPassword(password) {
    const salt = await (0, bcryptjs_1.genSalt)();
    return await (0, bcryptjs_1.hash)(password, salt);
}
exports.encryptPassword = encryptPassword;
function genCrypt() {
    var shasum = crypto_1.default.createHash("sha1");
    var rand = crypto_1.default.randomBytes(127);
    shasum.update(rand);
    //console.log(shasum.digest("hex"));
    return shasum.digest("hex");
}
exports.genCrypt = genCrypt;
function getRandomIdBetween(min, max) {
    return parseInt((Math.random() * (max - min) + min).toString());
}
exports.getRandomIdBetween = getRandomIdBetween;
function validateSignatures(computedSignature, retrievedSignature) {
    const computedSignatureBuffer = Buffer.from(computedSignature, 'hex');
    const retrievedSignatureBuffer = Buffer.from(retrievedSignature, 'hex');
    const valid = crypto_1.default.timingSafeEqual(computedSignatureBuffer, retrievedSignatureBuffer);
    return valid;
}
exports.validateSignatures = validateSignatures;
function createSignature(query) {
    const computedSignature = crypto_1.default.createHmac("sha256", sharedSecret).update(query).digest("hex");
    return computedSignature;
}
exports.createSignature = createSignature;
function getFileAttributes(file) {
    /*
  Returns:
  {
    root: 'C:/',
    dir: 'C://Code/my-website',
    base: 'index.html',
    ext: '.html',
    name: 'index'
  }
  */
    if (!file || file == '')
        file = 'D://sid/gb/gb-enrollment-form/allinputdata.json';
    return path_1.default.parse(file);
}
exports.getFileAttributes = getFileAttributes;
//# sourceMappingURL=common-functions.js.map