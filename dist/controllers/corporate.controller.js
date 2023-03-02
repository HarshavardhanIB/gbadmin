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
const model_extended_1 = require("../model_extended");
const corporate_tiered_plan_levels_repository_1 = require("../repositories/corporate-tiered-plan-levels.repository");
let fuseBillCustomerCreation = true;
let fiseBill = 11;
const log4js = tslib_1.__importStar(require("log4js"));
const logger = log4js.getLogger("corporate");
let timestamp = (0, moment_1.default)().format('YYYY-MM-DD mm-hh-ss');
let CorporateController = class CorporateController {
    constructor(http, brokerRepository, response, corporateService, usersRepository, BrokerAdminsRepository, contactInformationRepository, customerRepository, handler, fusebill, registrationService, ach, banksCodesRepository, banksRepository, branchesRepository, statesAndProvincesRepository, insurancePlansRepository, plansAvailabilityRepository, insurancePackages, signupFormsRepository, planLevelRepository, corporateTiersRepository, corporateTieredPlanLevelsRepository, corporatePaidTieredPlanLevelsRepository, customerContactInfoRepository, excelService, excel2Service, signupFormsPlanLevelMappingRepository) {
        this.http = http;
        this.brokerRepository = brokerRepository;
        this.response = response;
        this.corporateService = corporateService;
        this.usersRepository = usersRepository;
        this.BrokerAdminsRepository = BrokerAdminsRepository;
        this.contactInformationRepository = contactInformationRepository;
        this.customerRepository = customerRepository;
        this.handler = handler;
        this.fusebill = fusebill;
        this.registrationService = registrationService;
        this.ach = ach;
        this.banksCodesRepository = banksCodesRepository;
        this.banksRepository = banksRepository;
        this.branchesRepository = branchesRepository;
        this.statesAndProvincesRepository = statesAndProvincesRepository;
        this.insurancePlansRepository = insurancePlansRepository;
        this.plansAvailabilityRepository = plansAvailabilityRepository;
        this.insurancePackages = insurancePackages;
        this.signupFormsRepository = signupFormsRepository;
        this.planLevelRepository = planLevelRepository;
        this.corporateTiersRepository = corporateTiersRepository;
        this.corporateTieredPlanLevelsRepository = corporateTieredPlanLevelsRepository;
        this.corporatePaidTieredPlanLevelsRepository = corporatePaidTieredPlanLevelsRepository;
        this.customerContactInfoRepository = customerContactInfoRepository;
        this.excelService = excelService;
        this.excel2Service = excel2Service;
        this.signupFormsPlanLevelMappingRepository = signupFormsPlanLevelMappingRepository;
    }
    async brokerDetailsBasedonId(company) {
        let message, status, statusCode, data = {};
        try {
            let broker = await this.brokerRepository.findOne({ where: { name: company }, fields: { logo: true } });
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
        let brokerAdminsIds = [];
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
            var _a, _b, _c;
            if (!value.fields) {
                this.response.status(422).send({
                    status: '422',
                    error: `Missing input fields`,
                    message: MESSAGE.ERRORS.missingDetails,
                    date: new Date(),
                });
            }
            // if (!this.registrationService.validateName(value.fields.firstName)) {
            //   this.response.status(422).send({
            //     status: '422',
            //     error: `Invalid Firstname`,
            //     message: MESSAGE.ERRORS.firstName,
            //     date: new Date(),
            //   });
            //   return this.response;
            // }
            // if (!this.registrationService.validateName(value.fields.lastName)) {
            //   this.response.status(422).send({
            //     status: '422',
            //     error: `Invalid Lastname`,
            //     message: MESSAGE.ERRORS.lastName,
            //     date: new Date(),
            //   });
            //   return this.response;
            // }      //email     
            // if (!this.registrationService.validateEmail(value.fields.email)) {
            //   this.response.status(422).send({
            //     status: '422',
            //     error: `Invalid Email`,
            //     message: MESSAGE.ERRORS.email,
            //     date: new Date(),
            //   });
            //   return this.response;
            // }      //phone      //dob      
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
                    let groupAdmins = JSON.parse(apiRequest.gropupAdmin);
                    if (groupAdmins.length > 0) {
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
                        console.log(apiRequest);
                        // creating contact info
                        let contactDetailsObj = new models_1.ContactInformation();
                        contactDetailsObj.apt = apiRequest.apt;
                        contactDetailsObj.city = apiRequest.city;
                        contactDetailsObj.state = apiRequest.state;
                        contactDetailsObj.country = apiRequest.country;
                        contactDetailsObj.line1 = apiRequest.streetAddressLine1;
                        contactDetailsObj.line2 = apiRequest.streetAddressLine2;
                        contactDetailsObj.postalCode = apiRequest.postalCode;
                        contactDetailsObj.contactType = 'COMPANY';
                        contactDetailsObj.addressType = 'OFFICE_ADDRESS';
                        contactDetailsObj.primaryEmail = groupAdmins[0].email;
                        contactDetailsObj.primaryPhone = groupAdmins[0].phoneNum;
                        let contactInfo = await this.contactInformationRepository.create(contactDetailsObj);
                        contId = contactInfo.id;
                        // let corporateUserObj: Users = new Users();
                        // corporateUserObj.username = apiRequest.email;
                        // let randomPswrd = await generateRandomPassword();
                        // corporateUserObj.password = await encryptPassword(randomPswrd);
                        // corporateUserObj.block = true;
                        // corporateUserObj.activation = await getActivationCode();
                        // corporateUserObj.registrationDate = moment().format('YYYY-MM-DD');
                        // let CorporateUser = await this.usersRepository.create(corporateUserObj);
                        // groupAdminsUsers.push(CorporateUser.id);
                        data1['contactId'] = contactInfo.id;
                        // data.push({ "contactOInfo": contactInfo });
                        let brokerObj = new models_1.Broker();
                        brokerObj.name = apiRequest.corporationName;
                        brokerObj.brokerType = 'CORPORATE';
                        brokerObj.salesTrackingCode = apiRequest.salesTrackingCode || "0000001";
                        brokerObj.salesTrackingType = apiRequest.salesTrackingType || '';
                        brokerObj.published = true;
                        brokerObj.contactId = contactInfo.id;
                        brokerObj.userId = groupAdminsUsers[0];
                        brokerObj.settingsAllowGroupBenefitsWallet = apiRequest.setupWallet ? 1 : 0;
                        brokerObj.settingsEnableTieredHealthBenefits = apiRequest.setupTiers ? 1 : 0;
                        brokerObj.waitTime = apiRequest.waitingPeriod;
                        brokerObj.useCreditCardPaymentMethod = apiRequest.useCreditCard;
                        brokerObj.useInvoicePaymentMethod = apiRequest.invoicePayment;
                        brokerObj.usePadPaymentMethod = apiRequest.padPayment;
                        brokerObj.policyStartDate = apiRequest.policyStartDate;
                        console.log(brokerObj);
                        let broker = await this.brokerRepository.create(brokerObj);
                        brokerId = broker.id;
                        data1['corporateId'] = broker.id;
                        // data.push({ "broker": broker });
                        console.log(apiRequest.gropupAdmin);
                        // data1['groupAdminstrators'] = groupAdminsArray
                        // data.push({ "groupAdmins": groupAdminsArray });
                        let brokerAdmin = new models_1.BrokerAdmins();
                        brokerAdmin.brokerId = broker.id;
                        let customerObj = new models_1.Customer();
                        customerObj.brokerId = broker.id;
                        //firstname and last should be created in backend level
                        customerObj.firstName = (_a = apiRequest.firstName) !== null && _a !== void 0 ? _a : "CORPORATE " + brokerId;
                        customerObj.lastName = (_b = apiRequest.lastName) !== null && _b !== void 0 ? _b : 'CORPORATE';
                        customerObj.gender = CONST.GENDER.UNDISCLOSED;
                        customerObj.companyName = apiRequest.corporationName;
                        customerObj.isCorporateAccount = true;
                        customerObj.registrationDate = (0, moment_1.default)().format('YYYY-MM-DD');
                        customerObj.userId = groupAdminsUsers[0];
                        let customer = await this.customerRepository.create(customerObj);
                        customerId = customer.id;
                        data1['customerId'] = customerId;
                        var fusebillCustomer = {};
                        if (JSON.parse(apiRequest.fuseBillCustomerCreation)) {
                            console.log("if block >>>>>>>>>>>>>>>>>>>>>>");
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
                                    "countryId": apiRequest.countryId,
                                    "stateId": apiRequest.stateId,
                                    //"addressType": apiRequest.addressType ?? 'Shipping',//here shipping is same as home //Billing, shipping    
                                    "addressType": (_c = apiRequest.addressType) !== null && _c !== void 0 ? _c : 'Billing',
                                    "enforceFullAddress": true,
                                    "line1": apiRequest.streetAddressLine1,
                                    "line2": apiRequest.streetAddressLine2,
                                    "city": apiRequest.city,
                                    "postalZip": apiRequest.postalCode,
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
                            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> else block ");
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
                        await this.customerRepository.updateById(customerId, { fusebillCustomerId: fusebillCustomer.id });
                        //activationg fuse bill customer id
                        // bank details and void check service 
                        // data.push(customer);
                        // data1['customer'] = customer;
                        for (const user of groupAdminsUsers) {
                            console.log(user);
                            brokerAdmin.userId = user;
                            console.log(brokerAdmin);
                            let brokerAdmins = await this.BrokerAdminsRepository.create(brokerAdmin);
                            brokerAdminsIds.push(brokerAdmins.id);
                        }
                        // let signupFormData: SignupForms = new SignupForms();
                        // signupFormData.brokerId = brokerId;
                        // let link = await generateFormLink(broker.userId || 0)
                        // signupFormData.link = await this.checkAndGenerateNewFormLink(link, groupAdminsUsers[0] || 0)
                        // let aliasLink = "/" + broker.name?.toLowerCase().split(" ")[0]
                        // signupFormData.alias = aliasLink
                        // signupFormData.name = CONST.signupForm.name;
                        // signupFormData.description = CONST.signupForm.description
                        // signupFormData.title = CONST.signupForm.title
                        // signupFormData.formType = CONST.signupForm.formType
                        // signupFormData.keywords = CONST.signupForm.keywords
                        // signupFormData.inelligibilityPeriod = CONST.signupForm.ineligibilityPeriod
                        // signupFormData.published = CONST.signupForm.published
                        // signupFormData.requireDentalHealthCoverage = true
                        // signupFormData.requireSpouseEmail = false
                        // signupFormData.warnRequiredDependantMedicalExam = false
                        // signupFormData.useCreditCardPaymentMethod = true
                        // signupFormData.usePadPaymentMethod = true
                        // signupFormData.isDemoForm = false
                        // const signupForm = await this.signupFormsRepository.create(signupFormData);
                        // data1['signupForm'] = signupForm;
                        data1['fuseBillId'] = fusebillCustomer.id;
                        // await mail("", groupAdmins[0].email, "", "", "", "")
                        if (value.files) {
                            console.log(value.files);
                            console.log(`Logo -${value.files.length}`);
                            // if (value.files) {
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
                                    const brokerLogo = await this.brokerRepository.findById(brokerId);
                                    if (brokerLogo) {
                                        console.log("logo update ");
                                        await this.brokerRepository.updateById(brokerId, {
                                            logo: paths_1.BROKERPATH_STRING + filename,
                                            link: paths_1.BROKERPATH_STRING + modfilename
                                        });
                                        let url = process.env.MAINAPI + `/api/customer/broker/${brokerId}/logo`;
                                        let pathImg = paths_1.BROKERIMG_RESOURCES_FOLDER + "/" + filename;
                                        const fetchStatus = await this.http.fetchMultipartFormdata(url, pathImg);
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
                                    let originalname = file.originalname;
                                    console.log(originalname);
                                    originalname = originalname.replace(/[\])}[{(]/g, '').replace(/ /g, '');
                                    console.log(originalname);
                                    const fileAttr = (0, common_functions_1.getFileAttributes)(filename);
                                    console.log(mimetype);
                                    let filenamets = originalname;
                                    console.log(filenamets);
                                    //let ext = filename.split(".")[1]
                                    let ext = fileAttr.ext;
                                    let bankDetails = await this.corporateService.customerBankDetailsRegister(value.fields.session, filenamets, ext, mimetype, customer.id, fusebillCustomer.id);
                                }
                            }
                            // } else {
                            //   console.log(`No logo needed`)
                            // }
                        }
                        this.response.status(200).send({
                            status: '200',
                            message: messages_1.CORPORATE_MSG.REGISTRATION_SUCCESS,
                            date: new Date(),
                            data: data1
                        });
                    }
                    else {
                        this.response.status(200).send({
                            status: '201',
                            message: messages_1.CORPORATE_MSG.GROUP_ADMIN_DETAILS,
                            date: new Date(),
                            data: data1
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                    this.response.status(202).send({
                        status: '202',
                        error: error,
                        message: messages_1.CORPORATE_MSG.REGISTRATION_FAIL,
                        date: new Date(),
                    });
                    await this.customerRepository.deleteById(customerId);
                    for (let groupAdminUser of groupAdminsUsers) {
                        await this.usersRepository.deleteById(groupAdminUser);
                    }
                    for (let brokerAdminsId of brokerAdminsIds) {
                        await this.BrokerAdminsRepository.deleteById(brokerAdminsId);
                    }
                    await this.contactInformationRepository.deleteById(contId);
                    await this.brokerRepository.deleteById(brokerId);
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
        logger.fatal('this is form config');
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
            data['states'] = await this.statesAndProvincesRepository.find(countryFilter);
            data['defaultCountry'] = CONST.DEFAULT_COUNTRY;
            data['paymentMethod'] = CONST.PAYMENT_METHOD_LIST_ARRAY;
            let brokerProp = await this.corporateService.modelPropoerties(models_1.Broker);
            data['corporateSettings'] = CONST.CORPORATE_SETTINGS;
            data['sex'] = CONST.GENDER_LIST;
            data['maritalStatus'] = CONST.MARITAL_STATUS_LIST;
            let tierConfig = {
                'default': [{ 'tierName': 'All', 'walletAmount': 0 }, { 'tierName': 'Management', 'walletAmount': 1000 }, { 'tierName': 'Employee', 'walletAmount': 1000 }],
                'lengthOfService': [{ 'tierName': 'New Joinee', 'from': 0, 'to': 2, 'walletAmount': 0 }, { 'tierName': 'Middle road', 'from': 2, 'to': 3, 'walletAmount': 1500 }, { 'tierName': 'Seniors', 'from': 3, 'to': '', 'walletAmount': 2000 }],
                'annualIncome': [{ 'tierName': 'Income one', 'percentage': 1, 'annualIncome': 50000, 'walletAmount': 500 }, { 'tierName': 'Income Two', 'Percentage': 2, 'AnnualIncome': 75000, 'walletAmount': 2500 }, { 'tierName': 'Income Three', 'Percentage': 2.5, 'AnnualIncome': 100000, 'walletAmount': 3500 }]
            };
            data['tierConfig'] = tierConfig;
            let walletConfig = {
                "walletType": 'Health and Wellness Spending Accounts',
                "walletTypeKeys": CONST.walletType,
                "walletAllotment": 'Health and Wellness Spending Accounts',
                'walletAllotmentKeys': CONST.walletAllotment,
                'payForService': 'How does the company want to pay for the service?',
                'payForServiceKeys': CONST.rolloverUnusedWalletFunds
            };
            data['walletConfig'] = walletConfig,
                data['enrollmentDates'] = await this.corporateService.getEnrollmentPlanDates();
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
                    "nextBillingDate": (0, services_1.moments)(bank_details.enrollmentDate).format(constants_1.dateFormat1),
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
    // @authorize({
    //   allowedRoles: [CONST.USER_ROLE.ADMINISTRATOR, CONST.USER_ROLE.CORPORATE_ADMINISTRATOR],
    //   voters: [basicAuthorization]
    // })
    async validatePlans() {
        let message, status, data = {}, final = {};
        try {
            let packageFilter = {
                order: 'ordering ASC',
                where: {
                    published: { "type": "Buffer", "data": [1] }
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
                        "published": { "type": "Buffer", "data": [1] },
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
                        const parentDetails = await this.planLevelRepository.findById(parentId);
                        const subGroups = await this.planLevelRepository.find({ where: { parentId: parentId } });
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
        let linkExists = await this.signupFormsRepository.findOne({ where: { link: formLink } });
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
        let brokerAdminsIds = [];
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
            var _a, _b, _c;
            if (!value.fields) {
                this.response.status(422).send({
                    status: '422',
                    error: `Missing input fields`,
                    message: MESSAGE.ERRORS.missingDetails,
                    date: new Date(),
                });
            }
            // if (!this.registrationService.validateName(value.fields.firstName)) {
            //   this.response.status(422).send({
            //     status: '422',
            //     error: `Invalid Firstname`,
            //     message: MESSAGE.ERRORS.firstName,
            //     date: new Date(),
            //   });
            //   return this.response;
            // }
            // if (!this.registrationService.validateName(value.fields.lastName)) {
            //   this.response.status(422).send({
            //     status: '422',
            //     error: `Invalid Lastname`,
            //     message: MESSAGE.ERRORS.lastName,
            //     date: new Date(),
            //   });
            //   return this.response;
            // }      //email     
            // if (!this.registrationService.validateEmail(value.fields.email)) {
            //   this.response.status(422).send({
            //     status: '422',
            //     error: `Invalid Email`,
            //     message: MESSAGE.ERRORS.email,
            //     date: new Date(),
            //   });
            //   return this.response;
            // }      //phone      //dob      
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
                    let groupAdmins = JSON.parse(apiRequest.gropupAdmin);
                    // creating contact info
                    if (groupAdmins.length > 0) {
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
                        console.log(apiRequest);
                        // creating contact info
                        let contactDetailsObj = new models_1.ContactInformation();
                        contactDetailsObj.apt = apiRequest.apt;
                        contactDetailsObj.city = apiRequest.city;
                        contactDetailsObj.state = apiRequest.state;
                        contactDetailsObj.country = apiRequest.country;
                        contactDetailsObj.line1 = apiRequest.streetAddressLine1;
                        contactDetailsObj.line2 = apiRequest.streetAddressLine2;
                        contactDetailsObj.postalCode = apiRequest.postalCode;
                        contactDetailsObj.contactType = 'COMPANY';
                        contactDetailsObj.addressType = 'OFFICE_ADDRESS';
                        contactDetailsObj.primaryEmail = groupAdmins[0].email;
                        contactDetailsObj.primaryPhone = groupAdmins[0].phoneNum;
                        let contactInfo = await this.contactInformationRepository.create(contactDetailsObj);
                        contId = contactInfo.id;
                        // let corporateUserObj: Users = new Users();
                        // corporateUserObj.username = apiRequest.email;
                        // let randomPswrd = await generateRandomPassword();
                        // corporateUserObj.password = await encryptPassword(randomPswrd);
                        // corporateUserObj.block = true;
                        // corporateUserObj.activation = await getActivationCode();
                        // corporateUserObj.registrationDate = moment().format('YYYY-MM-DD');
                        // let CorporateUser = await this.usersRepository.create(corporateUserObj);
                        // groupAdminsUsers.push(CorporateUser.id);
                        data1['contactId'] = contactInfo.id;
                        // data.push({ "contactOInfo": contactInfo });
                        let brokerObj = new models_1.Broker();
                        brokerObj.name = apiRequest.corporationName;
                        brokerObj.brokerType = 'CORPORATE';
                        brokerObj.salesTrackingCode = apiRequest.salesTrackingCode || "0000001";
                        brokerObj.salesTrackingType = apiRequest.salesTrackingType || '';
                        brokerObj.published = true;
                        brokerObj.contactId = contactInfo.id;
                        brokerObj.userId = groupAdminsUsers[0];
                        brokerObj.settingsAllowGroupBenefitsWallet = apiRequest.setupWallet ? 1 : 0;
                        brokerObj.settingsEnableTieredHealthBenefits = apiRequest.setUplevelofCoverage ? 1 : 0;
                        brokerObj.waitTime = apiRequest.waitingPeriod;
                        brokerObj.useCreditCardPaymentMethod = apiRequest.useCreditCard;
                        brokerObj.useInvoicePaymentMethod = apiRequest.invoicePayment;
                        brokerObj.usePadPaymentMethod = apiRequest.padPayment;
                        brokerObj.policyStartDate = apiRequest.policyStartDate;
                        console.log(brokerObj);
                        let broker = await this.brokerRepository.create(brokerObj);
                        brokerId = broker.id;
                        data1['corporateId'] = broker.id;
                        // data.push({ "broker": broker });
                        console.log(apiRequest.gropupAdmin);
                        // data1['groupAdminstrators'] = groupAdminsArray
                        // data.push({ "groupAdmins": groupAdminsArray });
                        let brokerAdmin = new models_1.BrokerAdmins();
                        brokerAdmin.brokerId = broker.id;
                        let customerObj = new models_1.Customer();
                        customerObj.brokerId = broker.id;
                        //firstname and last should be created in backend level
                        customerObj.firstName = (_a = apiRequest.firstName) !== null && _a !== void 0 ? _a : "CORPORATE " + brokerId;
                        customerObj.lastName = (_b = apiRequest.lastName) !== null && _b !== void 0 ? _b : 'CORPORATE';
                        customerObj.gender = CONST.GENDER.UNDISCLOSED;
                        customerObj.companyName = apiRequest.corporationName;
                        customerObj.isCorporateAccount = true;
                        customerObj.registrationDate = (0, moment_1.default)().format('YYYY-MM-DD');
                        customerObj.userId = groupAdminsUsers[0];
                        let customer = await this.customerRepository.create(customerObj);
                        customerId = customer.id;
                        let customerContactInfo = new models_1.CustomerContactInfo();
                        customerContactInfo.contactId = contId;
                        customerContactInfo.customerId = customerId;
                        await this.customerContactInfoRepository.create(customerContactInfo);
                        data1['customerId'] = customerId;
                        var fusebillCustomer = {};
                        if (JSON.parse(apiRequest.fuseBillCustomerCreation)) {
                            console.log("if block >>>>>>>>>>>>>>>>>>>>>>");
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
                                    "countryId": apiRequest.countryId,
                                    "stateId": apiRequest.stateId,
                                    //"addressType": apiRequest.addressType ?? 'Shipping',//here shipping is same as home //Billing, shipping    
                                    "addressType": (_c = apiRequest.addressType) !== null && _c !== void 0 ? _c : 'Billing',
                                    "enforceFullAddress": true,
                                    "line1": apiRequest.streetAddressLine1,
                                    "line2": apiRequest.streetAddressLine2,
                                    "city": apiRequest.city,
                                    "postalZip": apiRequest.postalCode,
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
                            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> else block ");
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
                        await this.customerRepository.updateById(customerId, { fusebillCustomerId: fusebillCustomer.id });
                        await this.brokerRepository.updateById(brokerId, { fusebillCorporateCustomerId: fusebillCustomer.id });
                        //activationg fuse bill customer id
                        // bank details and void check service 
                        // data.push(customer);
                        // data1['customer'] = customer;
                        for (const user of groupAdminsUsers) {
                            console.log(user);
                            brokerAdmin.userId = user;
                            console.log(brokerAdmin);
                            let brokerAdmins = await this.BrokerAdminsRepository.create(brokerAdmin);
                            brokerAdminsIds.push(brokerAdmins.id);
                        }
                        // let signupFormData: SignupForms = new SignupForms();
                        // signupFormData.brokerId = brokerId;
                        // let link = await generateFormLink(broker.userId || 0)
                        // signupFormData.link = await this.checkAndGenerateNewFormLink(link, groupAdminsUsers[0] || 0)
                        // let aliasLink = "/" + broker.name?.toLowerCase().split(" ")[0]
                        // signupFormData.alias = aliasLink
                        // signupFormData.name = CONST.signupForm.name;
                        // signupFormData.description = CONST.signupForm.description
                        // signupFormData.title = CONST.signupForm.title
                        // signupFormData.formType = CONST.signupForm.formType
                        // signupFormData.keywords = CONST.signupForm.keywords
                        // signupFormData.inelligibilityPeriod = CONST.signupForm.ineligibilityPeriod
                        // signupFormData.published = CONST.signupForm.published
                        // signupFormData.requireDentalHealthCoverage = true
                        // signupFormData.requireSpouseEmail = false
                        // signupFormData.warnRequiredDependantMedicalExam = false
                        // signupFormData.useCreditCardPaymentMethod = true
                        // signupFormData.usePadPaymentMethod = true
                        // signupFormData.isDemoForm = false
                        // const signupForm = await this.signupFormsRepository.create(signupFormData);
                        // data1['signupForm'] = signupForm;
                        data1['fuseBillId'] = fusebillCustomer.id;
                        // await mail("", groupAdmins[0].email, "", "", "", "")
                        if (value.files) {
                            console.log(value.files);
                            console.log(`Logo -${value.files.length}`);
                            // if (value.files) {
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
                                    const brokerLogo = await this.brokerRepository.findById(brokerId);
                                    if (brokerLogo) {
                                        console.log("logo update ");
                                        await this.brokerRepository.updateById(brokerId, {
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
                                    let originalname = file.originalname;
                                    console.log(originalname);
                                    originalname = originalname.replace(/[\])}[{(]/g, '').replace(/ /g, '');
                                    console.log(originalname);
                                    const fileAttr = (0, common_functions_1.getFileAttributes)(filename);
                                    console.log(mimetype);
                                    let filenamets = originalname;
                                    console.log(filenamets);
                                    //let ext = filename.split(".")[1]
                                    let ext = fileAttr.ext;
                                    let bankDetails = await this.corporateService.customerBankDetailsRegister(value.fields.session, filenamets, ext, mimetype, customer.id, fusebillCustomer.id);
                                }
                            }
                            // } else {
                            //   console.log(`No logo needed`)
                            // }
                        }
                        let packageFilter = {
                            order: 'ordering ASC',
                            where: {
                                published: { "type": "Buffer", "data": [1] }
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
                                    "published": { "type": "Buffer", "data": [1] },
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
                                    const parentDetails = await this.planLevelRepository.findById(parentId);
                                    const subGroups = await this.planLevelRepository.find({ where: { parentId: parentId } });
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
                    else {
                        this.response.status(200).send({
                            status: '201',
                            message: messages_1.CORPORATE_MSG.GROUP_ADMIN_DETAILS,
                            date: new Date(),
                            data: data1
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                    this.response.status(202).send({
                        status: '202',
                        error: error,
                        message: messages_1.CORPORATE_MSG.REGISTRATION_FAIL,
                        date: new Date(),
                    });
                    await this.customerRepository.deleteById(customerId);
                    for (let groupAdminUser of groupAdminsUsers) {
                        await this.usersRepository.deleteById(groupAdminUser);
                    }
                    await this.contactInformationRepository.deleteById(contId);
                    await this.brokerRepository.deleteById(brokerId);
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
        var _a, _b, _c, _d;
        let status, message, data = {};
        try {
            // user creation, customer.role=
            let corporate = await this.brokerRepository.findById(corporateId, { include: [{ relation: 'customers' }] });
            console.log(corporate);
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
                customerObj.parentId = corporate.customers[0].id;
                customerObj.firstName = apiRequest.firstName;
                customerObj.lastName = apiRequest.lastName;
                customerObj.gender = apiRequest.sex;
                customerObj.companyName = corporate.name;
                customerObj.isCorporateAccount = true;
                customerObj.registrationDate = (0, moment_1.default)().format('YYYY-MM-DD');
                customerObj.userId = employeeUser.id;
                customerObj.employeeId = apiRequest.employeeId;
                let actualTier = await this.corporateService.getActualTiers(corporateId, apiRequest.walletLimit, apiRequest.dateOfHire);
                actualTier != 0 ? customerObj.actualTier : actualTier = 0;
                let customer = await this.customerRepository.create(customerObj);
                let customerContactInfoObj = new models_1.ContactInformation();
                customerContactInfoObj.apt = (_a = apiRequest.apt) !== null && _a !== void 0 ? _a : '';
                customerContactInfoObj.line1 = (_b = apiRequest.line1) !== null && _b !== void 0 ? _b : '';
                customerContactInfoObj.line2 = (_c = apiRequest.line2) !== null && _c !== void 0 ? _c : '';
                customerContactInfoObj.city = apiRequest.residentIn;
                customerContactInfoObj.primaryEmail = apiRequest.emailId;
                customerContactInfoObj.country = CONST.DEFAULT_COUNTRY.name;
                customerContactInfoObj.contactType = CONST.USER_ROLE.CUSTOMER;
                customerContactInfoObj.addressType = CONST.ADDRESS_TYPE.HOME_ADDRESS;
                customerContactInfoObj.primaryPhone = apiRequest.phoneNum.toString();
                customerContactInfoObj.state = apiRequest.provienceName;
                console.log(customerContactInfoObj);
                let contcatInfo = await this.contactInformationRepository.create(customerContactInfoObj);
                let customerContact = new models_1.CustomerContactInfo();
                customerContact.customerId = customer.id;
                customerContact.contactId = customerContact.id;
                let customerContactInfo = await this.customerContactInfoRepository.create(customerContact);
                // customerId = customer.id;
                var fusebillCustomer = {};
                if (apiRequest.fuseBillCustomerCreation) {
                    const fusebillData = {};
                    fusebillData.firstName = customer.firstName;
                    fusebillData.lastName = customer.lastName;
                    // fusebillData.parent = broker.fusebillCustomerId;
                    fusebillData.companyName = corporate.name;
                    fusebillData.primaryEmail = apiRequest.emailId;
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
                            "countryId": apiRequest.countryId || '1',
                            "stateId": apiRequest.provienceId,
                            //"addressType": apiRequest.addressType ?? 'Shipping',//here shipping is same as home //Billing, shipping    
                            "addressType": (_d = apiRequest.addressType) !== null && _d !== void 0 ? _d : 'Billing',
                            "enforceFullAddress": true,
                            // "line1": apiRequest.streetAddressLine1,
                            // "line2": apiRequest.streetAddressLine2,
                            "city": apiRequest.residentIn,
                            // "postalZip": apiRequest.postalCode,
                            "country": apiRequest.country || 'Canada',
                            "state": apiRequest.provienceName
                        };
                        const fbCustomerAddress = await this.fusebill.createCustomerAddress(fuseBillAddressData);
                    }
                    catch (error) {
                        console.log(error.response.data.Errors);
                    }
                }
                else {
                    fiseBill = fiseBill + 123;
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
                await this.customerRepository.updateById(customer.id, { fusebillCustomerId: fusebillCustomer.id });
                data['customerId'] = customer.id;
                data['fusebillCustomerId'] = fusebillCustomer.id;
                status = 200;
                message = MESSAGE.CORPORATE_MSG.EMP_REGISTRATION_SUCCESS;
            }
            else {
                status = 201;
                message = MESSAGE.CORPORATE_MSG.NO_CORPORATE;
            }
        }
        catch (error) {
            console.log(error);
            status = 204;
            message = error.message;
        }
        this.response.status(status).send({
            status, message, data, dete: new Date()
        });
        return this.response;
    }
    async planSelctions(corporateId, apiRequest) {
        var _a;
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
                let corporate = await this.brokerRepository.findById(corporateId);
                if (corporate) {
                    if (!apiRequest.configuration.tier) {
                        let corporateTier = new models_1.CorporateTiers();
                        corporateTier.brokerId = corporateId;
                        corporateTier.name = CONST.TIER.general;
                        corporateTier.published = 1;
                        corporateTier.tierType = CONST.TIER_TYPE.DEF;
                        corporateTier.spendingLimit = CONST.SPENDING_LIMIT;
                        corporateDefaultTier = await this.corporateTiersRepository.create(corporateTier);
                    }
                    let signupFormData = new models_1.SignupForms();
                    signupFormData.brokerId = corporateId;
                    let link = await (0, common_functions_1.generateFormLink)(corporate.userId || 0);
                    signupFormData.link = await this.checkAndGenerateNewFormLink(link, corporate.userId);
                    let aliasLink = "/" + ((_a = corporate.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().split(" ")[0]);
                    signupFormData.alias = aliasLink;
                    signupFormData.name = CONST.SIGNUP_FORM.CUSTOM;
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
                    const signupForm = await this.signupFormsRepository.create(signupFormData);
                    data['signupForm'] = signupForm;
                    let signupforPlanLveleMappingObj = new models_1.SignupFormsPlanLevelMapping();
                    signupforPlanLveleMappingObj.formId = signupForm.id;
                    let corporateTiredPlanLevel = new models_1.CorporateTieredPlanLevels();
                    corporateTiredPlanLevel.spendingLimit = CONST.SPENDING_LIMIT;
                    corporateTiredPlanLevel.coveredPercentage = 0;
                    //block 1
                    for (const planPaidByTheCompant of apiRequest.plansPaidByTheCompant) {
                        corporateTiredPlanLevel.tierId = apiRequest.configuration.tier ? planPaidByTheCompant.tierId : corporateDefaultTier.id;
                        corporateTiredPlanLevel.paidByCompany = 1;
                        corporateTiredPlanLevel.coveredByCompany = 0;
                        corporateTiredPlanLevel.paidByEmployee = 0;
                        corporateTiredPlanLevel.planLevelId = planPaidByTheCompant.planLevelId;
                        await this.corporateTieredPlanLevelsRepository.create(corporateTiredPlanLevel);
                        signupforPlanLveleMappingObj.planLevelId = planPaidByTheCompant.planLevelId;
                        await this.signupFormsPlanLevelMappingRepository.create(signupforPlanLveleMappingObj);
                    }
                    if (apiRequest.enableUpgradedPlans && apiRequest.upgradedPlans.length > 0) {
                        //block 2
                        for (const enableUpgradedPlan of apiRequest.enableUpgradedPlans) {
                            corporateTiredPlanLevel.tierId = apiRequest.configuration.tier ? enableUpgradedPlan.tierId : corporateDefaultTier.id;
                            corporateTiredPlanLevel.paidByCompany = 0;
                            corporateTiredPlanLevel.coveredByCompany = 1;
                            corporateTiredPlanLevel.paidByEmployee = 0;
                            corporateTiredPlanLevel.planLevelId = enableUpgradedPlan.planLevelId;
                            await this.corporateTieredPlanLevelsRepository.create(corporateTiredPlanLevel);
                            signupforPlanLveleMappingObj.planLevelId = enableUpgradedPlan.planLevelId;
                            await this.signupFormsPlanLevelMappingRepository.create(signupforPlanLveleMappingObj);
                        }
                    }
                    if (apiRequest.enableEmployeePurchasePlans && apiRequest.employeePurchasePlans.length > 0) {
                        //block 3
                        for (const employeePurchasePlan of apiRequest.employeePurchasePlans) {
                            corporateTiredPlanLevel.tierId = apiRequest.configuration.tier ? employeePurchasePlan.tierId : corporateDefaultTier.id;
                            corporateTiredPlanLevel.paidByCompany = 0;
                            corporateTiredPlanLevel.coveredByCompany = 0;
                            corporateTiredPlanLevel.paidByEmployee = 1;
                            corporateTiredPlanLevel.planLevelId = employeePurchasePlan.planLevelId;
                            await this.corporateTieredPlanLevelsRepository.create(corporateTiredPlanLevel);
                            signupforPlanLveleMappingObj.planLevelId = employeePurchasePlan.planLevelId;
                            await this.signupFormsPlanLevelMappingRepository.create(signupforPlanLveleMappingObj);
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
            await this.corporateTiersRepository.deleteById(corporateDefaultTier.id);
            console.log(error);
            status = 201;
            message = MESSAGE.ERRORS.someThingwentWrong;
        }
        this.response.status(409).send({
            status,
            message,
            data,
            date: new Date(),
        });
        return this.response;
    }
    async configureWallet(corporateId, apiRequest) {
        let status, message, data = {};
        try {
            let corporate = await this.brokerRepository.findById(corporateId);
            if (corporate) {
                let settingHealthSpendingAccount = "";
                apiRequest.walletType == "BOTH" ? settingHealthSpendingAccount = apiRequest.walletType : apiRequest.walletType == CONST.walletType[0] ? settingHealthSpendingAccount == "HEALTH" : apiRequest.walletType == CONST.walletType[1] ? settingHealthSpendingAccount == "WELLNESS" : settingHealthSpendingAccount == "BOTH";
                await this.brokerRepository.updateById(corporateId, {
                    settingsHealthSpendingAccount: settingHealthSpendingAccount,
                    settingsGroupBenefitzWalletType: apiRequest.walletType,
                    settingsHealthSpendingAllotment: apiRequest.walletAllotment,
                    settingsRolloverEmployeeLimitNextYear: apiRequest.roolOverLimitToTheNextYear,
                    settingsRolloverUnusedWalletFunds: apiRequest.payForService
                });
                await this.corporateTiersRepository.updateAll({ spendingLimit: apiRequest.spendingLimit }, { brokerId: corporateId });
                status = 200;
                message = MESSAGE.CORPORATE_MSG.WALLET_CONFIG_SUCCESS;
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
    async corporateTiers(corporateId, apiRequest) {
        let status, message, data = {};
        try {
            let corporate = await this.brokerRepository.findById(corporateId);
            if (corporate) {
                let corporateTierObj = new models_1.CorporateTiers();
                corporateTierObj.brokerId = corporate.id;
                corporateTierObj.published = 1;
                if (apiRequest.default.length > 0) {
                    for (const defaultTier of apiRequest.default) {
                        console.log(defaultTier);
                        corporateTierObj.name = defaultTier.tierName;
                        corporateTierObj.tierType = CONST.TIER_TYPE.DEF;
                        corporateTierObj.spendingLimit = defaultTier.walletAmount;
                        console.log(corporateTierObj);
                        let corporateTier = await this.corporateTiersRepository.create(corporateTierObj);
                    }
                }
                if (apiRequest.lengthOfService.length > 0) {
                    for (const lengthOfServiceTier of apiRequest.lengthOfService) {
                        corporateTierObj.name = lengthOfServiceTier.tierName;
                        corporateTierObj.tierType = CONST.TIER_TYPE.LOS;
                        corporateTierObj.fromLength = lengthOfServiceTier.from;
                        corporateTierObj.toLength = lengthOfServiceTier.to;
                        corporateTierObj.spendingLimit = lengthOfServiceTier.walletAmount;
                        let corporateTier = await this.corporateTiersRepository.create(corporateTierObj);
                    }
                }
                if (apiRequest.annualIncome.length > 0) {
                    for (const annualIncomeTier of apiRequest.annualIncome) {
                        corporateTierObj.name = annualIncomeTier.tierName;
                        corporateTierObj.tierType = CONST.TIER_TYPE.AI;
                        corporateTierObj.incomePercentage = annualIncomeTier.percentage;
                        corporateTierObj.annualIncome = annualIncomeTier.annualIncome;
                        corporateTierObj.spendingLimit = annualIncomeTier.walletAmount;
                        let corporateTier = await this.corporateTiersRepository.create(corporateTierObj);
                    }
                }
                status = 200;
                message = MESSAGE.CORPORATE_MSG.TIER_CONFIG_SUCCESS;
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
            let excelDatainJson = await this.excel2Service.excelToJson(value.files[0].filepath);
            // let addingEmployee=await this.corporateService.
            //  console.log(excelDatainJson);
        });
    }
    async tierList(corporateId) {
        let status, message, data = {};
        let corporate = await this.brokerRepository.findById(corporateId);
        if (corporate) {
            status = 200;
            message = MESSAGE.CORPORATE_MSG.TIER_LIST;
            let corporateTiers = await this.corporateTiersRepository.find({ where: { brokerId: corporateId } });
            console.log(corporateTiers);
            data = corporateTiers;
        }
        else {
            status = 201;
            message = MESSAGE.CORPORATE_MSG.NO_CORPORATE;
        }
        this.response.status(status).send({
            status, message, data, date: new Date()
        });
        return this.response;
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
                        // firstName: { type: 'string', default: '', },
                        // lastName: { type: 'string', default: '', },
                        // email: { type: 'string', default: 'abc@gmail.com', },
                        // phoneNum: { type: 'number', default: 9999999999, },
                        policyStartDate: { type: 'string', default: new Date().toISOString().slice(0, 10) },
                        logo: {
                            type: 'string',
                            format: 'binary'
                        },
                        fuseBillCustomerCreation: {
                            type: 'boolean',
                            default: false
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
                        setupTiers: {
                            type: 'boolean',
                            default: false
                        },
                        exptNumofEmp: {
                            type: 'number',
                            default: '1'
                        },
                        streetAddressLine1: {
                            type: 'string',
                            default: '',
                        },
                        streetAddressLine2: {
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
                        provinceId: {
                            type: 'number',
                            default: '0',
                        },
                        state: {
                            type: 'string',
                            default: '',
                        },
                        stateId: {
                            type: 'number',
                            default: '0',
                        },
                        country: {
                            type: 'string',
                            default: '',
                        },
                        countryId: {
                            type: 'number',
                            default: '0',
                        },
                        postalCode: {
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
                        // firstName: { type: 'string', default: '', },
                        // lastName: { type: 'string', default: '', },
                        // email: { type: 'string', default: 'abc@gmail.com', },
                        // phoneNum: { type: 'number', default: 9999999999, },
                        policyStartDate: { type: 'string', default: new Date().toISOString().slice(0, 10) },
                        logo: {
                            type: 'string',
                            format: 'binary'
                        },
                        fuseBillCustomerCreation: {
                            type: 'boolean',
                            default: false
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
                        setupTier: {
                            type: 'boolean',
                            default: false
                        },
                        exptNumofEmp: {
                            type: 'number',
                            default: '1'
                        },
                        streetAddressLine1: {
                            type: 'string',
                            default: '',
                        },
                        streetAddressLine2: {
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
                        provinceId: {
                            type: 'number',
                            default: '0',
                        },
                        state: {
                            type: 'string',
                            default: '',
                        },
                        stateId: {
                            type: 'number',
                            default: '0',
                        },
                        country: {
                            type: 'string',
                            default: '',
                        },
                        countryId: {
                            type: 'number',
                            default: '0',
                        },
                        postalCode: {
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
                        configuration: {
                            type: 'object',
                            properties: {
                                tier: {
                                    type: 'boolean'
                                },
                                wallet: {
                                    type: 'boolean'
                                }
                            }
                        },
                        //block1
                        plansPaidByTheCompant: {
                            type: 'array',
                            required: ['planLevelId'],
                            items: {
                                properties: {
                                    planLevelId: {
                                        type: 'number'
                                    },
                                    tierId: {
                                        type: 'number',
                                        default: 0
                                    }
                                }
                            },
                        },
                        //block 2
                        upgradedPlans: {
                            type: 'array',
                            required: ['planLevelId'],
                            items: {
                                properties: {
                                    planLevelId: {
                                        type: 'number',
                                    },
                                    tierId: {
                                        type: 'number',
                                    }
                                }
                            },
                        },
                        //block 3
                        employeePurchasePlans: {
                            type: 'array',
                            required: ['planLevelId'],
                            items: {
                                properties: {
                                    planLevelId: {
                                        type: 'number'
                                    },
                                    tierId: {
                                        type: 'number',
                                    }
                                }
                            },
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
                        walletType: {
                            //settings_group_benefitz_wallet_type
                            type: 'string',
                            default: 'BOTH',
                            enum: CONST.walletType
                        },
                        walletAllotment: {
                            //settings_health_spending_allotment
                            type: 'string',
                            default: 'FULL_YEAR',
                            enum: CONST.walletAllotment
                        },
                        roolOverLimitToTheNextYear: {
                            //settings_rollover_employee_limit_next_year
                            type: 'boolean',
                        },
                        payForService: {
                            //settings_rollover_unused_wallet_funds
                            type: 'string',
                            enum: CONST.rolloverUnusedWalletFunds
                        },
                        spendingLimit: {
                            type: 'number',
                            default: 1000
                        }
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
                        default: {
                            type: 'array',
                            required: ['tierName', 'walletAmount'],
                            items: {
                                properties: {
                                    tierName: { type: 'string' }, walletAmount: { type: 'number', default: 1000 }
                                }
                            },
                            // default: [{ "tierName": "All", "walletAmount": 0 }]
                        },
                        lengthOfService: {
                            type: 'array',
                            items: {
                                properties: {
                                    tierName: { type: 'string' }, from: { type: 'number' }, to: { type: 'number' }, walletAmount: { type: 'number', default: 1000 }
                                }
                            },
                        },
                        annualIncome: {
                            type: 'array',
                            items: {
                                properties: {
                                    tierName: { type: 'string' }, percentage: { type: 'number' }, annualIncome: { type: 'number' }, walletAmount: { type: 'number', default: 1000 }
                                }
                            },
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
    (0, rest_1.response)(200, {
        description: 'upload the excel file and insert employyes in the database',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
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
tslib_1.__decorate([
    (0, rest_1.get)(paths_1.CORPORATE.TIER),
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
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CorporateController.prototype, "tierList", null);
CorporateController = tslib_1.__decorate([
    (0, rest_1.api)({ basePath: 'admin' })
    // @authenticate('jwt')
    // @authorize({
    //   allowedRoles: [CONST.USER_ROLE.ADMINISTRATOR],
    //   voters: [basicAuthorization]
    // })
    ,
    tslib_1.__param(0, (0, core_1.service)(services_1.HttpService)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__param(2, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(3, (0, core_1.service)(services_1.Corporate)),
    tslib_1.__param(4, (0, repository_1.repository)(repositories_1.UsersRepository)),
    tslib_1.__param(5, (0, repository_1.repository)(broker_admins_repository_1.BrokerAdminsRepository)),
    tslib_1.__param(6, (0, repository_1.repository)(repositories_1.ContactInformationRepository)),
    tslib_1.__param(7, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__param(8, (0, core_1.inject)(keys_1.FILE_UPLOAD_SERVICE)),
    tslib_1.__param(9, (0, core_1.service)(services_1.FusebillService)),
    tslib_1.__param(10, (0, core_1.service)(services_1.RegistrationServiceService)),
    tslib_1.__param(11, (0, core_1.service)(services_1.AchService)),
    tslib_1.__param(12, (0, repository_1.repository)(repositories_1.BankCodesRepository)),
    tslib_1.__param(13, (0, repository_1.repository)(repositories_1.FinancialInstitutionsRepository)),
    tslib_1.__param(14, (0, repository_1.repository)(repositories_1.FinancialInstitutionsRoutingNumbersRepository)),
    tslib_1.__param(15, (0, repository_1.repository)(repositories_1.StatesAndProvincesRepository)),
    tslib_1.__param(16, (0, repository_1.repository)(repositories_1.InsurancePlansRepository)),
    tslib_1.__param(17, (0, repository_1.repository)(repositories_1.PlansAvailabilityRepository)),
    tslib_1.__param(18, (0, repository_1.repository)(repositories_1.InsurancePackagesRepository)),
    tslib_1.__param(19, (0, repository_1.repository)(repositories_1.SignupFormsRepository)),
    tslib_1.__param(20, (0, repository_1.repository)(repositories_1.PlanLevelRepository)),
    tslib_1.__param(21, (0, repository_1.repository)(repositories_1.CorporateTiersRepository)),
    tslib_1.__param(22, (0, repository_1.repository)(corporate_tiered_plan_levels_repository_1.CorporateTieredPlanLevelsRepository)),
    tslib_1.__param(23, (0, repository_1.repository)(repositories_1.CorporatePaidTieredPlanLevelsRepository)),
    tslib_1.__param(24, (0, repository_1.repository)(repositories_1.CustomerContactInfoRepository)),
    tslib_1.__param(25, (0, core_1.service)(services_1.ExcelService)),
    tslib_1.__param(26, (0, core_1.service)(services_1.Excel2Service)),
    tslib_1.__param(27, (0, repository_1.repository)(repositories_1.SignupFormsPlanLevelMappingRepository)),
    tslib_1.__metadata("design:paramtypes", [services_1.HttpService,
        repositories_1.BrokerRepository, Object, services_1.Corporate,
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
        services_1.ExcelService,
        services_1.Excel2Service,
        repositories_1.SignupFormsPlanLevelMappingRepository])
], CorporateController);
exports.CorporateController = CorporateController;
//# sourceMappingURL=corporate.controller.js.map