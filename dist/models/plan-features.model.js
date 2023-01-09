"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanFeatures = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let PlanFeatures = class PlanFeatures extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 255,
        generated: 0,
        mysql: { columnName: 'category', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanFeatures.prototype, "category", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 400,
        generated: 0,
        mysql: { columnName: 'description', dataType: 'varchar', dataLength: 400, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanFeatures.prototype, "description", void 0);
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
], PlanFeatures.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 255,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlanFeatures.prototype, "name", void 0);
PlanFeatures = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'plan_features' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], PlanFeatures);
exports.PlanFeatures = PlanFeatures;
//# sourceMappingURL=plan-features.model.js.map