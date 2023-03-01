import { injectable, /* inject, */ BindingScope, service, inject } from '@loopback/core';
import { genSalt, hash, compare } from 'bcryptjs';
import { Broker, ContactInformation, Customer, CustomerContactInfo, Users } from '../models';
import { DataSource } from 'loopback-datasource-juggler';
import { Model, repository } from '@loopback/repository';
import { dateFormat1 } from '../constants';
import moment from 'moment';
import { deleteFile, getFile } from '../storage.helper';
import { CUSTOMER_CHEQUES_FOLDER } from '../paths';
import { encryptPassword, generateRandomPassword, getActivationCode, getFileAttributes } from '../common-functions';
import { RegistrationServiceService } from './registration-service.service';
import { AchService } from './ach.service';
import { BankCodesRepository, BrokerRepository, ContactInformationRepository, CorporatePaidTieredPlanLevelsRepository, CorporateTiersRepository, CustomerContactInfoRepository, CustomerRepository, FinancialInstitutionsRepository, FinancialInstitutionsRoutingNumbersRepository, InsurancePackagesRepository, InsurancePlansRepository, PlanLevelRepository, PlansAvailabilityRepository, SignupFormsRepository, StatesAndProvincesRepository, UsersRepository } from '../repositories';
import { FilesController } from '../controllers/files.controller';
import { FILE_UPLOAD_SERVICE } from '../keys';
import { FileUploadHandler } from '../types';
import { Request, requestBody, Response, RestBindings } from '@loopback/rest';
import { BrokerAdminsRepository } from '../repositories/broker-admins.repository';
import { CorporateTieredPlanLevelsRepository } from '../repositories/corporate-tiered-plan-levels.repository';
import * as CONST from '../constants'
import { FusebillService } from './fusebill.service';
let fuseBillCustomerCreation = true;
let fiseBill = 0;
@injectable({ scope: BindingScope.TRANSIENT })
export class Corporate {
  constructor(/* Add @inject to inject parameters */
    @service(FusebillService) public fusebill: FusebillService,
    @inject(FILE_UPLOAD_SERVICE) public handler: FileUploadHandler,
    @service(RegistrationServiceService) public registrationService: RegistrationServiceService,
    @service(AchService) public ach: AchService,
    @repository(BankCodesRepository) public banksCodesRepository: BankCodesRepository,
    @repository(FinancialInstitutionsRepository) public banksRepository: FinancialInstitutionsRepository,
    @repository(FinancialInstitutionsRoutingNumbersRepository) public branchesRepository: FinancialInstitutionsRoutingNumbersRepository,
    @repository(StatesAndProvincesRepository) public StatesAndProvincesRepository: StatesAndProvincesRepository,
    @repository(BrokerRepository) public BrokerRepository: BrokerRepository,
    @repository(UsersRepository) public usersRepository: UsersRepository,
    @repository(BrokerAdminsRepository) public BrokerAdminsRepository: BrokerAdminsRepository,
    @repository(ContactInformationRepository) public ContactInformationRepository: ContactInformationRepository,
    @repository(CustomerRepository) public CustomerRepository: CustomerRepository,
    @repository(InsurancePlansRepository) public InsurancePlansRepository: InsurancePlansRepository,
    @repository(PlansAvailabilityRepository) public PlansAvailabilityRepository: PlansAvailabilityRepository,
    @repository(InsurancePackagesRepository) public insurancePackages: InsurancePackagesRepository,
    @repository(SignupFormsRepository) public SignupFormsRepository: SignupFormsRepository,
    @repository(PlanLevelRepository) public PlanLevelRepository: PlanLevelRepository,
    @repository(CorporateTiersRepository) public CorporateTiersRepository: CorporateTiersRepository,
    @repository(CorporateTieredPlanLevelsRepository) public CorporateTieredPlanLevelsRepository: CorporateTieredPlanLevelsRepository,
    @repository(CorporatePaidTieredPlanLevelsRepository) public CorporatePaidTieredPlanLevelsRepository: CorporatePaidTieredPlanLevelsRepository,
    @repository(CustomerContactInfoRepository) public CustomerContactInfoRepository: CustomerContactInfoRepository,
  ) { }
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

  async customerBankDetailsRegister(session: any, filenamets: any, ext: any, mimetype: any, customerName: any, fusebillCustomerId: any): Promise<any> {

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
    let newFilename = CUSTOMER_CHEQUES_FOLDER + '/' + filenamets
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
      //  "fusebillCustomerId": customer.fusebillCustomerId,
      "fusebillCustomerId": fusebillCustomerId
    }
    // commented 149-160  for testing uncomment after test
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
  async addEmployee(data: any, corporateId: number) {
    try {
      let corporate: any = await this.BrokerRepository.findById(corporateId);
      if (corporate) {
        let employeeUserObj: Users = new Users();
        employeeUserObj.username = data.emailId;
        employeeUserObj.role = CONST.USER_ROLE.CUSTOMER;
        let randomPswrd = await generateRandomPassword();
        employeeUserObj.password = await encryptPassword(randomPswrd);
        employeeUserObj.block = true;
        employeeUserObj.activation = await getActivationCode();
        employeeUserObj.registrationDate = moment().format('YYYY-MM-DD');
        employeeUserObj.companyId = corporateId;
        let employeeUser: any = await this.usersRepository.create(employeeUserObj);
        let customerObj: Customer = new Customer();
        customerObj.brokerId = corporateId;
        //firstname and last should be created in backend level
        customerObj.firstName = data.firstName;
        customerObj.lastName = data.lastName;
        customerObj.gender = data.sex;
        customerObj.companyName = corporate.name;
        customerObj.isCorporateAccount = false;
        customerObj.registrationDate = moment().format('YYYY-MM-DD');
        customerObj.userId = employeeUser.id;
        let customer: any = await this.CustomerRepository.create(customerObj);
        let customerContactInfoObj: ContactInformation = new ContactInformation();
        customerContactInfoObj.city = data.residentIn;
        customerContactInfoObj.state = CONST.DEFAULT_COUNTRY.name;
        customerContactInfoObj.contactType = CONST.USER_ROLE.CUSTOMER;
        customerContactInfoObj.addressType = CONST.ADDRESS_TYPE.HOME_ADDRESS;
        customerContactInfoObj.primaryEmail = data.emailId;
        customerContactInfoObj.primaryPhone = data.phoneNum.toString();
        customerContactInfoObj.state = data.provienceName;
        let contcatInfo: any = await this.ContactInformationRepository.create(customerContactInfoObj);
        let customerContact: CustomerContactInfo = new CustomerContactInfo();
        customerContact.customerId = customer.id;
        customerContact.contactId = customerContact.id;
        let customerContactInfo = await this.CustomerContactInfoRepository.create(customerContact);
        // customerId = customer.id;
        var fusebillCustomer: any = {};
        if (fuseBillCustomerCreation) {
          const fusebillData: any = {}
          fusebillData.firstName = customer.firstName;
          fusebillData.lastName = customer.lastName;
          // fusebillData.parent = broker.fusebillCustomerId;
          fusebillData.companyName = corporate.name;
          fusebillData.primaryEmail = data.emailId;
          fusebillData.primaryPhone = data.phoneNum;//phone num is not mandatory
          fusebillData.reference = customer.id;
          //fusebillData.companyName=apiRequest.company_name;     
          fusebillData.currency = data.currency || 'CAD';// || ' 
          try {

            fusebillCustomer = await this.fusebill.createCustomer(fusebillData);
            console.log("**************************************************")
            // console.log(fusebillCustomer)
            console.log("**************************************************")
            let fuseBillAddressData: any = {
              "customerAddressPreferenceId": fusebillCustomer.id,
              "countryId": data.countryId || '1',
              "stateId": data.provienceId,
              //"addressType": apiRequest.addressType ?? 'Shipping',//here shipping is same as home //Billing, shipping    
              "addressType": data.addressType ?? 'Billing', //here shipping is same as home //Billing, shipping  
              "enforceFullAddress": true,
              // "line1": data.streetAddressLine1,
              // "line2": data.streetAddressLine2,
              "city": data.residentIn,
              // "postalZip": data.postalCode,
              "country": data.country || 'Canada',
              "state": data.provinceName
            }
            const fbCustomerAddress = await this.fusebill.createCustomerAddress(fuseBillAddressData);

          } catch (error) {
            console.log(error.response.data.Errors)
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
        await this.CustomerRepository.updateById(customerContactInfo.id, { fusebillCustomerId: fusebillCustomer.id })
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
    return true
  }
  async getEnrollmentPlanDates() {
    let today = moment().format("MM-DD-YYYY");
    //new Date(); //Date.now(); 
    //console.log(today) 
    let months;
    let dates = []
    if (parseInt(moment(today, "MM-DD-YYYY").format('D')) == 1) {
      //this month..  
      dates.push(today);
      //next month.. 
      //next of next moth  
       months = 2
    } else {
      //next month..   //next of next month..   //next of next next month
      months = 3
    }
    let year, month, date;
    let tempdate;
    for (let m = 1; m <= months; m++) {
      /* year = moment().year();   month = moment().month() + m */
      //date = "1".padLeft(2, '0'); 
      tempdate = moment(today, "MM-DD-YYYY").add(m, "months").format("MM-DD-YYYY")
      var day = moment(tempdate, "MM-DD-YYYY").startOf('month').format("MM-DD-YYYY");
      //console.log(day); 
      dates.push(day);
    }
    //console.log(dates)  
    return dates;
    
  }
}
const btoa = function (str: string) { return Buffer.from(str).toString('base64'); }
const atob = function (b64Encoded: string) { return Buffer.from(b64Encoded, 'base64').toString() }