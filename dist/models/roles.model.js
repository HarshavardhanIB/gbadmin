"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Roles = class Roles extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], Roles.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 45,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Roles.prototype, "name", void 0);
Roles = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { idInjection: false, mysql: { table: 'roles' } } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Roles);
exports.Roles = Roles;
//# sourceMappingURL=roles.model.js.map