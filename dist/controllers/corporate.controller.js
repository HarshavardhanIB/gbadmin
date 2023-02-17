"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateController = void 0;
const tslib_1 = require("tslib");
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/core';
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const CONST = tslib_1.__importStar(require("../constants"));
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const keys_1 = require("../keys");
const files_controller_1 = require("./files.controller");
const MESSAGE = tslib_1.__importStar(require("../messages"));
const common_functions_1 = require("../common-functions");
const moment_1 = tslib_1.__importDefault(require("moment"));
const broker_admins_repository_1 = require("../repositories/broker-admins.repository");
const paths_1 = require("../paths");
const messages_1 = require("../messages");
const storage_helper_1 = require("../storage.helper");
const constants_1 = require("../constants");
const authorization_1 = require("@loopback/authorization");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const model_extended_1 = require("../model_extended");
const corporate_tiered_plan_levels_repository_1 = require("../repositories/corporate-tiered-plan-levels.repository");
let fuseBillCustomerCreation = false;
let fiseBill = 0;
let CorporateController = class CorporateController {
    constructor(BrokerRepository, response, corporateService, usersRepository, BrokerAdminsRepository, ContactInformationRepository, CustomerRepository, handler, fusebill, registrationService, ach, banksCodesRepository, banksRepository, branchesRepository, StatesAndProvincesRepository, InsurancePlansRepository, PlansAvailabilityRepository, insurancePackages, SignupFormsRepository, PlanLevelRepository, CorporateTiersRepository, CorporateTieredPlanLevelsRepository, CorporatePaidTieredPlanLevelsRepository, CustomerContactInfoRepository, excelService) {
        this.BrokerRepository = BrokerRepository;
        this.response = response;
        this.corporateService = corporateService;
        this.usersRepository = usersRepository;
        this.BrokerAdminsRepository = BrokerAdminsRepository;
        this.ContactInformationRepository = ContactInformationRepository;
        this.CustomerRepository = CustomerRepository;
        this.handler = handler;
        this.fusebill = fusebill;
        this.registrationService = registrationService;
        this.ach = ach;
        this.banksCodesRepository = banksCodesRepository;
        this.banksRepository = banksRepository;
        this.branchesRepository = branchesRepository;
        this.StatesAndProvincesRepository = StatesAndProvincesRepository;
        this.InsurancePlansRepository = InsurancePlansRepository;
        this.PlansAvailabilityRepository = PlansAvailabilityRepository;
        this.insurancePackages = insurancePackages;
        this.SignupFormsRepository = SignupFormsRepository;
        this.PlanLevelRepository = PlanLevelRepository;
        this.CorporateTiersRepository = CorporateTiersRepository;
        this.CorporateTieredPlanLevelsRepository = CorporateTieredPlanLevelsRepository;
        this.CorporatePaidTieredPlanLevelsRepository = CorporatePaidTieredPlanLevelsRepository;
        this.CustomerContactInfoRepository = CustomerContactInfoRepository;
        this.excelService = excelService;
    }
    async brokerDetailsBasedonId(company) {
        let message, status, statusCode, data = {};
        try {
            let broker = await this.BrokerRepository.findOne({ where: { name: company }, fields: { logo: true } });
            if (!broker) {
                statusCode = 202;
                message = messages_1.CORPORATE_MSG.NOLOGO;
            }
            else {
                statusCode = 200;
                message = messages_1.CORPORATE_MSG.LOGO;
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
    async signup(request, response) {
        let message, status, statusCode, data = [];
        let data1 = {};
        let groupAdminsUsers = [];
        let brokerId;
        let customerId;
        let userId;
        let contId;
        let p = new Promise((resolve, reject) => {
            this.handler(request, response, err => {
                if (err)
                    reject(err);
                else {
                    console.log(fuseBillCustomerCreation);
                    resolve(files_controller_1.FilesController.getFilesAndFields(request, 'corporateUpload', {}));
                }
            });
        });
        p.then(async (value) => {
            var _a, _b;
            if (!value.fields) {
                this.response.status(422).send({
                    status: '422',
                    error: `Missing input fields`,
                    message: MESSAGE.ERRORS.missingDetails,
                    date: new Date(),
                });
            }
            if (!this.registrationService.validateName(value.fields.firstName)) {
                this.response.status(422).send({
                    status: '422',
                    error: `Invalid Firstname`,
                    message: MESSAGE.ERRORS.firstName,
                    date: new Date(),
                });
                return this.response;
            }
            if (!this.registrationService.validateName(value.fields.lastName)) {
                this.response.status(422).send({
                    status: '422',
                    error: `Invalid Lastname`,
                    message: MESSAGE.ERRORS.lastName,
                    date: new Date(),
                });
                return this.response;
            } //email     
            if (!this.registrationService.validateEmail(value.fields.email)) {
                this.response.status(422).send({
                    status: '422',
                    error: `Invalid Email`,
                    message: MESSAGE.ERRORS.email,
                    date: new Date(),
                });
                return this.response;
            } //phone      //dob      
            // const cdob = this.registrationService.validateCustomerDOB(apiRequest.dob)     
            //  if (!cdob.validation) {     
            //    this.response.status(422).send({      
            //     status: '422',  
            //         error: cdob.error, 
            //          message: cdob.message,  
            //         date: new Date(),  
            //       });       
            //  return this.response; 
            //      }
            if (value.fields) {
                if (value.fields.error) {
                    this.response.status(422).send({
                        status: '422',
                        error: value.fields.error,
                        message: value.fields.error,
                        date: new Date(),
                    });
                    return this.response;
                }
                let apiRequest = value.fields;
                let requestFiles = value.files;
                console.log(requestFiles);
                try {
                    console.log(apiRequest);
                    // creating contact info
                    let contactDetailsObj = new models_1.ContactInformation();
                    contactDetailsObj.apt = apiRequest.apt;
                    contactDetailsObj.city = apiRequest.city;
                    contactDetailsObj.state = apiRequest.state;
                    contactDetailsObj.country = apiRequest.country;
                    contactDetailsObj.line1 = apiRequest.street_address_line1;
                    contactDetailsObj.line2 = apiRequest.street_address_line2;
                    contactDetailsObj.postalCode = apiRequest.postal_code;
                    contactDetailsObj.contactType = 'COMPANY';
                    contactDetailsObj.addressType = 'OFFICE_ADDRESS';
                    contactDetailsObj.primaryEmail = apiRequest.email;
                    contactDetailsObj.primaryPhone = apiRequest.phoneNum;
                    let contactInfo = await this.ContactInformationRepository.create(contactDetailsObj);
                    contId = contactInfo.id;
                    let corporateUserObj = new models_1.Users();
                    corporateUserObj.username = apiRequest.email;
                    let randomPswrd = await (0, common_functions_1.generateRandomPassword)();
                    corporateUserObj.password = await (0, common_functions_1.encryptPassword)(randomPswrd);
                    corporateUserObj.block = true;
                    corporateUserObj.activation = await (0, common_functions_1.getActivationCode)();
                    corporateUserObj.registrationDate = (0, moment_1.default)().format('YYYY-MM-DD');
                    let CorporateUser = await this.usersRepository.create(corporateUserObj);
                    groupAdminsUsers.push(CorporateUser.id);
                    data1['contactOInfo'] = contactInfo;
                    // data.push({ "contactOInfo": contactInfo });
                    let brokerObj = new models_1.Broker();
                    brokerObj.name = apiRequest.corporationName;
                    brokerObj.brokerType = 'CORPORATE';
                    brokerObj.salesTrackingCode = apiRequest.salesTrackingCode || "0000001";
                    brokerObj.salesTrackingType = apiRequest.salesTrackingType || '';
                    brokerObj.published = true;
                    brokerObj.contactId = contactInfo.id;
                    brokerObj.userId = CorporateUser.id;
                    brokerObj.settingsAllowGroupBenefitsWallet = apiRequest.setupWallet ? 1 : 0;
                    brokerObj.settingsEnableTieredHealthBenefits = apiRequest.setUplevelofCoverage ? 1 : 0;
                    brokerObj.waitTime = apiRequest.waitTime;
                    brokerObj.useCreditCardPaymentMethod = apiRequest.useCreditCard;
                    brokerObj.useInvoicePaymentMethod = apiRequest.invoicePayment;
                    brokerObj.usePadPaymentMethod = apiRequest.padPayment;
                    brokerObj.policyStartDate = apiRequest.policyStartDate;
                    console.log(brokerObj);
                    let broker = await this.BrokerRepository.create(brokerObj);
                    brokerId = broker.id;
                    data1['broker'] = broker;
                    // data.push({ "broker": broker });
                    console.log(apiRequest.gropupAdmin);
                    let groupAdmins = JSON.parse(apiRequest.gropupAdmin);
                    let groupAdminsArray = [];
                    for (const groupAdmin of groupAdmins) {
                        let userObj = new models_1.Users();
                        userObj.username = groupAdmin.email;
                        let randomPswrd = await (0, common_functions_1.generateRandomPassword)();
                        userObj.password = await (0, common_functions_1.encryptPassword)(randomPswrd);
                        userObj.block = true;
                        userObj.activation = await (0, common_functions_1.getActivationCode)();
                        userObj.registrationDate = (0, moment_1.default)().format('YYYY-MM-DD');
                        let groupAdminsUser = await this.usersRepository.create(userObj);
                        groupAdminsArray.push(groupAdminsUser);
                        groupAdminsUsers.push(groupAdminsUser.id);
                    }
                    data1['groupAdminstrators'] = groupAdminsArray;
                    // data.push({ "groupAdmins": groupAdminsArray });
                    let brokerAdmin = new models_1.BrokerAdmins();
                    brokerAdmin.brokerId = broker.id;
                    let customerObj = new models_1.Customer();
                    customerObj.brokerId = broker.id;
                    //firstname and last should be created in backend level
                    customerObj.firstName = apiRequest.firstName;
                    customerObj.lastName = apiRequest.lastName;
                    customerObj.gender = CONST.GENDER.UNDISCLOSED;
                    customerObj.companyName = apiRequest.corporationName;
                    customerObj.isCorporateAccount = true;
                    customerObj.registrationDate = (0, moment_1.default)().format('YYYY-MM-DD');
                    customerObj.userId = CorporateUser.id;
                    let customer = await this.CustomerRepository.create(customerObj);
                    customerId = customer.id;
                    var fusebillCustomer = {};
                    if (fuseBillCustomerCreation) {
                        const fusebillData = {};
                        fusebillData.firstName = customer.id;
                        fusebillData.lastName = 'CORPORATE';
                        fusebillData.companyName = apiRequest.corporationName;
                        fusebillData.primaryEmail = apiRequest.email;
                        fusebillData.primaryPhone = apiRequest.phoneNum; //phone num is not mandatory
                        fusebillData.reference = customer.id;
                        //fusebillData.companyName=apiRequest.company_name;     
                        fusebillData.currency = apiRequest.currency || 'CAD'; // || ' 
                        try {
                            fusebillCustomer = await this.fusebill.createCustomer(fusebillData);
                            console.log("**************************************************");
                            // console.log(fusebillCustomer)
                            console.log("**************************************************");
                            let fuseBillAddressData = {
                                "customerAddressPreferenceId": fusebillCustomer.id,
                                "countryId": apiRequest.country_id,
                                "stateId": apiRequest.state_id,
                                //"addressType": apiRequest.address_type ?? 'Shipping',//here shipping is same as home //Billing, shipping    
                                "addressType": (_a = apiRequest.address_type) !== null && _a !== void 0 ? _a : 'Billing',
                                "enforceFullAddress": true,
                                "line1": apiRequest.street_address_line1,
                                "line2": apiRequest.street_address_line2,
                                "city": apiRequest.city,
                                "postalZip": apiRequest.postal_code,
                                "country": apiRequest.country,
                                "state": apiRequest.state
                            };
                            const fbCustomerAddress = await this.fusebill.createCustomerAddress(fuseBillAddressData);
                        }
                        catch (error) {
                            console.log(error.response.data.Errors);
                        }
                    }
                    else {
                        fiseBill = fiseBill + 1;
                        fusebillCustomer = {
                            firstName: 'Admin',
                            middleName: null,
                            lastName: 'Ideabytes',
                            companyName: 'Ideabytes',
                            suffix: null,
                            primaryEmail: null,
                            primaryPhone: null,
                            secondaryEmail: null,
                            secondaryPhone: null,
                            title: '',
                            reference: '1844',
                            status: 'Draft',
                            customerAccountStatus: 'Good',
                            currency: 'CAD',
                            canChangeCurrency: true,
                            customerReference: {
                                reference1: null,
                                reference2: null,
                                reference3: null,
                                salesTrackingCodes: [],
                                id: 11673101,
                                uri: 'https://secure.fusebill.com/v1/customers/11673101'
                            },
                            customerAcquisition: {
                                adContent: null,
                                campaign: null,
                                keyword: null,
                                landingPage: null,
                                medium: null,
                                source: null,
                                id: 11673101,
                                uri: 'https://secure.fusebill.com/v1/customers/11673101'
                            },
                            monthlyRecurringRevenue: 0,
                            netMonthlyRecurringRevenue: 0,
                            salesforceId: null,
                            salesforceAccountType: null,
                            salesforceSynchStatus: 'Enabled',
                            netsuiteId: null,
                            netsuiteSynchStatus: 'Enabled',
                            netsuiteCustomerType: '',
                            portalUserName: null,
                            parentId: null,
                            isParent: false,
                            quickBooksLatchType: null,
                            quickBooksId: null,
                            quickBooksSyncToken: null,
                            hubSpotId: null,
                            hubSpotCompanyId: null,
                            geotabId: null,
                            digitalRiverId: null,
                            modifiedTimestamp: '2023-02-01T11:36:16.0432031Z',
                            createdTimestamp: '2023-02-01T11:36:15.9442038Z',
                            requiresProjectedInvoiceGeneration: false,
                            requiresFinancialCalendarGeneration: false,
                            id: 11673101 + fiseBill,
                            uri: 'https://secure.fusebill.com/v1/customers/11673101'
                        };
                    }
                    await this.CustomerRepository.updateById(customerId, { fusebillCustomerId: fusebillCustomer.id });
                    //activationg fuse bill customer id
                    // bank details and void check service 
                    // data.push(customer);
                    data1['customer'] = customer;
                    for (const user of groupAdminsUsers) {
                        console.log(user);
                        brokerAdmin.userId = user;
                        console.log(brokerAdmin);
                        await this.BrokerAdminsRepository.create(brokerAdmin);
                    }
                    let signupFormData = new models_1.SignupForms();
                    signupFormData.brokerId = brokerId;
                    let link = await (0, common_functions_1.generateFormLink)(broker.userId || 0);
                    signupFormData.link = await this.checkAndGenerateNewFormLink(link, CorporateUser.id || 0);
                    let aliasLink = "/" + ((_b = broker.name) === null || _b === void 0 ? void 0 : _b.toLowerCase().split(" ")[0]);
                    signupFormData.alias = aliasLink;
                    signupFormData.name = CONST.signupForm.name;
                    signupFormData.description = CONST.signupForm.description;
                    signupFormData.title = CONST.signupForm.title;
                    signupFormData.formType = CONST.signupForm.formType;
                    signupFormData.keywords = CONST.signupForm.keywords;
                    signupFormData.inelligibilityPeriod = CONST.signupForm.ineligibilityPeriod;
                    signupFormData.published = CONST.signupForm.published;
                    signupFormData.requireDentalHealthCoverage = true;
                    signupFormData.requireSpouseEmail = false;
                    signupFormData.warnRequiredDependantMedicalExam = false;
                    signupFormData.useCreditCardPaymentMethod = true;
                    signupFormData.usePadPaymentMethod = true;
                    signupFormData.isDemoForm = false;
                    const signupForm = await this.SignupFormsRepository.create(signupFormData);
                    data1['signupForm'] = signupForm;
                    // await mail("", groupAdmins[0].email, "", "", "", "")
                    if (value.files) {
                        console.log(value.files);
                        console.log(`Logo -${value.files.length}`);
                        if (value.files.length > 0) {
                            for (let file of value.files) {
                                if (file.fieldname == "logo") {
                                    console.log(file.originalname);
                                    console.log(`file.originalname`);
                                    let originalname = file.originalname;
                                    console.log(originalname);
                                    originalname = originalname.replace(/[\])}[{(]/g, '').replace(/ /g, '');
                                    console.log(originalname);
                                    let filename = originalname;
                                    // let modfilenameArr = filename.split(".")
                                    // let modfilename = modfilenameArr[0] + "0." + modfilenameArr[1]
                                    const fileAttr = (0, common_functions_1.getFileAttributes)(filename);
                                    let modfilename = fileAttr.name + "0" + fileAttr.ext;
                                    // const broker = await this.BrokerRepository.findById(brokerId);
                                    if (broker) {
                                        await this.BrokerRepository.updateById(broker.id, {
                                            logo: paths_1.BROKERPATH_STRING + filename,
                                            link: paths_1.BROKERPATH_STRING + modfilename
                                        });
                                    }
                                    else {
                                        console.log('no broker with given id');
                                        message = 'No broker found';
                                        status = '202';
                                    }
                                }
                                else if (file.fieldname == "voidCheck") {
                                    let filename = file.originalname;
                                    let mimetype = file.mimetype;
                                    switch (mimetype) {
                                        case 'image/png':
                                        case 'image/jpg':
                                        case 'image/jpeg':
                                        case 'image/pjpeg':
                                        case 'application/pdf':
                                            mimetype = mimetype;
                                            break;
                                        default:
                                            mimetype = "invalid";
                                    }
                                    const fileAttr = (0, common_functions_1.getFileAttributes)(filename);
                                    let modfilename = fileAttr.name + "0" + fileAttr.ext;
                                    console.log(mimetype);
                                    let filenamets = value.fields.timestamp;
                                    console.log(filenamets);
                                    //let ext = filename.split(".")[1]
                                    let ext = fileAttr.ext;
                                    let bankDetails = await this.corporateService.customerBankDetailsRegister(value.fields.session, filenamets, ext, mimetype, customer.id);
                                }
                            }
                        }
                        else {
                            console.log(`No logo needed`);
                        }
                    }
                    this.response.status(200).send({
                        status: '200',
                        message: messages_1.CORPORATE_MSG.REGISTRATION_SUCCESS,
                        date: new Date(),
                        data: data1
                    });
                }
                catch (error) {
                    console.log(error);
                    this.response.status(202).send({
                        status: '202',
                        error: error,
                        message: messages_1.CORPORATE_MSG.REGISTRATION_FAIL,
                        date: new Date(),
                    });
                    await this.CustomerRepository.deleteById(customerId);
                    for (let groupAdminUser of groupAdminsUsers) {
                        await this.usersRepository.deleteById(groupAdminUser);
                    }
                    await this.ContactInformationRepository.deleteById(contId);
                    await this.BrokerRepository.deleteById(brokerId);
                    return this.response;
                }
            }
        });
        p.catch(onrejected => {
            message = messages_1.CORPORATE_MSG.LOGO_NOT_SET;
            status = '202';
            this.response.status(parseInt(status)).send({
                status: status,
                message: message,
                date: new Date(),
                data: data
            });
        });
        return this.response;
    }
    async corporateFormConfig() {
        let status, message, date, data = {};
        try {
            status = 200;
            message = "Form configurations";
            // data['gender'] = CONST.GENDER_LIST;
            // data['marital_status'] = CONST.MARITAL_STATUS_LIST;
            // data['brokerType'] = CONST.BROKER_TYPE_ARRAY;
            // data['formType'] = CONST.FORM_TYPE_ARRAY;
            let countryFilter = {
                where: {
                    published: 1
                }
            };
            data['states'] = await this.StatesAndProvincesRepository.find(countryFilter);
            data['defaultCountry'] = CONST.DEFAULT_COUNTRY;
            data['paymentMethod'] = CONST.PAYMENT_METHOD_LIST_ARRAY;
            console.log("ppppppppppppppppppp");
            data['brokerSearch'] = await this.corporateService.modelPropoerties(models_1.Broker);
            data['sex'] = CONST.GENDER_LIST;
            data['maritalStatus'] = CONST.MARITAL_STATUS_LIST;
            let tierConfig = {
                'default': [{ 'tierName': 'All', 'walletAmount': 0 }, { 'tierName': 'Management', 'walletAmount': 1000 }, { 'tierName': 'Employee', 'walletAmount': 1000 }],
                'lengthOfService': [{ 'tierName': 'New Joinee', 'from': 0, 'to': 2, 'walletAmount': 0 }, { 'tierName': 'Middle road', 'from': 2, 'to': 3, 'walletAmount': 1500 }, { 'tierName': 'Seniors', 'from': 3, 'to': '', 'walletAmount': 2000 }],
                'annualIncome': [{ 'tierName': 'Income one', 'percentage': 1, 'annualIncome': 50000, 'walletAmount': 500 }, { 'tierName': 'Income Two', 'Percentage': 2, 'AnnualIncome': 75000, 'walletAmount': 2500 }, { 'tierName': 'Income Three', 'Percentage': 2.5, 'AnnualIncome': 100000, 'walletAmount': 3500 }]
            };
            data['tierConfig'] = tierConfig;
        }
        catch (error) {
            status = 400;
            message = "Configuration error";
        }
        this.response.status(status).send({
            status, message, data, date: new Date()
        });
        return this.response;
    }
    async customerBankDetailsRegister(
    //@param.path.string('bankDetails') bankDetails: string,
    request, response) {
        const btoa = function (str) { return Buffer.from(str).toString('base64'); };
        const atob = function (b64Encoded) { return Buffer.from(b64Encoded, 'base64').toString(); };
        let message, status, data = {};
        let bankDetailsDecoded; // = atob(request.body.key)
        let bank_details = {}; // JSON.parse(bankDetailsDecoded);
        let p = new Promise((resolve, reject) => {
            this.handler(request, response, err => {
                if (err)
                    reject(err);
                else {
                    resolve(files_controller_1.FilesController.getFilesAndFields(request, 'customerChequeUpload', { customerid: bank_details.customerId }));
                    //const upload = FilesController.getFilesAndFields(request, 'brokerLogoUpload', {brokerid: broker_id});
                }
            });
        });
        p.then(async (value) => {
            //sconsole.log(value.fields);
            if (value.fields) {
                if (value.fields.error) {
                    this.response.status(422).send({
                        status: '422',
                        error: value.fields.error,
                        message: value.fields.error,
                        date: new Date(),
                    });
                    return this.response;
                }
                if (!value.fields.session) {
                    this.response.status(422).send({
                        status: '422',
                        error: `Missing input fields 'session'`,
                        message: MESSAGE.ERRORS.missingDetails,
                        date: new Date(),
                    });
                    return this.response;
                }
                try {
                    bankDetailsDecoded = atob(value.fields.session);
                    bank_details = JSON.parse(bankDetailsDecoded);
                    console.log(bank_details);
                }
                catch (error) {
                    console.log(error);
                    this.response.status(422).send({
                        status: '422',
                        error: `Invalid input fields 'bankDetails'`,
                        message: MESSAGE.ERRORS.invalidBankDetails,
                        date: new Date(),
                    });
                    return this.response;
                }
                if (!bank_details.bankCode) {
                    this.response.status(422).send({
                        status: '422',
                        error: `Missing input fields 'bankCode'`,
                        message: MESSAGE.ERRORS.missingDetails,
                        date: new Date(),
                    });
                    return this.response;
                }
                if (!this.registrationService.validateBankCode(bank_details.bankCode)) {
                    this.response.status(422).send({
                        status: '422',
                        error: `Invalid Bank Code`,
                        message: MESSAGE.ERRORS.bankCode,
                        date: new Date(),
                    });
                    return this.response;
                }
                if (!bank_details.branchCode) {
                    this.response.status(422).send({
                        status: '422',
                        error: `Missing input fields 'branchCode'`,
                        message: MESSAGE.ERRORS.missingDetails,
                        date: new Date(),
                    });
                    return this.response;
                }
                if (!this.registrationService.validateBranchCode(bank_details.branchCode)) {
                    this.response.status(422).send({
                        status: '422',
                        error: `Invalid Branch Code`,
                        message: MESSAGE.ERRORS.branchCode,
                        date: new Date(),
                    });
                    return this.response;
                }
                if (!bank_details.accountNumber) {
                    this.response.status(422).send({
                        status: '422',
                        error: `Missing input fields 'accountNo'`,
                        message: MESSAGE.ERRORS.missingDetails,
                        date: new Date(),
                    });
                    return this.response;
                }
                if (!this.registrationService.validateAccountNo(bank_details.accountNumber)) {
                    this.response.status(422).send({
                        status: '422',
                        error: `Invalid Account No.`,
                        message: MESSAGE.ERRORS.accountNo,
                        date: new Date(),
                    });
                    return this.response;
                }
            }
            else {
                this.response.status(422).send({
                    status: '422',
                    error: `Missing input fields`,
                    message: MESSAGE.ERRORS.missingDetails,
                    date: new Date(),
                });
                return this.response;
            }
            if (value.files) {
                console.log(value.files.length);
                console.log(value.files[0].originalname);
                let filename = value.files[0].originalname;
                let mimetype = value.files[0].mimetype;
                const fileAttr = (0, common_functions_1.getFileAttributes)(filename);
                //let modfilenameArr = filename.split(".")
                //let modfilename = modfilenameArr[0] + "0." + modfilenameArr[1]
                let modfilename = fileAttr.name + "0" + fileAttr.ext;
                console.log(mimetype);
                let filenamets = value.fields.timestamp;
                console.log(filenamets);
                //let ext = filename.split(".")[1]
                let ext = fileAttr.ext;
                //let newFilename = CUSTOMER_CHEQUES_FOLDER + '/' + filenamets + "." + ext;
                let newFilename = paths_1.CUSTOMER_CHEQUES_FOLDER + '/' + filenamets + ext;
                console.log(newFilename);
                switch (mimetype) {
                    case 'image/png':
                    case 'image/jpg':
                    case 'image/jpeg':
                    case 'image/pjpeg':
                    case 'application/pdf':
                        mimetype = mimetype;
                        break;
                    default:
                        mimetype = "invalid";
                }
                // let encoding: BufferEncoding = 'base64'; //utf8
                // var fileBuffer = Buffer.from(newFilename, encoding);
                //var checkFileBuffer; //= Buffer.from(newFilename);
                //console.log(checkFileBuffer)
                const checkFileBuffer = await (0, storage_helper_1.getFile)(newFilename, '');
                console.log(checkFileBuffer);
                console.log(`customerName:${bank_details.customerName}`);
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
                    "customerName": bank_details.customerName,
                    //   "fusebillCustomerId": customer.fusebillCustomerId,
                };
                const customerRecord = await this.ach.createCustomer(input);
                //   message = 'Broker logo is set'
                //   status = '200'
                console.log(customerRecord);
                if (customerRecord && customerRecord.data) {
                    (0, storage_helper_1.deleteFile)(newFilename);
                    data = customerRecord.data;
                    message = 'Customer Record(PAD) created';
                    status = '200';
                }
                else {
                    message = 'Customer Record(PAD) creation failed';
                    status = '202';
                }
                this.response.status(parseInt(status)).send({
                    status: status,
                    message: message,
                    date: new Date(),
                    data: data
                });
            }
            else {
                this.response.status(422).send({
                    status: '422',
                    error: `Missing input file`,
                    message: MESSAGE.ERRORS.missingDetails,
                    date: new Date(),
                });
                return this.response;
            }
        });
        p.catch(onrejected => {
            message = 'Customer Record(PAD) creation failed';
            status = '202';
            this.response.status(parseInt(status)).send({
                status: status,
                message: message,
                date: new Date(),
                data: data
            });
        });
        return this.response;
    }
    async customerBankVerification(request) {
        let message, status, data = {}, error;
        try {
            if (!this.registrationService.validateBankCode(request.bankCode)) {
                this.response.status(409).send({
                    status: '409',
                    error: `Invalid Bank Code`,
                    message: MESSAGE.ERRORS.bankCode,
                    date: new Date(),
                });
                return this.response;
            }
            if (!this.registrationService.validateBranchCode(request.branchCode)) {
                this.response.status(409).send({
                    status: '409',
                    error: `Invalid Branch Code`,
                    message: MESSAGE.ERRORS.branchCode,
                    date: new Date(),
                });
                return this.response;
            }
            let bank_code = request.bankCode;
            const bank = await this.banksCodesRepository.findOne({ where: { bankCode: bank_code } });
            //console.log(bank);
            //bank.bankId
            if (bank) {
                //console.log(bank);
                //console.log(bank.bankId);
                const bankDetails = await this.banksRepository.findById(bank.bankId);
                //console.log(bankDetails);
                const branches = await this.branchesRepository.find({
                    where: {
                        and: [
                            { bankId: bank.bankId },
                            {
                                or: [
                                    { eTransitNumber: request.branchCode },
                                    { pTransitNumber: request.branchCode }
                                ]
                            }
                        ]
                    }
                });
                //console.log(branches);
                if (branches && branches.length > 0) {
                    message = 'Customer bank details verified successfully';
                    status = '200';
                    let datax = branches[0]; //-- > id   bank_id    transit_number      address
                    data.id = datax.id;
                    data.bankId = datax.bankId;
                    data.branchCode = request.branchCode;
                    data.transitNumber = request.branchCode;
                    data.address = datax.address;
                    data.bank = {}; // bank-- -> id name   bank_code
                    data.bank.id = bankDetails.id;
                    data.bank.name = bankDetails.name;
                    data.bank.address = bankDetails.address;
                    data.bank.bankCode = bank_code;
                }
                else {
                    error = 'Customer bank verification failed';
                    message = `Branch/Transit with number ${request.branchCode} not found for the ${bankDetails.name}. Please check and re-verify`;
                    status = '202';
                }
            }
            else {
                error = 'Customer bank verification failed';
                message = `Bank with code ${bank_code} not found. Please check and re-verify`;
                status = '202';
            }
        }
        catch (error) {
            console.log(error);
            message = 'Customer bank verification failed';
            status = '202';
        }
        this.response.status(parseInt(status)).send({
            status: status,
            message: message,
            date: new Date(),
            data: data,
            error: error
        });
        return this.response;
    }
    async validatePlans() {
        let message, status, data = {}, final = {};
        try {
            let packageFilter = {
                order: 'ordering ASC',
                where: {
                    published: true
                },
            };
            const packages = await this.insurancePackages.find(packageFilter);
            const packagesArray = [];
            for (const pckg of packages) {
                const packageObject = {};
                packageObject["description"] = pckg.description;
                packageObject["id"] = pckg.id;
                packageObject["logo"] = pckg.logo;
                packageObject["name"] = pckg.name;
                packageObject["published"] = pckg.published;
                packageObject["ordering"] = pckg.ordering;
                packageObject["allowMultiple"] = pckg.allowMultiple;
                packageObject["applyFilters"] = pckg.applyFilters;
                packageObject["optIn"] = pckg.optIn;
                let plansLevelFilter = {
                    order: 'ordering ASC',
                    where: {
                        "published": true,
                        "requirePlanLevel": null
                    }
                };
                const planLevels = await this.insurancePackages.planGroups(pckg.id).find(plansLevelFilter);
                let groups = [];
                let subGroups = [];
                const parentIds = Array.from(new Set(planLevels.map(planLevels => planLevels.parentId)));
                for (const parentId of parentIds) {
                    if (parentId != null) {
                        const parentDetailsObj = {};
                        const parentDetails = await this.PlanLevelRepository.findById(parentId);
                        const subGroups = await this.PlanLevelRepository.find({ where: { parentId: parentId } });
                        parentDetailsObj.id = parentDetails.id;
                        parentDetailsObj.name = parentDetails.name;
                        parentDetailsObj.subGroups = subGroups;
                        parentDetails['subGroups'] = subGroups;
                        console.log(parentDetails);
                        groups.push(parentDetailsObj);
                    }
                }
                for (const pl of planLevels) {
                    if (pl.parentId == undefined || pl.parentId == null) {
                        const parentDetailsObj = {};
                        parentDetailsObj.id = pl.id;
                        parentDetailsObj.name = pl.name;
                        parentDetailsObj.subGroups = [pl];
                        groups.push(parentDetailsObj);
                    }
                }
                // for (const pl of planLevels) {
                //   groupsArray.push(pl);                 
                // }
                packageObject["groups"] = groups; //planLevels
                //console.log("-->" + packageObject.groups.length)
                if (groups.length > 0)
                    packagesArray.push(packageObject);
            }
            data.packages = packagesArray; //packages;
        }
        catch (error) {
            console.log(error);
        }
        return data;
    }
    async checkAndGenerateNewFormLink(formLink, userid) {
        let linkExists = await this.SignupFormsRepository.findOne({ where: { link: formLink } });
        if (linkExists) {
            console.log(`linkExists: ${linkExists.id}`);
            let link = await (0, common_functions_1.generateFormLink)(userid);
            const newlink = await this.checkAndGenerateNewFormLink(link, userid);
            return newlink;
        }
        else {
            return formLink;
        }
    }
    async customerValidation(request, response) {
        let message, status, statusCode, data = [];
        let data1 = {};
        let responsplans = {};
        let groupAdminsUsers = [];
        let brokerId;
        let customerId;
        let userId;
        let contId;
        let p = new Promise((resolve, reject) => {
            this.handler(request, response, err => {
                if (err)
                    reject(err);
                else {
                    console.log(fuseBillCustomerCreation);
                    resolve(files_controller_1.FilesController.getFilesAndFields(request, 'corporateUpload', {}));
                }
            });
        });
        p.then(async (value) => {
            var _a, _b;
            if (!value.fields) {
                this.response.status(422).send({
                    status: '422',
                    error: `Missing input fields`,
                    message: MESSAGE.ERRORS.missingDetails,
                    date: new Date(),
                });
            }
            if (!this.registrationService.validateName(value.fields.firstName)) {
                this.response.status(422).send({
                    status: '422',
                    error: `Invalid Firstname`,
                    message: MESSAGE.ERRORS.firstName,
                    date: new Date(),
                });
                return this.response;
            }
            if (!this.registrationService.validateName(value.fields.lastName)) {
                this.response.status(422).send({
                    status: '422',
                    error: `Invalid Lastname`,
                    message: MESSAGE.ERRORS.lastName,
                    date: new Date(),
                });
                return this.response;
            } //email     
            if (!this.registrationService.validateEmail(value.fields.email)) {
                this.response.status(422).send({
                    status: '422',
                    error: `Invalid Email`,
                    message: MESSAGE.ERRORS.email,
                    date: new Date(),
                });
                return this.response;
            } //phone      //dob      
            // const cdob = this.registrationService.validateCustomerDOB(apiRequest.dob)     
            //  if (!cdob.validation) {     
            //    this.response.status(422).send({      
            //     status: '422',  
            //         error: cdob.error, 
            //          message: cdob.message,  
            //         date: new Date(),  
            //       });       
            //  return this.response; 
            //      }
            if (value.fields) {
                if (value.fields.error) {
                    this.response.status(422).send({
                        status: '422',
                        error: value.fields.error,
                        message: value.fields.error,
                        date: new Date(),
                    });
                    return this.response;
                }
                let apiRequest = value.fields;
                let requestFiles = value.files;
                console.log(requestFiles);
                try {
                    console.log(apiRequest);
                    // creating contact info
                    let contactDetailsObj = new models_1.ContactInformation();
                    contactDetailsObj.apt = apiRequest.apt;
                    contactDetailsObj.city = apiRequest.city;
                    contactDetailsObj.state = apiRequest.state;
                    contactDetailsObj.country = apiRequest.country;
                    contactDetailsObj.line1 = apiRequest.street_address_line1;
                    contactDetailsObj.line2 = apiRequest.street_address_line2;
                    contactDetailsObj.postalCode = apiRequest.postal_code;
                    contactDetailsObj.contactType = 'COMPANY';
                    contactDetailsObj.addressType = 'OFFICE_ADDRESS';
                    contactDetailsObj.primaryEmail = apiRequest.email;
                    contactDetailsObj.primaryPhone = apiRequest.phoneNum;
                    let contactInfo = await this.ContactInformationRepository.create(contactDetailsObj);
                    contId = contactInfo.id;
                    let corporateUserObj = new models_1.Users();
                    corporateUserObj.username = apiRequest.email;
                    let randomPswrd = await (0, common_functions_1.generateRandomPassword)();
                    corporateUserObj.password = await (0, common_functions_1.encryptPassword)(randomPswrd);
                    corporateUserObj.block = true;
                    corporateUserObj.activation = await (0, common_functions_1.getActivationCode)();
                    corporateUserObj.registrationDate = (0, moment_1.default)().format('YYYY-MM-DD');
                    let CorporateUser = await this.usersRepository.create(corporateUserObj);
                    groupAdminsUsers.push(CorporateUser.id);
                    data1['contactOInfo'] = contactInfo;
                    // data.push({ "contactOInfo": contactInfo });
                    let brokerObj = new models_1.Broker();
                    brokerObj.name = apiRequest.corporationName;
                    brokerObj.brokerType = 'CORPORATE';
                    brokerObj.salesTrackingCode = apiRequest.salesTrackingCode || "0000001";
                    brokerObj.salesTrackingType = apiRequest.salesTrackingType || '';
                    brokerObj.published = true;
                    brokerObj.contactId = contactInfo.id;
                    brokerObj.userId = CorporateUser.id;
                    brokerObj.settingsAllowGroupBenefitsWallet = apiRequest.setupWallet ? 1 : 0;
                    brokerObj.settingsEnableTieredHealthBenefits = apiRequest.setUplevelofCoverage ? 1 : 0;
                    brokerObj.waitTime = apiRequest.waitTime;
                    brokerObj.useCreditCardPaymentMethod = apiRequest.useCreditCard;
                    brokerObj.useInvoicePaymentMethod = apiRequest.invoicePayment;
                    brokerObj.usePadPaymentMethod = apiRequest.padPayment;
                    brokerObj.policyStartDate = apiRequest.policyStartDate;
                    console.log(brokerObj);
                    let broker = await this.BrokerRepository.create(brokerObj);
                    brokerId = broker.id;
                    data1['broker'] = broker;
                    // data.push({ "broker": broker });
                    console.log(apiRequest.gropupAdmin);
                    let groupAdmins = JSON.parse(apiRequest.gropupAdmin);
                    let groupAdminsArray = [];
                    for (const groupAdmin of groupAdmins) {
                        let userObj = new models_1.Users();
                        userObj.username = groupAdmin.email;
                        let randomPswrd = await (0, common_functions_1.generateRandomPassword)();
                        userObj.password = await (0, common_functions_1.encryptPassword)(randomPswrd);
                        userObj.block = true;
                        userObj.activation = await (0, common_functions_1.getActivationCode)();
                        userObj.registrationDate = (0, moment_1.default)().format('YYYY-MM-DD');
                        let groupAdminsUser = await this.usersRepository.create(userObj);
                        groupAdminsArray.push(groupAdminsUser);
                        groupAdminsUsers.push(groupAdminsUser.id);
                    }
                    data1['groupAdminstrators'] = groupAdminsArray;
                    // data.push({ "groupAdmins": groupAdminsArray });
                    let brokerAdmin = new models_1.BrokerAdmins();
                    brokerAdmin.brokerId = broker.id;
                    let customerObj = new models_1.Customer();
                    customerObj.brokerId = broker.id;
                    //firstname and last should be created in backend level
                    customerObj.firstName = apiRequest.firstName;
                    customerObj.lastName = apiRequest.lastName;
                    customerObj.gender = CONST.GENDER.UNDISCLOSED;
                    customerObj.companyName = apiRequest.corporationName;
                    customerObj.isCorporateAccount = true;
                    customerObj.registrationDate = (0, moment_1.default)().format('YYYY-MM-DD');
                    customerObj.userId = CorporateUser.id;
                    let customer = await this.CustomerRepository.create(customerObj);
                    customerId = customer.id;
                    var fusebillCustomer = {};
                    if (fuseBillCustomerCreation) {
                        const fusebillData = {};
                        fusebillData.firstName = customer.id;
                        fusebillData.lastName = 'CORPORATE';
                        fusebillData.companyName = apiRequest.corporationName;
                        fusebillData.primaryEmail = apiRequest.email;
                        fusebillData.primaryPhone = apiRequest.phoneNum; //phone num is not mandatory
                        fusebillData.reference = customer.id;
                        //fusebillData.companyName=apiRequest.company_name;     
                        fusebillData.currency = apiRequest.currency || 'CAD'; // || ' 
                        try {
                            fusebillCustomer = await this.fusebill.createCustomer(fusebillData);
                            console.log("**************************************************");
                            // console.log(fusebillCustomer)
                            console.log("**************************************************");
                            let fuseBillAddressData = {
                                "customerAddressPreferenceId": fusebillCustomer.id,
                                "countryId": apiRequest.country_id,
                                "stateId": apiRequest.state_id,
                                //"addressType": apiRequest.address_type ?? 'Shipping',//here shipping is same as home //Billing, shipping    
                                "addressType": (_a = apiRequest.address_type) !== null && _a !== void 0 ? _a : 'Billing',
                                "enforceFullAddress": true,
                                "line1": apiRequest.street_address_line1,
                                "line2": apiRequest.street_address_line2,
                                "city": apiRequest.city,
                                "postalZip": apiRequest.postal_code,
                                "country": apiRequest.country,
                                "state": apiRequest.state
                            };
                            const fbCustomerAddress = await this.fusebill.createCustomerAddress(fuseBillAddressData);
                        }
                        catch (error) {
                            console.log(error.response.data.Errors);
                        }
                    }
                    else {
                        fiseBill = fiseBill + 1;
                        fusebillCustomer = {
                            firstName: 'Admin',
                            middleName: null,
                            lastName: 'Ideabytes',
                            companyName: 'Ideabytes',
                            suffix: null,
                            primaryEmail: null,
                            primaryPhone: null,
                            secondaryEmail: null,
                            secondaryPhone: null,
                            title: '',
                            reference: '1844',
                            status: 'Draft',
                            customerAccountStatus: 'Good',
                            currency: 'CAD',
                            canChangeCurrency: true,
                            customerReference: {
                                reference1: null,
                                reference2: null,
                                reference3: null,
                                salesTrackingCodes: [],
                                id: 11673101,
                                uri: 'https://secure.fusebill.com/v1/customers/11673101'
                            },
                            customerAcquisition: {
                                adContent: null,
                                campaign: null,
                                keyword: null,
                                landingPage: null,
                                medium: null,
                                source: null,
                                id: 11673101,
                                uri: 'https://secure.fusebill.com/v1/customers/11673101'
                            },
                            monthlyRecurringRevenue: 0,
                            netMonthlyRecurringRevenue: 0,
                            salesforceId: null,
                            salesforceAccountType: null,
                            salesforceSynchStatus: 'Enabled',
                            netsuiteId: null,
                            netsuiteSynchStatus: 'Enabled',
                            netsuiteCustomerType: '',
                            portalUserName: null,
                            parentId: null,
                            isParent: false,
                            quickBooksLatchType: null,
                            quickBooksId: null,
                            quickBooksSyncToken: null,
                            hubSpotId: null,
                            hubSpotCompanyId: null,
                            geotabId: null,
                            digitalRiverId: null,
                            modifiedTimestamp: '2023-02-01T11:36:16.0432031Z',
                            createdTimestamp: '2023-02-01T11:36:15.9442038Z',
                            requiresProjectedInvoiceGeneration: false,
                            requiresFinancialCalendarGeneration: false,
                            id: 11673101 + fiseBill,
                            uri: 'https://secure.fusebill.com/v1/customers/11673101'
                        };
                    }
                    await this.CustomerRepository.updateById(customerId, { fusebillCustomerId: fusebillCustomer.id });
                    //activationg fuse bill customer id
                    // bank details and void check service 
                    // data.push(customer);
                    data1['customer'] = customer;
                    for (const user of groupAdminsUsers) {
                        console.log(user);
                        brokerAdmin.userId = user;
                        console.log(brokerAdmin);
                        await this.BrokerAdminsRepository.create(brokerAdmin);
                    }
                    let signupFormData = new models_1.SignupForms();
                    signupFormData.brokerId = brokerId;
                    let link = await (0, common_functions_1.generateFormLink)(broker.userId || 0);
                    signupFormData.link = await this.checkAndGenerateNewFormLink(link, CorporateUser.id || 0);
                    let aliasLink = "/" + ((_b = broker.name) === null || _b === void 0 ? void 0 : _b.toLowerCase().split(" ")[0]);
                    signupFormData.alias = aliasLink;
                    signupFormData.name = CONST.signupForm.name;
                    signupFormData.description = CONST.signupForm.description;
                    signupFormData.title = CONST.signupForm.title;
                    signupFormData.formType = CONST.signupForm.formType;
                    signupFormData.keywords = CONST.signupForm.keywords;
                    signupFormData.inelligibilityPeriod = CONST.signupForm.ineligibilityPeriod;
                    signupFormData.published = CONST.signupForm.published;
                    signupFormData.requireDentalHealthCoverage = true;
                    signupFormData.requireSpouseEmail = false;
                    signupFormData.warnRequiredDependantMedicalExam = false;
                    signupFormData.useCreditCardPaymentMethod = true;
                    signupFormData.usePadPaymentMethod = true;
                    signupFormData.isDemoForm = false;
                    const signupForm = await this.SignupFormsRepository.create(signupFormData);
                    data1['signupForm'] = signupForm;
                    // await mail("", groupAdmins[0].email, "", "", "", "")
                    if (value.files) {
                        console.log(value.files);
                        console.log(`Logo -${value.files.length}`);
                        if (value.files.length > 0) {
                            for (let file of value.files) {
                                if (file.fieldname == "logo") {
                                    console.log(file.originalname);
                                    console.log(`file.originalname`);
                                    let originalname = file.originalname;
                                    console.log(originalname);
                                    originalname = originalname.replace(/[\])}[{(]/g, '').replace(/ /g, '');
                                    console.log(originalname);
                                    let filename = originalname;
                                    // let modfilenameArr = filename.split(".")
                                    // let modfilename = modfilenameArr[0] + "0." + modfilenameArr[1]
                                    const fileAttr = (0, common_functions_1.getFileAttributes)(filename);
                                    let modfilename = fileAttr.name + "0" + fileAttr.ext;
                                    // const broker = await this.BrokerRepository.findById(brokerId);
                                    if (broker) {
                                        await this.BrokerRepository.updateById(broker.id, {
                                            logo: paths_1.BROKERPATH_STRING + filename,
                                            link: paths_1.BROKERPATH_STRING + modfilename
                                        });
                                    }
                                    else {
                                        console.log('no broker with given id');
                                        message = 'No broker found';
                                        status = '202';
                                    }
                                }
                                else if (file.fieldname == "voidCheck") {
                                    let filename = file.originalname;
                                    let mimetype = file.mimetype;
                                    switch (mimetype) {
                                        case 'image/png':
                                        case 'image/jpg':
                                        case 'image/jpeg':
                                        case 'image/pjpeg':
                                        case 'application/pdf':
                                            mimetype = mimetype;
                                            break;
                                        default:
                                            mimetype = "invalid";
                                    }
                                    const fileAttr = (0, common_functions_1.getFileAttributes)(filename);
                                    let modfilename = fileAttr.name + "0" + fileAttr.ext;
                                    console.log(mimetype);
                                    let filenamets = value.fields.timestamp;
                                    console.log(filenamets);
                                    //let ext = filename.split(".")[1]
                                    let ext = fileAttr.ext;
                                    let bankDetails = await this.corporateService.customerBankDetailsRegister(value.fields.session, filenamets, ext, mimetype, customer.firstName);
                                }
                            }
                        }
                        else {
                            console.log(`No logo needed`);
                        }
                    }
                    let packageFilter = {
                        order: 'ordering ASC',
                        where: {
                            published: true
                        },
                    };
                    const packages = await this.insurancePackages.find(packageFilter);
                    const packagesArray = [];
                    for (const pckg of packages) {
                        const packageObject = {};
                        packageObject["description"] = pckg.description;
                        packageObject["id"] = pckg.id;
                        packageObject["logo"] = pckg.logo;
                        packageObject["name"] = pckg.name;
                        packageObject["published"] = pckg.published;
                        packageObject["ordering"] = pckg.ordering;
                        packageObject["allowMultiple"] = pckg.allowMultiple;
                        packageObject["applyFilters"] = pckg.applyFilters;
                        packageObject["optIn"] = pckg.optIn;
                        let plansLevelFilter = {
                            order: 'ordering ASC',
                            where: {
                                "published": true,
                                "requirePlanLevel": null
                            }
                        };
                        const planLevels = await this.insurancePackages.planGroups(pckg.id).find(plansLevelFilter);
                        let groups = [];
                        let subGroups = [];
                        const parentIds = Array.from(new Set(planLevels.map(planLevels => planLevels.parentId)));
                        for (const parentId of parentIds) {
                            if (parentId != null) {
                                const parentDetailsObj = {};
                                const parentDetails = await this.PlanLevelRepository.findById(parentId);
                                const subGroups = await this.PlanLevelRepository.find({ where: { parentId: parentId } });
                                parentDetailsObj.id = parentDetails.id;
                                parentDetailsObj.name = parentDetails.name;
                                parentDetailsObj.subGroups = subGroups;
                                parentDetails['subGroups'] = subGroups;
                                console.log(parentDetails);
                                groups.push(parentDetailsObj);
                            }
                        }
                        for (const pl of planLevels) {
                            if (pl.parentId == undefined || pl.parentId == null) {
                                const parentDetailsObj = {};
                                parentDetailsObj.id = pl.id;
                                parentDetailsObj.name = pl.name;
                                parentDetailsObj.subGroups = [pl];
                                groups.push(parentDetailsObj);
                            }
                        }
                        // for (const pl of planLevels) {
                        //   groupsArray.push(pl);                 
                        // }
                        packageObject["groups"] = groups; //planLevels
                        //console.log("-->" + packageObject.groups.length)
                        if (groups.length > 0)
                            packagesArray.push(packageObject);
                    }
                    responsplans.packages = packagesArray; //packages;
                    this.response.status(200).send({
                        status: '200',
                        message: messages_1.CORPORATE_MSG.REGISTRATION_SUCCESS,
                        date: new Date(),
                        data: data1,
                        plans: responsplans
                    });
                }
                catch (error) {
                    console.log(error);
                    this.response.status(202).send({
                        status: '202',
                        error: error,
                        message: messages_1.CORPORATE_MSG.REGISTRATION_FAIL,
                        date: new Date(),
                    });
                    await this.CustomerRepository.deleteById(customerId);
                    for (let groupAdminUser of groupAdminsUsers) {
                        await this.usersRepository.deleteById(groupAdminUser);
                    }
                    await this.ContactInformationRepository.deleteById(contId);
                    await this.BrokerRepository.deleteById(brokerId);
                    return this.response;
                }
            }
        });
        p.catch(onrejected => {
            message = messages_1.CORPORATE_MSG.LOGO_NOT_SET;
            status = '202';
            this.response.status(parseInt(status)).send({
                status: status,
                message: message,
                date: new Date(),
                data: data
            });
        });
        return this.response;
    }
    async employeeSignup(corporateId, apiRequest) {
        var _a;
        // user creation, customer.role=
        let corporate = await this.BrokerRepository.findById(corporateId);
        if (corporate) {
            let employeeUserObj = new models_1.Users();
            employeeUserObj.username = apiRequest.emailId;
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
            customerObj.firstName = apiRequest.firstName;
            customerObj.lastName = apiRequest.lastName;
            customerObj.gender = apiRequest.sex;
            customerObj.companyName = corporate.name;
            customerObj.isCorporateAccount = false;
            customerObj.registrationDate = (0, moment_1.default)().format('YYYY-MM-DD');
            customerObj.userId = employeeUser.id;
            let customer = await this.CustomerRepository.create(customerObj);
            let customerContactInfoObj = new models_1.ContactInformation();
            customerContactInfoObj.city = apiRequest.residentIn;
            customerContactInfoObj.state = CONST.DEFAULT_COUNTRY.name;
            customerContactInfoObj.contactType = CONST.USER_ROLE.CUSTOMER;
            customerContactInfoObj.addressType = CONST.ADDRESS_TYPE.HOME_ADDRESS;
            customerContactInfoObj.primaryEmail = apiRequest.emailId;
            customerContactInfoObj.primaryPhone = apiRequest.phoneNum.toString();
            customerContactInfoObj.state = apiRequest.provienceName;
            let contcatInfo = await this.ContactInformationRepository.create(customerContactInfoObj);
            let customerContact = new models_1.CustomerContactInfo();
            customerContactInfoObj.customerId = customer.id;
            customerContactInfoObj.contactId = customerContact.id;
            let customerContactInfo = await this.CustomerContactInfoRepository.create(customerContactInfoObj);
            // customerId = customer.id;
            var fusebillCustomer = {};
            if (fuseBillCustomerCreation) {
                const fusebillData = {};
                fusebillData.firstName = customer.firstName;
                fusebillData.lastName = customer.lastName;
                // fusebillData.parent = broker.fusebillCustomerId;
                fusebillData.companyName = apiRequest.corporationName;
                fusebillData.primaryEmail = apiRequest.email;
                fusebillData.primaryPhone = apiRequest.phoneNum; //phone num is not mandatory
                fusebillData.reference = customer.id;
                //fusebillData.companyName=apiRequest.company_name;     
                fusebillData.currency = apiRequest.currency || 'CAD'; // || ' 
                try {
                    fusebillCustomer = await this.fusebill.createCustomer(fusebillData);
                    console.log("**************************************************");
                    // console.log(fusebillCustomer)
                    console.log("**************************************************");
                    let fuseBillAddressData = {
                        "customerAddressPreferenceId": fusebillCustomer.id,
                        "countryId": apiRequest.country_id,
                        "stateId": apiRequest.state_id,
                        //"addressType": apiRequest.address_type ?? 'Shipping',//here shipping is same as home //Billing, shipping    
                        "addressType": (_a = apiRequest.address_type) !== null && _a !== void 0 ? _a : 'Billing',
                        "enforceFullAddress": true,
                        "line1": apiRequest.street_address_line1,
                        "line2": apiRequest.street_address_line2,
                        "city": apiRequest.city,
                        "postalZip": apiRequest.postal_code,
                        "country": apiRequest.country,
                        "state": apiRequest.state
                    };
                    const fbCustomerAddress = await this.fusebill.createCustomerAddress(fuseBillAddressData);
                }
                catch (error) {
                    console.log(error.response.data.Errors);
                }
            }
            else {
                fiseBill = fiseBill + 1;
                fusebillCustomer = {
                    firstName: 'Admin',
                    middleName: null,
                    lastName: 'Ideabytes',
                    companyName: 'Ideabytes',
                    suffix: null,
                    primaryEmail: null,
                    primaryPhone: null,
                    secondaryEmail: null,
                    secondaryPhone: null,
                    title: '',
                    reference: '1844',
                    status: 'Draft',
                    customerAccountStatus: 'Good',
                    currency: 'CAD',
                    canChangeCurrency: true,
                    customerReference: {
                        reference1: null,
                        reference2: null,
                        reference3: null,
                        salesTrackingCodes: [],
                        id: 11673101,
                        uri: 'https://secure.fusebill.com/v1/customers/11673101'
                    },
                    customerAcquisition: {
                        adContent: null,
                        campaign: null,
                        keyword: null,
                        landingPage: null,
                        medium: null,
                        source: null,
                        id: 11673101,
                        uri: 'https://secure.fusebill.com/v1/customers/11673101'
                    },
                    monthlyRecurringRevenue: 0,
                    netMonthlyRecurringRevenue: 0,
                    salesforceId: null,
                    salesforceAccountType: null,
                    salesforceSynchStatus: 'Enabled',
                    netsuiteId: null,
                    netsuiteSynchStatus: 'Enabled',
                    netsuiteCustomerType: '',
                    portalUserName: null,
                    parentId: null,
                    isParent: false,
                    quickBooksLatchType: null,
                    quickBooksId: null,
                    quickBooksSyncToken: null,
                    hubSpotId: null,
                    hubSpotCompanyId: null,
                    geotabId: null,
                    digitalRiverId: null,
                    modifiedTimestamp: '2023-02-01T11:36:16.0432031Z',
                    createdTimestamp: '2023-02-01T11:36:15.9442038Z',
                    requiresProjectedInvoiceGeneration: false,
                    requiresFinancialCalendarGeneration: false,
                    id: 11673101 + fiseBill,
                    uri: 'https://secure.fusebill.com/v1/customers/11673101'
                };
            }
        }
    }
    async planSelctions(corporateId, apiRequest) {
        let status, message, data = {};
        let corporateDefaultTier;
        try {
            if (apiRequest.plansPaidByTheCompant.length <= 0) {
                this.response.status(409).send({
                    status: '409',
                    error: `Select at lease one plan`,
                    message: MESSAGE.ERRORS.planSelectionPadByTheCompany,
                    date: new Date(),
                });
                return this.response;
            }
            else if (apiRequest.enableUpgradedPlans && apiRequest.upgradedPlans.length <= 0) {
                this.response.status(409).send({
                    status: '409',
                    error: `Please send upgraded plan levels`,
                    message: MESSAGE.ERRORS.missingDetails,
                    date: new Date(),
                });
                return this.response;
            }
            else if (apiRequest.enableEmployeePurchasePlans && apiRequest.employeePurchasePlans.length <= 0) {
                this.response.status(409).send({
                    status: '409',
                    error: `Please send employee purchase plan levels`,
                    message: MESSAGE.ERRORS.missingDetails,
                    date: new Date(),
                });
                return this.response;
            }
            else {
                let corporate = await this.BrokerRepository.findById(corporateId);
                if (corporate) {
                    // && corporate.brokerType==CONST.BROKER.CORPORATE){
                    let corporateTier = new models_1.CorporateTiers();
                    corporateTier.brokerId = corporateId;
                    corporateTier.name = CONST.TIER.general;
                    corporateTier.published = 1;
                    corporateTier.tierType = CONST.TIER_TYPE.DEF;
                    corporateTier.spendingLimit = CONST.SPENDING_LIMIT;
                    corporateDefaultTier = await this.CorporateTiersRepository.create(corporateTier);
                    let corporateTiredPlanLevel = new models_1.CorporateTieredPlanLevels();
                    corporateTiredPlanLevel.tierId = corporateDefaultTier.id;
                    corporateTiredPlanLevel.spendingLimit = CONST.SPENDING_LIMIT;
                    corporateTiredPlanLevel.coveredPercentage = 0;
                    //block 1
                    for (const planPaidByTheCompant of apiRequest.plansPaidByTheCompant) {
                        corporateTiredPlanLevel.planId = planPaidByTheCompant;
                        await this.CorporateTieredPlanLevelsRepository.create(corporateTiredPlanLevel);
                    }
                    if (apiRequest.enableUpgradedPlans && apiRequest.upgradedPlans.length > 0) {
                        //block 2
                    }
                    if (apiRequest.enableEmployeePurchasePlans && apiRequest.employeePurchasePlans.length > 0) {
                        //block 3
                        let corporatePaidTieredPlanLevels = new models_1.CorporatePaidTieredPlanLevels();
                        corporatePaidTieredPlanLevels.tierId = corporateDefaultTier.id;
                        corporatePaidTieredPlanLevels.spendingLimit = CONST.SPENDING_LIMIT;
                        corporatePaidTieredPlanLevels.coveredPercentage = 0;
                        for (const employeePurchasePlan of apiRequest.employeePurchasePlans) {
                            corporatePaidTieredPlanLevels.planId = employeePurchasePlan;
                            await this.CorporateTieredPlanLevelsRepository.create(corporatePaidTieredPlanLevels);
                        }
                    }
                    status = 200;
                    message = messages_1.CORPORATE_MSG.PLANS;
                }
                else {
                    status = 201;
                    message = "No corporate details found for this corporate id " + corporateId;
                }
            }
        }
        catch (error) {
            await this.CorporateTiersRepository.deleteById(corporateDefaultTier.id);
            console.log(error);
            status = 201;
            message = MESSAGE.ERRORS.someThingwentWrong;
        }
        this.response.status(409).send({
            status,
            message,
            date: new Date(),
        });
        return this.response;
    }
    async configureWallet(corporateId, apiRequest) { }
    async corporateTiers(corporateId, apiRequest) {
        let status, message, data = {};
        try {
            let corporate = await this.BrokerRepository.findById(corporateId);
            if (corporate) {
                status = 200;
            }
            else {
                status = 201;
                message = MESSAGE.CORPORATE_MSG.NO_CORPORATE;
            }
        }
        catch (error) {
            status = 201;
            message = MESSAGE.ERRORS.someThingwentWrong;
            console.log(error);
        }
        this.response.status(status).send({
            status, message, data
        });
        return this.response;
    }
    async uploadEmployeeExcel(request, response) {
        let p = new Promise((resolve, reject) => {
            this.handler(request, response, err => {
                if (err)
                    reject(err);
                else {
                    console.log(fuseBillCustomerCreation);
                    resolve(files_controller_1.FilesController.getFilesAndFields(request, 'excel', {}));
                }
            });
        });
        p.then(async (value) => {
            let excelDatainJson = await this.excelService.excelToJson(value.files[0].filepath, "");
            console.log(excelDatainJson);
        });
    }
};
tslib_1.__decorate([
    (0, rest_1.get)(paths_1.CORPORATE.LOGO),
    tslib_1.__param(0, rest_1.param.path.string('company')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CorporateController.prototype, "brokerDetailsBasedonId", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_1.CORPORATE.SIGNUP),
    (0, rest_1.response)(200, {
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        description: "Registration details of a broker",
        content: {
            'multipart/form-data': {
                // Skip body parsing
                'x-parser': 'stream',
                schema: {
                    type: 'object',
                    properties: {
                        corporationName: {
                            type: 'string',
                            default: '',
                        },
                        brokerType: {
                            type: 'string',
                            default: 'CORPORATE'
                        },
                        firstName: { type: 'string', default: '', },
                        lastName: { type: 'string', default: '', },
                        email: { type: 'string', default: 'abc@gmail.com', },
                        phoneNum: { type: 'number', default: 9999999999, },
                        policyStartDate: { type: 'string', default: new Date().toISOString().slice(0, 10) },
                        logo: {
                            type: 'string',
                            format: 'binary'
                        },
                        voidCheck: {
                            type: 'string',
                            format: 'binary'
                        },
                        gropupAdmin: {
                            required: [''],
                            type: 'array',
                            items: {
                                properties: {
                                    firstName: { type: 'string', default: '' },
                                    lastName: { type: 'string', default: '' },
                                    phoneNum: { type: 'number', default: '0' },
                                    email: { type: 'string', description: '' }
                                }
                            }
                        },
                        waitingPeriod: {
                            type: 'number',
                            default: '0',
                        },
                        useCreditCard: {
                            type: 'boolean',
                            default: false
                        },
                        invoicePayment: {
                            type: 'boolean',
                            default: false
                        },
                        padPayment: {
                            type: 'boolean',
                            default: false
                        },
                        session: {
                            type: 'string',
                            default: 'eyJiYW5rQ29kZSI6IjAwMyIsImJyYW5jaENvZGUiOiIwMDAwMSIsImJhbmtOYW1lIjoiUm95YWwgQmFuayBvZiBDYW5hZGEiLCJhY2NvdW50TnVtYmVyIjoiMTIzNDUiLCJhbW91bnQiOm51bGwsImVucm9sbG1lbnREYXRlIjpudWxsLCJmaWxlIjp7fX0='
                        },
                        setupWallet: {
                            type: 'boolean',
                            default: false
                        },
                        setUplevelofCoverage: {
                            type: 'boolean',
                            default: false
                        },
                        exptNumofEmp: {
                            type: 'number',
                            default: '1'
                        },
                        street_address_line1: {
                            type: 'string',
                            default: '',
                        },
                        street_address_line2: {
                            type: 'string',
                            default: '',
                        },
                        city: {
                            type: 'string',
                            default: '',
                        },
                        province: {
                            type: 'string',
                            default: '',
                        },
                        province_id: {
                            type: 'number',
                            default: '0',
                        },
                        state: {
                            type: 'string',
                            default: '',
                        },
                        state_id: {
                            type: 'number',
                            default: '0',
                        },
                        country: {
                            type: 'string',
                            default: '',
                        },
                        country_id: {
                            type: 'number',
                            default: '0',
                        },
                        postal_code: {
                            type: 'string',
                            default: '',
                        },
                    }
                },
            },
        },
    })),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CorporateController.prototype, "signup", null);
tslib_1.__decorate([
    (0, rest_1.get)(paths_1.CORPORATE.FORMCONFIG),
    (0, rest_1.response)(200, {
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
], CorporateController.prototype, "corporateFormConfig", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_1.CORPORATE.BANK_DETAILS_REGISTER, {
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                        },
                    },
                },
                description: 'File',
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody.file()),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CorporateController.prototype, "customerBankDetailsRegister", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_1.CORPORATE.BANK_VERIFY),
    (0, rest_1.response)(200, {
        description: 'Mixed object of all the specific values needed for form configuration',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        bankCode: {
                            type: 'string',
                            default: '003',
                            example: '003'
                        },
                        branchCode: {
                            type: 'string',
                            default: '00001',
                            example: '00001'
                        },
                    }
                }
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CorporateController.prototype, "customerBankVerification", null);
tslib_1.__decorate([
    (0, authorization_1.authorize)({
        allowedRoles: [CONST.USER_ROLE.ADMINISTRATOR, CONST.USER_ROLE.CORPORATE_ADMINISTRATOR],
        voters: [auth_middleware_1.basicAuthorization]
    }),
    (0, rest_1.get)(paths_1.CORPORATE.PLANS),
    (0, rest_1.response)(200, {
        description: 'Mixed object of all the specific values needed for form configuration',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CorporateController.prototype, "validatePlans", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_1.CORPORATE.CUSTOMER_VALIDATION),
    (0, rest_1.response)(200, {
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        description: "Registration details of a broker",
        content: {
            'multipart/form-data': {
                // Skip body parsing
                'x-parser': 'stream',
                schema: {
                    type: 'object',
                    properties: {
                        corporationName: {
                            type: 'string',
                            default: '',
                        },
                        brokerType: {
                            type: 'string',
                            default: 'CORPORATE'
                        },
                        firstName: { type: 'string', default: '', },
                        lastName: { type: 'string', default: '', },
                        email: { type: 'string', default: 'abc@gmail.com', },
                        phoneNum: { type: 'number', default: 9999999999, },
                        policyStartDate: { type: 'string', default: new Date().toISOString().slice(0, 10) },
                        logo: {
                            type: 'string',
                            format: 'binary'
                        },
                        voidCheck: {
                            type: 'string',
                            format: 'binary'
                        },
                        gropupAdmin: {
                            required: [''],
                            type: 'array',
                            items: {
                                properties: {
                                    firstName: { type: 'string', default: '' },
                                    lastName: { type: 'string', default: '' },
                                    phoneNum: { type: 'number', default: '0' },
                                    email: { type: 'string', description: '' }
                                }
                            }
                        },
                        waitingPeriod: {
                            type: 'number',
                            default: '0',
                        },
                        useCreditCard: {
                            type: 'boolean',
                            default: false
                        },
                        invoicePayment: {
                            type: 'boolean',
                            default: false
                        },
                        padPayment: {
                            type: 'boolean',
                            default: false
                        },
                        session: {
                            type: 'string',
                            default: 'eyJiYW5rQ29kZSI6IjAwMyIsImJyYW5jaENvZGUiOiIwMDAwMSIsImJhbmtOYW1lIjoiUm95YWwgQmFuayBvZiBDYW5hZGEiLCJhY2NvdW50TnVtYmVyIjoiMTIzNDUiLCJhbW91bnQiOm51bGwsImVucm9sbG1lbnREYXRlIjpudWxsLCJmaWxlIjp7fX0='
                        },
                        setupWallet: {
                            type: 'boolean',
                            default: false
                        },
                        setUplevelofCoverage: {
                            type: 'boolean',
                            default: false
                        },
                        exptNumofEmp: {
                            type: 'number',
                            default: '1'
                        },
                        street_address_line1: {
                            type: 'string',
                            default: '',
                        },
                        street_address_line2: {
                            type: 'string',
                            default: '',
                        },
                        city: {
                            type: 'string',
                            default: '',
                        },
                        province: {
                            type: 'string',
                            default: '',
                        },
                        province_id: {
                            type: 'number',
                            default: '0',
                        },
                        state: {
                            type: 'string',
                            default: '',
                        },
                        state_id: {
                            type: 'number',
                            default: '0',
                        },
                        country: {
                            type: 'string',
                            default: '',
                        },
                        country_id: {
                            type: 'number',
                            default: '0',
                        },
                        postal_code: {
                            type: 'string',
                            default: '',
                        },
                    }
                },
            },
        },
    })),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CorporateController.prototype, "customerValidation", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_1.CORPORATE.EMPLOYEE),
    (0, rest_1.response)(200, {
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.path.number('corporateId')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(model_extended_1.Employee),
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, model_extended_1.Employee]),
    tslib_1.__metadata("design:returntype", Promise)
], CorporateController.prototype, "employeeSignup", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_1.CORPORATE.PLAN_SELECTION),
    (0, rest_1.response)(200, {
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.path.number('corporateId')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        description: 'selected plans',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        //block1
                        plansPaidByTheCompant: {
                            type: 'array',
                            default: []
                        },
                        //block 2
                        upgradedPlans: {
                            type: 'array',
                            default: []
                        },
                        //block 3
                        employeePurchasePlans: {
                            type: 'array',
                            default: []
                        },
                        //block 2 settings
                        enableUpgradedPlans: {
                            type: 'boolean',
                            default: false
                        },
                        //block 3 settings
                        enableEmployeePurchasePlans: {
                            type: 'boolean',
                            default: false
                        }
                    }
                }
            }
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CorporateController.prototype, "planSelctions", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_1.CORPORATE.CONFIGURE_WALLET),
    tslib_1.__param(0, rest_1.param.path.number('corporateId')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        description: 'corporate wallent configuration',
        content: {
            'application/json': {
                schema: {
                    properties: {
                        allowGbWallet: {},
                        allowGbWalletType: {},
                        healthSpendingAccount: {},
                        healthSpendingAmount: {}
                    }
                }
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CorporateController.prototype, "configureWallet", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_1.CORPORATE.TIER),
    tslib_1.__param(0, rest_1.param.path.number('corporateId')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        description: 'corporate tiers',
        content: {
            'application/json': {
                schema: {
                    properties: {
                        tierLevelAndCorresponding: {
                            type: 'array',
                            default: [{ "tierName": "All", "walletAmount": 0 }]
                        },
                        lengthOfServiceAndCorresponding: {
                            type: 'array',
                            default: [{ "tierName": "New Joinee", "from": 0, "to": 2, "walletAmount": 0 }]
                        },
                        annualIncome: {
                            type: 'array',
                            default: [{ "tierName": "Income one", "Percentage": 1, "AnnualIncome": 50000, "walletAmount": 500 }]
                        }
                    }
                }
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CorporateController.prototype, "corporateTiers", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_1.CORPORATE.EXCEL),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        description: 'excel file',
        content: {
            'multipart/form-data': {
                'x-parser': 'stream',
                schema: {
                    type: 'object',
                    properties: {
                        employeeData: {
                            type: 'string',
                            format: 'binary'
                        }
                    }
                }
            }
        }
    })),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CorporateController.prototype, "uploadEmployeeExcel", null);
CorporateController = tslib_1.__decorate([
    (0, rest_1.api)({ basePath: 'admin' })
    // @authenticate('jwt')
    // @authorize({
    //   allowedRoles: [CONST.USER_ROLE.ADMINISTRATOR],
    //   voters: [basicAuthorization]
    // })
    ,
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(2, (0, core_1.service)(services_1.Corporate)),
    tslib_1.__param(3, (0, repository_1.repository)(repositories_1.UsersRepository)),
    tslib_1.__param(4, (0, repository_1.repository)(broker_admins_repository_1.BrokerAdminsRepository)),
    tslib_1.__param(5, (0, repository_1.repository)(repositories_1.ContactInformationRepository)),
    tslib_1.__param(6, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__param(7, (0, core_1.inject)(keys_1.FILE_UPLOAD_SERVICE)),
    tslib_1.__param(8, (0, core_1.service)(services_1.FusebillService)),
    tslib_1.__param(9, (0, core_1.service)(services_1.RegistrationServiceService)),
    tslib_1.__param(10, (0, core_1.service)(services_1.AchService)),
    tslib_1.__param(11, (0, repository_1.repository)(repositories_1.BankCodesRepository)),
    tslib_1.__param(12, (0, repository_1.repository)(repositories_1.FinancialInstitutionsRepository)),
    tslib_1.__param(13, (0, repository_1.repository)(repositories_1.FinancialInstitutionsRoutingNumbersRepository)),
    tslib_1.__param(14, (0, repository_1.repository)(repositories_1.StatesAndProvincesRepository)),
    tslib_1.__param(15, (0, repository_1.repository)(repositories_1.InsurancePlansRepository)),
    tslib_1.__param(16, (0, repository_1.repository)(repositories_1.PlansAvailabilityRepository)),
    tslib_1.__param(17, (0, repository_1.repository)(repositories_1.InsurancePackagesRepository)),
    tslib_1.__param(18, (0, repository_1.repository)(repositories_1.SignupFormsRepository)),
    tslib_1.__param(19, (0, repository_1.repository)(repositories_1.PlanLevelRepository)),
    tslib_1.__param(20, (0, repository_1.repository)(repositories_1.CorporateTiersRepository)),
    tslib_1.__param(21, (0, repository_1.repository)(corporate_tiered_plan_levels_repository_1.CorporateTieredPlanLevelsRepository)),
    tslib_1.__param(22, (0, repository_1.repository)(repositories_1.CorporatePaidTieredPlanLevelsRepository)),
    tslib_1.__param(23, (0, repository_1.repository)(repositories_1.CustomerContactInfoRepository)),
    tslib_1.__param(24, (0, core_1.service)(services_1.ExcelService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository, Object, services_1.Corporate,
        repositories_1.UsersRepository,
        broker_admins_repository_1.BrokerAdminsRepository,
        repositories_1.ContactInformationRepository,
        repositories_1.CustomerRepository, Function, services_1.FusebillService,
        services_1.RegistrationServiceService,
        services_1.AchService,
        repositories_1.BankCodesRepository,
        repositories_1.FinancialInstitutionsRepository,
        repositories_1.FinancialInstitutionsRoutingNumbersRepository,
        repositories_1.StatesAndProvincesRepository,
        repositories_1.InsurancePlansRepository,
        repositories_1.PlansAvailabilityRepository,
        repositories_1.InsurancePackagesRepository,
        repositories_1.SignupFormsRepository,
        repositories_1.PlanLevelRepository,
        repositories_1.CorporateTiersRepository,
        corporate_tiered_plan_levels_repository_1.CorporateTieredPlanLevelsRepository,
        repositories_1.CorporatePaidTieredPlanLevelsRepository,
        repositories_1.CustomerContactInfoRepository,
        services_1.ExcelService])
], CorporateController);
exports.CorporateController = CorporateController;
//# sourceMappingURL=corporate.controller.js.map