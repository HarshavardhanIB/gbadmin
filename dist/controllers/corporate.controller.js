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
let fuseBillCustomerCreation = false;
let CorporateController = class CorporateController {
    constructor(BrokerRepository, response, corporateService, usersRepository, BrokerAdminsRepository, ContactInformationRepository, CustomerRepository, handler, fusebill) {
        this.BrokerRepository = BrokerRepository;
        this.response = response;
        this.corporateService = corporateService;
        this.usersRepository = usersRepository;
        this.BrokerAdminsRepository = BrokerAdminsRepository;
        this.ContactInformationRepository = ContactInformationRepository;
        this.CustomerRepository = CustomerRepository;
        this.handler = handler;
        this.fusebill = fusebill;
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
            var _a;
            if (!value.fields) {
                this.response.status(422).send({
                    status: '422',
                    error: `Missing input fields`,
                    message: MESSAGE.ERRORS.missingDetails,
                    date: new Date(),
                });
            }
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
                    data.push({ "contactOInfo": contactInfo });
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
                    console.log(brokerObj);
                    let broker = await this.BrokerRepository.create(brokerObj);
                    brokerId = broker.id;
                    data.push({ "broker": broker });
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
                    data.push({ "groupAdmins": groupAdminsArray });
                    let brokerAdmin = new models_1.BrokerAdmins();
                    brokerAdmin.brokerId = broker.id;
                    let customerObj = new models_1.Customer();
                    customerObj.brokerId = broker.id;
                    customerObj.firstName = apiRequest.firstName;
                    customerObj.lastName = apiRequest.lastName;
                    customerObj.gender = CONST.GENDER.UNDISCLOSED;
                    customerObj.companyName = apiRequest.corporationName;
                    customerObj.isCorporateAccount = true;
                    customerObj.registrationDate = (0, moment_1.default)().format('YYYY-MM-DD');
                    customerObj.userId = groupAdminsUsers[0];
                    let customer = await this.CustomerRepository.create(customerObj);
                    customerId = customer.id;
                    var fusebillCustomer = {};
                    if (fuseBillCustomerCreation) {
                        const fusebillData = {};
                        fusebillData.firstName = customer.firstName;
                        fusebillData.lastName = customer.lastName;
                        fusebillData.companyName = apiRequest.corporationName;
                        fusebillData.primaryEmail = apiRequest.email;
                        fusebillData.primaryPhone = apiRequest.phoneNum;
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
                            id: 11673101,
                            uri: 'https://secure.fusebill.com/v1/customers/11673101'
                        };
                    }
                    await this.CustomerRepository.updateById(customerId, { fusebillCustomerId: fusebillCustomer.id });
                    //activationg fuse bill customer id
                    // bank details and void check service 
                    data.push(customer);
                    for (const user of groupAdmins) {
                        console.log(user);
                        brokerAdmin.userId = user;
                        console.log(brokerAdmin);
                        await this.BrokerAdminsRepository.create(brokerAdmin);
                    }
                    // await mail("", groupAdmins[0].email, "", "", "", "")
                    if (value.files) {
                        console.log(value.files);
                        console.log(`Logo -${value.files.length}`);
                        if (value.files.length > 0) {
                            console.log(value.files[0].originalname);
                            console.log(`file.originalname`);
                            let originalname = value.files[0].originalname;
                            console.log(originalname);
                            originalname = originalname.replace(/[\])}[{(]/g, '').replace(/ /g, '');
                            console.log(originalname);
                            let filename = originalname;
                            let modfilenameArr = filename.split(".");
                            let modfilename = modfilenameArr[0] + "0." + modfilenameArr[1];
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
                        else {
                            console.log(`No logo needed`);
                        }
                    }
                    this.response.status(200).send({
                        status: '200',
                        message: messages_1.CORPORATE_MSG.REGISTRATION_SUCCESS,
                        date: new Date(),
                        data: data
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
                    for (let groupAdminUser of groupAdminsUsers) {
                        await this.usersRepository.deleteById(groupAdminUser);
                    }
                    await this.ContactInformationRepository.deleteById(contId);
                    await this.CustomerRepository.deleteById(customerId);
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
                        paymentMethod: {
                            type: 'string',
                            default: 'credit',
                            enum: CONST.PAYMENT_METHOD_LIST,
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
                        bankDetails: {
                            required: [''],
                            type: 'object',
                            items: {
                                properties: {
                                    bankCode: { type: 'number', default: '0' },
                                    transit: { type: 'number', default: '0' },
                                    accountNum: { type: 'number', default: '0' }
                                }
                            }
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
CorporateController = tslib_1.__decorate([
    (0, rest_1.api)({ basePath: 'admin' }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(2, (0, core_1.service)(services_1.Corporate)),
    tslib_1.__param(3, (0, repository_1.repository)(repositories_1.UsersRepository)),
    tslib_1.__param(4, (0, repository_1.repository)(broker_admins_repository_1.BrokerAdminsRepository)),
    tslib_1.__param(5, (0, repository_1.repository)(repositories_1.ContactInformationRepository)),
    tslib_1.__param(6, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__param(7, (0, core_1.inject)(keys_1.FILE_UPLOAD_SERVICE)),
    tslib_1.__param(8, (0, core_1.service)(services_1.FusebillService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository, Object, services_1.Corporate,
        repositories_1.UsersRepository,
        broker_admins_repository_1.BrokerAdminsRepository,
        repositories_1.ContactInformationRepository,
        repositories_1.CustomerRepository, Function, services_1.FusebillService])
], CorporateController);
exports.CorporateController = CorporateController;
//# sourceMappingURL=corporate.controller.js.map