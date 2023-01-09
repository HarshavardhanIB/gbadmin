"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerPlanOptionsValues = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let CustomerPlanOptionsValues = class CustomerPlanOptionsValues extends repository_1.Entity {
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
        mysql: { columnName: 'customer_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlanOptionsValues.prototype, "customerId", void 0);
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
], CustomerPlanOptionsValues.prototype, "id", void 0);
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
], CustomerPlanOptionsValues.prototype, "planOptionsId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 65535,
        generated: 0,
        mysql: { columnName: 'plan_options_value', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerPlanOptionsValues.prototype, "planOptionsValue", void 0);
CustomerPlanOptionsValues = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'gbadmin', table: 'customer_plan_options_values' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], CustomerPlanOptionsValues);
exports.CustomerPlanOptionsValues = CustomerPlanOptionsValues;
//# sourceMappingURL=customer-plan-options-values.model.js.map