"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporatePaidTieredPlanLevels = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let CorporatePaidTieredPlanLevels = class CorporatePaidTieredPlanLevels extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 12,
        generated: 0,
        mysql: { columnName: 'covered_percentage', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporatePaidTieredPlanLevels.prototype, "coveredPercentage", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], CorporatePaidTieredPlanLevels.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'plan_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporatePaidTieredPlanLevels.prototype, "planId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'spending_limit', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporatePaidTieredPlanLevels.prototype, "spendingLimit", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'tier_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporatePaidTieredPlanLevels.prototype, "tierId", void 0);
CorporatePaidTieredPlanLevels = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'gbadmin', table: 'corporate_paid_tiered_plan_levels' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], CorporatePaidTieredPlanLevels);
exports.CorporatePaidTieredPlanLevels = CorporatePaidTieredPlanLevels;
//# sourceMappingURL=corporate-paid-tiered-plan-levels.model.js.map