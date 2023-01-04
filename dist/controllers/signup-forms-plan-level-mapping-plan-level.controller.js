"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupFormsPlanLevelMappingPlanLevelController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let SignupFormsPlanLevelMappingPlanLevelController = class SignupFormsPlanLevelMappingPlanLevelController {
    constructor(signupFormsPlanLevelMappingRepository) {
        this.signupFormsPlanLevelMappingRepository = signupFormsPlanLevelMappingRepository;
    }
    async getPlanLevel(id) {
        return this.signupFormsPlanLevelMappingRepository.planLevels(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/signup-forms-plan-level-mappings/{id}/plan-level', {
        responses: {
            '200': {
                description: 'PlanLevel belonging to SignupFormsPlanLevelMapping',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.PlanLevel) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupFormsPlanLevelMappingPlanLevelController.prototype, "getPlanLevel", null);
SignupFormsPlanLevelMappingPlanLevelController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.SignupFormsPlanLevelMappingRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SignupFormsPlanLevelMappingRepository])
], SignupFormsPlanLevelMappingPlanLevelController);
exports.SignupFormsPlanLevelMappingPlanLevelController = SignupFormsPlanLevelMappingPlanLevelController;
//# sourceMappingURL=signup-forms-plan-level-mapping-plan-level.controller.js.map