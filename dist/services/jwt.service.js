"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const util_1 = require("util");
const keys_1 = require("../keys");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
// const jwt = require('jsonwebtoken');
const signAsync = (0, util_1.promisify)(jwt.sign);
const verifyAsync = (0, util_1.promisify)(jwt.verify);
class JWTService {
    async generateToken(userProfile) {
        if (!userProfile) {
            throw new rest_1.HttpErrors.Unauthorized('Error while generating token :userProfile is null');
        }
        let token = '';
        try {
            token = jwt.sign(userProfile, this.jwtSecret, { expiresIn: this.expiresSecret });
            return token;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized(`error generating token ${err}`);
        }
    }
    async verifyToken(token) {
        if (!token) {
            throw new rest_1.HttpErrors.Unauthorized(`Error verifying token:'token' is null`);
        }
        ;
        let userProfile;
        try {
            const decryptedToken = jwt.verify(token, this.jwtSecret);
            console.log("decryptedToken>>>", decryptedToken);
            userProfile = Object.assign({ [security_1.securityId]: '', id: '', name: '', role: '' }, { [security_1.securityId]: decryptedToken.id, id: decryptedToken.id, name: decryptedToken.name, role: decryptedToken.role });
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized(`Error verifying token:${err}`);
        }
        return userProfile;
    }
}
tslib_1.__decorate([
    (0, core_1.inject)(keys_1.TokenServiceBindings.TOKEN_SECRET),
    tslib_1.__metadata("design:type", String)
], JWTService.prototype, "jwtSecret", void 0);
tslib_1.__decorate([
    (0, core_1.inject)(keys_1.TokenServiceBindings.TOKEN_EXPIRES_IN),
    tslib_1.__metadata("design:type", String)
], JWTService.prototype, "expiresSecret", void 0);
exports.JWTService = JWTService;
//# sourceMappingURL=jwt.service.js.map