"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupForms = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const broker_model_1 = require("./broker.model");
const customer_signup_model_1 = require("./customer-signup.model");
const customer_model_1 = require("./customer.model");
const signup_forms_plan_level_mapping_model_1 = require("./signup-forms-plan-level-mapping.model");
const broker_signup_forms_plans_model_1 = require("./broker-signup-forms-plans.model");
let SignupForms = class SignupForms extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 1000,
        generated: 0,
        mysql: { columnName: 'alias', dataType: 'varchar', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], SignupForms.prototype, "alias", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], SignupForms.prototype, "brokerId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 65535,
        generated: 0,
        mysql: { columnName: 'description', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], SignupForms.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 9,
        generated: 0,
        mysql: { columnName: 'form_type', dataType: 'enum', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], SignupForms.prototype, "formType", void 0);
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
], SignupForms.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'inelligibility_period', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], SignupForms.prototype, "inelligibilityPeriod", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        precision: 1,
        generated: 0,
        mysql: { columnName: 'is_demo_form', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], SignupForms.prototype, "isDemoForm", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 255,
        generated: 0,
        mysql: { columnName: 'keywords', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], SignupForms.prototype, "keywords", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 1000,
        generated: 0,
        mysql: { columnName: 'link', dataType: 'varchar', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], SignupForms.prototype, "link", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 255,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], SignupForms.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        generated: 0,
        mysql: { columnName: 'not_after', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], SignupForms.prototype, "notAfter", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        generated: 0,
        mysql: { columnName: 'not_before', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], SignupForms.prototype, "notBefore", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        precision: 1,
        generated: 0,
        mysql: { columnName: 'published', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], SignupForms.prototype, "published", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        precision: 1,
        generated: 0,
        mysql: { columnName: 'require_dental_health_coverage', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], SignupForms.prototype, "requireDentalHealthCoverage", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        precision: 1,
        generated: 0,
        mysql: { columnName: 'require_spouse_email', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], SignupForms.prototype, "requireSpouseEmail", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 255,
        generated: 0,
        mysql: { columnName: 'title', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], SignupForms.prototype, "title", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        precision: 1,
        generated: 0,
        mysql: { columnName: 'use_credit_card_payment_method', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], SignupForms.prototype, "useCreditCardPaymentMethod", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        precision: 1,
        generated: 0,
        mysql: { columnName: 'use_pad_payment_method', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], SignupForms.prototype, "usePadPaymentMethod", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        precision: 1,
        generated: 0,
        mysql: { columnName: 'warn_required_dependant_medical_exam', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], SignupForms.prototype, "warnRequiredDependantMedicalExam", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => customer_model_1.Customer, { through: { model: () => customer_signup_model_1.CustomerSignup, keyFrom: 'form_id', keyTo: 'customer_id' } }),
    tslib_1.__metadata("design:type", Array)
], SignupForms.prototype, "customers", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => signup_forms_plan_level_mapping_model_1.SignupFormsPlanLevelMapping, { keyTo: 'form_id' }),
    tslib_1.__metadata("design:type", Array)
], SignupForms.prototype, "signupFormsPlanLevelMappings", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => broker_model_1.Broker, { name: 'broker' }),
    tslib_1.__metadata("design:type", Number)
], SignupForms.prototype, "broker_id", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => broker_signup_forms_plans_model_1.BrokerSignupFormsPlans, { keyTo: 'form_id' }),
    tslib_1.__metadata("design:type", Array)
], SignupForms.prototype, "brokerSignupFormsPlans", void 0);
SignupForms = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'signup_forms' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], SignupForms);
exports.SignupForms = SignupForms;
//# sourceMappingURL=signup-forms.model.js.map