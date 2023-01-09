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
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CorporateTiers.prototype, "brokerId", void 0);
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
], CorporateTiers.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 35,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CorporateTiers.prototype, "name", void 0);
CorporateTiers = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'corporate_tiers' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], CorporateTiers);
exports.CorporateTiers = CorporateTiers;
//# sourceMappingURL=corporate-tiers.model.js.map