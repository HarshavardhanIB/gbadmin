"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansAvailabilityInsurancePlansController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let PlansAvailabilityInsurancePlansController = class PlansAvailabilityInsurancePlansController {
    constructor(plansAvailabilityRepository) {
        this.plansAvailabilityRepository = plansAvailabilityRepository;
    }
    async getInsurancePlans(id) {
        return this.plansAvailabilityRepository.plan(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/plans-availabilities/{id}/insurance-plans', {
        responses: {
            '200': {
                description: 'InsurancePlans belonging to PlansAvailability',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.InsurancePlans) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PlansAvailabilityInsurancePlansController.prototype, "getInsurancePlans", null);
PlansAvailabilityInsurancePlansController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.PlansAvailabilityRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PlansAvailabilityRepository])
], PlansAvailabilityInsurancePlansController);
exports.PlansAvailabilityInsurancePlansController = PlansAvailabilityInsurancePlansController;
//# sourceMappingURL=plans-availability-insurance-plans.controller.js.map