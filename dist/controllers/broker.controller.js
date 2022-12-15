"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
// import {inject} from '@loopback/core';
let BrokerController = class BrokerController {
    constructor(BrokerRepository, BrokerLicensedStatesAndProvincesRepository, BrokerSignupFormsPlansRepository, BrokerSignupformsPlanlevelsRepository, TieredRebatesDataRepository, TieredRebatesRepository, UsersRepository, response) {
        this.BrokerRepository = BrokerRepository;
        this.BrokerLicensedStatesAndProvincesRepository = BrokerLicensedStatesAndProvincesRepository;
        this.BrokerSignupFormsPlansRepository = BrokerSignupFormsPlansRepository;
        this.BrokerSignupformsPlanlevelsRepository = BrokerSignupformsPlanlevelsRepository;
        this.TieredRebatesDataRepository = TieredRebatesDataRepository;
        this.TieredRebatesRepository = TieredRebatesRepository;
        this.UsersRepository = UsersRepository;
        this.response = response;
    }
    async getBroker() {
        try {
            let final = [];
            console.log(">>>>>1 st");
            let data = await this.BrokerRepository.find({
                where: {}, fields: {
                    name: true,
                    parentId: true,
                    logo: true,
                    published: true,
                    brokerType: true,
                    description: true,
                    salesTrackingCode: true,
                    usePadPaymentMethod: true
                }
            });
            console.log("data>>>", data);
            for (let i = 0; i <= data.length; i++) {
                let dataArray = data[i];
                let userId = dataArray.userId;
                let userDetails = await this.UsersRepository.find({ where: { id: userId }, fields: { username: true } });
                dataArray['emailId'] = userDetails;
                final.push(dataArray);
            }
            const responseObject = {
                status: 200,
                message: "List of primary details",
                date: new Date(),
                data: final
            };
            this.response.status(parseInt("200")).send(responseObject);
            return this.response;
        }
        catch (err) {
            console.log(err);
        }
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/admin/broker'),
    (0, rest_1.response)(200, {
        description: 'List of customers list',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "getBroker", null);
BrokerController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.BrokerLicensedStatesAndProvincesRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.BrokerSignupFormsPlansRepository)),
    tslib_1.__param(3, (0, repository_1.repository)(repositories_1.BrokerSignupformsPlanlevelsRepository)),
    tslib_1.__param(4, (0, repository_1.repository)(repositories_1.TieredRebatesDataRepository)),
    tslib_1.__param(5, (0, repository_1.repository)(repositories_1.TieredRebatesRepository)),
    tslib_1.__param(6, (0, repository_1.repository)(repositories_1.UsersRepository)),
    tslib_1.__param(7, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository,
        repositories_1.BrokerLicensedStatesAndProvincesRepository,
        repositories_1.BrokerSignupFormsPlansRepository,
        repositories_1.BrokerSignupformsPlanlevelsRepository,
        repositories_1.TieredRebatesDataRepository,
        repositories_1.TieredRebatesRepository,
        repositories_1.UsersRepository, Object])
], BrokerController);
exports.BrokerController = BrokerController;
//# sourceMappingURL=broker.controller.js.map