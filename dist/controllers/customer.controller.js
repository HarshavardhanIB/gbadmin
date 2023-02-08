"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerController = void 0;
const tslib_1 = require("tslib");
// import {inject} from '@loopback/core';
const core_1 = require("@loopback/core");
const authentication_1 = require("@loopback/authentication");
const rest_1 = require("@loopback/rest");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const authorization_1 = require("@loopback/authorization");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const security_1 = require("@loopback/security");
const CONST = tslib_1.__importStar(require("../constants"));
const moment_1 = tslib_1.__importDefault(require("moment"));
let customerController = class customerController {
    constructor(usersRepository, ContactInformationRepository, CustomerContactInfoRepository, CustomerPlanOptionsValuesRepository, CustomerPlansRepository, CustomerRelativesRepository, CustomerRepository, CustomerSignupRepository, response, user) {
        this.usersRepository = usersRepository;
        this.ContactInformationRepository = ContactInformationRepository;
        this.CustomerContactInfoRepository = CustomerContactInfoRepository;
        this.CustomerPlanOptionsValuesRepository = CustomerPlanOptionsValuesRepository;
        this.CustomerPlansRepository = CustomerPlansRepository;
        this.CustomerRelativesRepository = CustomerRelativesRepository;
        this.CustomerRepository = CustomerRepository;
        this.CustomerSignupRepository = CustomerSignupRepository;
        this.response = response;
        this.user = user;
    }
    // @get('/customerInfo/{id}')
    // @response(200, {
    //   description: 'list of coustmers',
    // })
    // async custmer(
    //   @param.path.number('id') id: number
    // ): Promise<any> {
    //   let coustmers = await this.CustomerRepository.findById(id);
    //   console.log(coustmers);
    //   return coustmers;
    // }
    // async customersCount(@inject(SecurityBindings.USER)
    // currentUserProfile: UserProfile): Promise<any> {
    async customersCount() {
        let customerCount = await this.CustomerRepository.count();
        let active = await this.CustomerRepository.count({ status: 'active' });
        let draft = await this.CustomerRepository.count({ status: 'Draft' });
        let hold = await this.CustomerRepository.count({ status: 'Hold' });
        let suspended = await this.CustomerRepository.count({ status: 'Suspended' });
        let cancelled = await this.CustomerRepository.count({ status: 'Cancelled' });
        let other = await this.CustomerRepository.count({ status: '' });
        // console.log(activeCoustomers);
        // console.log("role>>", currentUserProfile.role);
        let response = {
            "statusCode": 200,
            "message": "Count of the customers ",
            data: {
                totalCustomersCount: customerCount.count,
                activeCustomersCount: active.count,
                draftCoustomers: draft.count,
                holdCoustomers: hold.count,
                suspendedCoustomers: suspended.count,
                cancelledCoustomers: cancelled.count,
                otherCoustomers: other.count
            }
        };
        return response;
    }
    // @authenticate.skip()
    async customerslist() {
        const customers = await this.CustomerRepository.find({
            where: {},
            fields: {
                id: true,
                firstName: true,
                lastName: true,
                registrationDate: true,
                user_id: true,
            },
            include: [{
                    relation: 'user',
                    scope: {
                        where: {},
                        fields: {
                            username: true,
                            role: true
                        }
                    }
                }]
        });
        console.log(customers[customers.length - 1]);
        const custmrList = [];
        console.log(">>>>>>>>>>>>>>>>>>>>>>>", custmrList.length);
        if (custmrList.length > 0) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>", custmrList[0]);
            console.log(">>>>>>>>>>>>>>>>>>>>>>>", custmrList[custmrList.length - 1]);
        }
        const responseObject = {
            status: 200,
            message: "List of primary details",
            date: new Date(),
            data: customers
        };
        this.response.status(parseInt("200")).send(responseObject);
        return this.response;
    }
    // @authenticate.skip()
    async allCustmerDetails(id) {
        let finalResultsArray = [];
        let finalObjforCustmr;
        let customers = await this.CustomerRepository.findById(id, { include: [{ relation: "customerRelatives" }, { relation: 'customerPlans' }, { relation: 'customerSignup' }, { relation: 'contactInformations' }, { relation: 'customerPlanOptionsValues' }] });
        console.log(">>>>>>><<<<<<<<<", customers);
        let contactInfo = [];
        let userid = customers.userId;
        if (!customers) {
            let response = {
                "statusCode": 201,
                "message": "no details found",
            };
            return response;
        }
        let response = {
            "statusCode": 200,
            "message": "Customer details",
            "data": customers
        };
        return response;
    }
    async search(apiRequest) {
        let status, message, data;
        try {
            let filter = { where: { and: [] }, fields: { registrationDate: true, firstName: true, lastName: true, dob: true, status: true, gender: true }, limit: apiRequest.count };
            let searchArray = apiRequest.searchArray;
            if (apiRequest.status == "" || apiRequest.status == "ALL") {
            }
            else {
                filter.where["status"] = apiRequest.status;
            }
            for (const seatObj of searchArray) {
                let searchterm = seatObj.searchterm;
                let searchvalue = seatObj.searchvalue;
                if (searchterm == "registrationdate") {
                    let from = searchvalue.from != "" ? searchvalue.from : '2001-01-01';
                    let to = searchvalue.to != "" ? searchvalue.to : (0, moment_1.default)().format('YYYY-MM-DD');
                    filter.where.and.push({ "registrationDate": { "between": [from, to] } });
                    // filter.where.and.push({ and: [{ registrationDate: { gte: from } }, { registrationDate: { lt: to } }] })
                    console.log(from, "***", to);
                }
                else {
                    if (searchterm != "") {
                        let obj = {};
                        console.log(apiRequest.strictOrpartial);
                        if (apiRequest.strictOrpartial) {
                            obj[searchterm] = { like: `${searchvalue}` };
                            filter.where.and.push(obj);
                        }
                        else {
                            obj[searchterm] = searchvalue;
                            filter.where.and.push(obj);
                        }
                    }
                }
            }
            // let andO = filter.where.and;
            // for (const a of andO) {
            //   console.log(a);
            //   if (a.and) {
            //     let aaa = a.and;
            //     for (const aa of aaa) {
            //       console.log(aa)
            //     }
            //   }
            // }
            let customers = await this.CustomerRepository.find(filter);
            if (customers.length > 0) {
                status = 200;
                message = "Customer details";
                data = customers;
            }
            else {
                status = 201;
                message = "No details found";
            }
        }
        catch (error) {
            status = 400;
            message = "Error " + error.message;
        }
        this.response.status(status).send({
            status, message, data
        });
        return this.response;
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/admin/customers/count'),
    (0, rest_1.response)(200, {
        description: 'customers count',
    })
    // async customersCount(@inject(SecurityBindings.USER)
    // currentUserProfile: UserProfile): Promise<any> {
    ,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], customerController.prototype, "customersCount", null);
tslib_1.__decorate([
    (0, rest_1.get)('/admin/customers/list'),
    (0, rest_1.response)(200, {
        description: 'List of customers list',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], customerController.prototype, "customerslist", null);
tslib_1.__decorate([
    (0, rest_1.get)('/admin/customers/{id}/details'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], customerController.prototype, "allCustmerDetails", null);
tslib_1.__decorate([
    (0, rest_1.post)('/admin/search', {
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
        }
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        description: 'search filter for the customers',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        searchArray: {
                            type: 'array',
                            default: `[{"searchterm":"", "searchvalue":""},{"searchterm":"registrationdate","searchvalue":{from:"", to:""}}]`
                        },
                        status: {
                            type: 'string',
                            default: 'ALL',
                        },
                        count: {
                            type: 'number',
                            default: 0
                        },
                        strictOrpartial: {
                            //when
                            type: 'boolean',
                            default: false
                        }
                    }
                }
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], customerController.prototype, "search", null);
customerController = tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [CONST.USER_ROLE.BROKER, CONST.USER_ROLE.ADMINISTRATOR],
        voters: [auth_middleware_1.basicAuthorization]
    }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UsersRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.ContactInformationRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.CustomerContactInfoRepository)),
    tslib_1.__param(3, (0, repository_1.repository)(repositories_1.CustomerPlanOptionsValuesRepository)),
    tslib_1.__param(4, (0, repository_1.repository)(repositories_1.CustomerPlansRepository)),
    tslib_1.__param(5, (0, repository_1.repository)(repositories_1.CustomerRelativesRepository)),
    tslib_1.__param(6, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__param(7, (0, repository_1.repository)(repositories_1.CustomerSignupRepository)),
    tslib_1.__param(8, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(9, (0, core_1.inject)(security_1.SecurityBindings.USER, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UsersRepository,
        repositories_1.ContactInformationRepository,
        repositories_1.CustomerContactInfoRepository,
        repositories_1.CustomerPlanOptionsValuesRepository,
        repositories_1.CustomerPlansRepository,
        repositories_1.CustomerRelativesRepository,
        repositories_1.CustomerRepository,
        repositories_1.CustomerSignupRepository, Object, Object])
], customerController);
exports.customerController = customerController;
//# sourceMappingURL=customer.controller.js.map