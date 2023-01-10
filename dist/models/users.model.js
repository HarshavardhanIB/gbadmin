"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const customer_model_1 = require("./customer.model");
let Users = class Users extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 100,
        generated: 0,
        mysql: { columnName: 'activation', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Users.prototype, "activation", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        precision: 1,
        generated: 0,
        mysql: { columnName: 'block', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], Users.prototype, "block", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'company_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Users.prototype, "companyId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        precision: 1,
        generated: 0,
        mysql: { columnName: 'deleted', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], Users.prototype, "deleted", void 0);
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
], Users.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        generated: 0,
        mysql: { columnName: 'last_login', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Users.prototype, "lastLogin", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 256,
        generated: 0,
        mysql: { columnName: 'otp_key', dataType: 'varchar', dataLength: 256, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Users.prototype, "otpKey", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'otp_token', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Users.prototype, "otpToken", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 255,
        generated: 0,
        mysql: { columnName: 'password', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Users.prototype, "password", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
        generated: 0,
        mysql: { columnName: 'registration_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Users.prototype, "registrationDate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 21,
        generated: 0,
        mysql: { columnName: 'role', dataType: 'enum', dataLength: 21, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Users.prototype, "role", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'username', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Users.prototype, "username", void 0);
tslib_1.__decorate([
    (0, repository_1.hasOne)(() => customer_model_1.Customer, { keyTo: 'user_id' }),
    tslib_1.__metadata("design:type", customer_model_1.Customer)
], Users.prototype, "customer", void 0);
Users = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'users' } } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Users);
exports.Users = Users;
//# sourceMappingURL=users.model.js.map