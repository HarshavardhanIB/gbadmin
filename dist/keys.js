"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORAGE_DIRECTORY = exports.FILE_UPLOAD_SERVICE = exports.TokenServiceConstants = exports.TokenServiceBindings = void 0;
const core_1 = require("@loopback/core");
var TokenServiceBindings;
(function (TokenServiceBindings) {
    TokenServiceBindings.TOKEN_SECRET = core_1.BindingKey.create('authentication.jwt.secret');
    TokenServiceBindings.TOKEN_EXPIRES_IN = core_1.BindingKey.create('authentication.jwt.expiresIn');
    TokenServiceBindings.TOKEN_SERVICE = core_1.BindingKey.create('services.jwt.service');
})(TokenServiceBindings = exports.TokenServiceBindings || (exports.TokenServiceBindings = {}));
var TokenServiceConstants;
(function (TokenServiceConstants) {
    TokenServiceConstants.TOKEN_SECRET_ROUNDS = 10;
    TokenServiceConstants.TOKEN_SECRET_VALUE = 'IDEABYTES';
    TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE = '24h';
})(TokenServiceConstants = exports.TokenServiceConstants || (exports.TokenServiceConstants = {}));
/**
 * Binding key for the file upload service
 */
exports.FILE_UPLOAD_SERVICE = core_1.BindingKey.create('services.FileUpload');
/**
 * Binding key for the storage directory
 */
exports.STORAGE_DIRECTORY = core_1.BindingKey.create('storage.directory');
//# sourceMappingURL=keys.js.map