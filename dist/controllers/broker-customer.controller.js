"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerCustomerController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let BrokerCustomerController = class BrokerCustomerController {
    constructor(brokerRepository) {
        this.brokerRepository = brokerRepository;
    }
    async find(id, filter) {
        return this.brokerRepository.customers(id).find(filter);
    }
    async create(id, customer) {
        return this.brokerRepository.customers(id).create(customer);
    }
    async patch(id, customer, where) {
        return this.brokerRepository.customers(id).patch(customer, where);
    }
    async delete(id, where) {
        return this.brokerRepository.customers(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/brokers/{id}/customers', {
        responses: {
            '200': {
                description: 'Array of Broker has many Customer',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Customer) },
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
], BrokerCustomerController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/brokers/{id}/customers', {
        responses: {
            '200': {
                description: 'Broker model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Customer) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Customer, {
                    title: 'NewCustomerInBroker',
                    exclude: ['id'],
                    optional: ['broker_id']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerCustomerController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/brokers/{id}/customers', {
        responses: {
            '200': {
                description: 'Broker.Customer PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Customer, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Customer))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerCustomerController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/brokers/{id}/customers', {
        responses: {
            '200': {
                description: 'Broker.Customer DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Customer))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerCustomerController.prototype, "delete", null);
BrokerCustomerController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository])
], BrokerCustomerController);
exports.BrokerCustomerController = BrokerCustomerController;
//# sourceMappingURL=broker-customer.controller.js.map