"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersBrokerController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let UsersBrokerController = class UsersBrokerController {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async find(id, filter) {
        return this.usersRepository.broker(id).find(filter);
    }
    async create(id, broker) {
        return this.usersRepository.broker(id).create(broker);
    }
    async patch(id, broker, where) {
        return this.usersRepository.broker(id).patch(broker, where);
    }
    async delete(id, where) {
        return this.usersRepository.broker(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/users/{id}/brokers', {
        responses: {
            '200': {
                description: 'Array of Users has many Broker through BrokerAdmins',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Broker) },
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
], UsersBrokerController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/users/{id}/brokers', {
        responses: {
            '200': {
                description: 'create a Broker model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Broker) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Broker, {
                    title: 'NewBrokerInUsers',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersBrokerController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/users/{id}/brokers', {
        responses: {
            '200': {
                description: 'Users.Broker PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Broker, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Broker))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersBrokerController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/users/{id}/brokers', {
        responses: {
            '200': {
                description: 'Users.Broker DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Broker))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersBrokerController.prototype, "delete", null);
UsersBrokerController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UsersRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UsersRepository])
], UsersBrokerController);
exports.UsersBrokerController = UsersBrokerController;
//# sourceMappingURL=users-broker.controller.js.map