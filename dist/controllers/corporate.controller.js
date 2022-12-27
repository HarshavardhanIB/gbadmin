"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateController = void 0;
const tslib_1 = require("tslib");
// import {inject} from '@loopback/core';
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
let CorporateController = class CorporateController {
    constructor(BrokerRepository, response) {
        this.BrokerRepository = BrokerRepository;
        this.response = response;
    }
    async brokerDetailsBasedonId(company) {
        let message, status, statusCode, data = {};
        try {
            let broker = await this.BrokerRepository.findOne({ where: { name: company }, fields: { logo: true } });
            if (!broker) {
                statusCode = 202;
                message = "Send the correct broker name";
            }
            else {
                statusCode = 200;
                message = "Broker logo";
                data = "https://gbapi.aitestpro.com/" + broker.logo;
            }
        }
        catch (error) {
            statusCode = 201;
        }
        this.response.status(statusCode).send({
            status: status,
            message: message,
            "logo": data,
            date: new Date(),
        });
        return this.response;
    }
    async brokerDetails(brokerId) {
        try {
            let broketDetails = await this.BrokerRepository.find({
                where: { id: brokerId, brokerType: 'ADMINISTRATOR' }, fields: { name: true, }, include: [{
                        relation: 'user',
                        scope: {
                            fields: { username: true }
                        }
                    }]
            });
        }
        catch (error) {
        }
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/corporate/{company}logo'),
    tslib_1.__param(0, rest_1.param.path.string('company')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CorporateController.prototype, "brokerDetailsBasedonId", null);
tslib_1.__decorate([
    (0, rest_1.get)('/broker/{brokerId}'),
    (0, rest_1.response)(200, {
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.path.number('brokerId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CorporateController.prototype, "brokerDetails", null);
CorporateController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository, Object])
], CorporateController);
exports.CorporateController = CorporateController;
//# sourceMappingURL=corporate.controller.js.map