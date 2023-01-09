"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Admin = class Admin extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 45,
        generated: 0,
        mysql: { columnName: 'email', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "email", void 0);
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
], Admin.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 200,
        generated: 0,
        mysql: { columnName: 'password', dataType: 'varchar', dataLength: 200, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "password", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 45,
        generated: 0,
        mysql: { columnName: 'username', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "username", void 0);
Admin = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'admin' } } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Admin);
exports.Admin = Admin;
//# sourceMappingURL=admin.model.js.map