"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateTieredPlanLevels = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let CorporateTieredPlanLevels = class CorporateTieredPlanLevels extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTieredPlanLevels.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 12,
        mysql: { columnName: 'covered_percentage', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N' },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTieredPlanLevels.prototype, "coveredPercentage", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        //required: true,
        precision: 3,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'paid_by_company', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTieredPlanLevels.prototype, "paidByCompany", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        //required: true,
        precision: 3,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'covered_by_company', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTieredPlanLevels.prototype, "coveredByCompany", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        //required: true,
        precision: 3,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'paid_by_employee', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTieredPlanLevels.prototype, "paidByEmployee", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { columnName: 'plan_level_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N' },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTieredPlanLevels.prototype, "planLevelId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { columnName: 'spending_limit', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N' },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTieredPlanLevels.prototype, "spendingLimit", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { columnName: 'tier_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N' },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTieredPlanLevels.prototype, "tierId", void 0);
CorporateTieredPlanLevels = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'group_benefitz', table: 'corporate_tiered_plan_levels' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], CorporateTieredPlanLevels);
exports.CorporateTieredPlanLevels = CorporateTieredPlanLevels;
//# sourceMappingURL=corporate-tiered-plan-levels.model.js.map