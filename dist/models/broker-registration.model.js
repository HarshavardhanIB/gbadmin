"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerRegistration = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let BrokerRegistration = class BrokerRegistration extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerRegistration.prototype, "brokerId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        id: 1,
        mysql: { columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerRegistration.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'insurance_company_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerRegistration.prototype, "insuranceCompanyId", void 0);
BrokerRegistration = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'broker_registration' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], BrokerRegistration);
exports.BrokerRegistration = BrokerRegistration;
//# sourceMappingURL=broker-registration.model.js.map