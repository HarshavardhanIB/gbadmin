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
const auth_midd_1 = require("../middleware/auth.midd");
const security_1 = require("@loopback/security");
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
    async customersCount(currentUserProfile) {
        let customerCount = await this.CustomerRepository.count();
        let activeCoustomers = await this.CustomerRepository.count({ status: 'active' });
        console.log(activeCoustomers);
        console.log("role>>", currentUserProfile.role);
        let response = {
            "statusCode": 200,
            "message": "Count of the customers ",
            "totalCustomersCount": customerCount.count,
            "activeCustomersCount": activeCoustomers.count,
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
        // console.log(customers);
        // for (let i = 0; i < customers.length; i++) {
        // for (let customer of customers) {
        //   let userid = customer.userId;
        //   // console.log(userid);
        //   let id = customer.id;
        //   // console.log(id);
        //   let custmrObj: any = customer;
        //   // let emailid = await this.usersRepository.findOne({
        //   //   where: { id: userid },
        //   //   fields: {
        //   //     username: true
        //   //   }
        //   // });
        //   let emailid: any = customer.user;
        //   let email: any;
        //   if (!emailid) {
        //     let contctInfoid = await this.CustomerContactInfoRepository.findOne({ where: { customerId: id } })
        //     if (contctInfoid == null) {
        //       email = ""
        //     }
        //     else {
        //       let contactId = contctInfoid?.contactId;
        //       // console.log(contctInfoid);
        //       let contactIbfo: any = await this.ContactInformationRepository.findById(contactId);
        //       if (contactIbfo.length == 0) {
        //         email = "";
        //       }
        //       else {
        //         email = contactIbfo.primaryEmail;
        //       }
        //     }
        //   }
        //   else {
        //     email = emailid.username ?? "test";
        //   }
        //   custmrObj["test1"] = "test1";
        //   custmrObj["emailId"] = email;
        //   custmrObj["test2"] = "test2";
        //   // console.log(custmrObj);
        //   custmrList.push(custmrObj);
        // }
        console.log(">>>>>>>>>>>>>>>>>>>>>>>", custmrList.length);
        if (custmrList.length > 0) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>", custmrList[0]);
            console.log(">>>>>>>>>>>>>>>>>>>>>>>", custmrList[custmrList.length - 1]);
        }
        // setTimeout(function () {
        //   let response = {
        //     "status": 200,
        //     "message": "List of primary details",
        //     "data": custmrList
        //   }
        //   return response;
        // }, 1000);
        // return response;
        const responseObject = {
            status: 200,
            message: "List of primary details",
            date: new Date(),
            data: customers
        };
        this.response.status(parseInt("200")).send(responseObject);
        return this.response;
    }
    async allCustmerDetails(id) {
        let finalResultsArray = [];
        let finalObjforCustmr;
        let customers = await this.CustomerRepository.findById(id, { include: [{ relation: "customerRelativeRelation" }, { relation: 'customerPlans' }, { relation: 'customerSignup' }] });
        console.log(">>>>>>><<<<<<<<<", customers);
        let contactInfo = [];
        let userid = customers.userId;
        let contactInfoObj = await this.CustomerContactInfoRepository.find({ where: { customerId: id } });
        for (let j = 0; j < contactInfoObj.length; j++) {
            let contcatId = contactInfoObj[j].contactId;
            let contactInfoRes = await this.ContactInformationRepository.find({ where: { id: contcatId } });
            for (let j = 0; j < contactInfoRes.length; j++) {
                contactInfo.push(contactInfoRes[j]);
            }
        }
        // let customerPlansObj = await this.CustomerPlansRepository.find({ where: { customerId: id } });
        let custmerPlanOpt = await this.CustomerPlanOptionsValuesRepository.find({ where: { customerId: id } });
        // let custmrRelatives = await this.CustomerRelativesRepository.find({ where: { customerId: id } });
        // let signupdetails: any = await this.CustomerSignupRepository.findOne({ where: { customerId: id } });
        // var tfHours = signupdetails?.working_20hours[0];
        // delete signupdetails['working_20hours'];
        // if (tfHours == 1) {
        //   signupdetails['working_20hours'] = true
        // }
        // else {
        //   signupdetails['working_20hours'] = false;
        // }
        finalObjforCustmr = { "customerDetails": customers, "contactInfo": contactInfo, "customer plan values": custmerPlanOpt };
        let response = {
            "statusCode": 200,
            "message": "Customer details",
            "data": finalObjforCustmr
        };
        return response;
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/admin/customers/count'),
    (0, rest_1.response)(200, {
        description: 'customers count',
    }),
    tslib_1.__param(0, (0, core_1.inject)(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
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
    authentication_1.authenticate.skip(),
    (0, rest_1.get)('/admin/customers/{id}/details'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], customerController.prototype, "allCustmerDetails", null);
customerController = tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: ['BROKER'],
        voters: [auth_midd_1.basicAuthorization]
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