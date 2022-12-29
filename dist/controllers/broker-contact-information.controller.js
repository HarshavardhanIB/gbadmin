"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerContactInformationController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let BrokerContactInformationController = class BrokerContactInformationController {
    constructor(brokerRepository) {
        this.brokerRepository = brokerRepository;
    }
    async getContactInformation(id) {
        return this.brokerRepository.contactInfo(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/brokers/{id}/contact-information', {
        responses: {
            '200': {
                description: 'ContactInformation belonging to Broker',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.ContactInformation) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerContactInformationController.prototype, "getContactInformation", null);
BrokerContactInformationController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository])
], BrokerContactInformationController);
exports.BrokerContactInformationController = BrokerContactInformationController;
//# sourceMappingURL=broker-contact-information.controller.js.map