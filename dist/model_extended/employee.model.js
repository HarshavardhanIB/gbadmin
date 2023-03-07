"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Employee = class Employee extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "employeeId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 45
    }),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 45
    }),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 45,
        format: 'email',
    }),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "emailId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 200,
    }),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "occupation", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "dateOfHire", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        require: true
    }),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "sex", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        require: true
    }),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "residentIn", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        require: false
    }),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "familyStatus", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        require: false,
        length: 10,
    }),
    tslib_1.__metadata("design:type", Number)
], Employee.prototype, "phoneNum", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        require: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Employee.prototype, "walletLimit", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        require: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Employee.prototype, "provienceId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        require: true,
    }),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "provienceName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        require: false
    }),
    tslib_1.__metadata("design:type", Number)
], Employee.prototype, "tier", void 0);
Employee = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { idInjection: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Employee);
exports.Employee = Employee;
//# sourceMappingURL=employee.model.js.map