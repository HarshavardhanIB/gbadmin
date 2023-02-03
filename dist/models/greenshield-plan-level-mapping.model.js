"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreenshieldPlanLevelMapping = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let GreenshieldPlanLevelMapping = class GreenshieldPlanLevelMapping extends repository_1.Entity {
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
], GreenshieldPlanLevelMapping.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        length: 1,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'char', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], GreenshieldPlanLevelMapping.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'plan_level_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], GreenshieldPlanLevelMapping.prototype, "planLevelId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'state_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], GreenshieldPlanLevelMapping.prototype, "stateId", void 0);
GreenshieldPlanLevelMapping = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            foreignKeys: {
                idx_plans_availability_plan_id: {
                    name: 'fk_greenshield_plan_level_state_id',
                    entity: 'StatesAndProvinces',
                    entityKey: 'id',
                    foreignKey: 'stateId',
                },
                idx_plans_availability_state_id: {
                    name: 'fk_greenshield_plan_level_plan_level_id',
                    entity: 'PlanLevel',
                    entityKey: 'id',
                    foreignKey: 'planLevelId',
                },
            },
            mysql: { schema: 'group_benefitz', table: 'greenshield_plan_level_mapping' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], GreenshieldPlanLevelMapping);
exports.GreenshieldPlanLevelMapping = GreenshieldPlanLevelMapping;
//# sourceMappingURL=greenshield-plan-level-mapping.model.js.map