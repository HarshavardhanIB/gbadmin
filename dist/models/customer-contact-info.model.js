"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerContactInfo = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let CustomerContactInfo = class CustomerContactInfo extends repository_1.Entity {
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
        mysql: { columnName: 'contact_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerContactInfo.prototype, "contactId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'customer_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerContactInfo.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerContactInfo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerContactInfo.prototype, "customer_id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerContactInfo.prototype, "contact_id", void 0);
CustomerContactInfo = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false, foreignKeys: {
                idx_customer_contact_id: {
                    name: 'idx_customer_contact_id',
                    entity: 'Customers',
                    entityKey: 'id',
                    foreignKey: 'customerId',
                },
                idx_contact_info_id: {
                    name: 'idx_contact_info_id',
                    entity: 'ContactInformation',
                    entityKey: 'id',
                    foreignKey: 'contactId',
                },
            }, mysql: { schema: 'gbadmin', table: 'customer_contact_info' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], CustomerContactInfo);
exports.CustomerContactInfo = CustomerContactInfo;
//# sourceMappingURL=customer-contact-info.model.js.map