"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansOptionsReporting = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let PlansOptionsReporting = class PlansOptionsReporting extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 255,
        generated: 0,
        mysql: { columnName: 'email', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlansOptionsReporting.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], PlansOptionsReporting.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 35,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlansOptionsReporting.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'plan_level_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], PlansOptionsReporting.prototype, "planLevelId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 255,
        generated: 0,
        mysql: { columnName: 'reporting_data', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlansOptionsReporting.prototype, "reportingData", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 20,
        generated: 0,
        mysql: { columnName: 'reporting_id', dataType: 'varchar', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlansOptionsReporting.prototype, "reportingId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 15,
        generated: 0,
        mysql: { columnName: 'reporting_type', dataType: 'enum', dataLength: 15, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlansOptionsReporting.prototype, "reportingType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 255,
        generated: 0,
        mysql: { columnName: 'reporting_url', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], PlansOptionsReporting.prototype, "reportingUrl", void 0);
PlansOptionsReporting = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'gbadmin', table: 'plans_options_reporting' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], PlansOptionsReporting);
exports.PlansOptionsReporting = PlansOptionsReporting;
//# sourceMappingURL=plans-options-reporting.model.js.map