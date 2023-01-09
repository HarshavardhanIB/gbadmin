"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialInstitutions = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let FinancialInstitutions = class FinancialInstitutions extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 255,
        generated: 0,
        mysql: { columnName: 'address', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], FinancialInstitutions.prototype, "address", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 44,
        generated: 0,
        mysql: { columnName: 'category', dataType: 'enum', dataLength: 44, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], FinancialInstitutions.prototype, "category", void 0);
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
], FinancialInstitutions.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 255,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], FinancialInstitutions.prototype, "name", void 0);
FinancialInstitutions = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'gbadmin', table: 'financial_institutions' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], FinancialInstitutions);
exports.FinancialInstitutions = FinancialInstitutions;
//# sourceMappingURL=financial-institutions.model.js.map