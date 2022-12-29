"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerBrokerLicensedStatesAndProvincesController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let BrokerBrokerLicensedStatesAndProvincesController = class BrokerBrokerLicensedStatesAndProvincesController {
    constructor(brokerRepository) {
        this.brokerRepository = brokerRepository;
    }
    async find(id, filter) {
        return this.brokerRepository.brokerLicensedStatesAndProvinces(id).find(filter);
    }
    async create(id, brokerLicensedStatesAndProvinces) {
        return this.brokerRepository.brokerLicensedStatesAndProvinces(id).create(brokerLicensedStatesAndProvinces);
    }
    async patch(id, brokerLicensedStatesAndProvinces, where) {
        return this.brokerRepository.brokerLicensedStatesAndProvinces(id).patch(brokerLicensedStatesAndProvinces, where);
    }
    async delete(id, where) {
        return this.brokerRepository.brokerLicensedStatesAndProvinces(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/brokers/{id}/broker-licensed-states-and-provinces', {
        responses: {
            '200': {
                description: 'Array of Broker has many BrokerLicensedStatesAndProvinces',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.BrokerLicensedStatesAndProvinces) },
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
], BrokerBrokerLicensedStatesAndProvincesController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/brokers/{id}/broker-licensed-states-and-provinces', {
        responses: {
            '200': {
                description: 'Broker model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.BrokerLicensedStatesAndProvinces) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.BrokerLicensedStatesAndProvinces, {
                    title: 'NewBrokerLicensedStatesAndProvincesInBroker',
                    exclude: ['id'],
                    optional: ['broker_id']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerBrokerLicensedStatesAndProvincesController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/brokers/{id}/broker-licensed-states-and-provinces', {
        responses: {
            '200': {
                description: 'Broker.BrokerLicensedStatesAndProvinces PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.BrokerLicensedStatesAndProvinces, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.BrokerLicensedStatesAndProvinces))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerBrokerLicensedStatesAndProvincesController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/brokers/{id}/broker-licensed-states-and-provinces', {
        responses: {
            '200': {
                description: 'Broker.BrokerLicensedStatesAndProvinces DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.BrokerLicensedStatesAndProvinces))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerBrokerLicensedStatesAndProvincesController.prototype, "delete", null);
BrokerBrokerLicensedStatesAndProvincesController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository])
], BrokerBrokerLicensedStatesAndProvincesController);
exports.BrokerBrokerLicensedStatesAndProvincesController = BrokerBrokerLicensedStatesAndProvincesController;
//# sourceMappingURL=broker-broker-licensed-states-and-provinces.controller.js.map