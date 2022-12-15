"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerUsersController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let BrokerUsersController = class BrokerUsersController {
    constructor(brokerRepository) {
        this.brokerRepository = brokerRepository;
    }
    async get(id, filter) {
        return this.brokerRepository.users(id).get(filter);
    }
    async create(id, users) {
        return this.brokerRepository.users(id).create(users);
    }
    async patch(id, users, where) {
        return this.brokerRepository.users(id).patch(users, where);
    }
    async delete(id, where) {
        return this.brokerRepository.users(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/brokers/{id}/users', {
        responses: {
            '200': {
                description: 'Broker has one Users',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.Users),
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
], BrokerUsersController.prototype, "get", null);
tslib_1.__decorate([
    (0, rest_1.post)('/brokers/{id}/users', {
        responses: {
            '200': {
                description: 'Broker model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Users) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Users, {
                    title: 'NewUsersInBroker',
                    exclude: ['id'],
                    optional: ['id']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerUsersController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/brokers/{id}/users', {
        responses: {
            '200': {
                description: 'Broker.Users PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Users, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Users))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerUsersController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/brokers/{id}/users', {
        responses: {
            '200': {
                description: 'Broker.Users DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Users))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerUsersController.prototype, "delete", null);
BrokerUsersController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository])
], BrokerUsersController);
exports.BrokerUsersController = BrokerUsersController;
//# sourceMappingURL=broker-users.controller.js.map