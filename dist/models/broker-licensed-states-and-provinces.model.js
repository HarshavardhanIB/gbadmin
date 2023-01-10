"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerLicensedStatesAndProvinces = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const states_and_provinces_model_1 = require("./states-and-provinces.model");
let BrokerLicensedStatesAndProvinces = class BrokerLicensedStatesAndProvinces extends repository_1.Entity {
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
], BrokerLicensedStatesAndProvinces.prototype, "brokerId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        generated: 0,
        mysql: { columnName: 'expiry_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], BrokerLicensedStatesAndProvinces.prototype, "expiryDate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerLicensedStatesAndProvinces.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 26,
        generated: 0,
        mysql: { columnName: 'license_coverage', dataType: 'enum', dataLength: 26, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], BrokerLicensedStatesAndProvinces.prototype, "licenseCoverage", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 35,
        generated: 0,
        mysql: { columnName: 'license_number', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], BrokerLicensedStatesAndProvinces.prototype, "licenseNumber", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'reminder_email', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerLicensedStatesAndProvinces.prototype, "reminderEmail", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'state_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerLicensedStatesAndProvinces.prototype, "stateId", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => states_and_provinces_model_1.StatesAndProvinces, { name: 'stateFullDetails' }),
    tslib_1.__metadata("design:type", Number)
], BrokerLicensedStatesAndProvinces.prototype, "state_id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerLicensedStatesAndProvinces.prototype, "broker_id", void 0);
BrokerLicensedStatesAndProvinces = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'gbadmin', table: 'broker_licensed_states_and_provinces' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], BrokerLicensedStatesAndProvinces);
exports.BrokerLicensedStatesAndProvinces = BrokerLicensedStatesAndProvinces;
//# sourceMappingURL=broker-licensed-states-and-provinces.model.js.map