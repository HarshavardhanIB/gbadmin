"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Broker = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const broker_eo_insurance_model_1 = require("./broker-eo-insurance.model");
const broker_licensed_states_and_provinces_model_1 = require("./broker-licensed-states-and-provinces.model");
const contact_information_model_1 = require("./contact-information.model");
const signup_forms_model_1 = require("./signup-forms.model");
const users_model_1 = require("./users.model");
let Broker = class Broker extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 11,
        generated: 0,
        mysql: { columnName: 'broker_type', dataType: 'enum', dataLength: 11, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Broker.prototype, "brokerType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'contact_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Broker.prototype, "contactId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        precision: 1,
        generated: 0,
        mysql: { columnName: 'deleted', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], Broker.prototype, "deleted", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'description', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Broker.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        precision: 1,
        generated: 0,
        mysql: { columnName: 'discoverable', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], Broker.prototype, "discoverable", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 35,
        generated: 0,
        mysql: { columnName: 'fusebill_corporate_customer_id', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Broker.prototype, "fusebillCorporateCustomerId", void 0);
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
], Broker.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 1000,
        generated: 0,
        mysql: { columnName: 'link', dataType: 'varchar', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Broker.prototype, "link", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 255,
        generated: 0,
        mysql: { columnName: 'logo', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Broker.prototype, "logo", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Broker.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'parent_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Broker.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        generated: 0,
        mysql: { columnName: 'policy_start_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Broker.prototype, "policyStartDate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        precision: 1,
        generated: 0,
        mysql: { columnName: 'published', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], Broker.prototype, "published", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'sales_tracking_code', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Broker.prototype, "salesTrackingCode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 35,
        generated: 0,
        mysql: { columnName: 'sales_tracking_type', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Broker.prototype, "salesTrackingType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'settings_allow_group_benefits_wallet', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Broker.prototype, "settingsAllowGroupBenefitsWallet", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'settings_allow_invoice_payment_method', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Broker.prototype, "settingsAllowInvoicePaymentMethod", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'settings_enable_tiered_health_benefits', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Broker.prototype, "settingsEnableTieredHealthBenefits", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 8,
        generated: 0,
        mysql: { columnName: 'settings_health_spending_account', dataType: 'enum', dataLength: 8, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Broker.prototype, "settingsHealthSpendingAccount", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 9,
        generated: 0,
        mysql: { columnName: 'settings_health_spending_allotment', dataType: 'enum', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Broker.prototype, "settingsHealthSpendingAllotment", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'settings_rollover_employee_limit_next_year', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Broker.prototype, "settingsRolloverEmployeeLimitNextYear", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 19,
        generated: 0,
        mysql: { columnName: 'settings_rollover_unused_wallet_funds', dataType: 'enum', dataLength: 19, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Broker.prototype, "settingsRolloverUnusedWalletFunds", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'unique_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], Broker.prototype, "uniqueId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        precision: 1,
        generated: 0,
        mysql: { columnName: 'use_credit_card_payment_method', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], Broker.prototype, "useCreditCardPaymentMethod", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        precision: 1,
        generated: 0,
        mysql: { columnName: 'use_invoice_payment_method', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], Broker.prototype, "useInvoicePaymentMethod", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        precision: 1,
        generated: 0,
        mysql: { columnName: 'use_pad_payment_method', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], Broker.prototype, "usePadPaymentMethod", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'user_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Broker.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'wait_time', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], Broker.prototype, "waitTime", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => users_model_1.Users, { name: 'user' }),
    tslib_1.__metadata("design:type", Number)
], Broker.prototype, "user_id", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => contact_information_model_1.ContactInformation, { name: 'contactInfo' }),
    tslib_1.__metadata("design:type", Number)
], Broker.prototype, "contact_id", void 0);
tslib_1.__decorate([
    (0, repository_1.hasOne)(() => broker_eo_insurance_model_1.BrokerEoInsurance, { keyTo: 'broker_id' }),
    tslib_1.__metadata("design:type", broker_eo_insurance_model_1.BrokerEoInsurance)
], Broker.prototype, "brokerEoInsurance", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => broker_licensed_states_and_provinces_model_1.BrokerLicensedStatesAndProvinces, { keyTo: 'broker_id' }),
    tslib_1.__metadata("design:type", Array)
], Broker.prototype, "brokerLicensedStatesAndProvinces", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => signup_forms_model_1.SignupForms, { keyTo: 'broker_id' }),
    tslib_1.__metadata("design:type", Array)
], Broker.prototype, "signupForms", void 0);
Broker = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false, foreignKeys: {
                idx_broker_user_id: {
                    name: 'idx_broker_user_id',
                    entity: 'Users',
                    entityKey: 'id',
                    foreignKey: 'userId',
                },
            }, mysql: { schema: 'gbadmin', table: 'broker' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Broker);
exports.Broker = Broker;
//# sourceMappingURL=broker.model.js.map