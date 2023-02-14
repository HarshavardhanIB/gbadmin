"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Corporate = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const bcryptjs_1 = require("bcryptjs");
const repository_1 = require("@loopback/repository");
const constants_1 = require("../constants");
const moment_1 = tslib_1.__importDefault(require("moment"));
const storage_helper_1 = require("../storage.helper");
const paths_1 = require("../paths");
const registration_service_service_1 = require("./registration-service.service");
const ach_service_1 = require("./ach.service");
const repositories_1 = require("../repositories");
const keys_1 = require("../keys");
let Corporate = class Corporate {
    constructor(/* Add @inject to inject parameters */ handler, registrationService, ach, banksCodesRepository, banksRepository, branchesRepository, StatesAndProvincesRepository) {
        this.handler = handler;
        this.registrationService = registrationService;
        this.ach = ach;
        this.banksCodesRepository = banksCodesRepository;
        this.banksRepository = banksRepository;
        this.branchesRepository = branchesRepository;
        this.StatesAndProvincesRepository = StatesAndProvincesRepository;
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
    async customerBankDetailsRegister(session, filenamets, ext, mimetype, customerName) {
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
        let newFilename = paths_1.CUSTOMER_CHEQUES_FOLDER + '/' + filenamets + ext;
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
            //   "fusebillCustomerId": customer.fusebillCustomerId,
        };
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
};
Corporate = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, core_1.inject)(keys_1.FILE_UPLOAD_SERVICE)),
    tslib_1.__param(1, (0, core_1.service)(registration_service_service_1.RegistrationServiceService)),
    tslib_1.__param(2, (0, core_1.service)(ach_service_1.AchService)),
    tslib_1.__param(3, (0, repository_1.repository)(repositories_1.BankCodesRepository)),
    tslib_1.__param(4, (0, repository_1.repository)(repositories_1.FinancialInstitutionsRepository)),
    tslib_1.__param(5, (0, repository_1.repository)(repositories_1.FinancialInstitutionsRoutingNumbersRepository)),
    tslib_1.__param(6, (0, repository_1.repository)(repositories_1.StatesAndProvincesRepository)),
    tslib_1.__metadata("design:paramtypes", [Function, registration_service_service_1.RegistrationServiceService,
        ach_service_1.AchService,
        repositories_1.BankCodesRepository,
        repositories_1.FinancialInstitutionsRepository,
        repositories_1.FinancialInstitutionsRoutingNumbersRepository,
        repositories_1.StatesAndProvincesRepository])
], Corporate);
exports.Corporate = Corporate;
const btoa = function (str) { return Buffer.from(str).toString('base64'); };
const atob = function (b64Encoded) { return Buffer.from(b64Encoded, 'base64').toString(); };
//# sourceMappingURL=corporate.service.js.map