"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerSignupFormsPlans = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let BrokerSignupFormsPlans = class BrokerSignupFormsPlans extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'covered_percentage', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerSignupFormsPlans.prototype, "coveredPercentage", void 0);
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
], BrokerSignupFormsPlans.prototype, "formId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerSignupFormsPlans.prototype, "id", void 0);
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
], BrokerSignupFormsPlans.prototype, "planId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'rebate_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerSignupFormsPlans.prototype, "rebateId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], BrokerSignupFormsPlans.prototype, "form_id", void 0);
BrokerSignupFormsPlans = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'gbadmin', table: 'broker_signup_forms_plans' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], BrokerSignupFormsPlans);
exports.BrokerSignupFormsPlans = BrokerSignupFormsPlans;
//# sourceMappingURL=broker-signup-forms-plans.model.js.map