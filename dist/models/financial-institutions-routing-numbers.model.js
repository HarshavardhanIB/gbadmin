"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialInstitutionsRoutingNumbers = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const financial_institutions_model_1 = require("./financial-institutions.model");
let FinancialInstitutionsRoutingNumbers = class FinancialInstitutionsRoutingNumbers extends repository_1.Entity {
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
], FinancialInstitutionsRoutingNumbers.prototype, "address", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'bank_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], FinancialInstitutionsRoutingNumbers.prototype, "bankId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 3,
        generated: 0,
        mysql: { columnName: 'e_bank_code', dataType: 'char', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], FinancialInstitutionsRoutingNumbers.prototype, "eBankCode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 5,
        generated: 0,
        mysql: { columnName: 'e_transit_number', dataType: 'char', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], FinancialInstitutionsRoutingNumbers.prototype, "eTransitNumber", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], FinancialInstitutionsRoutingNumbers.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 3,
        generated: 0,
        mysql: { columnName: 'p_bank_code', dataType: 'char', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], FinancialInstitutionsRoutingNumbers.prototype, "pBankCode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 5,
        generated: 0,
        mysql: { columnName: 'p_transit_number', dataType: 'char', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], FinancialInstitutionsRoutingNumbers.prototype, "pTransitNumber", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => financial_institutions_model_1.FinancialInstitutions, { name: 'bank' }),
    tslib_1.__metadata("design:type", Number)
], FinancialInstitutionsRoutingNumbers.prototype, "bank_id", void 0);
FinancialInstitutionsRoutingNumbers = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            foreignKeys: {
                fk_bank_id: {
                    name: 'fk_bank_id',
                    entity: 'FinancialInstitutions',
                    entityKey: 'id',
                    foreignKey: 'bankId',
                }
            },
            mysql: { schema: 'group_benefitz', table: 'financial_institutions_routing_numbers' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], FinancialInstitutionsRoutingNumbers);
exports.FinancialInstitutionsRoutingNumbers = FinancialInstitutionsRoutingNumbers;
//# sourceMappingURL=financial-institutions-routing-numbers.model.js.map