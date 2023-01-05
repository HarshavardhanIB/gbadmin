"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanLevelInsurancePlansController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let PlanLevelInsurancePlansController = class PlanLevelInsurancePlansController {
    constructor(planLevelRepository) {
        this.planLevelRepository = planLevelRepository;
    }
    async find(id, filter) {
        return this.planLevelRepository.plans(id).find(filter);
    }
    async create(id, insurancePlans) {
        return this.planLevelRepository.plans(id).create(insurancePlans);
    }
    async patch(id, insurancePlans, where) {
        return this.planLevelRepository.plans(id).patch(insurancePlans, where);
    }
    async delete(id, where) {
        return this.planLevelRepository.plans(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/plan-levels/{id}/insurance-plans', {
        responses: {
            '200': {
                description: 'Array of PlanLevel has many InsurancePlans',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.InsurancePlans) },
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
], PlanLevelInsurancePlansController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/plan-levels/{id}/insurance-plans', {
        responses: {
            '200': {
                description: 'PlanLevel model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.InsurancePlans) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.InsurancePlans, {
                    title: 'NewInsurancePlansInPlanLevel',
                    exclude: ['id'],
                    optional: ['plan_level']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PlanLevelInsurancePlansController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/plan-levels/{id}/insurance-plans', {
        responses: {
            '200': {
                description: 'PlanLevel.InsurancePlans PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.InsurancePlans, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.InsurancePlans))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PlanLevelInsurancePlansController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/plan-levels/{id}/insurance-plans', {
        responses: {
            '200': {
                description: 'PlanLevel.InsurancePlans DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.InsurancePlans))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PlanLevelInsurancePlansController.prototype, "delete", null);
PlanLevelInsurancePlansController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.PlanLevelRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PlanLevelRepository])
], PlanLevelInsurancePlansController);
exports.PlanLevelInsurancePlansController = PlanLevelInsurancePlansController;
//# sourceMappingURL=plan-level-insurance-plans.controller.js.map