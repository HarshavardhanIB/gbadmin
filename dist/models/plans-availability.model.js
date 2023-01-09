"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansAvailability = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let PlansAvailability = class PlansAvailability extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'gst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlansAvailability.prototype, "gst", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'hst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlansAvailability.prototype, "hst", void 0);
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
], PlansAvailability.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'plan_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlansAvailability.prototype, "planId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 12,
        generated: 0,
        mysql: { columnName: 'price', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlansAvailability.prototype, "price", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'pst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlansAvailability.prototype, "pst", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 12,
        generated: 0,
        mysql: { columnName: 'qst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlansAvailability.prototype, "qst", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'state_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlansAvailability.prototype, "stateId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'tax_code', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlansAvailability.prototype, "taxCode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 15,
        generated: 0,
        mysql: { columnName: 'tax_name', dataType: 'varchar', dataLength: 15, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlansAvailability.prototype, "taxName", void 0);
PlansAvailability = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'plans_availability' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], PlansAvailability);
exports.PlansAvailability = PlansAvailability;
//# sourceMappingURL=plans-availability.model.js.map