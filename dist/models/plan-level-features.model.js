"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanLevelFeatures = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const plan_features_model_1 = require("./plan-features.model");
let PlanLevelFeatures = class PlanLevelFeatures extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], PlanLevelFeatures.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 65535,
        generated: 0,
        mysql: { columnName: 'description', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanLevelFeatures.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'plan_feature_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlanLevelFeatures.prototype, "planFeatureId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'plan_level_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlanLevelFeatures.prototype, "planLevelId", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => plan_features_model_1.PlanFeatures, { name: 'feature' }),
    tslib_1.__metadata("design:type", Number)
], PlanLevelFeatures.prototype, "plan_feature_id", void 0);
PlanLevelFeatures = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            foreignKeys: {
                idx_plans_availability_plan_id: {
                    name: 'fk_plan_level_features_plan_id',
                    entity: 'PlanFeauters',
                    entityKey: 'id',
                    foreignKey: 'planFeatureId',
                },
                idx_plans_availability_state_id: {
                    name: 'fk_plan_level_features_plan_level_plan_level_id',
                    entity: 'PlanLevel',
                    entityKey: 'id',
                    foreignKey: 'planLevelId',
                },
            },
            mysql: { schema: 'group_benefitz', table: 'plan_level_features' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], PlanLevelFeatures);
exports.PlanLevelFeatures = PlanLevelFeatures;
//# sourceMappingURL=plan-level-features.model.js.map