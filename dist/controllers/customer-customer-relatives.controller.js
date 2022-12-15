"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCustomerRelativesController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CustomerCustomerRelativesController = class CustomerCustomerRelativesController {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async find(id, filter) {
        return this.customerRepository.customerRelativeRelation(id).find(filter);
    }
    async create(id, customerRelatives) {
        return this.customerRepository.customerRelativeRelation(id).create(customerRelatives);
    }
    async patch(id, customerRelatives, where) {
        return this.customerRepository.customerRelativeRelation(id).patch(customerRelatives, where);
    }
    async delete(id, where) {
        return this.customerRepository.customerRelativeRelation(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/customers/{id}/customer-relatives', {
        responses: {
            '200': {
                description: 'Array of Customer has many CustomerRelatives',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.CustomerRelatives) },
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
], CustomerCustomerRelativesController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/customers/{id}/customer-relatives', {
        responses: {
            '200': {
                description: 'Customer model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.CustomerRelatives) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.CustomerRelatives, {
                    title: 'NewCustomerRelativesInCustomer',
                    exclude: ['id'],
                    optional: ['customerId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCustomerRelativesController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/customers/{id}/customer-relatives', {
        responses: {
            '200': {
                description: 'Customer.CustomerRelatives PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.CustomerRelatives, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.CustomerRelatives))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCustomerRelativesController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/customers/{id}/customer-relatives', {
        responses: {
            '200': {
                description: 'Customer.CustomerRelatives DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.CustomerRelatives))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCustomerRelativesController.prototype, "delete", null);
CustomerCustomerRelativesController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CustomerRepository])
], CustomerCustomerRelativesController);
exports.CustomerCustomerRelativesController = CustomerCustomerRelativesController;
//# sourceMappingURL=customer-customer-relatives.controller.js.map