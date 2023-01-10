"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerEoInsurance = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let BrokerEoInsurance = class BrokerEoInsurance extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerEoInsurance.prototype, "brokerId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 35,
        generated: 0,
        mysql: { columnName: 'certificate_number', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], BrokerEoInsurance.prototype, "certificateNumber", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
        generated: 0,
        mysql: { columnName: 'expiry_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], BrokerEoInsurance.prototype, "expiryDate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerEoInsurance.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 35,
        generated: 0,
        mysql: { columnName: 'insurer_name', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], BrokerEoInsurance.prototype, "insurerName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 35,
        generated: 0,
        mysql: { columnName: 'policy_number', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], BrokerEoInsurance.prototype, "policyNumber", void 0);
BrokerEoInsurance = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'broker_eo_insurance' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], BrokerEoInsurance);
exports.BrokerEoInsurance = BrokerEoInsurance;
//# sourceMappingURL=broker-eo-insurance.model.js.map