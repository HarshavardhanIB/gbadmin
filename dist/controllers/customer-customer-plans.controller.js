"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCustomerPlansController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CustomerCustomerPlansController = class CustomerCustomerPlansController {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async find(id, filter) {
        return this.customerRepository.customerPlans(id).find(filter);
    }
    async create(id, customerPlans) {
        return this.customerRepository.customerPlans(id).create(customerPlans);
    }
    async patch(id, customerPlans, where) {
        return this.customerRepository.customerPlans(id).patch(customerPlans, where);
    }
    async delete(id, where) {
        return this.customerRepository.customerPlans(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/customers/{id}/customer-plans', {
        responses: {
            '200': {
                description: 'Array of Customer has many CustomerPlans',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.CustomerPlans) },
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
], CustomerCustomerPlansController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/customers/{id}/customer-plans', {
        responses: {
            '200': {
                description: 'Customer model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.CustomerPlans) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.CustomerPlans, {
                    title: 'NewCustomerPlansInCustomer',
                    exclude: ['id'],
                    optional: ['customerId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCustomerPlansController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/customers/{id}/customer-plans', {
        responses: {
            '200': {
                description: 'Customer.CustomerPlans PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.CustomerPlans, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.CustomerPlans))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCustomerPlansController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/customers/{id}/customer-plans', {
        responses: {
            '200': {
                description: 'Customer.CustomerPlans DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.CustomerPlans))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCustomerPlansController.prototype, "delete", null);
CustomerCustomerPlansController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CustomerRepository])
], CustomerCustomerPlansController);
exports.CustomerCustomerPlansController = CustomerCustomerPlansController;
//# sourceMappingURL=customer-customer-plans.controller.js.map