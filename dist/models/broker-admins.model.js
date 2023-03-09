"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerAdmins = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let BrokerAdmins = class BrokerAdmins extends repository_1.Entity {
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
], BrokerAdmins.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { columnName: 'user_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N' },
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerAdmins.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N' },
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerAdmins.prototype, "brokerId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerAdmins.prototype, "user_id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerAdmins.prototype, "broker_id", void 0);
BrokerAdmins = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'group_benefitz', table: 'broker_admins' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], BrokerAdmins);
exports.BrokerAdmins = BrokerAdmins;
//# sourceMappingURL=broker-admins.model.js.map