"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupFormsBrokerController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let SignupFormsBrokerController = class SignupFormsBrokerController {
    constructor(signupFormsRepository) {
        this.signupFormsRepository = signupFormsRepository;
    }
    async getBroker(id) {
        return this.signupFormsRepository.broker(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/signup-forms/{id}/broker', {
        responses: {
            '200': {
                description: 'Broker belonging to SignupForms',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Broker) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupFormsBrokerController.prototype, "getBroker", null);
SignupFormsBrokerController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.SignupFormsRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SignupFormsRepository])
], SignupFormsBrokerController);
exports.SignupFormsBrokerController = SignupFormsBrokerController;
//# sourceMappingURL=signup-forms-broker.controller.js.map