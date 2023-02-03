"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuthorization = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const security_1 = require("@loopback/security");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
// Instance level authorizer
// Can be also registered as an authorizer, depends on users' need.
async function basicAuthorization(authorizationCtx, metadata) {
    console.log("entere>>> basic authorization");
    // No access if authorization details are missing
    let currentUser;
    if (authorizationCtx.principals.length > 0) {
        const user = lodash_1.default.pick(authorizationCtx.principals[0], [
            'id',
            'name',
            'role',
        ]);
        console.log(user);
        currentUser = { [security_1.securityId]: user.id, name: user.name, role: user.role };
        console.log(currentUser);
    }
    else {
        return authorization_1.AuthorizationDecision.DENY;
    }
    console.log(">> metadata");
    console.log(metadata.allowedRoles);
    console.log(">> current");
    console.log(currentUser.role);
    if (!currentUser.role) {
        return authorization_1.AuthorizationDecision.DENY;
    }
    // Authorize everything that does not have a allowedRoles property
    if (!metadata.allowedRoles) {
        return authorization_1.AuthorizationDecision.ALLOW;
    }
    console.log(">> metadata");
    console.log(metadata.allowedRoles);
    console.log(">> current");
    console.log(currentUser.role);
    let roleIsAllowed = false;
    if (metadata.allowedRoles.includes(currentUser.role)) {
        roleIsAllowed = true;
    }
    if (!roleIsAllowed) {
        return authorization_1.AuthorizationDecision.DENY;
    }
    return authorization_1.AuthorizationDecision.ALLOW;
}
exports.basicAuthorization = basicAuthorization;
//# sourceMappingURL=auth.middleware.js.map