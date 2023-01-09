"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TieredRebates = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let TieredRebates = class TieredRebates extends repository_1.Entity {
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
        mysql: { columnName: 'description', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], TieredRebates.prototype, "description", void 0);
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
], TieredRebates.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 255,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], TieredRebates.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        precision: 1,
        generated: 0,
        mysql: { columnName: 'published', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], TieredRebates.prototype, "published", void 0);
TieredRebates = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'tiered_rebates' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], TieredRebates);
exports.TieredRebates = TieredRebates;
//# sourceMappingURL=tiered-rebates.model.js.map