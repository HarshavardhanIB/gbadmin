"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCustomerPlanOptionsValuesController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CustomerCustomerPlanOptionsValuesController = class CustomerCustomerPlanOptionsValuesController {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async find(id, filter) {
        return this.customerRepository.customerPlanOptionsValues(id).find(filter);
    }
    async create(id, customerPlanOptionsValues) {
        return this.customerRepository.customerPlanOptionsValues(id).create(customerPlanOptionsValues);
    }
    async patch(id, customerPlanOptionsValues, where) {
        return this.customerRepository.customerPlanOptionsValues(id).patch(customerPlanOptionsValues, where);
    }
    async delete(id, where) {
        return this.customerRepository.customerPlanOptionsValues(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/customers/{id}/customer-plan-options-values', {
        responses: {
            '200': {
                description: 'Array of Customer has many CustomerPlanOptionsValues',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.CustomerPlanOptionsValues) },
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
], CustomerCustomerPlanOptionsValuesController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/customers/{id}/customer-plan-options-values', {
        responses: {
            '200': {
                description: 'Customer model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.CustomerPlanOptionsValues) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.CustomerPlanOptionsValues, {
                    title: 'NewCustomerPlanOptionsValuesInCustomer',
                    exclude: ['id'],
                    optional: ['customer_id']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCustomerPlanOptionsValuesController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/customers/{id}/customer-plan-options-values', {
        responses: {
            '200': {
                description: 'Customer.CustomerPlanOptionsValues PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.CustomerPlanOptionsValues, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.CustomerPlanOptionsValues))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCustomerPlanOptionsValuesController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/customers/{id}/customer-plan-options-values', {
        responses: {
            '200': {
                description: 'Customer.CustomerPlanOptionsValues DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.CustomerPlanOptionsValues))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCustomerPlanOptionsValuesController.prototype, "delete", null);
CustomerCustomerPlanOptionsValuesController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CustomerRepository])
], CustomerCustomerPlanOptionsValuesController);
exports.CustomerCustomerPlanOptionsValuesController = CustomerCustomerPlanOptionsValuesController;
//# sourceMappingURL=customer-customer-plan-options-values.controller.js.map