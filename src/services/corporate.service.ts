import { injectable, /* inject, */ BindingScope, service, inject } from '@loopback/core';
import { genSalt, hash, compare } from 'bcryptjs';
import { Broker } from '../models';
import { DataSource } from 'loopback-datasource-juggler';
import { Model, repository } from '@loopback/repository';
import { dateFormat1 } from '../constants';
import moment from 'moment';
import { deleteFile, getFile } from '../storage.helper';
import { CUSTOMER_CHEQUES_FOLDER } from '../paths';
import { getFileAttributes } from '../common-functions';
import { RegistrationServiceService } from './registration-service.service';
import { AchService } from './ach.service';
import { BankCodesRepository, FinancialInstitutionsRepository, FinancialInstitutionsRoutingNumbersRepository, StatesAndProvincesRepository } from '../repositories';
import { FilesController } from '../controllers/files.controller';
import { FILE_UPLOAD_SERVICE } from '../keys';
import { FileUploadHandler } from '../types';
import { Request, requestBody, Response, RestBindings } from '@loopback/rest';

@injectable({ scope: BindingScope.TRANSIENT })
export class Corporate {
  constructor(/* Add @inject to inject parameters */
    @inject(FILE_UPLOAD_SERVICE) public handler: FileUploadHandler,
    @service(RegistrationServiceService) public registrationService: RegistrationServiceService,
    @service(AchService) public ach: AchService,
    @repository(BankCodesRepository) public banksCodesRepository: BankCodesRepository,
    @repository(FinancialInstitutionsRepository) public banksRepository: FinancialInstitutionsRepository,
    @repository(FinancialInstitutionsRoutingNumbersRepository) public branchesRepository: FinancialInstitutionsRoutingNumbersRepository,
    @repository(StatesAndProvincesRepository) public StatesAndProvincesRepository: StatesAndProvincesRepository,) { }
  async encryptPswrd(password: string) {
    let encryptedPasswrd = await hash(password, await genSalt());
    return encryptedPasswrd;
  }
  async modelPropoerties(model: any) {
    let returnPropertyName: any = [];
    const modelDefinition = (model as typeof Model & { definition: any }).definition;
    const properties = modelDefinition.properties;
    for (const propertyName in properties) {
      const property = properties[propertyName];
      // console.log(`${propertyName}: ${property.type}`);
      returnPropertyName.push(propertyName);
    }
    return returnPropertyName;
  }
 
  async customerBankDetailsRegister(session:any,filenamets:any,ext:any,mimetype:any,customerName:any): Promise<any> {
    
    let message: string, status: string, data: any = {};
    let bankDetailsDecoded;// = atob(request.body.key)
    let bank_details: any = {};// JSON.parse(bankDetailsDecoded);
        try {
          bankDetailsDecoded = atob(session)
          bank_details = JSON.parse(bankDetailsDecoded);
          console.log(bank_details)
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
        let newFilename = CUSTOMER_CHEQUES_FOLDER + '/' + filenamets + ext
        console.log(newFilename)
        const checkFileBuffer = await getFile(newFilename, '');
        console.log(checkFileBuffer)
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
          "voidCheckImage": '',//JSON.stringify(checkFileBuffer),
          "voidCheckImage2": checkFileBuffer,
          "voidCheckFileType": mimetype,
          "nextBillingDate": moment(bank_details.enrollmentDate).format(dateFormat1),
          "nextBillingPrice": parseFloat(bank_details.amount),
          "customerName": customerName,
          //   "fusebillCustomerId": customer.fusebillCustomerId,
        }
        const customerRecord = await this.ach.createCustomer(input)
        console.log(customerRecord)
        if (customerRecord && customerRecord.data) {

          deleteFile(newFilename);

          data = customerRecord.data
          message = 'Customer Record(PAD) created'
          status = '200'
        } else {
          return false;
        }
    return true;
  }
}
const btoa = function (str: string) { return Buffer.from(str).toString('base64'); }
const atob = function (b64Encoded: string) { return Buffer.from(b64Encoded, 'base64').toString() }