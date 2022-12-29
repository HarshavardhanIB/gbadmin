"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerBrokerEoInsuranceController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let BrokerBrokerEoInsuranceController = class BrokerBrokerEoInsuranceController {
    constructor(brokerRepository) {
        this.brokerRepository = brokerRepository;
    }
    async get(id, filter) {
        return this.brokerRepository.brokerEoInsurance(id).get(filter);
    }
    async create(id, brokerEoInsurance) {
        return this.brokerRepository.brokerEoInsurance(id).create(brokerEoInsurance);
    }
    async patch(id, brokerEoInsurance, where) {
        return this.brokerRepository.brokerEoInsurance(id).patch(brokerEoInsurance, where);
    }
    async delete(id, where) {
        return this.brokerRepository.brokerEoInsurance(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/brokers/{id}/broker-eo-insurance', {
        responses: {
            '200': {
                description: 'Broker has one BrokerEoInsurance',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.BrokerEoInsurance),
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
], BrokerBrokerEoInsuranceController.prototype, "get", null);
tslib_1.__decorate([
    (0, rest_1.post)('/brokers/{id}/broker-eo-insurance', {
        responses: {
            '200': {
                description: 'Broker model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.BrokerEoInsurance) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.BrokerEoInsurance, {
                    title: 'NewBrokerEoInsuranceInBroker',
                    exclude: ['id'],
                    optional: ['broker_id']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerBrokerEoInsuranceController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/brokers/{id}/broker-eo-insurance', {
        responses: {
            '200': {
                description: 'Broker.BrokerEoInsurance PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.BrokerEoInsurance, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.BrokerEoInsurance))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerBrokerEoInsuranceController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/brokers/{id}/broker-eo-insurance', {
        responses: {
            '200': {
                description: 'Broker.BrokerEoInsurance DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.BrokerEoInsurance))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerBrokerEoInsuranceController.prototype, "delete", null);
BrokerBrokerEoInsuranceController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository])
], BrokerBrokerEoInsuranceController);
exports.BrokerBrokerEoInsuranceController = BrokerBrokerEoInsuranceController;
//# sourceMappingURL=broker-broker-eo-insurance.controller.js.map