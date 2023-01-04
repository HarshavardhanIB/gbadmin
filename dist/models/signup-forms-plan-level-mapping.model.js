"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupFormsPlanLevelMapping = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const plan_level_model_1 = require("./plan-level.model");
let SignupFormsPlanLevelMapping = class SignupFormsPlanLevelMapping extends repository_1.Entity {
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
        mysql: { columnName: 'form_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], SignupFormsPlanLevelMapping.prototype, "formId", void 0);
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
], SignupFormsPlanLevelMapping.prototype, "id", void 0);
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
], SignupFormsPlanLevelMapping.prototype, "planLevelId", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => plan_level_model_1.PlanLevel, { name: 'planLevels' }),
    tslib_1.__metadata("design:type", Number)
], SignupFormsPlanLevelMapping.prototype, "plan_level_id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], SignupFormsPlanLevelMapping.prototype, "form_id", void 0);
SignupFormsPlanLevelMapping = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'gbadmin', table: 'signup_forms_plan_level_mapping' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], SignupFormsPlanLevelMapping);
exports.SignupFormsPlanLevelMapping = SignupFormsPlanLevelMapping;
//# sourceMappingURL=signup-forms-plan-level-mapping.model.js.map