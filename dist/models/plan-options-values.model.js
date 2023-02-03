"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanOptionsValues = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let PlanOptionsValues = class PlanOptionsValues extends repository_1.Entity {
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
], PlanOptionsValues.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 255,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanOptionsValues.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'plan_options_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlanOptionsValues.prototype, "planOptionsId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 255,
        generated: 0,
        mysql: { columnName: 'reporting_email', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanOptionsValues.prototype, "reportingEmail", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 255,
        generated: 0,
        mysql: { columnName: 'value', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanOptionsValues.prototype, "value", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], PlanOptionsValues.prototype, "plan_options_id", void 0);
PlanOptionsValues = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            foreignKeys: {
                fk_plan_options_plan_options_id: {
                    name: 'fk_plan_options_plan_options_id',
                    entity: 'PlanOptions',
                    entityKey: 'id',
                    foreignKey: 'planOptionsId',
                }
            },
            mysql: { schema: 'group_benefitz', table: 'plan_options_values' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], PlanOptionsValues);
exports.PlanOptionsValues = PlanOptionsValues;
//# sourceMappingURL=plan-options-values.model.js.map