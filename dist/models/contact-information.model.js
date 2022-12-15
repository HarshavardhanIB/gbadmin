"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactInformation = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let ContactInformation = class ContactInformation extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 16,
        generated: 0,
        mysql: { columnName: 'address_type', dataType: 'enum', dataLength: 16, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], ContactInformation.prototype, "addressType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 5,
        generated: 0,
        mysql: { columnName: 'apt', dataType: 'varchar', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], ContactInformation.prototype, "apt", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'city', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], ContactInformation.prototype, "city", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 17,
        generated: 0,
        mysql: { columnName: 'contact_type', dataType: 'enum', dataLength: 17, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], ContactInformation.prototype, "contactType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'Buffer',
        length: 45,
        generated: 0,
        mysql: { columnName: 'country', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], ContactInformation.prototype, "country", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'fusebill_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], ContactInformation.prototype, "fusebillId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        // precision: 10,
        // scale: 0,
        generated: 1,
        id: 1
        // mysql: { columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1 },
    }),
    tslib_1.__metadata("design:type", Number)
], ContactInformation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 255,
        generated: 0,
        mysql: { columnName: 'line1', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], ContactInformation.prototype, "line1", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 255,
        generated: 0,
        mysql: { columnName: 'line2', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], ContactInformation.prototype, "line2", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 10,
        generated: 0,
        mysql: { columnName: 'postal_code', dataType: 'varchar', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], ContactInformation.prototype, "postalCode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'primary_email', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], ContactInformation.prototype, "primaryEmail", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'primary_phone', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], ContactInformation.prototype, "primaryPhone", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'secondary_email', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], ContactInformation.prototype, "secondaryEmail", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'secondary_phone', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], ContactInformation.prototype, "secondaryPhone", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'state', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], ContactInformation.prototype, "state", void 0);
ContactInformation = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { table: 'contact_information' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], ContactInformation);
exports.ContactInformation = ContactInformation;
//# sourceMappingURL=contact-information.model.js.map