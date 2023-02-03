"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanLevel = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const equitable_plan_level_mapping_model_1 = require("./equitable-plan-level-mapping.model");
const greenshield_plan_level_mapping_model_1 = require("./greenshield-plan-level-mapping.model");
const insurance_plans_model_1 = require("./insurance-plans.model");
const plan_features_model_1 = require("./plan-features.model");
const plan_level_features_model_1 = require("./plan-level-features.model");
let PlanLevel = class PlanLevel extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 9,
        generated: 0,
        mysql: { columnName: 'background_color', dataType: 'varchar', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanLevel.prototype, "backgroundColor", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'child_max_age', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlanLevel.prototype, "childMaxAge", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 128,
        generated: 0,
        mysql: { columnName: 'description', dataType: 'varchar', dataLength: 128, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanLevel.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'disallowed_plan_levels', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanLevel.prototype, "disallowedPlanLevels", void 0);
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
], PlanLevel.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'level', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlanLevel.prototype, "level", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 45,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanLevel.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'ordering', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlanLevel.prototype, "ordering", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'parent_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlanLevel.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        precision: 1,
        generated: 0,
        mysql: { columnName: 'published', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], PlanLevel.prototype, "published", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'require_plan_level', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlanLevel.prototype, "requirePlanLevel", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 9,
        generated: 0,
        mysql: { columnName: 'text_color', dataType: 'varchar', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanLevel.prototype, "textColor", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 13,
        generated: 0,
        mysql: { columnName: 'tooltip_title', dataType: 'enum', dataLength: 13, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanLevel.prototype, "tooltipTitle", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => greenshield_plan_level_mapping_model_1.GreenshieldPlanLevelMapping, { keyTo: 'plan_level_id' }),
    tslib_1.__metadata("design:type", Array)
], PlanLevel.prototype, "greenshieldPackages", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => plan_level_features_model_1.PlanLevelFeatures, { keyTo: 'plan_level_id' }),
    tslib_1.__metadata("design:type", Array)
], PlanLevel.prototype, "planLevelFeatures", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => plan_features_model_1.PlanFeatures, { through: { model: () => plan_level_features_model_1.PlanLevelFeatures, keyFrom: 'planLevelId', keyTo: 'planFeatureId' } }),
    tslib_1.__metadata("design:type", Array)
], PlanLevel.prototype, "planFeatures", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => equitable_plan_level_mapping_model_1.EquitablePlanLevelMapping, { keyTo: 'plan_level_id' }),
    tslib_1.__metadata("design:type", Array)
], PlanLevel.prototype, "equitablePackages", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => insurance_plans_model_1.InsurancePlans, { keyTo: 'plan_level' }),
    tslib_1.__metadata("design:type", Array)
], PlanLevel.prototype, "plans", void 0);
PlanLevel = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'group_benefitz', table: 'plan_level' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], PlanLevel);
exports.PlanLevel = PlanLevel;
//# sourceMappingURL=plan-level.model.js.map