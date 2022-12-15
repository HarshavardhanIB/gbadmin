"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCustomerSignupController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CustomerCustomerSignupController = class CustomerCustomerSignupController {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async get(id, filter) {
        return this.customerRepository.customerSignup(id).get(filter);
    }
    async create(id, customerSignup) {
        return this.customerRepository.customerSignup(id).create(customerSignup);
    }
    async patch(id, customerSignup, where) {
        return this.customerRepository.customerSignup(id).patch(customerSignup, where);
    }
    async delete(id, where) {
        return this.customerRepository.customerSignup(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/customers/{id}/customer-signup', {
        responses: {
            '200': {
                description: 'Customer has one CustomerSignup',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.CustomerSignup),
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
], CustomerCustomerSignupController.prototype, "get", null);
tslib_1.__decorate([
    (0, rest_1.post)('/customers/{id}/customer-signup', {
        responses: {
            '200': {
                description: 'Customer model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.CustomerSignup) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.CustomerSignup, {
                    title: 'NewCustomerSignupInCustomer',
                    exclude: ['id'],
                    optional: ['customerId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCustomerSignupController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/customers/{id}/customer-signup', {
        responses: {
            '200': {
                description: 'Customer.CustomerSignup PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.CustomerSignup, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.CustomerSignup))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCustomerSignupController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/customers/{id}/customer-signup', {
        responses: {
            '200': {
                description: 'Customer.CustomerSignup DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.CustomerSignup))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCustomerSignupController.prototype, "delete", null);
CustomerCustomerSignupController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CustomerRepository])
], CustomerCustomerSignupController);
exports.CustomerCustomerSignupController = CustomerCustomerSignupController;
//# sourceMappingURL=customer-customer-signup.controller.js.map