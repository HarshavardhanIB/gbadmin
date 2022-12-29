"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerLicensedStatesAndProvincesStatesAndProvincesController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let BrokerLicensedStatesAndProvincesStatesAndProvincesController = class BrokerLicensedStatesAndProvincesStatesAndProvincesController {
    constructor(brokerLicensedStatesAndProvincesRepository) {
        this.brokerLicensedStatesAndProvincesRepository = brokerLicensedStatesAndProvincesRepository;
    }
    async getStatesAndProvinces(id) {
        return this.brokerLicensedStatesAndProvincesRepository.stateFullDetails(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/broker-licensed-states-and-provinces/{id}/states-and-provinces', {
        responses: {
            '200': {
                description: 'StatesAndProvinces belonging to BrokerLicensedStatesAndProvinces',
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
], BrokerLicensedStatesAndProvincesStatesAndProvincesController.prototype, "getStatesAndProvinces", null);
BrokerLicensedStatesAndProvincesStatesAndProvincesController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerLicensedStatesAndProvincesRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerLicensedStatesAndProvincesRepository])
], BrokerLicensedStatesAndProvincesStatesAndProvincesController);
exports.BrokerLicensedStatesAndProvincesStatesAndProvincesController = BrokerLicensedStatesAndProvincesStatesAndProvincesController;
//# sourceMappingURL=broker-licensed-states-and-provinces-states-and-provinces.controller.js.map