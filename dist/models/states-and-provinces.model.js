"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatesAndProvinces = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let StatesAndProvinces = class StatesAndProvinces extends repository_1.Entity {
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
        mysql: { columnName: 'country_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], StatesAndProvinces.prototype, "countryId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'equitable_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], StatesAndProvinces.prototype, "equitableId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 2,
        generated: 0,
        mysql: { columnName: 'fusebill_id', dataType: 'varchar', dataLength: 2, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], StatesAndProvinces.prototype, "fusebillId", void 0);
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
], StatesAndProvinces.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], StatesAndProvinces.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 2000,
        generated: 0,
        mysql: { columnName: 'provincial_healthcare_url', dataType: 'varchar', dataLength: 2000, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], StatesAndProvinces.prototype, "provincialHealthcareUrl", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        precision: 1,
        generated: 0,
        mysql: { columnName: 'published', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], StatesAndProvinces.prototype, "published", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 6,
        generated: 0,
        mysql: { columnName: 'short_name', dataType: 'varchar', dataLength: 6, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], StatesAndProvinces.prototype, "shortName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 20,
        generated: 0,
        mysql: { columnName: 'zipcodes', dataType: 'varchar', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], StatesAndProvinces.prototype, "zipcodes", void 0);
StatesAndProvinces = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'states_and_provinces' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], StatesAndProvinces);
exports.StatesAndProvinces = StatesAndProvinces;
//# sourceMappingURL=states-and-provinces.model.js.map