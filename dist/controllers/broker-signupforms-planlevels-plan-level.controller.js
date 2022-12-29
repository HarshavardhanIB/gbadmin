"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerSignupformsPlanlevelsPlanLevelController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let BrokerSignupformsPlanlevelsPlanLevelController = class BrokerSignupformsPlanlevelsPlanLevelController {
    constructor(brokerSignupformsPlanlevelsRepository) {
        this.brokerSignupformsPlanlevelsRepository = brokerSignupformsPlanlevelsRepository;
    }
    async getPlanLevel(id) {
        return this.brokerSignupformsPlanlevelsRepository.planLevels(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/broker-signupforms-planlevels/{id}/plan-level', {
        responses: {
            '200': {
                description: 'PlanLevel belonging to BrokerSignupformsPlanlevels',
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
], BrokerSignupformsPlanlevelsPlanLevelController.prototype, "getPlanLevel", null);
BrokerSignupformsPlanlevelsPlanLevelController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerSignupformsPlanlevelsRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerSignupformsPlanlevelsRepository])
], BrokerSignupformsPlanlevelsPlanLevelController);
exports.BrokerSignupformsPlanlevelsPlanLevelController = BrokerSignupformsPlanlevelsPlanLevelController;
//# sourceMappingURL=broker-signupforms-planlevels-plan-level.controller.js.map