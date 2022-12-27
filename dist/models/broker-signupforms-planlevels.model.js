"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerSignupformsPlanlevels = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let BrokerSignupformsPlanlevels = class BrokerSignupformsPlanlevels extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 1,
        id: 1,
        mysql: { columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1 },
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerSignupformsPlanlevels.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'form_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerSignupformsPlanlevels.prototype, "formId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'planlevel_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerSignupformsPlanlevels.prototype, "planlevelId", void 0);
BrokerSignupformsPlanlevels = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'gbadmin', table: 'broker_signupforms_planlevels' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], BrokerSignupformsPlanlevels);
exports.BrokerSignupformsPlanlevels = BrokerSignupformsPlanlevels;
//# sourceMappingURL=broker-signupforms-planlevels.model.js.map