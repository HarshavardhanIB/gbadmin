"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsurancePlansPlansAvailabilityController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let InsurancePlansPlansAvailabilityController = class InsurancePlansPlansAvailabilityController {
    constructor(insurancePlansRepository) {
        this.insurancePlansRepository = insurancePlansRepository;
    }
    async find(id, filter) {
        return this.insurancePlansRepository.stateTaxDetails(id).find(filter);
    }
    async create(id, plansAvailability) {
        return this.insurancePlansRepository.stateTaxDetails(id).create(plansAvailability);
    }
    async patch(id, plansAvailability, where) {
        return this.insurancePlansRepository.stateTaxDetails(id).patch(plansAvailability, where);
    }
    async delete(id, where) {
        return this.insurancePlansRepository.stateTaxDetails(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/insurance-plans/{id}/plans-availabilities', {
        responses: {
            '200': {
                description: 'Array of InsurancePlans has many PlansAvailability',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.PlansAvailability) },
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
], InsurancePlansPlansAvailabilityController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/insurance-plans/{id}/plans-availabilities', {
        responses: {
            '200': {
                description: 'InsurancePlans model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.PlansAvailability) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.PlansAvailability, {
                    title: 'NewPlansAvailabilityInInsurancePlans',
                    exclude: ['id'],
                    optional: ['plan_id']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InsurancePlansPlansAvailabilityController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/insurance-plans/{id}/plans-availabilities', {
        responses: {
            '200': {
                description: 'InsurancePlans.PlansAvailability PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.PlansAvailability, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.PlansAvailability))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InsurancePlansPlansAvailabilityController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/insurance-plans/{id}/plans-availabilities', {
        responses: {
            '200': {
                description: 'InsurancePlans.PlansAvailability DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.PlansAvailability))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InsurancePlansPlansAvailabilityController.prototype, "delete", null);
InsurancePlansPlansAvailabilityController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.InsurancePlansRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.InsurancePlansRepository])
], InsurancePlansPlansAvailabilityController);
exports.InsurancePlansPlansAvailabilityController = InsurancePlansPlansAvailabilityController;
//# sourceMappingURL=insurance-plans-plans-availability.controller.js.map