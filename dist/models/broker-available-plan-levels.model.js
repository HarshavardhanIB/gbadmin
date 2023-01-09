"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerAvailablePlanLevels = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let BrokerAvailablePlanLevels = class BrokerAvailablePlanLevels extends repository_1.Entity {
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
], BrokerAvailablePlanLevels.prototype, "brokerId", void 0);
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
], BrokerAvailablePlanLevels.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        precision: 1,
        generated: 0,
        mysql: { columnName: 'is_upgradable', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], BrokerAvailablePlanLevels.prototype, "isUpgradable", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'plan_level_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerAvailablePlanLevels.prototype, "planLevelId", void 0);
BrokerAvailablePlanLevels = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'gbadmin', table: 'broker_available_plan_levels' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], BrokerAvailablePlanLevels);
exports.BrokerAvailablePlanLevels = BrokerAvailablePlanLevels;
//# sourceMappingURL=broker-available-plan-levels.model.js.map