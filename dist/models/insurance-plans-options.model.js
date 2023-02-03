"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsurancePlansOptions = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let InsurancePlansOptions = class InsurancePlansOptions extends repository_1.Entity {
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
], InsurancePlansOptions.prototype, "id", void 0);
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
], InsurancePlansOptions.prototype, "planId", void 0);
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
], InsurancePlansOptions.prototype, "planOptionsId", void 0);
InsurancePlansOptions = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            foreignKeys: {
                fk_in_surance_plan_options_insurance_plans_plan_id: {
                    name: 'fk_in_surance_plan_options_insurance_plans_plan_id',
                    entity: 'InsurancePlans',
                    entityKey: 'id',
                    foreignKey: 'planId',
                },
                fk_insurance_plan_options_plan_options_id: {
                    name: 'fk_insurance_plan_options_plan_options_id',
                    entity: 'PlanOptions',
                    entityKey: 'id',
                    foreignKey: 'planOptionsId',
                },
            },
            mysql: { schema: 'group_benefitz', table: 'insurance_plans_options' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], InsurancePlansOptions);
exports.InsurancePlansOptions = InsurancePlansOptions;
//# sourceMappingURL=insurance-plans-options.model.js.map