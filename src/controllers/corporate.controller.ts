// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import { inject, service } from '@loopback/core';
import { repository } from '@loopback/repository';
import { get, param, post, Request, requestBody, response, Response, RestBindings } from '@loopback/rest';
import { request } from 'http';
import { nextTick } from 'process';
import { Broker, BrokerAdmins, ContactInformation, Customer, Users } from '../models';
import * as CONST from '../constants'
import { BrokerAdminsRepository, BrokerRepository, ContactInformationRepository, UsersRepository } from '../repositories'
import { CommonServiceService, Corporate, mail } from '../services';
import { FILE_UPLOAD_SERVICE } from '../keys';
import { FileUploadHandler } from "../types";
import { FilesController } from './files.controller';
import { values } from 'lodash';
import * as MESSAGE from '../messages'
import * as PATHS from '../paths';
import { getActivationCode } from '../common-functions';
import moment from 'moment';
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
    @inject(FILE_UPLOAD_SERVICE) public handler: FileUploadHandler,
    @service(CommonServiceService) public commonService: CommonServiceService,
  ) { }
  @get('/corporate/{company}logo')
  async brokerDetailsBasedonId(@param.path.string('company') company: string): Promise<Response> {
    let message, status, statusCode, data: any = {};
    try {
      let broker = await this.BrokerRepository.findOne({ where: { name: company }, fields: { logo: true } });
      if (!broker) {
        statusCode = 202;
        message = "Send the correct broker name"
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
  @get('/broker/{brokerId}')
  @response(200, {
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  async brokerDetails(@param.path.number('brokerId') brokerId: number) {
    try {
      let broketDetails = await this.BrokerRepository.find({
        where: { id: brokerId, brokerType: 'ADMINISTRATOR' }, fields: { name: true, }, include: [{
          relation: 'user',
          scope: {
            fields: { username: true }
          }
        }]
      });

    } catch (error) {

    }
  }
  @post('/corporate/signup')
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
  })
  request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<any> {
    let message: string, status: string, statusCode: number, data: any = {};
    let p = new Promise<any>((resolve, reject) => {
      this.handler(request, response, err => {
        if (err) reject(err);
        else {
          resolve(FilesController.getFilesAndFields(request, 'corporateUpload', {}));
        }
      });
    });
    p.then(async value => {
      let users: any = [];
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
          // after add stax bill
          let contactDetailsObj: ContactInformation = new ContactInformation();
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
          let customerObj: Customer = new Customer();
          let brokerObj: Broker = new Broker();
          brokerObj.name = apiRequest.corporationName;
          brokerObj.brokerType = apiRequest.brokerType || 'CORPORATE';
          brokerObj.logo = PATHS.BROKERPATH_STRING + requestFiles[0].originalname.split(".").trim().replaceAll(" ", "");
          brokerObj.link = PATHS.BROKERPATH_STRING + requestFiles[0].originalname.split(".").trim().replaceAll(" ", "");
          brokerObj.published = true;
          brokerObj.contactId = contactInfo.id;
          brokerObj.userId = 0;
          brokerObj.settingsAllowGroupBenefitsWallet = apiRequest.setupWallet ? 1 : 0;
          brokerObj.settingsEnableTieredHealthBenefits = apiRequest.setUplevelofCoverage ? 1 : 0;
          let broker: any = await this.BrokerRepository.create(brokerObj);
          let groupAdmins: any = apiRequest.gropupAdmin;
          for (const groupAdmin of groupAdmins) {
            let userObj: Users = new Users();
            userObj.username = groupAdmin.email;
            let randomPswrd = await this.commonService.generateRandomPassword();
            userObj.password = await this.commonService.encryptPassword(randomPswrd);
            userObj.block = true;
            userObj.activation = await getActivationCode();
            userObj.registrationDate = moment().format('YYYY-MM-DD');
            let user = await this.usersRepository.create(userObj);
            users.push(user.id);
          }
          let brokerAdmin: BrokerAdmins = new BrokerAdmins();
          brokerAdmin.brokerId = broker.id;
          for (const user of users) {
            brokerAdmin.userId = user;
          }
          await this.BrokerRepository.updateById(broker.id, { userId: users[0] });
          await mail("", groupAdmins[0].email, "", "", "", "")
          this.response.status(200).send({
            status: '200',
            message: 'Corporate registratered successfully ',
            date: new Date(),
          });
        } catch (error) {

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
      message = 'Broker logo is not set'
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

}

