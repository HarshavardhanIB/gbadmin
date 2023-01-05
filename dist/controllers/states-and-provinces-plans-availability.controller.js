"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatesAndProvincesPlansAvailabilityController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let StatesAndProvincesPlansAvailabilityController = class StatesAndProvincesPlansAvailabilityController {
    constructor(statesAndProvincesRepository) {
        this.statesAndProvincesRepository = statesAndProvincesRepository;
    }
    async find(id, filter) {
        return this.statesAndProvincesRepository.planAvailability(id).find(filter);
    }
    async create(id, plansAvailability) {
        return this.statesAndProvincesRepository.planAvailability(id).create(plansAvailability);
    }
    async patch(id, plansAvailability, where) {
        return this.statesAndProvincesRepository.planAvailability(id).patch(plansAvailability, where);
    }
    async delete(id, where) {
        return this.statesAndProvincesRepository.planAvailability(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/states-and-provinces/{id}/plans-availabilities', {
        responses: {
            '200': {
                description: 'Array of StatesAndProvinces has many PlansAvailability',
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
], StatesAndProvincesPlansAvailabilityController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/states-and-provinces/{id}/plans-availabilities', {
        responses: {
            '200': {
                description: 'StatesAndProvinces model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.PlansAvailability) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.PlansAvailability, {
                    title: 'NewPlansAvailabilityInStatesAndProvinces',
                    exclude: ['id'],
                    optional: ['state_id']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StatesAndProvincesPlansAvailabilityController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/states-and-provinces/{id}/plans-availabilities', {
        responses: {
            '200': {
                description: 'StatesAndProvinces.PlansAvailability PATCH success count',
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
], StatesAndProvincesPlansAvailabilityController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/states-and-provinces/{id}/plans-availabilities', {
        responses: {
            '200': {
                description: 'StatesAndProvinces.PlansAvailability DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.PlansAvailability))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StatesAndProvincesPlansAvailabilityController.prototype, "delete", null);
StatesAndProvincesPlansAvailabilityController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.StatesAndProvincesRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.StatesAndProvincesRepository])
], StatesAndProvincesPlansAvailabilityController);
exports.StatesAndProvincesPlansAvailabilityController = StatesAndProvincesPlansAvailabilityController;
//# sourceMappingURL=states-and-provinces-plans-availability.controller.js.map