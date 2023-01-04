"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsurancePackagesPlanLevelController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let InsurancePackagesPlanLevelController = class InsurancePackagesPlanLevelController {
    constructor(insurancePackagesRepository) {
        this.insurancePackagesRepository = insurancePackagesRepository;
    }
    async find(id, filter) {
        return this.insurancePackagesRepository.planGroups(id).find(filter);
    }
    async create(id, planLevel) {
        return this.insurancePackagesRepository.planGroups(id).create(planLevel);
    }
    async patch(id, planLevel, where) {
        return this.insurancePackagesRepository.planGroups(id).patch(planLevel, where);
    }
    async delete(id, where) {
        return this.insurancePackagesRepository.planGroups(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/insurance-packages/{id}/plan-levels', {
        responses: {
            '200': {
                description: 'Array of InsurancePackages has many PlanLevel through InsurancePlans',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.PlanLevel) },
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
], InsurancePackagesPlanLevelController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/insurance-packages/{id}/plan-levels', {
        responses: {
            '200': {
                description: 'create a PlanLevel model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.PlanLevel) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.PlanLevel, {
                    title: 'NewPlanLevelInInsurancePackages',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InsurancePackagesPlanLevelController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/insurance-packages/{id}/plan-levels', {
        responses: {
            '200': {
                description: 'InsurancePackages.PlanLevel PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.PlanLevel, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.PlanLevel))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InsurancePackagesPlanLevelController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/insurance-packages/{id}/plan-levels', {
        responses: {
            '200': {
                description: 'InsurancePackages.PlanLevel DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.PlanLevel))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InsurancePackagesPlanLevelController.prototype, "delete", null);
InsurancePackagesPlanLevelController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.InsurancePackagesRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.InsurancePackagesRepository])
], InsurancePackagesPlanLevelController);
exports.InsurancePackagesPlanLevelController = InsurancePackagesPlanLevelController;
//# sourceMappingURL=insurance-packages-plan-level.controller.js.map