"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupFormsCustomerController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let SignupFormsCustomerController = class SignupFormsCustomerController {
    constructor(signupFormsRepository) {
        this.signupFormsRepository = signupFormsRepository;
    }
    async find(id, filter) {
        return this.signupFormsRepository.customers(id).find(filter);
    }
    async create(id, customer) {
        return this.signupFormsRepository.customers(id).create(customer);
    }
    async patch(id, customer, where) {
        return this.signupFormsRepository.customers(id).patch(customer, where);
    }
    async delete(id, where) {
        return this.signupFormsRepository.customers(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/signup-forms/{id}/customers', {
        responses: {
            '200': {
                description: 'Array of SignupForms has many Customer through CustomerSignup',
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
], SignupFormsCustomerController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/signup-forms/{id}/customers', {
        responses: {
            '200': {
                description: 'create a Customer model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Customer) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Customer, {
                    title: 'NewCustomerInSignupForms',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupFormsCustomerController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/signup-forms/{id}/customers', {
        responses: {
            '200': {
                description: 'SignupForms.Customer PATCH success count',
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
], SignupFormsCustomerController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/signup-forms/{id}/customers', {
        responses: {
            '200': {
                description: 'SignupForms.Customer DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Customer))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupFormsCustomerController.prototype, "delete", null);
SignupFormsCustomerController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.SignupFormsRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SignupFormsRepository])
], SignupFormsCustomerController);
exports.SignupFormsCustomerController = SignupFormsCustomerController;
//# sourceMappingURL=signup-forms-customer.controller.js.map