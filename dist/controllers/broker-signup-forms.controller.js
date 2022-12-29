"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerSignupFormsController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let BrokerSignupFormsController = class BrokerSignupFormsController {
    constructor(brokerRepository) {
        this.brokerRepository = brokerRepository;
    }
    async find(id, filter) {
        return this.brokerRepository.signupForms(id).find(filter);
    }
    async create(id, signupForms) {
        return this.brokerRepository.signupForms(id).create(signupForms);
    }
    async patch(id, signupForms, where) {
        return this.brokerRepository.signupForms(id).patch(signupForms, where);
    }
    async delete(id, where) {
        return this.brokerRepository.signupForms(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/brokers/{id}/signup-forms', {
        responses: {
            '200': {
                description: 'Array of Broker has many SignupForms',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.SignupForms) },
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
], BrokerSignupFormsController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/brokers/{id}/signup-forms', {
        responses: {
            '200': {
                description: 'Broker model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.SignupForms) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.SignupForms, {
                    title: 'NewSignupFormsInBroker',
                    exclude: ['id'],
                    optional: ['broker_id']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerSignupFormsController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/brokers/{id}/signup-forms', {
        responses: {
            '200': {
                description: 'Broker.SignupForms PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.SignupForms, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.SignupForms))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerSignupFormsController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/brokers/{id}/signup-forms', {
        responses: {
            '200': {
                description: 'Broker.SignupForms DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.SignupForms))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerSignupFormsController.prototype, "delete", null);
BrokerSignupFormsController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository])
], BrokerSignupFormsController);
exports.BrokerSignupFormsController = BrokerSignupFormsController;
//# sourceMappingURL=broker-signup-forms.controller.js.map