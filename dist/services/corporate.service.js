"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Corporate = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const bcryptjs_1 = require("bcryptjs");
const models_1 = require("../models");
const repository_1 = require("@loopback/repository");
const constants_1 = require("../constants");
const moment_1 = tslib_1.__importDefault(require("moment"));
const storage_helper_1 = require("../storage.helper");
const paths_1 = require("../paths");
const common_functions_1 = require("../common-functions");
const registration_service_service_1 = require("./registration-service.service");
const ach_service_1 = require("./ach.service");
const repositories_1 = require("../repositories");
const keys_1 = require("../keys");
const broker_admins_repository_1 = require("../repositories/broker-admins.repository");
const corporate_tiered_plan_levels_repository_1 = require("../repositories/corporate-tiered-plan-levels.repository");
const CONST = tslib_1.__importStar(require("../constants"));
const fusebill_service_1 = require("./fusebill.service");
const common_services_1 = require("./common.services");
let fuseBillCustomerCreation = true;
let fiseBill = 0;
let Corporate = class Corporate {
    constructor(/* Add @inject to inject parameters */ fusebill, handler, registrationService, ach, banksCodesRepository, banksRepository, branchesRepository, StatesAndProvincesRepository, BrokerRepository, usersRepository, BrokerAdminsRepository, ContactInformationRepository, CustomerRepository, InsurancePlansRepository, PlansAvailabilityRepository, insurancePackages, SignupFormsRepository, PlanLevelRepository, corporateTiersRepository, CorporateTieredPlanLevelsRepository, CorporatePaidTieredPlanLevelsRepository, CustomerContactInfoRepository) {
        this.fusebill = fusebill;
        this.handler = handler;
        this.registrationService = registrationService;
        this.ach = ach;
        this.banksCodesRepository = banksCodesRepository;
        this.banksRepository = banksRepository;
        this.branchesRepository = branchesRepository;
        this.StatesAndProvincesRepository = StatesAndProvincesRepository;
        this.BrokerRepository = BrokerRepository;
        this.usersRepository = usersRepository;
        this.BrokerAdminsRepository = BrokerAdminsRepository;
        this.ContactInformationRepository = ContactInformationRepository;
        this.CustomerRepository = CustomerRepository;
        this.InsurancePlansRepository = InsurancePlansRepository;
        this.PlansAvailabilityRepository = PlansAvailabilityRepository;
        this.insurancePackages = insurancePackages;
        this.SignupFormsRepository = SignupFormsRepository;
        this.PlanLevelRepository = PlanLevelRepository;
        this.corporateTiersRepository = corporateTiersRepository;
        this.CorporateTieredPlanLevelsRepository = CorporateTieredPlanLevelsRepository;
        this.CorporatePaidTieredPlanLevelsRepository = CorporatePaidTieredPlanLevelsRepository;
        this.CustomerContactInfoRepository = CustomerContactInfoRepository;
    }
    async encryptPswrd(password) {
        let encryptedPasswrd = await (0, bcryptjs_1.hash)(password, await (0, bcryptjs_1.genSalt)());
        return encryptedPasswrd;
    }
    async modelPropoerties(model) {
        let returnPropertyName = [];
        const modelDefinition = model.definition;
        const properties = modelDefinition.properties;
        for (const propertyName in properties) {
            const property = properties[propertyName];
            // console.log(`${propertyName}: ${property.type}`);
            returnPropertyName.push(propertyName);
        }
        return returnPropertyName;
    }
    async customerBankDetailsRegister(session, filenamets, ext, mimetype, customerName, fusebillCustomerId) {
        let message, status, data = {};
        let bankDetailsDecoded; // = atob(request.body.key)
        let bank_details = {}; // JSON.parse(bankDetailsDecoded);
        try {
            bankDetailsDecoded = atob(session);
            bank_details = JSON.parse(bankDetailsDecoded);
            console.log(bank_details);
        }
        catch (error) {
            return false;
        }
        if (!bank_details.bankCode) {
            return false;
        }
        if (!this.registrationService.validateBankCode(bank_details.bankCode)) {
            return false;
        }
        if (!bank_details.branchCode) {
            return false;
        }
        if (!this.registrationService.validateBranchCode(bank_details.branchCode)) {
            return false;
        }
        if (!bank_details.accountNumber) {
            return false;
        }
        if (!this.registrationService.validateAccountNo(bank_details.accountNumber)) {
            return false;
        }
        let newFilename = paths_1.CUSTOMER_CHEQUES_FOLDER + '/' + filenamets;
        console.log(newFilename);
        const checkFileBuffer = await (0, storage_helper_1.getFile)(newFilename, '');
        console.log(checkFileBuffer);
        // console.log(`customerName:${bank_details.customerName}`)
        //const multerText = Buffer.from(newFilename.buffer).toString("utf-8"); /
        /*
    {
    "customerId": 0,
    "bankCode": "string",
    "transitNumber": "string",
    "accountNumber": "string",
    "customerStatus": "string",
    "voidCheckImage": "string",
    "nextBillingDate": "2022-09-07T12:47:58.323Z",
    "nextBillingPrice": 0
    }
    
    accountNumber: "12345"
    amount: 22.6
    bankCode: "001"
    branchCode: "00011"
    customerId: 5031
    customerName: "George Kongalath"
    enrollmentDate: "2022-10-01"
        */
        //eyJjdXN0b21lcklkIjoiMTIiLCJiYW5rQ29kZSI6IjAwMyIsImJyYW5jaENvZGUiOiIwMDAwMSIsImFjY291bnROdW1iZXIiOiIxMjM0NTYiLCJhbW91bnQiOiIwLjEwIn0=
        //eyJjdXN0b21lcklkIjoiMTIiLCJiYW5rQ29kZSI6IjAwMyIsImJyYW5jaENvZGUiOiIwMDAwMSIsImFjY291bnROdW1iZXIiOiIxMjM0NTYiLCJhbW91bnQiOiIwLjEwIiwiZW5yb2xsbWVudERhdGUiOiIxMC0wMS0yMDIyIn0=
        let input = {
            "customerId": parseInt(bank_details.customerId),
            "bankCode": bank_details.bankCode,
            "transitNumber": bank_details.branchCode,
            "accountNumber": bank_details.accountNumber,
            // "customerStatus": CONST.ACH_CUSTOMER_STATUS.ACTIVE,
            "voidCheckImage": '',
            "voidCheckImage2": checkFileBuffer,
            "voidCheckFileType": mimetype,
            "nextBillingDate": (0, moment_1.default)(bank_details.enrollmentDate).format(constants_1.dateFormat1),
            "nextBillingPrice": parseFloat(bank_details.amount),
            "customerName": customerName,
            //  "fusebillCustomerId": customer.fusebillCustomerId,
            "fusebillCustomerId": fusebillCustomerId
        };
        // commented 149-160  for testing uncomment after test
        const customerRecord = await this.ach.createCustomer(input);
        console.log(customerRecord);
        if (customerRecord && customerRecord.data) {
            (0, storage_helper_1.deleteFile)(newFilename);
            data = customerRecord.data;
            message = 'Customer Record(PAD) created';
            status = '200';
        }
        else {
            return false;
        }
        return true;
    }
    async addEmployee(data, corporateId) {
        try {
            let corporate = await this.BrokerRepository.findById(corporateId);
            if (corporate) {
                let employeeUserObj = new models_1.Users();
                employeeUserObj.username = data.emailId;
                employeeUserObj.role = CONST.USER_ROLE.CUSTOMER;
                let randomPswrd = await (0, common_functions_1.generateRandomPassword)();
                employeeUserObj.password = await (0, common_functions_1.encryptPassword)(randomPswrd);
                employeeUserObj.block = true;
                employeeUserObj.activation = await (0, common_functions_1.getActivationCode)();
                employeeUserObj.registrationDate = (0, moment_1.default)().format('YYYY-MM-DD');
                employeeUserObj.companyId = corporateId;
                let employeeUser = await this.usersRepository.create(employeeUserObj);
                let customerObj = new models_1.Customer();
                customerObj.brokerId = corporateId;
                //firstname and last should be created in backend level
                customerObj.firstName = data.firstName;
                customerObj.lastName = data.lastName;
                customerObj.gender = data.sex;
                customerObj.companyName = corporate.name;
                customerObj.isCorporateAccount = false;
                customerObj.registrationDate = (0, moment_1.default)().format('YYYY-MM-DD');
                customerObj.userId = employeeUser.id;
                let customer = await this.CustomerRepository.create(customerObj);
                let customerContactInfoObj = new models_1.ContactInformation();
                customerContactInfoObj.city = data.residentIn;
                customerContactInfoObj.state = CONST.DEFAULT_COUNTRY.name;
                customerContactInfoObj.contactType = CONST.USER_ROLE.CUSTOMER;
                customerContactInfoObj.addressType = CONST.ADDRESS_TYPE.HOME_ADDRESS;
                customerContactInfoObj.primaryEmail = data.emailId;
                customerContactInfoObj.primaryPhone = data.phoneNum.toString();
                customerContactInfoObj.state = data.provienceName;
                let contcatInfo = await this.ContactInformationRepository.create(customerContactInfoObj);
                let customerContact = new models_1.CustomerContactInfo();
                customerContact.customerId = customer.id;
                customerContact.contactId = customerContact.id;
                let customerContactInfo = await this.CustomerContactInfoRepository.create(customerContact);
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }
    async getEnrollmentPlanDates() {
        let today = (0, moment_1.default)().format("MM-DD-YYYY");
        //new Date(); //Date.now(); 
        //console.log(today) 
        let months;
        let dates = [];
        if (parseInt((0, moment_1.default)(today, "MM-DD-YYYY").format('D')) == 1) {
            //this month..  
            dates.push(today);
            //next month.. 
            //next of next moth  
            months = 2;
        }
        else {
            //next month..   //next of next month..   //next of next next month
            months = 3;
        }
        let year, month, date;
        let tempdate;
        for (let m = 1; m <= months; m++) {
            /* year = moment().year();   month = moment().month() + m */
            //date = "1".padLeft(2, '0'); 
            tempdate = (0, moment_1.default)(today, "MM-DD-YYYY").add(m, "months").format("MM-DD-YYYY");
            var day = (0, moment_1.default)(tempdate, "MM-DD-YYYY").startOf('month').format("MM-DD-YYYY");
            //console.log(day); 
            dates.push(day);
        }
        //console.log(dates)  
        return dates;
    }
    async getActualTiers(corporateId, wallerLimit, dateofHire, type) {
        let data = {};
        let hiredate = (0, common_services_1.moments)(dateofHire);
        const today = (0, moment_1.default)();
        const diffInYears = today.diff(hiredate, 'years');
        let corporateAnnualIncomeTiers = await this.corporateTiersRepository.find({ order: ['annualIncome ASC'], where: { and: [{ brokerId: corporateId }, { tierType: CONST.TIER_TYPE.AI }] } });
        let corporatelengthOfServiceTiers = await this.corporateTiersRepository.find({ where: { and: [{ brokerId: corporateId }, { tierType: CONST.TIER_TYPE.LOS }, { toLength: { lt: diffInYears } }, { fromLength: { gte: diffInYears } }] } });
        if (type == "wallet") {
            if (corporateAnnualIncomeTiers.length > 0) {
                if (corporateAnnualIncomeTiers.length > 1) {
                    for (const corporateAnnualIncomeTier of corporateAnnualIncomeTiers) {
                        if (wallerLimit > 0 && wallerLimit <= corporateAnnualIncomeTier.annualIncome) {
                            return corporateAnnualIncomeTier.id;
                        }
                        else {
                            for (let j = 1; j < corporateAnnualIncomeTiers.length; j++) {
                                if (wallerLimit > corporateAnnualIncomeTier.annualIncome && wallerLimit <= corporateAnnualIncomeTiers[j].annualIncome) {
                                    return corporateAnnualIncomeTiers[j].id;
                                }
                            }
                        }
                    }
                }
                else {
                    if (wallerLimit < corporateAnnualIncomeTiers[0].annualIncome) {
                        return corporateAnnualIncomeTiers[0].id;
                    }
                }
            }
            else {
                if (corporateAnnualIncomeTiers.length > 0) {
                    console.log(corporateAnnualIncomeTiers);
                    return corporateAnnualIncomeTiers[0].id;
                }
            }
        }
        else if (type == "tier") {
            if (corporatelengthOfServiceTiers.length > 0) {
                console.log(corporateAnnualIncomeTiers);
                return corporatelengthOfServiceTiers[0].id;
            }
        }
        else {
            if (corporateAnnualIncomeTiers.length > 0) {
                if (corporateAnnualIncomeTiers.length > 1) {
                    for (const corporateAnnualIncomeTier of corporateAnnualIncomeTiers) {
                        if (wallerLimit > 0 && wallerLimit <= corporateAnnualIncomeTier.annualIncome) {
                            return corporateAnnualIncomeTier.id;
                        }
                        else {
                            for (let j = 1; j < corporateAnnualIncomeTiers.length; j++) {
                                if (wallerLimit > corporateAnnualIncomeTier.annualIncome && wallerLimit <= corporateAnnualIncomeTiers[j].annualIncome) {
                                    return corporateAnnualIncomeTiers[j].id;
                                }
                            }
                        }
                    }
                }
                else {
                    if (wallerLimit < corporateAnnualIncomeTiers[0].annualIncome) {
                        return corporateAnnualIncomeTiers[0].id;
                    }
                }
            }
            else {
                if (corporatelengthOfServiceTiers.length > 0) {
                    console.log(corporatelengthOfServiceTiers);
                    return corporatelengthOfServiceTiers[0].id;
                }
            }
        }
        // if (corporateAnnualIncomeTiers.length > 0) {
        //   if (corporateAnnualIncomeTiers.length > 1) {
        //     for (const corporateAnnualIncomeTier of corporateAnnualIncomeTiers) {
        //       if (wallerLimit > 0 && wallerLimit <= corporateAnnualIncomeTier.annualIncome) {
        //         return corporateAnnualIncomeTier.id;
        //       }
        //       else {
        //         for (let j = 1; j < corporateAnnualIncomeTiers.length; j++) {
        //           if (wallerLimit > corporateAnnualIncomeTier.annualIncome && wallerLimit <= corporateAnnualIncomeTiers[j].annualIncome) {
        //             return corporateAnnualIncomeTiers[j].id;
        //           }
        //         }
        //       }
        //     }
        //   } else {
        //     if (wallerLimit < corporateAnnualIncomeTiers[0].annualIncome) {
        //       return corporateAnnualIncomeTiers[0].id;
        //     }
        //   }
        // }
        // else{
        //   if(corporateAnnualIncomeTiers.length>0){
        //     console.log(corporateAnnualIncomeTiers);
        //     return corporateAnnualIncomeTiers[0].id;
        //   }
        // }
        // else if (corporatelengthOfServiceTiers.length > 0) {
        //   for (const corporatelengthOfServiceTier of corporatelengthOfServiceTiers) {
        //     let hiredate = moments(dateofHire.toString());
        //     const today = moment();
        //     const diffInYears = today.diff(hiredate, 'years');       
        //     if (diffInYears >= corporatelengthOfServiceTier.fromLength && diffInYears < corporatelengthOfServiceTier.toLength) {
        //       return corporatelengthOfServiceTier.id;
        //     }
        //   }
        // }
        return 0;
    }
};
Corporate = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, core_1.service)(fusebill_service_1.FusebillService)),
    tslib_1.__param(1, (0, core_1.inject)(keys_1.FILE_UPLOAD_SERVICE)),
    tslib_1.__param(2, (0, core_1.service)(registration_service_service_1.RegistrationServiceService)),
    tslib_1.__param(3, (0, core_1.service)(ach_service_1.AchService)),
    tslib_1.__param(4, (0, repository_1.repository)(repositories_1.BankCodesRepository)),
    tslib_1.__param(5, (0, repository_1.repository)(repositories_1.FinancialInstitutionsRepository)),
    tslib_1.__param(6, (0, repository_1.repository)(repositories_1.FinancialInstitutionsRoutingNumbersRepository)),
    tslib_1.__param(7, (0, repository_1.repository)(repositories_1.StatesAndProvincesRepository)),
    tslib_1.__param(8, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__param(9, (0, repository_1.repository)(repositories_1.UsersRepository)),
    tslib_1.__param(10, (0, repository_1.repository)(broker_admins_repository_1.BrokerAdminsRepository)),
    tslib_1.__param(11, (0, repository_1.repository)(repositories_1.ContactInformationRepository)),
    tslib_1.__param(12, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__param(13, (0, repository_1.repository)(repositories_1.InsurancePlansRepository)),
    tslib_1.__param(14, (0, repository_1.repository)(repositories_1.PlansAvailabilityRepository)),
    tslib_1.__param(15, (0, repository_1.repository)(repositories_1.InsurancePackagesRepository)),
    tslib_1.__param(16, (0, repository_1.repository)(repositories_1.SignupFormsRepository)),
    tslib_1.__param(17, (0, repository_1.repository)(repositories_1.PlanLevelRepository)),
    tslib_1.__param(18, (0, repository_1.repository)(repositories_1.CorporateTiersRepository)),
    tslib_1.__param(19, (0, repository_1.repository)(corporate_tiered_plan_levels_repository_1.CorporateTieredPlanLevelsRepository)),
    tslib_1.__param(20, (0, repository_1.repository)(repositories_1.CorporatePaidTieredPlanLevelsRepository)),
    tslib_1.__param(21, (0, repository_1.repository)(repositories_1.CustomerContactInfoRepository)),
    tslib_1.__metadata("design:paramtypes", [fusebill_service_1.FusebillService, Function, registration_service_service_1.RegistrationServiceService,
        ach_service_1.AchService,
        repositories_1.BankCodesRepository,
        repositories_1.FinancialInstitutionsRepository,
        repositories_1.FinancialInstitutionsRoutingNumbersRepository,
        repositories_1.StatesAndProvincesRepository,
        repositories_1.BrokerRepository,
        repositories_1.UsersRepository,
        broker_admins_repository_1.BrokerAdminsRepository,
        repositories_1.ContactInformationRepository,
        repositories_1.CustomerRepository,
        repositories_1.InsurancePlansRepository,
        repositories_1.PlansAvailabilityRepository,
        repositories_1.InsurancePackagesRepository,
        repositories_1.SignupFormsRepository,
        repositories_1.PlanLevelRepository,
        repositories_1.CorporateTiersRepository,
        corporate_tiered_plan_levels_repository_1.CorporateTieredPlanLevelsRepository,
        repositories_1.CorporatePaidTieredPlanLevelsRepository,
        repositories_1.CustomerContactInfoRepository])
], Corporate);
exports.Corporate = Corporate;
const btoa = function (str) { return Buffer.from(str).toString('base64'); };
const atob = function (b64Encoded) { return Buffer.from(b64Encoded, 'base64').toString(); };
//# sourceMappingURL=corporate.service.js.map