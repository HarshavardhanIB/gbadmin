"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
let BroProvider = class BroProvider {
    constructor( /* Add @inject to inject parameters */) { }
    value() {
        // Add your implementation here
        throw new Error('To be implemented');
    }
};
BroProvider = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], BroProvider);
exports.BroProvider = BroProvider;
//# sourceMappingURL=bro.service.js.map