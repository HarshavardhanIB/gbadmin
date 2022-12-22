"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const users_model_1 = require("./users.model");
const customer_relatives_model_1 = require("./customer-relatives.model");
const customer_plans_model_1 = require("./customer-plans.model");
const customer_signup_model_1 = require("./customer-signup.model");
const contact_information_model_1 = require("./contact-information.model");
const customer_contact_info_model_1 = require("./customer-contact-info.model");
const insurance_plans_model_1 = require("./insurance-plans.model");
let Customer = class Customer extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => users_model_1.Users, { name: 'user' }),
    tslib_1.__metadata("design:type", Number)
], Customer.prototype, "user_id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        generated: 0,
        mysql: { columnName: 'cc_expiry', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "ccExpiry", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        precision: 1,
        generated: 0,
        mysql: { columnName: 'cc_expiry_alert_sent', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], Customer.prototype, "ccExpiryAlertSent", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'company_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Customer.prototype, "companyId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'company_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "companyName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        precision: 1,
        generated: 0,
        mysql: { columnName: 'deleted', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], Customer.prototype, "deleted", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
        generated: 0,
        mysql: { columnName: 'dob', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "dob", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'equitable_certificate_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "equitableCertificateId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 10,
        generated: 0,
        mysql: { columnName: 'equitable_registration_status', dataType: 'enum', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "equitableRegistrationStatus", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 45,
        generated: 0,
        mysql: { columnName: 'first_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'fusebill_customer_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "fusebillCustomerId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'fusebill_payment_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "fusebillPaymentId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'gender', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'greenshield_member_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "greenshieldMemberId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 10,
        generated: 0,
        mysql: { columnName: 'greenshield_registration_status', dataType: 'enum', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "greenshieldRegistrationStatus", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'group_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Customer.prototype, "groupId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        // precision: 10,
        // scale: 0,
        generated: 1,
        id: 1
        //   mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
    }),
    tslib_1.__metadata("design:type", Number)
], Customer.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 45,
        generated: 0,
        mysql: { columnName: 'last_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 6,
        generated: 0,
        mysql: { columnName: 'marital_status', dataType: 'enum', dataLength: 6, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "maritalStatus", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'middle_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "middleName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 12,
        generated: 0,
        mysql: { columnName: 'monthly_recurring_revenue', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Customer.prototype, "monthlyRecurringRevenue", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 11,
        generated: 0,
        mysql: { columnName: 'payment_method', dataType: 'enum', dataLength: 11, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "paymentMethod", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'payment_method_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "paymentMethodId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'plan_level', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Customer.prototype, "planLevel", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
        generated: 0,
        mysql: { columnName: 'registration_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "registrationDate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 65535,
        generated: 0,
        mysql: { columnName: 'signature', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "signature", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 9,
        generated: 0,
        mysql: { columnName: 'status', dataType: 'enum', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "status", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 9,
        generated: 0,
        mysql: { columnName: 'unique_sin_id', dataType: 'varchar', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "uniqueSinId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        // precision: 10,
        // scale: 0,
        generated: 0,
        mysql: { columnName: 'user_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Customer.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => customer_relatives_model_1.CustomerRelatives, { keyTo: 'customer_id' }),
    tslib_1.__metadata("design:type", Array)
], Customer.prototype, "customerRelativeRelation", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => customer_plans_model_1.CustomerPlans, { keyTo: 'customer_id' }),
    tslib_1.__metadata("design:type", Array)
], Customer.prototype, "customerPlans", void 0);
tslib_1.__decorate([
    (0, repository_1.hasOne)(() => customer_signup_model_1.CustomerSignup, { keyTo: 'customer_id' }),
    tslib_1.__metadata("design:type", customer_signup_model_1.CustomerSignup)
], Customer.prototype, "customerSignup", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => contact_information_model_1.ContactInformation, { through: { model: () => customer_contact_info_model_1.CustomerContactInfo, keyFrom: 'customer_id', keyTo: 'contact_id' } }),
    tslib_1.__metadata("design:type", Array)
], Customer.prototype, "contactInformations", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => insurance_plans_model_1.InsurancePlans, { through: { model: () => customer_plans_model_1.CustomerPlans, keyFrom: 'customer_id', keyTo: 'plan_id' } }),
    tslib_1.__metadata("design:type", Array)
], Customer.prototype, "subscriptionPlans", void 0);
Customer = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false, foreignKeys: {
                idx_customer_user_id: {
                    name: 'idx_customer_user_id',
                    entity: 'Users',
                    entityKey: 'id',
                    foreignKey: 'userId',
                },
            }, mysql: { table: 'customer' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=customer.model.js.map