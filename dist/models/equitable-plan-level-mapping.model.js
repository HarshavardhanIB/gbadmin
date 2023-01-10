"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquitablePlanLevelMapping = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let EquitablePlanLevelMapping = class EquitablePlanLevelMapping extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 10,
        generated: 0,
        mysql: { columnName: 'class_code', dataType: 'varchar', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], EquitablePlanLevelMapping.prototype, "classCode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 100,
        generated: 0,
        mysql: { columnName: 'class_name', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], EquitablePlanLevelMapping.prototype, "className", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 10,
        generated: 0,
        mysql: { columnName: 'division_code', dataType: 'varchar', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], EquitablePlanLevelMapping.prototype, "divisionCode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 100,
        generated: 0,
        mysql: { columnName: 'division_name', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], EquitablePlanLevelMapping.prototype, "divisionName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], EquitablePlanLevelMapping.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'plan_level_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], EquitablePlanLevelMapping.prototype, "planLevelId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'state_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], EquitablePlanLevelMapping.prototype, "stateId", void 0);
EquitablePlanLevelMapping = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'gbadmin', table: 'equitable_plan_level_mapping' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], EquitablePlanLevelMapping);
exports.EquitablePlanLevelMapping = EquitablePlanLevelMapping;
//# sourceMappingURL=equitable-plan-level-mapping.model.js.map