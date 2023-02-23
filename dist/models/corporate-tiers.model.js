"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateTiers = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let CorporateTiers = class CorporateTiers extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTiers.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N' },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTiers.prototype, "brokerId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 35,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'N' },
    }),
    tslib_1.__metadata("design:type", String)
], CorporateTiers.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 3,
        scale: 0,
        mysql: { columnName: 'published', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N' },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTiers.prototype, "published", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 20,
        mysql: { columnName: 'tier_type', dataType: 'enum', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'N' },
    }),
    tslib_1.__metadata("design:type", String)
], CorporateTiers.prototype, "tierType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 3,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'from_length', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTiers.prototype, "fromLength", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 3,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'to_length', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTiers.prototype, "toLength", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 12,
        mysql: { columnName: 'income_percentage', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N' },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTiers.prototype, "incomePercentage", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 12,
        mysql: { columnName: 'annual_income', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N' },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTiers.prototype, "annualIncome", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        mysql: { columnName: 'spending_limit', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y' },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTiers.prototype, "spendingLimit", void 0);
CorporateTiers = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'group_benefitz', table: 'corporate_tiers' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], CorporateTiers);
exports.CorporateTiers = CorporateTiers;
//# sourceMappingURL=corporate-tiers.model.js.map