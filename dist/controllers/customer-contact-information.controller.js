"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerContactInformationController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CustomerContactInformationController = class CustomerContactInformationController {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async find(id, filter) {
        return this.customerRepository.contactInformations(id).find(filter);
    }
    async create(id, contactInformation) {
        return this.customerRepository.contactInformations(id).create(contactInformation);
    }
    async patch(id, contactInformation, where) {
        return this.customerRepository.contactInformations(id).patch(contactInformation, where);
    }
    async delete(id, where) {
        return this.customerRepository.contactInformations(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/customers/{id}/contact-informations', {
        responses: {
            '200': {
                description: 'Array of Customer has many ContactInformation through CustomerContactInfo',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.ContactInformation) },
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
], CustomerContactInformationController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/customers/{id}/contact-informations', {
        responses: {
            '200': {
                description: 'create a ContactInformation model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.ContactInformation) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.ContactInformation, {
                    title: 'NewContactInformationInCustomer',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerContactInformationController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/customers/{id}/contact-informations', {
        responses: {
            '200': {
                description: 'Customer.ContactInformation PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.ContactInformation, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.ContactInformation))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerContactInformationController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/customers/{id}/contact-informations', {
        responses: {
            '200': {
                description: 'Customer.ContactInformation DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.ContactInformation))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerContactInformationController.prototype, "delete", null);
CustomerContactInformationController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CustomerRepository])
], CustomerContactInformationController);
exports.CustomerContactInformationController = CustomerContactInformationController;
//# sourceMappingURL=customer-contact-information.controller.js.map