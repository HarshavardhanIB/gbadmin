"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const states_and_provinces_model_1 = require("./states-and-provinces.model");
let Country = class Country extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 3,
        generated: 0,
        mysql: { columnName: 'currency', dataType: 'varchar', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 3,
        generated: 0,
        mysql: { columnName: 'currency_symbol', dataType: 'varchar', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "currencySymbol", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 3,
        generated: 0,
        mysql: { columnName: 'fusebill_id', dataType: 'varchar', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "fusebillId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 3,
        generated: 0,
        mysql: { columnName: 'greenshield_code', dataType: 'varchar', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "greenshieldCode", void 0);
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
], Country.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 5,
        generated: 0,
        mysql: { columnName: 'isocode', dataType: 'varchar', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "isocode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        precision: 1,
        generated: 0,
        mysql: { columnName: 'published', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], Country.prototype, "published", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 6,
        generated: 0,
        mysql: { columnName: 'short_name', dataType: 'varchar', dataLength: 6, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "shortName", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => states_and_provinces_model_1.StatesAndProvinces, { keyTo: 'country_id' }),
    tslib_1.__metadata("design:type", Array)
], Country.prototype, "statesAndProvinces", void 0);
Country = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'group_benefitz', table: 'country' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Country);
exports.Country = Country;
//# sourceMappingURL=country.model.js.map