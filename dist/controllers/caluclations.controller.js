"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaluclationsController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const paths_1 = require("../paths");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
// import {inject} from '@loopback/core';
let CaluclationsController = class CaluclationsController {
    constructor(brokerRepository, corporateService, customerRepository, response) {
        this.brokerRepository = brokerRepository;
        this.corporateService = corporateService;
        this.customerRepository = customerRepository;
        this.response = response;
    }
    async customerTierUpdate() {
        var _a;
        let status, message, data = {};
        let updatedCustonmersList = [];
        try {
            let corporates = await this.brokerRepository.find({ where: { brokerType: 'CORPORATE' }, include: [{ relation: 'customers' }] });
            if (corporates.length > 0) {
                for (const corporate of corporates) {
                    let customers = corporate.customers;
                    // console.log(customers);
                    let corporateId = corporate.id;
                    if (customers) {
                        for (const customer of customers) {
                            // console.log(customer);
                            if (customer.parentId != undefined) {
                                let customerObj = new models_1.Customer();
                                let caluclatedTier = 0;
                                if (corporate.settingsEnableTieredHealthBenefits == 1 && (corporate.settingsAllowGroupBenefitsWallet == 0 || corporate.settingsAllowGroupBenefitsWallet == undefined)) {
                                    if (customer.dateOfHiring != undefined && customer.dateOfHiring != null) {
                                        caluclatedTier = await this.corporateService.getActualTiers(corporateId, (_a = customer.annualIncome) !== null && _a !== void 0 ? _a : 0, customer.dateOfHiring, "tier");
                                        console.log("caluclated tier", caluclatedTier);
                                        if (caluclatedTier != 0) {
                                            customerObj.actualTier = caluclatedTier;
                                            await this.customerRepository.updateById(customer.id, customerObj);
                                            updatedCustonmersList.push(customer.id);
                                        }
                                    }
                                }
                                else if ((corporate.settingsEnableTieredHealthBenefits == 0 || corporate.settingsEnableTieredHealthBenefits == undefined) && corporate.settingsAllowGroupBenefitsWallet == 1) {
                                    // customerObj.assignerTier = employeeObj.tier;
                                    if (customer.annualIncome != undefined && customer.annualIncome != null) {
                                        caluclatedTier = await this.corporateService.getActualTiers(corporateId, customer.annualIncome, customer.dateOfHiring, "wallet");
                                        console.log("caluclated tier", caluclatedTier);
                                        if (caluclatedTier != 0) {
                                            customerObj.actualTier = caluclatedTier;
                                            await this.customerRepository.updateById(customer.id, customerObj);
                                            updatedCustonmersList.push(customer.id);
                                        }
                                    }
                                }
                                else {
                                    if (customer.annualIncome != undefined && customer.annualIncome != null) {
                                        caluclatedTier = await this.corporateService.getActualTiers(corporateId, customer.annualIncome, customer.dateOfHiring, "");
                                        console.log("caluclated tier", caluclatedTier);
                                        if (caluclatedTier != 0) {
                                            customerObj.actualTier = caluclatedTier;
                                            await this.customerRepository.updateById(customer.id, customerObj);
                                            updatedCustonmersList.push(customer.id);
                                        }
                                    }
                                }
                                // actualTier = await this.corporateService.getActualTiers(corporateId, employeeObj.walletLimit, employeeObj.dateOfHire,"")
                                // caluclatedTier != 0 ? customerObj.actualTier = caluclatedTier : customerObj.actualTier = undefined;
                            }
                        }
                    }
                }
            }
            status = 200;
            message = 'ok';
        }
        catch (error) {
            status = 422;
            message = 'internal error ' + error.message;
        }
        this.response.status(status).send({
            status, message, updatedCustonmersList
        });
    }
};
tslib_1.__decorate([
    (0, rest_1.post)(paths_1.CORPORATE.UPDATE_CUSTOME_TIER),
    (0, rest_1.response)(200, {
        description: 'update customer tear service use this service in cron job',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CaluclationsController.prototype, "customerTierUpdate", null);
CaluclationsController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__param(1, (0, core_1.service)(services_1.Corporate)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__param(3, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository,
        services_1.Corporate,
        repositories_1.CustomerRepository, Object])
], CaluclationsController);
exports.CaluclationsController = CaluclationsController;
//# sourceMappingURL=caluclations.controller.js.map