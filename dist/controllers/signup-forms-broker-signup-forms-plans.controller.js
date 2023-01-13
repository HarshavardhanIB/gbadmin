"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupFormsBrokerSignupFormsPlansController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let SignupFormsBrokerSignupFormsPlansController = class SignupFormsBrokerSignupFormsPlansController {
    constructor(signupFormsRepository) {
        this.signupFormsRepository = signupFormsRepository;
    }
    async find(id, filter) {
        return this.signupFormsRepository.brokerSignupFormsPlans(id).find(filter);
    }
    async create(id, brokerSignupFormsPlans) {
        return this.signupFormsRepository.brokerSignupFormsPlans(id).create(brokerSignupFormsPlans);
    }
    async patch(id, brokerSignupFormsPlans, where) {
        return this.signupFormsRepository.brokerSignupFormsPlans(id).patch(brokerSignupFormsPlans, where);
    }
    async delete(id, where) {
        return this.signupFormsRepository.brokerSignupFormsPlans(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/signup-forms/{id}/broker-signup-forms-plans', {
        responses: {
            '200': {
                description: 'Array of SignupForms has many BrokerSignupFormsPlans',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.BrokerSignupFormsPlans) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupFormsBrokerSignupFormsPlansController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/signup-forms/{id}/broker-signup-forms-plans', {
        responses: {
            '200': {
                description: 'SignupForms model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.BrokerSignupFormsPlans) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.BrokerSignupFormsPlans, {
                    title: 'NewBrokerSignupFormsPlansInSignupForms',
                    exclude: ['id'],
                    optional: ['form_id']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupFormsBrokerSignupFormsPlansController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/signup-forms/{id}/broker-signup-forms-plans', {
        responses: {
            '200': {
                description: 'SignupForms.BrokerSignupFormsPlans PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.BrokerSignupFormsPlans, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.BrokerSignupFormsPlans))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupFormsBrokerSignupFormsPlansController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/signup-forms/{id}/broker-signup-forms-plans', {
        responses: {
            '200': {
                description: 'SignupForms.BrokerSignupFormsPlans DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.BrokerSignupFormsPlans))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupFormsBrokerSignupFormsPlansController.prototype, "delete", null);
SignupFormsBrokerSignupFormsPlansController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.SignupFormsRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SignupFormsRepository])
], SignupFormsBrokerSignupFormsPlansController);
exports.SignupFormsBrokerSignupFormsPlansController = SignupFormsBrokerSignupFormsPlansController;
//# sourceMappingURL=signup-forms-broker-signup-forms-plans.controller.js.map