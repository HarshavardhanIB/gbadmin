"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logging = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Logging = class Logging extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'changed_by_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Logging.prototype, "changedById", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'changed_by_username', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Logging.prototype, "changedByUsername", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        generated: 0,
        mysql: { columnName: 'created', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Logging.prototype, "created", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], Logging.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 65535,
        generated: 0,
        mysql: { columnName: 'new_value', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Logging.prototype, "newValue", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 65535,
        generated: 0,
        mysql: { columnName: 'old_value', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Logging.prototype, "oldValue", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 45,
        generated: 0,
        mysql: { columnName: 'record_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Logging.prototype, "recordId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 7,
        generated: 0,
        mysql: { columnName: 'source', dataType: 'enum', dataLength: 7, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Logging.prototype, "source", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 45,
        generated: 0,
        mysql: { columnName: 'table_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Logging.prototype, "tableName", void 0);
Logging = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'logging' } } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Logging);
exports.Logging = Logging;
//# sourceMappingURL=logging.model.js.map