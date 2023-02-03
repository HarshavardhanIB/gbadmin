"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanOptions = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const plan_options_values_model_1 = require("./plan-options-values.model");
let PlanOptions = class PlanOptions extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 255,
        generated: 0,
        mysql: { columnName: 'description', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanOptions.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], PlanOptions.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 255,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanOptions.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 5,
        generated: 0,
        mysql: { columnName: 'type', dataType: 'enum', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanOptions.prototype, "type", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => plan_options_values_model_1.PlanOptionsValues, { keyTo: 'plan_options_id' }),
    tslib_1.__metadata("design:type", Array)
], PlanOptions.prototype, "planOptionsValues", void 0);
PlanOptions = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'group_benefitz', table: 'plan_options' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], PlanOptions);
exports.PlanOptions = PlanOptions;
//# sourceMappingURL=plan-options.model.js.map