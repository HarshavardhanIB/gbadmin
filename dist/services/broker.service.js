"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let BrokerService = class BrokerService {
    constructor(/* Add @inject to inject parameters */ BrokerRepository, BrokerLicensedStatesAndProvincesRepository, BrokerSignupFormsPlansRepository, SignupFormsPlanLevelMappingRepository, TieredRebatesDataRepository, TieredRebatesRepository, UsersRepository, ContactInformationRepository, SignupFormsRepository, StatesAndProvincesRepository, CustomerSignupRepository, CustomerRepository, InsurancePlansRepository, PlanLevelRepository, BrokerEoInsuranceRepository) {
        this.BrokerRepository = BrokerRepository;
        this.BrokerLicensedStatesAndProvincesRepository = BrokerLicensedStatesAndProvincesRepository;
        this.BrokerSignupFormsPlansRepository = BrokerSignupFormsPlansRepository;
        this.SignupFormsPlanLevelMappingRepository = SignupFormsPlanLevelMappingRepository;
        this.TieredRebatesDataRepository = TieredRebatesDataRepository;
        this.TieredRebatesRepository = TieredRebatesRepository;
        this.UsersRepository = UsersRepository;
        this.ContactInformationRepository = ContactInformationRepository;
        this.SignupFormsRepository = SignupFormsRepository;
        this.StatesAndProvincesRepository = StatesAndProvincesRepository;
        this.CustomerSignupRepository = CustomerSignupRepository;
        this.CustomerRepository = CustomerRepository;
        this.InsurancePlansRepository = InsurancePlansRepository;
        this.PlanLevelRepository = PlanLevelRepository;
        this.BrokerEoInsuranceRepository = BrokerEoInsuranceRepository;
    }
    async print() {
        console.log("allow from broker service");
    }
    async updateContact(id, ContactInformation) {
        let statusCode, message = {};
        console.log(ContactInformation);
        let broker = await this.BrokerRepository.findOne({ where: { id: id }, fields: { contactId: true } });
        if (broker) {
            await this.ContactInformationRepository.updateAll(broker.contactId, ContactInformation);
            statusCode = 200;
            message = "Contact information updated successfully";
        }
        else {
            statusCode = 201;
            message = "No info found";
        }
        let response = {
            statusCode, message, date: new Date()
        };
        return response;
    }
    async updateLiceceState(brokerId, states) {
        let status, message, date = {};
        if (states.length > 0) {
            await this.BrokerLicensedStatesAndProvincesRepository.deleteById(brokerId);
            let BrokerLicensedStatesAndProvince = new models_1.BrokerLicensedStatesAndProvinces();
            BrokerLicensedStatesAndProvince.brokerId = brokerId;
            for (const state of states) {
                BrokerLicensedStatesAndProvince.stateId = state;
                await this.BrokerLicensedStatesAndProvincesRepository.create(BrokerLicensedStatesAndProvince);
            }
            status = 200;
            message = "Licence states updated successfully";
        }
        else {
            status = 201;
            message = "Send states";
        }
        let response = {
            status, message, date: new Date()
        };
        return response;
    }
    async updateEO(BrokerEoInsurance, brokerId) {
        let status, message, data = {};
        console.log(BrokerEoInsurance);
        if (!brokerId) {
            status = 201;
            message = "Send proper input";
        }
        else {
            await this.BrokerEoInsuranceRepository.updateAll(BrokerEoInsurance, { where: { brokerId: brokerId } });
            status = 200;
            message = "E&O insurence Updated succesfully";
        }
        let response = {
            status, message, date: new Date()
        };
        return response;
    }
    async updateLiceceNum(brokerId, licenceNum) {
        let status, message, data = {};
        if (licenceNum.length > 0) {
            let brokerLicecs = await this.BrokerLicensedStatesAndProvincesRepository.find({ where: { brokerId: brokerId } });
            if (brokerLicecs) {
                let brokerLicecne = new models_1.BrokerLicensedStatesAndProvinces();
                await this.BrokerLicensedStatesAndProvincesRepository.updateAll({ licenseNumber: licenceNum }, { where: { brokerId: brokerId } });
                status = 200;
                message = "Licence number updated succesfully";
            }
            else {
                status = 201;
                message = "No broker licences found";
            }
        }
        else {
            status = 201;
            message = "Send licence number";
        }
        let response = {
            status, message, date: new Date()
        };
        return response;
    }
};
BrokerService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.BrokerLicensedStatesAndProvincesRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.BrokerSignupFormsPlansRepository)),
    tslib_1.__param(3, (0, repository_1.repository)(repositories_1.SignupFormsPlanLevelMappingRepository)),
    tslib_1.__param(4, (0, repository_1.repository)(repositories_1.TieredRebatesDataRepository)),
    tslib_1.__param(5, (0, repository_1.repository)(repositories_1.TieredRebatesRepository)),
    tslib_1.__param(6, (0, repository_1.repository)(repositories_1.UsersRepository)),
    tslib_1.__param(7, (0, repository_1.repository)(repositories_1.ContactInformationRepository)),
    tslib_1.__param(8, (0, repository_1.repository)(repositories_1.SignupFormsRepository)),
    tslib_1.__param(9, (0, repository_1.repository)(repositories_1.StatesAndProvincesRepository)),
    tslib_1.__param(10, (0, repository_1.repository)(repositories_1.CustomerSignupRepository)),
    tslib_1.__param(11, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__param(12, (0, repository_1.repository)(repositories_1.InsurancePlansRepository)),
    tslib_1.__param(13, (0, repository_1.repository)(repositories_1.PlanLevelRepository)),
    tslib_1.__param(14, (0, repository_1.repository)(repositories_1.BrokerEoInsuranceRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository,
        repositories_1.BrokerLicensedStatesAndProvincesRepository,
        repositories_1.BrokerSignupFormsPlansRepository,
        repositories_1.SignupFormsPlanLevelMappingRepository,
        repositories_1.TieredRebatesDataRepository,
        repositories_1.TieredRebatesRepository,
        repositories_1.UsersRepository,
        repositories_1.ContactInformationRepository,
        repositories_1.SignupFormsRepository,
        repositories_1.StatesAndProvincesRepository,
        repositories_1.CustomerSignupRepository,
        repositories_1.CustomerRepository,
        repositories_1.InsurancePlansRepository,
        repositories_1.PlanLevelRepository,
        repositories_1.BrokerEoInsuranceRepository])
], BrokerService);
exports.BrokerService = BrokerService;
//# sourceMappingURL=broker.service.js.map