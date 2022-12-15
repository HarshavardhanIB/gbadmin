"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerPlans = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let CustomerPlans = class CustomerPlans extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        generated: 0,
        mysql: { columnName: 'activation_date', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerPlans.prototype, "activationDate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        generated: 0,
        mysql: { columnName: 'cancellation_date', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerPlans.prototype, "cancellationDate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'customer_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'gst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "gst", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'gst_amount', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "gstAmount", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'gst_code', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerPlans.prototype, "gstCode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'gst_rate', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "gstRate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'hst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "hst", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'hst_amount', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "hstAmount", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'hst_code', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerPlans.prototype, "hstCode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'hst_rate', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "hstRate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        // precision: 10,
        // scale: 0,
        generated: 1,
        id: 1
        // mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'plan_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "planId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'price', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "price", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'pst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "pst", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'pst_amount', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "pstAmount", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'pst_code', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerPlans.prototype, "pstCode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'pst_rate', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "pstRate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'qst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "qst", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'qst_amount', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "qstAmount", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'qst_code', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerPlans.prototype, "qstCode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'qst_rate', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerPlans.prototype, "qstRate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 7,
        generated: 0,
        mysql: { columnName: 'status', dataType: 'enum', dataLength: 7, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerPlans.prototype, "status", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'subscription_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerPlans.prototype, "subscriptionId", void 0);
CustomerPlans = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false, foreignKeys: {
                fk_customer_plans_customers_customer_id: {
                    name: 'fk_customer_plans_customers_customer_id',
                    entity: 'Customers',
                    entityKey: 'id',
                    foreignKey: 'customerId',
                }
            }, mysql: { table: 'customer_plans' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], CustomerPlans);
exports.CustomerPlans = CustomerPlans;
//# sourceMappingURL=customer-plans.model.js.map