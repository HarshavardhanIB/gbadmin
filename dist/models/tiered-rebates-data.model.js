"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TieredRebatesData = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let TieredRebatesData = class TieredRebatesData extends repository_1.Entity {
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
        id: 1,
        mysql: { columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], TieredRebatesData.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'tiered_rebate_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], TieredRebatesData.prototype, "tieredRebateId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 12,
        generated: 0,
        mysql: { columnName: 'value', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], TieredRebatesData.prototype, "value", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'threshold', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], TieredRebatesData.prototype, "threshold", void 0);
TieredRebatesData = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'tiered_rebates_data' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], TieredRebatesData);
exports.TieredRebatesData = TieredRebatesData;
//# sourceMappingURL=tiered-rebates-data.model.js.map