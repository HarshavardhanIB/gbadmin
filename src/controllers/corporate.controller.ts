// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/core';
import { inject, service } from '@loopback/core';
import { repository } from '@loopback/repository';
import { api, get, param, post, Request, requestBody, response, Response, RestBindings } from '@loopback/rest';
import { request } from 'http';
import { nextTick } from 'process';
import { Broker, BrokerAdmins, ContactInformation, Customer, Users } from '../models';
import * as CONST from '../constants'
import { BrokerRepository, ContactInformationRepository, CustomerRepository, UsersRepository, } from '../repositories'
import { Corporate, FusebillService, mail } from '../services';
import { FILE_UPLOAD_SERVICE } from '../keys';
import { FileUploadHandler } from "../types";
import { FilesController } from './files.controller';
import { values } from 'lodash';
import * as MESSAGE from '../messages'
import * as PATHS from '../paths';
import { encryptPassword, generateRandomPassword, getActivationCode } from '../common-functions';
import moment from 'moment';
import { BrokerAdminsRepository } from '../repositories/broker-admins.repository';
import { BROKERPATH_STRING,CORPORATE } from '../paths';
import {CORPORATE_MSG} from '../messages'
let fuseBillCustomerCreation = false;
@api({  basePath:'admin'})
export class CorporateController {
  constructor(
    @repository(BrokerRepository)
    public BrokerRepository: BrokerRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
    @service(Corporate) public corporateService: Corporate,
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @repository(BrokerAdminsRepository)
    public BrokerAdminsRepository: BrokerAdminsRepository,
    @repository(ContactInformationRepository)
    public ContactInformationRepository: ContactInformationRepository,
    @repository(CustomerRepository)
    public CustomerRepository: CustomerRepository,
    @inject(FILE_UPLOAD_SERVICE) public handler: FileUploadHandler,
    @service(FusebillService) public fusebill: FusebillService,
  ) { }

  @get(CORPORATE.LOGO)
  async brokerDetailsBasedonId(@param.path.string('company') company: string): Promise<Response> {
    let message, status, statusCode, data: any = {};
    try {
      let broker = await this.BrokerRepository.findOne({ where: { name: company }, fields: { logo: true } });
      if (!broker) {
        statusCode = 202;
        message = CORPORATE_MSG.NOLOGO
      }
      else {
        statusCode = 200;
        message = CORPORATE_MSG.LOGO
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
  @post(CORPORATE.SIGNUP)
  @response(200, {
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  async signup(@requestBody({
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
  })
  request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<any> {
    let message: string, status: string, statusCode: number, data: any = [];
    let groupAdminsUsers: any = [];
    let brokerId: any;
    let customerId: any;
    let userId: any;
    let contId: any;
    let p = new Promise<any>((resolve, reject) => {
      this.handler(request, response, err => {
        if (err) reject(err);
        else {
          console.log(fuseBillCustomerCreation);
          resolve(FilesController.getFilesAndFields(request, 'corporateUpload', {}));
        }
      });
    });
    p.then(async value => {
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
          let contactDetailsObj: ContactInformation = new ContactInformation();
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
          let corporateUserObj: Users = new Users();
          corporateUserObj.username = apiRequest.email;
          let randomPswrd = await generateRandomPassword();
          corporateUserObj.password = await encryptPassword(randomPswrd);
          corporateUserObj.block = true;
          corporateUserObj.activation = await getActivationCode();
          corporateUserObj.registrationDate = moment().format('YYYY-MM-DD');
          let CorporateUser = await this.usersRepository.create(corporateUserObj);
          groupAdminsUsers.push(CorporateUser.id);
          data.push({ "contactOInfo": contactInfo });
          let brokerObj: Broker = new Broker();
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
          let broker: any = await this.BrokerRepository.create(brokerObj);
          brokerId = broker.id;
          data.push({ "broker": broker });
          console.log(apiRequest.gropupAdmin);
          let groupAdmins: any = JSON.parse(apiRequest.gropupAdmin);
          let groupAdminsArray: any = [];
          for (const groupAdmin of groupAdmins) {
            let userObj: Users = new Users();
            userObj.username = groupAdmin.email;
            let randomPswrd = await generateRandomPassword();
            userObj.password = await encryptPassword(randomPswrd);
            userObj.block = true;
            userObj.activation = await getActivationCode();
            userObj.registrationDate = moment().format('YYYY-MM-DD');
            let groupAdminsUser = await this.usersRepository.create(userObj);
            groupAdminsArray.push(groupAdminsUser)
            groupAdminsUsers.push(groupAdminsUser.id);
          }
          data.push({ "groupAdmins": groupAdminsArray });
          let brokerAdmin: BrokerAdmins = new BrokerAdmins();
          brokerAdmin.brokerId = broker.id;
          let customerObj: Customer = new Customer();
          customerObj.brokerId = broker.id;
          customerObj.firstName = apiRequest.firstName;
          customerObj.lastName = apiRequest.lastName;
          customerObj.gender = CONST.GENDER.UNDISCLOSED;
          customerObj.companyName = apiRequest.corporationName;
          customerObj.isCorporateAccount = true;
          customerObj.registrationDate = moment().format('YYYY-MM-DD');
          customerObj.userId = groupAdminsUsers[0];
          let customer: any = await this.CustomerRepository.create(customerObj);
          customerId = customer.id;
          var fusebillCustomer: any = {};
          if (fuseBillCustomerCreation) {
            const fusebillData: any = {}
            fusebillData.firstName = customer.firstName;
            fusebillData.lastName = customer.lastName;
            fusebillData.companyName = apiRequest.corporationName;
            fusebillData.primaryEmail = apiRequest.email;
            fusebillData.primaryPhone = apiRequest.phoneNum;
            fusebillData.reference = customer.id;
            //fusebillData.companyName=apiRequest.company_name;     
            fusebillData.currency = apiRequest.currency || 'CAD';// || ' 
            try {

              fusebillCustomer = await this.fusebill.createCustomer(fusebillData);
              console.log("**************************************************")
              // console.log(fusebillCustomer)
              console.log("**************************************************")
              let fuseBillAddressData: any = {
                "customerAddressPreferenceId": fusebillCustomer.id,
                "countryId": apiRequest.country_id,
                "stateId": apiRequest.state_id,
                //"addressType": apiRequest.address_type ?? 'Shipping',//here shipping is same as home //Billing, shipping    
                "addressType": apiRequest.address_type ?? 'Billing', //here shipping is same as home //Billing, shipping  
                "enforceFullAddress": true,
                "line1": apiRequest.street_address_line1,
                "line2": apiRequest.street_address_line2,
                "city": apiRequest.city,
                "postalZip": apiRequest.postal_code,
                "country": apiRequest.country,
                "state": apiRequest.state
              }
              const fbCustomerAddress = await this.fusebill.createCustomerAddress(fuseBillAddressData);

            } catch (error) {
              console.log(error.response.data.Errors)
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
          await this.CustomerRepository.updateById(customerId, { fusebillCustomerId: fusebillCustomer.id })
          //activationg fuse bill customer id
          // bank details and void check service 
          data.push(customer);
          for (const user of groupAdmins) {
            console.log(user);
            brokerAdmin.userId = user;
            console.log(brokerAdmin)
            await this.BrokerAdminsRepository.create(brokerAdmin);
          }
          // await mail("", groupAdmins[0].email, "", "", "", "")
          if (value.files) {
            console.log(value.files);
            console.log(`Logo -${value.files.length}`)

            if (value.files.length > 0) {
              console.log(value.files[0].originalname)
              console.log(`file.originalname`);
              let originalname = value.files[0].originalname;
              console.log(originalname)
              originalname = originalname.replace(/[\])}[{(]/g, '').replace(/ /g, '')
              console.log(originalname)
              let filename = originalname
              let modfilenameArr = filename.split(".")
              let modfilename = modfilenameArr[0] + "0." + modfilenameArr[1]
              // const broker = await this.BrokerRepository.findById(brokerId);
              if (broker) {
                await this.BrokerRepository.updateById(broker.id, {
                  logo: BROKERPATH_STRING + filename,
                  link: BROKERPATH_STRING + modfilename
                })
              } else {
                console.log('no broker with given id');
                message = 'No broker found'
                status = '202'
              }
            } else {
              console.log(`No logo needed`)
            }

          }
          this.response.status(200).send({
            status: '200',
            message: CORPORATE_MSG.REGISTRATION_SUCCESS,
            date: new Date(),
            data: data
          });
        } catch (error) {
          console.log(error);
          this.response.status(202).send({
            status: '202',
            error: error,
            message: CORPORATE_MSG.REGISTRATION_FAIL,
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
      message = CORPORATE_MSG.LOGO_NOT_SET
      status = '202'
      this.response.status(parseInt(status)).send({
        status: status,
        message: message,
        date: new Date(),
        data: data
      });
    })
    return this.response;
  }
  @get(CORPORATE.FORMCONFIG)
  @response(200, {
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  async corporateFormConfig(){
  }
}