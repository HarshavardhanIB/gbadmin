"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansAvailabilityStatesAndProvincesController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let PlansAvailabilityStatesAndProvincesController = class PlansAvailabilityStatesAndProvincesController {
    constructor(plansAvailabilityRepository) {
        this.plansAvailabilityRepository = plansAvailabilityRepository;
    }
    async getStatesAndProvinces(id) {
        return this.plansAvailabilityRepository.state(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/plans-availabilities/{id}/states-and-provinces', {
        responses: {
            '200': {
                description: 'StatesAndProvinces belonging to PlansAvailability',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.StatesAndProvinces) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PlansAvailabilityStatesAndProvincesController.prototype, "getStatesAndProvinces", null);
PlansAvailabilityStatesAndProvincesController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.PlansAvailabilityRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PlansAvailabilityRepository])
], PlansAvailabilityStatesAndProvincesController);
exports.PlansAvailabilityStatesAndProvincesController = PlansAvailabilityStatesAndProvincesController;
//# sourceMappingURL=plans-availability-states-and-provinces.controller.js.map