"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxTable = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let TaxTable = class TaxTable extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
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
], TaxTable.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'country_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], TaxTable.prototype, "countryId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        precision: 1,
        generated: 0,
        mysql: { columnName: 'is_federal_tax', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], TaxTable.prototype, "isFederalTax", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 12,
        generated: 0,
        mysql: { columnName: 'rate', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], TaxTable.prototype, "rate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'state_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], TaxTable.prototype, "stateId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 5,
        generated: 0,
        mysql: { columnName: 'tax_code', dataType: 'varchar', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], TaxTable.prototype, "taxCode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 3,
        generated: 0,
        mysql: { columnName: 'tax_name', dataType: 'varchar', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], TaxTable.prototype, "taxName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'zone_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], TaxTable.prototype, "zoneId", void 0);
TaxTable = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'group_benefitz', table: 'tax_table' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], TaxTable);
exports.TaxTable = TaxTable;
//# sourceMappingURL=tax-table.model.js.map