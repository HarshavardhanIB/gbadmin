"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateController = void 0;
const tslib_1 = require("tslib");
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
const PATHS = tslib_1.__importStar(require("../paths"));
let CorporateController = class CorporateController {
    constructor(BrokerRepository, response, corporateService, usersRepository, ContactInformationRepository, handler) {
        this.BrokerRepository = BrokerRepository;
        this.response = response;
        this.corporateService = corporateService;
        this.usersRepository = usersRepository;
        this.ContactInformationRepository = ContactInformationRepository;
        this.handler = handler;
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
    async signup(request, response) {
        let message, status, statusCode, data = {};
        let p = new Promise((resolve, reject) => {
            this.handler(request, response, err => {
                if (err)
                    reject(err);
                else {
                    resolve(files_controller_1.FilesController.getFilesAndFields(request, 'corporateUpload', {}));
                }
            });
        });
        p.then(async (value) => {
            let brokerId;
            let userId;
            let contId;
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
                    let contactDetailsObj = new models_1.ContactInformation();
                    contactDetailsObj.apt = apiRequest.apt;
                    contactDetailsObj.city = apiRequest.city;
                    contactDetailsObj.state = apiRequest.state;
                    contactDetailsObj.country = apiRequest.country;
                    contactDetailsObj.line1 = apiRequest.street_address_line1;
                    contactDetailsObj.line2 = apiRequest.street_address_line2;
                    contactDetailsObj.postalCode = apiRequest.postal_code;
                    contactDetailsObj.contactType = 'CORPORATE';
                    contactDetailsObj.addressType = 'OFFICE_ADDRESS';
                    contactDetailsObj.primaryEmail = "";
                    contactDetailsObj.primaryPhone = apiRequest.phone_number;
                    let contactInfo = await this.ContactInformationRepository.create(contactDetailsObj);
                    let groupAdmins = apiRequest.gropupAdmin;
                    for (const groupAdmin of groupAdmins) {
                        let userObj = new models_1.Users();
                        userObj.username = groupAdmin.email;
                    }
                    let brokerObj = new models_1.Broker();
                    brokerObj.name = apiRequest.corporationName;
                    brokerObj.brokerType = apiRequest.brokerType;
                    brokerObj.logo = PATHS.BROKERPATH_STRING + requestFiles[0].originalname.split(".").trim().replaceAll(" ", "");
                    brokerObj.link = PATHS.BROKERPATH_STRING + requestFiles[0].originalname.split(".").trim().replaceAll(" ", "");
                    brokerObj.published = true;
                    brokerObj.contactId = contactInfo.id;
                    brokerObj.userId = 0;
                }
                catch (error) {
                    this.response.status(202).send({
                        status: '202',
                        error: error,
                        message: 'Corporate registration failed',
                        date: new Date(),
                    });
                    return this.response;
                }
            }
        });
        p.catch(onrejected => {
            message = 'Broker logo is not set';
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
tslib_1.__decorate([
    (0, rest_1.post)('/corporate/signup'),
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
                        policyStartDate: {
                            type: 'string',
                            default: new Date().toISOString().slice(0, 10)
                        },
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
                        bankDetails: {
                            required: [''],
                            type: 'array',
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
                        apt: {
                            type: 'string',
                            default: '',
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
                        phone_number: {
                            type: 'string',
                            default: '',
                        },
                        secondary_phone: {
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
CorporateController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(2, (0, core_1.service)(services_1.Corporate)),
    tslib_1.__param(3, (0, repository_1.repository)(repositories_1.UsersRepository)),
    tslib_1.__param(4, (0, repository_1.repository)(repositories_1.ContactInformationRepository)),
    tslib_1.__param(5, (0, core_1.inject)(keys_1.FILE_UPLOAD_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository, Object, services_1.Corporate,
        repositories_1.UsersRepository,
        repositories_1.ContactInformationRepository, Function])
], CorporateController);
exports.CorporateController = CorporateController;
//# sourceMappingURL=corporate.controller.js.map