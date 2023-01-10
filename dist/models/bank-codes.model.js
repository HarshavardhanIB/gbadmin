"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankCodes = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let BankCodes = class BankCodes extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 3,
        generated: 0,
        mysql: { columnName: 'bank_code', dataType: 'char', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], BankCodes.prototype, "bankCode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'bank_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], BankCodes.prototype, "bankId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], BankCodes.prototype, "id", void 0);
BankCodes = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'bank_codes' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], BankCodes);
exports.BankCodes = BankCodes;
//# sourceMappingURL=bank-codes.model.js.map