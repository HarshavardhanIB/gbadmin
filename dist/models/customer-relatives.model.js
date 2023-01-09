"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRelatives = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let CustomerRelatives = class CustomerRelatives extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'carrier_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerRelatives.prototype, "carrierName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 6,
        generated: 0,
        mysql: { columnName: 'cob_coverage', dataType: 'enum', dataLength: 6, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerRelatives.prototype, "cobCoverage", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'customer_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerRelatives.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        precision: 1,
        generated: 0,
        mysql: { columnName: 'deleted', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], CustomerRelatives.prototype, "deleted", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        generated: 0,
        mysql: { columnName: 'dob', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerRelatives.prototype, "dob", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'email', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerRelatives.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        precision: 1,
        generated: 0,
        mysql: { columnName: 'enrolled_in_university', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], CustomerRelatives.prototype, "enrolledInUniversity", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 45,
        generated: 0,
        mysql: { columnName: 'first_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerRelatives.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'gender', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerRelatives.prototype, "gender", void 0);
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
], CustomerRelatives.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        precision: 1,
        generated: 0,
        mysql: { columnName: 'is_disabled', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], CustomerRelatives.prototype, "isDisabled", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 45,
        generated: 0,
        mysql: { columnName: 'last_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerRelatives.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'middle_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerRelatives.prototype, "middleName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 8,
        generated: 0,
        mysql: { columnName: 'relationship_type', dataType: 'enum', dataLength: 8, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerRelatives.prototype, "relationshipType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 9,
        generated: 0,
        mysql: { columnName: 'unique_sin_id', dataType: 'varchar', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerRelatives.prototype, "uniqueSinId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        generated: 0,
        mysql: { columnName: 'university_graduation_day', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], CustomerRelatives.prototype, "universityGraduationDay", void 0);
CustomerRelatives = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'customer_relatives' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], CustomerRelatives);
exports.CustomerRelatives = CustomerRelatives;
//# sourceMappingURL=customer-relatives.model.js.map