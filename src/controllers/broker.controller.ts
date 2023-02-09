// Uncomment these imports to begin using these cool features!

import { inject, service } from "@loopback/core";
import { NULL, Null, relation, repository } from "@loopback/repository";
import { del, get, getModelSchemaRef, param, post, put, Request, requestBody, Response, response, RestBindings } from "@loopback/rest";
import { publicEncrypt, sign } from "crypto";
import { includes } from "lodash";
import { FILE_UPLOAD_SERVICE } from "../keys";
import { BROKERIMG_RESOURCES_FOLDER, BROKERPATH_STRING } from "../paths";
import { BrokerRepository, BrokerLicensedStatesAndProvincesRepository, InsurancePlansRepository, SignupFormsRepository, StatesAndProvincesRepository, SignupFormsPlanLevelMappingRepository, UsersRepository, ContactInformationRepository, CustomerSignupRepository, CustomerRepository, PlanLevelRepository, BrokerEoInsuranceRepository, InsurancePackagesRepository, PlansAvailabilityRepository } from '../repositories'
import { FileUploadHandler } from "../types";
import { FilesController } from "./files.controller";
import * as CONST from '../constants'
import * as MESSAGE from '../messages'
import * as constants from '../services/constants'
import { Broker, BrokerEoInsurance, BrokerLicensedStatesAndProvinces, SignupFormsPlanLevelMapping, ContactInformation, SignupForms, Users, PlansAvailability, BrokerAdmins } from "../models";
import { encryptPassword, generateFormLink, generateRandomPassword, getActivationCode } from "../common-functions";
import { query } from "express";
import { request, STATUS_CODES } from "http";
import { authenticate } from "@loopback/authentication";
import { MessageChannel } from "worker_threads";
import { Stats, readFile } from "fs";
import * as validation from '../services/validation.services'
import path from "path";
import { BrokerService, HttpService, intersection, ResizeimgService } from "../services";
import { FORMERR } from "dns";
import { authorize } from "@loopback/authorization";
import { basicAuthorization } from "../middlewares/auth.middleware";
import { errorMonitor } from "events";
import { GroupBenefitzDataSource } from "../datasources";
import moment from "moment";
import{BROKER} from '../paths'
import { BrokerAdminsRepository } from "../repositories/broker-admins.repository";
// @authenticate('jwt')
// @authorize({
//   allowedRoles: ['BROKER', 'ADMINISTRATOR'],
//   voters: [basicAuthorization]
// })
export class BrokerController {
  constructor(
    @repository(BrokerRepository)
    public BrokerRepository: BrokerRepository,
    @repository(BrokerLicensedStatesAndProvincesRepository)
    public BrokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository,
    // @repository(BrokerSignupFormsPlansRepository)
    // public BrokerSignupFormsPlansRepository: BrokerSignupFormsPlansRepository,
    @repository(SignupFormsPlanLevelMappingRepository)
    public SignupFormsPlanLevelMappingRepository: SignupFormsPlanLevelMappingRepository,
    @repository(UsersRepository)
    public UsersRepository: UsersRepository,
    @repository(ContactInformationRepository)
    public ContactInformationRepository: ContactInformationRepository,
    @repository(SignupFormsRepository)
    public SignupFormsRepository: SignupFormsRepository,
    @repository(StatesAndProvincesRepository)
    public StatesAndProvincesRepository: StatesAndProvincesRepository,
    @repository(CustomerSignupRepository)
    public CustomerSignupRepository: CustomerSignupRepository,
    @repository(CustomerRepository)
    public CustomerRepository: CustomerRepository,
    @repository(InsurancePlansRepository)
    public InsurancePlansRepository: InsurancePlansRepository,
    @repository(PlanLevelRepository)
    public PlanLevelRepository: PlanLevelRepository,
    @repository(BrokerEoInsuranceRepository)
    public BrokerEoInsuranceRepository: BrokerEoInsuranceRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
    @inject(FILE_UPLOAD_SERVICE) public handler: FileUploadHandler,
    @service(HttpService) public http: HttpService,
    @service(ResizeimgService) public img: ResizeimgService,
    @service(BrokerService) public bs: BrokerService,
    @repository(InsurancePackagesRepository)
    public insurancePackages: InsurancePackagesRepository,
    @repository(PlansAvailabilityRepository)
    public plansAvalibility: PlansAvailabilityRepository,
    @repository(BrokerAdminsRepository)
    public BrokerAdminsRepository: BrokerAdminsRepository
  ) { }
  @get(BROKER.COUNT, {
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
  })
  async brokerCount(): Promise<Response> {
    let totalBrokers, TpaMga, brokaRage, advisor, association, corporate, status, message, data, date: any = {};
    try {
      status = 200;
      totalBrokers = await this.BrokerRepository.count();
      TpaMga = await this.BrokerRepository.count({ brokerType: 'TPA/MGA' });
      brokaRage = await this.BrokerRepository.count({ brokerType: 'BROKERAGE' });
      advisor = await this.BrokerRepository.count({ brokerType: 'ADVISOR' });
      association = await this.BrokerRepository.count({ brokerType: 'ASSOCIATION' });
      corporate = await this.BrokerRepository.count({ brokerType: 'CORPORATE' });
      message = MESSAGE.BROKER_MSG.BROKERCOUNT;
      data = {
        totalBrokers: totalBrokers.count, TpaMga: TpaMga.count, brokaRage: brokaRage.count, advisor: advisor.count, association: association.count, corporate: corporate.count
      }
    } catch (error) {
      status = 201;
      message = MESSAGE.ERRORS.someThingwentWrong
    }
    this.response.status(status).send({
      status: status,
      message: message,
      date: new Date(),
      data: data
    });
    return this.response;
  }
  @get(BROKER.BROKERS)
  @response(200, {
    description: 'List of customers',
  })
  async getBroker(): Promise<any> {
    let statusCode,message, brokerList: any = [];
    var Brokers;
    try {
      console.log(">>>>>1 st");
      Brokers = await this.BrokerRepository.find({
        where: {}, fields: {
          id: true,
          name: true,
          userId: true,
          parentId: true,
          logo: true,
          published: true,
          brokerType: true,
          description: true,
          salesTrackingCode: true,
          usePadPaymentMethod: true,
          user_id: true,
          contactId: true
        }, include: [{
          relation: 'user',
          scope: {
            fields: { username: true }
          }
        }]
      });
      for (let i = 0; i < Brokers.length; i++) {
        let broker = Brokers[i];
        let EOIStatus, contactStatus, LicecncesStatus: any;
        let today = moment(new Date(), "YYYY-MM-DD").toDate()
        let brokerId = broker.id;
        let contactId = broker.contactId;
        let brokerEOI: any = await this.BrokerEoInsuranceRepository.findOne({ where: { brokerId: brokerId } });
        !brokerEOI || brokerEOI != Null ? EOIStatus = CONST.NODATA : new Date(brokerEOI.expiryDate) < today ? EOIStatus = CONST.EOI.EXPIRE : EOIStatus = brokerEOI;
        let licences: any = await this.BrokerLicensedStatesAndProvincesRepository.find({ where: { brokerId: brokerId } });
        if (licences.length > 0) {
          for (let licence of licences) {
            if (licence.expiryDate != undefined) {
              new Date(licence.expiryDate) < today ? LicecncesStatus = licence.licenseNumber +" "+CONST.LICENCE.EXPIRE : LicecncesStatus = CONST.LICENCE.FOUND
            }
          }
        }
        else {
          LicecncesStatus = CONST.LICENCE.NOLICENCES
        }
        if (contactId) {
          let contactDetails: any = await this.ContactInformationRepository.findById(contactId);
          if (contactDetails) {
            contactDetails.primaryEmail && contactDetails.secondaryEmail && contactDetails.line1 && contactDetails.city && contactDetails.apt ? contactStatus = "Max details" : contactStatus = "min";
            contactDetails.apt == undefined || contactDetails.line1 == undefined ? contactStatus = 'Partial' : contactStatus = contactStatus;
          }
          else {
            contactStatus = CONST.NONE
          }
        } else {
          contactStatus = CONST.NONE
        }
        broker.LicecncesStatus = LicecncesStatus;
        broker.EOIStatus = EOIStatus;
        let status = { "broker": broker, "LicecncesStatus": LicecncesStatus, "EOIStatus": EOIStatus, "contactStatus": contactStatus };
        brokerList.push(status)
        statusCode=200;
        message=MESSAGE.BROKER_MSG.BROKERS_PRMARY_DETAILS
      }

    }
    catch (err) {
      console.log(err);
    }
    this.response.status(parseInt("200")).send({
      brokerList,statusCode,message
    });
    return this.response;
  }
  @get(BROKER.BROKERID)
  async brokerDetailsBasedonId(@param.path.number('brokerId') id: number): Promise<any> {
    let final: any = [];
    let responseObject, brokerStatus, status: any;
    try {
      console.log("enter");
      let data: any = await this.BrokerRepository.findOne({
        where: { id: id }, include: [
          {
            relation: 'user', scope: {
              fields: { username: true }
            }
          }, { relation: 'contactInfo' }, { relation: 'brokerEoInsurance' },
          {
            relation: 'brokerLicensedStatesAndProvinces', scope: {
              include: [{ relation: 'stateFullDetails', scope: { fields: { name: true } } }]
            },
          }, {
            relation: 'brokerEoInsurance'
          },
          {
            relation: 'signupForms', scope: {
              include: [{
                relation: 'signupFormPlanLevels'
              }
                , { relation: 'customers', scope: { fields: { firstName: true, lastName: true, dob: true, gender: true, status: true, userId: true } } }]
            }
          }]
      });
      if (data) {
        let EOIStatus, contactStatus, LicecncesStatus: any;
        let today = moment(new Date(), "YYYY-MM-DD").toDate()
        let contactId = data.contactId || 0;
        let brokerEOI: any = await this.BrokerEoInsuranceRepository.findOne({ where: { brokerId: id } });
        !brokerEOI || brokerEOI != Null ? EOIStatus = CONST.NODATA : new Date(brokerEOI.expiryDate) < today ? EOIStatus = CONST.EOI.EXPIRE : EOIStatus = brokerEOI;
        let licences: any = await this.BrokerLicensedStatesAndProvincesRepository.find({ where: { brokerId: id } })
        console.log(licences);
        if (licences.length > 0) {
          for (let licence of licences) {
            if (licence.expiryDate != undefined) {
              new Date(licence.expiryDate) < today ? LicecncesStatus = licence.licenseNumber +" " +CONST.LICENCE.EXPIRE : LicecncesStatus =CONST.LICENCE.FOUND
            }
          }
        }
        else {
          LicecncesStatus = CONST.LICENCE.NOLICENCES
        }
        if (contactId && contactId!=0) {
          let contactDetails: any = await this.ContactInformationRepository.findById(contactId);
          // console.log("Contacct details",contactDetails.length)
          // console.log(">>>>>>>>",contactDetails)
          if (contactDetails) {
            console.log(">>>>", contactDetails.toObject.length);
            console.log("><<><><>", contactDetails);
            contactDetails.primaryEmail && contactDetails.secondaryEmail && contactDetails.line1 && contactDetails.city && contactDetails.apt ? contactStatus = CONST.MAX : contactStatus = CONST.MIN;
            contactDetails.apt == undefined || contactDetails.line1 == undefined ? contactStatus = CONST.PARTIAL : contactStatus = contactStatus;
          }
          else {
            contactStatus = CONST.NONE
          }
        } else {
          contactStatus = CONST.NONE
        }
        brokerStatus = { "LicecncesStatus": LicecncesStatus, "EOIStatus": EOIStatus,"contactinfoStatus":contactStatus };
      }

      if (!data) {
        status = 201;
        responseObject = {
          status: 201,
          message: CONST.NODATA,
          date: new Date(),
          data: final,

        }
      }
      else {
        status = 200;
        let dataArray: any = data;
        let userId = data.userId;
        let userDetails: any = "";
        if (userId == null || !userId) {
          userDetails = "";
        }
        responseObject = {
          status: 200,
          message: MESSAGE.BROKER_MSG.BROKER_DETAILS,
          date: new Date(),
          data: data,
          brokerStatus: brokerStatus
        }
      }
      this.response.status(status).send(responseObject);
      return this.response;
    }
    catch (error) {
      console.log(error);
    }
  }
  @get(BROKER.CUSTOMERLIST)
  async custmerCount(@param.path.number('brokerId') id: number): Promise<any> {
    try {
      let customers: any = "";
      let countofCustomers = 0;
      let customerCount: any;
      let final: any = [];
      let signUpForms = await this.SignupFormsRepository.find({ where: { brokerId: id }, fields: { id: true } });
      for (const signUpform of signUpForms) {
        let custmrSignups = await this.CustomerSignupRepository.find({ where: { formId: signUpform.id }, fields: { customerId: true } });
        customerCount = await this.CustomerSignupRepository.count({ formId: signUpform.id });
        countofCustomers += customerCount.count;
        for (const custmrSignup of custmrSignups) {
          customers = await this.CustomerRepository.findById(custmrSignup.customerId, { fields: { firstName: true, lastName: true } });
          final.push(customers);
        }
      }
      let responseObj = {
        "statusCode": 200,
        "message": MESSAGE.BROKER_MSG.CUSTOMERS_DETAILS_COUNT,
        "customerCount": countofCustomers,
        "data": final
      }
      return responseObj;
    }
    catch (error) {
      console.log(error);
    }
  }
  public static async newBroker(request: Request, method: string, others: any) {
    console.log(request);
    const uploadedFiles = request.files;
    const uploadedFields = request.body
    //console.log(uploadedFields)
    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      encoding: f.encoding,
      mimetype: f.mimetype,
      size: f.size,
    });
    let files: any[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        // console.log(`filename`);
        // let originalname = filename;
        // console.log(originalname)
        // originalname = originalname.replace(/[\])}[{(]/g, '').replace(/ /g, '')
        // console.log(originalname)
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }
  }
  @post(BROKER.LOGO, {

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

  })
  async brokerLogoUpload(

    @param.path.string('brokerid') broker_id: number,
    @param.query.boolean('resize') resize: boolean,
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,

  ): Promise<any> {

    let message: string, status: any, data: any = {};
    let p = new Promise<any>((resolve, reject) => {

      this.handler(request, response, err => {
        if (err) reject(err);
        else {
          resolve(FilesController.getFilesAndFields(request, 'brokerLogoUpload', { brokerid: broker_id }));
          //const upload = FilesController.getFilesAndFields(request, 'brokerLogoUpload', {brokerid: broker_id});
          status = '201';
          message = MESSAGE.ERRORS.someThingwentWrong
        }

      });
    });
    p.then(async value => {
      console.log("entered");
      console.log(value);
      try {
        if (value.files) {

          console.log(value.files.length)

          console.log(value.files[0].originalname)

          let filename = value.files[0].originalname

          let modfilenameArr = filename.split(".")

          let modfilename = modfilenameArr[0] + "0." + modfilenameArr[1]
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>" + resize)
          if (resize) {
            let resizeimg = await this.img.resizeImg(filename.replace(/[\])}[{(]/g, '').replace(/ /g, ''));
            console.log("the resizeimg >>>>>>>>>>>>", resizeimg)
          }
          else {
          }
          const broker = await this.BrokerRepository.findById(broker_id);
          console.log(broker);
          if (broker) {

            let brokerAfterUpdate = await this.BrokerRepository.updateById(broker_id, {

              logo: BROKERPATH_STRING + filename.replace(/[\])}[{(]/g, '').replace(/ /g, ''),

              link: BROKERPATH_STRING + modfilename

            })
            //method
            let url = process.env.MAINAPI + `/api/customer/broker/${broker_id}/logo`;
            let pathImg = BROKERIMG_RESOURCES_FOLDER + "/" + filename.replace(/[\])}[{(]/g, '').replace(/ /g, '');
            const fetchStatus = await this.http.fetchMultipartFormdata(url, pathImg);
            console.log("fetchStatus >> status", fetchStatus);
            message = 'Broker logo is set'
            status = 200
            data = brokerAfterUpdate;
            this.response.status(status).send({
              status, message, data
            })
          } else {
            console.log('no broker with given id');
            message = 'No broker found'
            status = '202'
            this.response.status(status).send({
              status, message, data
            })
          }
        }
      } catch (error) {
        console.log(error)
        status = '201';
        message = "error " + error.message;
        this.response.status(status).send({
          status, message, data
        })
      }
      return this.response;
    })
    p.catch(onrejected => {
      message = 'Broker logo is not set'
      status = '202'
      this.response.status(200).send({
        status, message
      })
      return this.response;
    })
    return this.response;
  }
  async checkAndGenerateNewFormLink(formLink: string, userid: number) {

    let linkExists = await this.SignupFormsRepository.findOne({ where: { link: formLink } })

    if (linkExists) {

      console.log(`linkExists: ${linkExists.id}`)

      let link = await generateFormLink(userid)

      const newlink: string = await this.checkAndGenerateNewFormLink(link, userid)

      return newlink;

    } else {

      return formLink;

    }

  }
  @del(BROKER.FORM, {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'delete form based on the formid',
      },
    },
  })
  async deleteForm(@param.path.number('formId') formId: number): Promise<any> {
    // let unPublish: number = 0;
    let status, message, data: any = {};
    try {
      await this.SignupFormsPlanLevelMappingRepository.deleteAll({ formId: formId });
      let suf = await this.SignupFormsRepository.findById(formId);
      if (suf) {
        // await this.SignupFormsRepository.updateById(formId, { published: false });
        await this.SignupFormsRepository.deleteById(formId);
      }
      status = 200;
      message = "Form deleted successfull"
    }
    catch (error) {
      console.log(error);
      status = 400;
      message = "Error when deleting the form"
    }

    this.response.status(status).send({
      status, message, date: new Date(),
    });
    return this.response;
  }
  @del(BROKER.BROKER_FORM)
  async deleteBrokerForm(@param.path.number('brokerId') Brokerid: number): Promise<any> {
    let status, message, data: any = {};
    try {
      if (Brokerid) {
        let brokerForms = await this.SignupFormsRepository.find({ where: { brokerId: Brokerid } });
        console.log(brokerForms);
        if (brokerForms) {
          for (const form of brokerForms) {
            // await this.BrokerSignupFormsPlansRepository.deleteAll({ formId: form.id });
            await this.SignupFormsPlanLevelMappingRepository.deleteAll({ formId: form.id });

          }
          // await this.SignupFormsRepository.deleteAll({ where: { brokerId: Brokerid } });
          await this.SignupFormsRepository.deleteAll({ brokerId: Brokerid });

          status = 200;
          message = "Broker formds deleted successfull"
        }
        else {
          status = 201
          message = "No broker formds found"
        }
      }
      else {
        status = 401;
        message = "Send brokerId"
      }

    }
    catch (error) {
      status = 402;
      message = "Error when delete the broker form"
      console.log(error)
    }

    this.response.status(status).send({
      status, message, date: new Date(),
    });
    return this.response;
  }
  @authenticate.skip()
  @get('/formConfigurations')
  @response(200, {

    description: 'Mixed object of all the specific values needed for form configuration',

    content: {

      'application/json': {

        schema: {

          type: 'object'

        },

      },

    },

  })
  async formConfig(

    // @param.path.string('formLink') formLink: string

    @param.query.string('formLink') formLink?: string,

    @param.query.string('lang') lang?: string

  ): Promise<Response> {
    await this.bs.print();
    let message, status, data: any = {}, error;




    // formLink += '/'

    // if (!formLink) {

    //   formLink = '/'

    // }

    let formError = false;

    console.log(`formLink: ${formLink}`)

    let form;

    if (formLink && formLink != '') {

      try {

        form = await this.SignupFormsRepository.findOne({

          where: {

            or: [

              { link: formLink },

              { alias: formLink }

            ]

          }, include: [{

            relation: 'broker', scope: {

              include: [{ relation: 'brokerLicensedStatesAndProvinces' }]

            }

          }]

        });

        console.log(form);

        if (form) {

          formError = false;



        } else {

          error = 'Configurations loading failed';

          message = `The page you are trying to access is not available. Either contact your broker or GroupBenefitz Admin (${process.env.SYS_ADMIN_EMAIL})`;

          status = '400';

          formError = true;

        }



        data['form'] = form;

      } catch (error) {

        console.log(error);

        data['form'] = null;

        error = error;

        message = 'Could not load form for the given page is not available';

        status = '400';

        formError = true;

      }

    } else {

      data['form'] = null;

      error = 'Configurations loading failed';

      message = `The page you are trying to access is not available. Either contact your broker or GroupBenefitz Admin (${process.env.SYS_ADMIN_EMAIL})`;

      status = '400';

      formError = true;

    }



    console.log(`formError: ${formError}`);



    if (!formError) {

      console.log('no form error.')



      try {

        //data['default_form'] = DEFAULT_FORM;

        //gender_list

        data['gender'] = CONST.GENDER_LIST;

        //marital_status_list

        data['marital_status'] = CONST.MARITAL_STATUS_LIST;



        let languageDetails: any;

        //lang



        // languageDetails = await this.translationLanguagesRepository.findOne({

        //   where: {

        //     isDefault: true

        //   },

        //   include: [{relation: 'languageTokens'}]

        // });


        // console.log('slug', languageDetails)
        // data['default_language'] = languageDetails.slug //term

        // data['default_language_details'] = languageDetails



        console.log(`lang: ${lang}`)

        if (lang) {

          // languageDetails = await this.translationLanguagesRepository.findOne({

          //   where: {

          //     slug: lang

          //     //or: [{slug: lang}, {term: lang}]

          //   },

          //   include: [{relation: 'languageTokens'}]

          // });

        }
        // data['language'] = languageDetails.slug //.term //CONST.DEFAULT_LANGAUGE;
        // data['language_details'] = languageDetails
        //let lang = def_lang.slug.split("-")[0] || "en"
        // let links = {
        //   "langTokens": LANG_TOKENS.replaceAll("{lang}", data['language']),

        //   "termsConditions": TERMS_COND.replaceAll("{lang}", data['language']),

        //   "disclosureAgreement": DISCLOSURE.replaceAll("{lang}", data['language'])

        // }

        // console.log("links")

        // console.log(links)

        // data['links'] = links



        //country

        let countryFilter = {

          where: {

            published: 1

          }

        }



        // data['countries'] = await this.countryRepository.find(countryFilter);

        data['default_country'] = CONST.DEFAULT_COUNTRY;



        //states-and-provinces

        let provinceFilter: any = {

          'where': {

            'countryId': CONST.DEFAULT_COUNTRY.id,

            'published': 1

          },

          'fields': {

            'countryId': true,

            'id': true,

            'name': true,

            'provincialHealthcareUrl': true,

            'published': false,

            'shortName': true,

            'zipcodes': true,

            'fusebillId': true

          }

        }
        ////broker -- licensed province
        let brokerStateIds = []
        if (form?.broker.brokerLicensedStatesAndProvinces && form?.broker.brokerLicensedStatesAndProvinces.length > 0) {

          for (const bls of form?.broker.brokerLicensedStatesAndProvinces) {

            brokerStateIds.push(bls.stateId);

          }

          //provinceFilter.where.id = {inq: brokerStateIds} //removed as all customers has to be allowed

        }



        console.log(brokerStateIds)

        // console.log(provinceFilter.where)



        // let provinces = await this.provincesRespository.find(provinceFilter)



        let provincesArray = [];

        // for (const province of provinces) {

        //   provincesArray.push(province.id)

        // }

        // data['provinces'] = provinces



        // if (brokerStateIds.length == 0) {

        //   //no restriction.. so assign all provinces

        //   brokerStateIds = provincesArray;

        // }



        data['broker_licensed_provinces'] = brokerStateIds;



        console.log(`provincesArray.length: ${provincesArray.length}`)

        console.log(`brokerStateIds.length: ${brokerStateIds.length}`)



        if (provincesArray.length == brokerStateIds.length) {

          data['assign_default_form'] = false;

        } else {

          data['assign_default_form'] = true;

          data['default_form'] = await this.SignupFormsRepository.findById(CONST.DEFAULT_FORM_ID, {

            include: [{

              relation: 'broker'

            }]

          });

        }



        data['validations'] = {}

        data['validations']['customer'] = {

          age: {

            min: CONST.VALIDATIONS.CUSTOMER_AGE_MIN

          },

          workingHours: {

            min: CONST.VALIDATIONS.CUSTOMER_WORKING_HOURS_MIN,

            max: CONST.VALIDATIONS.CUSTOMER_WORKING_HOURS_MAX

          },

          // hiringdate: {

          //   max: Date.now() - HIRING_DATE_LIMIT

          // },

          hiringDate: {

            min: CONST.VALIDATIONS.CUSTOMER_HIRING_DATE_MIN,

            // max: this.registrationService.getMaxHiringDate(),

            ineligibilityPeriod: CONST.HIRING_DATE_INELIGIBILITY_PERIOD_NO

          },

          //planErollmentDates: this.registrationService.getEnrollmentPlanDates(),

          // planEnrollmentDates: this.registrationService.getEnrollmentPlanDates()

        }



        data['validations']['spouse'] = {

          age: {

            min: CONST.VALIDATIONS.CUSTOMER_AGE_MIN

          }

        }



        message = 'Configurations loaded successfully';

        status = '200';

      } catch (error) {

        console.log(error)

        message = 'Configurations loading failed';

        status = '206';

      }



    }



    console.log(`status: ${status}`);

    console.log(`message: ${message}`);

    this.response.status(parseInt(status || '404')).send({

      status, message, date: new Date(), data, error

    });



    //console.log(this.response);

    return this.response;



  }
  
  @put(BROKER.UPDATE_CONTACTINFO)
  @response(200, {
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  async updateContact(@param.path.number('brokerId') id: number, @requestBody(
    {
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInformation, { exclude: ['id', 'fusebillId'] })
        }
      }
    }
  ) ContactInformation: Omit<ContactInformation, 'id'>): Promise<any> {
    let statusCode, response, message: any = {};
    console.log(ContactInformation)
    let broker: any = await this.BrokerRepository.findOne({ where: { id: id }, fields: { contactId: true } })
    if (broker) {
      await this.ContactInformationRepository.updateAll(broker.contactId, ContactInformation);
      statusCode = 200;
      message = "Contact information updated successfully"
    }
    else {
      statusCode = 201;
      message = "No info found"

    }
    this.response.status(statusCode).send({
      statusCode, message, date: new Date()
    });
    return this.response;
  }
  @put(BROKER.UPDATE_LICENSE)
  @response(200, {
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  async updateLiceceState(@param.path.number('brokerId') brokerId: number, @requestBody({
    content: {
      'application/json': {
        schema: {
          type: 'array',
          default: [{
            provinces_id: '', provinces_name: '', expiry_date: new Date().toISOString().slice(0, 10),
            reminder_email: 7,
            license_num: '',
            license_coverage: 'LIFE_ACCIDENT_AND_SICKNESS',
          }],
        }
      }
    }
  }) requestBody: any): Promise<any> {
    console.log(requestBody);
    let status, message, date: any = {};
    let licences: any = requestBody;
    if (licences.length > 0) {
      await this.BrokerLicensedStatesAndProvincesRepository.deleteAll({ brokerId: brokerId });
      let BrokerLicensedStatesAndProvince: BrokerLicensedStatesAndProvinces = new BrokerLicensedStatesAndProvinces();
      BrokerLicensedStatesAndProvince.brokerId = brokerId;
      for (const license of licences) {
        BrokerLicensedStatesAndProvince.expiryDate = license.expiry_date
        BrokerLicensedStatesAndProvince.reminderEmail = license.reminder_email
        BrokerLicensedStatesAndProvince.licenseNumber = license.license_num
        BrokerLicensedStatesAndProvince.licenseCoverage = license.license_coverage
        BrokerLicensedStatesAndProvince.stateId = license.provinces_id;
        await this.BrokerLicensedStatesAndProvincesRepository.create(BrokerLicensedStatesAndProvince)
      }
      status = 200;
      message = "Licence states updated successfully"
    }
    else {
      status = 201;
      message = "Send states"
    }
    this.response.status(status).send({
      status, message, date: new Date()
    });
    return this.response;

  }
  @put(BROKER.UPDATE_EOI)
  @response(200, {
    description: 'update broker E&O insurence',
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  async updateEOI(@param.path.number('brokerId') brokerId: number, @requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(BrokerEoInsurance, {
          exclude: ['id', 'brokerId', 'broker_id']
        })
      }
    }
  }) BrokerEoInsurance: Omit<BrokerEoInsurance, 'id'>): Promise<any> {
    let status, message, data: any = {}
    console.log(BrokerEoInsurance);
    let brokerEOI = await this.BrokerEoInsuranceRepository.find({ where: { brokerId: brokerId } });
    console.log(brokerEOI);
    if (brokerEOI.length > 0) {
      await this.BrokerEoInsuranceRepository.updateAll(BrokerEoInsurance, { where: { brokerId: brokerId } })
      status = 200;
      message = "E&O insurence Updated succesfully"
    }
    else {
      BrokerEoInsurance.brokerId = brokerId;
      await this.BrokerEoInsuranceRepository.create(BrokerEoInsurance);
      message = "E&O insurences creeated successfully";
      status = 200;
    }
    this.response.status(status).send({
      status, message, date: new Date()
    });
    return this.response;
  }
   @del(BROKER.BROKERID)
  @response(200, {
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  async deleteBroker(@param.path.number('brokerId') brokerId: number) {
    let statusCode, message: any = {};
    let broker = await this.BrokerRepository.findById(brokerId);
    if (broker) {
      let signUpForms = await this.SignupFormsRepository.find({ where: { brokerId: brokerId } });
      for (const signupForm of signUpForms) {
        await this.SignupFormsPlanLevelMappingRepository.deleteAll({ formId: signupForm.id })
      }
      await this.ContactInformationRepository.deleteAll({ id: brokerId });
      await this.BrokerLicensedStatesAndProvincesRepository.deleteAll({ brokerId: brokerId })
      await this.BrokerEoInsuranceRepository.deleteAll({ brokerId: brokerId });
      await this.SignupFormsRepository.deleteAll({ brokerId: brokerId });
      await this.BrokerRepository.deleteById(brokerId);
      statusCode = 200;
      message = "Broker details deleted successfull"
    }
    else {
      statusCode = 201;
      message = "No broker details found"
    }
    this.response.status(statusCode).send({
      statusCode, message, date: new Date()
    });
    return this.response;
  }
  @post(BROKER.CHANGE_EMAIL)
  async emailChange(@param.path.number('brokerId') brokerId: number, @requestBody({
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  }) requestBody: {
    newMailid: string
  }) {
    let newmail = requestBody.newMailid;
    let status, message, date, data: any = {};
    if (!newmail || !brokerId) {
      status: 201;
      message = "No inpiuts found"
    }
    try {
      let broker = await this.BrokerRepository.findById(brokerId, { fields: { contactId: true, user_id: true } });
      let emailValidation = await validation.emailvalidation(newmail);
      if (emailValidation) {
        status = 400;
        message = "Error when updating the mail id"
      }
      else {
        await this.UsersRepository.updateById(broker.userId, { username: newmail });
        await this.ContactInformationRepository.updateById(broker.contactId, { primaryEmail: newmail })
        status = 200;
        message = "Mail updated successfull"
      }
    } catch (error) {
      console.log(error);
      status = 400;
      message = "Error when updating the mail id"
    }
    this.response.status(status).send({
      status, message, date: new Date()
    })
    return this.response;
  }
  @put(BROKER.BROKER, {
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
  })
  async brokerUpdate(@requestBody({
    description: "Update broker details",
    content: {
      'multipart/form-data': {
        // Skip body parsing
        'x-parser': 'stream',
        schema: {
          //required: ['name', 'email'],
          type: 'object',
          properties: {
            borkerId: {
              type: 'number',
              default: '0',
            },
            logo: {
              type: 'string',
              format: 'binary'
            },

            useParentsLogo: {
              type: 'boolean',
              default: 'false',
            },
            parent_id: {
              type: 'number',
              default: '0',
            },
            parent_name: {
              type: 'string',
              default: '',
            },
            license: {
              // required: ['formType'],
              type: 'object',
              properties: {

                provinces_ids: {
                  type: 'array',
                  items: {
                    type: 'number'

                  }
                },
                provinces_names: {
                  type: 'array',
                  items: {
                    type: 'string'
                  }
                },
                expiry_date: { type: 'string', default: new Date().toISOString().slice(0, 10) },
                reminder_email: { type: 'number', default: '7', description: 'send a reminder x days before' },
                licence_nums: { type: "array", default: "" }
              }
            },
            licenses: {
              required: [''],
              type: 'array',
              items: {
                properties: {
                  provinces_id: { type: 'number', default: '0' },
                  provinces_name: { type: 'string', default: '' },
                  expiry_date: { type: 'string', default: new Date().toISOString().slice(0, 10) },
                  reminder_email: { type: 'number', default: '7', description: 'send a reminder x days before' },
                  license_num: { type: "array", default: "" },
                  license_coverage: { type: 'string', default: 'LIFE_ACCIDENT_AND_SICKNESS', enum: CONST.LICENSE_COVERAGE }
                }
              }
            },
            sales_tracking_code: {
              type: 'string',
              default: '',
            },

            createSignupForm: {
              type: 'boolean',
              default: '',
            },
            formDetails: {
              required: ['formType'],
              type: 'array',
              items: {
                properties: {
                  formType: { type: 'string', default: 'REGULAR', enum: CONST.FORM_TYPE_ARRAY, },
                  name: { type: 'string', default: 'Health Benefits Application Form' },
                  description: { type: 'string', default: '' },
                  link: { type: 'string', default: '' },
                  planLevels: { type: 'array', default: '' },
                }
              }

            },
            EOInsurense: {
              type: 'string'
            },
            EOCertificate: {
              type: 'string'
            },
            policy: {
              type: 'string'
            },
            EOIexpiryDate: {
              type: 'string', default: new Date().toISOString().slice(0, 10)
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
  }) request: Request, @inject(RestBindings.Http.RESPONSE) response: Response,): Promise<Response> {
    let message: string, status: string, statusCode: number, data: any = {};
    let p = new Promise<any>((resolve, reject) => {
      this.handler(request, response, err => {
        if (err) reject(err);
        else {
          resolve(FilesController.getFilesAndFields(request, 'brokerLogoUpload', {}));
          // const upload = FilesController.getFilesAndFields(request, 'brokerLogoUpload', { brokerid: broker_id });
        }
      });
    });
    p.then(async value => {
      let brokerId;
      let userId;
      let contId;
      let signupFormId;
      console.log("entry")
      if (!value.fields) {
        this.response.status(422).send({
          status: '422',
          error: `Missing input fields`,
          message: MESSAGE.ERRORS.missingDetails,
          date: new Date(),
        });
        return this.response;
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
        let BroId: any;
        if (apiRequest.borkerId == 0 || !apiRequest.borkerId) {
          this.response.status(422).send({
            status: '422',
            error: `Missing input fields`,
            message: MESSAGE.ERRORS.missingDetails,
            date: new Date(),
          });
          return this.response;
        }
        brokerId = apiRequest.borkerId;
      }

    })
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
  @get(BROKER.FORM_CONFIG, {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Form Configuration',
      },
    },
  })
  async formeConfig(): Promise<Response> {
    let status, message, date, data: any = {};
    try {
      status = 200;
      message = "Form configurations"
      data['gender'] = CONST.GENDER_LIST;
      data['marital_status'] = CONST.MARITAL_STATUS_LIST;
      data['brokerType'] = CONST.BROKER_TYPE_ARRAY;
      data['formType'] = CONST.FORM_TYPE_ARRAY;
      let countryFilter = {

        where: {

          published: 1

        }

      }
      data['states'] = await this.StatesAndProvincesRepository.find(countryFilter);
      data['default_country'] = CONST.DEFAULT_COUNTRY;
    } catch (error) {
      status = 400;
      message = "Configuration error"
    }
    this.response.status(status).send({
      status, message, data, date: new Date()
    })
    return this.response;
  }
  @post(BROKER.PLAN_LEVELS, {
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
  })
  async planlevels(@requestBody({
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            formId: {
              type: 'number',
            },
            age: {
              type: 'number'
            },
            province_id: {
              type: 'number'
            }
          }
        }
      },
    }
  }) apiRequest: any): Promise<any> {
    console.log(apiRequest)
    let status, message, data: any = {};

    try {
      // const brokerSignupFormPlans = await this.BrokerSignupFormsPlansRepository.find({
      //   where: {
      //     formId: apiRequest.formId
      //   }
      // })

      const signupForm_PlanLevels = await this.SignupFormsPlanLevelMappingRepository.find({
        where: {
          formId: apiRequest.formId
        }
      })

      //brokerPlanOptions -- planOptions -- planoptionvalues

      console.log(`brokerPlans or brokerSignupFormPlans`);
      //console.log(brokerSignupFormPlans);
      //signupForm_PlanLevels
      console.log(`brokerPlanLevels or brokerSignupFormPlansLevels`);
      console.log(signupForm_PlanLevels);
      //let brokerPlanOptions: any = {}
      let brokerplanIds: any = []
      // for (let brokerPlan of brokerSignupFormPlans) {
      //   if (brokerPlan.planId) {
      //     brokerplanIds.push(brokerPlan.planId)
      //     // brokerPlanOptions[brokerPlan.planId] = brokerPlan.planOptions
      //   }
      // }
      // console.log(brokerPlanOptions) //not needed

      let brokerplanLevels: any = []
      for (let brokerPlanLevel of signupForm_PlanLevels) {
        if (brokerPlanLevel.planLevelId) {
          brokerplanLevels.push(brokerPlanLevel.planLevelId)
          // brokerPlanOptions[brokerPlan.planId] = brokerPlan.planOptions
        }
      }

      //check for broker -license statesalso

      // console.log(`brokerplanIds`)
      // console.log(brokerplanIds)

      console.log(`brokerplanLevels`)
      console.log(brokerplanLevels)

      const provinceData = await this.StatesAndProvincesRepository.findById(apiRequest.province_id);
      data.province = provinceData;
      console.log(data);
      //get plans valid for this customer -- state_id, plan_id
      let plansforProvince: any = {
        where: {
          and: [
            { "stateId": apiRequest.province_id }
          ]
        },
        include: [{ relation: 'plan' }]
      }

      //Remove this //comment this
      // if (brokerplanIds.length > 0) {
      //   let brokerPlanFilter = {"planId": {"inq": brokerplanIds}}
      //   plansforProvince.where.and.push(brokerPlanFilter);

      // }

      // if (brokerplanLevels.length > 0) {
      //   let brokerPlanLevelsFilter = {"planLevel": {"inq": brokerplanLevels}}
      //   plansforProvince.where.and.push(brokerPlanLevelsFilter);

      // }

      // console.log(plansforProvince.where.and.length)
      //  console.log(plansforProvince.where.and)

      const planIdsData = await this.plansAvalibility.find(plansforProvince)
      // console.log(planIdsData);

      let planIds: any = [];
      let planLevelIds: any = [];

      for (let planIdData of planIdsData) {
        if (planIdData.planId)
          planIds.push(planIdData.planId)

        if (planIdData.plan) {
          if (planLevelIds.indexOf(planIdData.plan.planLevel) == -1)
            planLevelIds.push(planIdData.plan.planLevel)
        }
      }

      console.log(`state - ${apiRequest.province_id} planIds`)
      console.log(planIds)
      console.log(`state - ${apiRequest.province_id} plans---planlevels`)
      console.log(planLevelIds)


      let filteredPlanLevels;
      if (brokerplanLevels.length > 0) {
        filteredPlanLevels = await intersection(planLevelIds, brokerplanLevels);
      } else {
        filteredPlanLevels = planLevelIds;
      }
      console.log("filteredPlanLevels");
      console.log(filteredPlanLevels);
      //console.log(age);
      // console.log(`children_coverage:${children_coverage}`);
      // let pcc: any = this.registrationService.planCoverageCalculations(apiRequest.having_spouse, apiRequest.spouse_details.is_spouse_having_healthcard, apiRequest.no_of_children, children_coverage);
      let pcc: any = {
        exclusivePlanCoverageArray: [],
        maritalStatus: 'COUPLE',
        ninCondition: false,
        rital_status: 'SINGLE',
        exclusive: ['COUPLE', 'FAMILY'],
        inclusive: ['SINGLE']
      };
      console.log("***************************");
      console.log(pcc);
      console.log(pcc.maritalStatus);
      data.customer = {};
      data.customer.maritalStatus = pcc.maritalStatus;

      // console.log(`excl. ${pcc.exclusivePlanCoverageArray}`);
      // console.log(`maritalStatus: ${pcc.maritalStatus}`);

      let plansFilter: any = {
        order: 'ordering ASC',
        where: {
          and: [
            { "id": { "inq": planIds } },
            //{"planCoverage": {"nin": pcc.exclusivePlanCoverageArray}},
            // {"or": [{"planCoverage": {"nin": pcc.exclusivePlanCoverageArray}}, {"planCoverage": {"eq": null}}]},
            //{"packageId": pckg.id},
            //{"planLevel": planlevel.id},
            { "published": { "type": "Buffer", "data": [1] } },
            { "corporatePlan": false },
            { "or": [{ "minAge": { "lte": apiRequest.age } }, { "minAge": { "eq": null } }] },
            { "or": [{ "maxAge": { "gt": apiRequest.age } }, { "maxAge": { "eq": null } }] },
            //{"requiredPlanId": null}
          ]
        },
        include: [

          {
            relation: 'stateTaxDetails',
            scope: {
              include: [
                {
                  relation: 'state'
                }
              ]
            }
          },
          // {
          //   relation: 'planOptions',
          //   scope: {
          //     include: [
          //       {
          //         relation: 'planOptionsValues'
          //       }
          //     ]
          //   }
          // },
        ]
      }

      let packageFilter: any = {
        order: 'ordering ASC',
        where: {
          published: true
        },
      }

      const packages: any = await this.insurancePackages.find(packageFilter)

      const packagesArray: any = []
      for (const pckg of packages) {
        //console.log(pckg.name)
        const packageObject: any = {}
        // packageObject = pckg;
        packageObject["description"] = pckg.description
        packageObject["id"] = pckg.id
        packageObject["logo"] = pckg.logo
        packageObject["name"] = pckg.name
        packageObject["published"] = pckg.published
        packageObject["ordering"] = pckg.ordering
        packageObject["allowMultiple"] = pckg.allowMultiple
        packageObject["applyFilters"] = pckg.applyFilters
        packageObject["optIn"] = pckg.optIn

        //console.log(plansFilter.where.and.length)
        plansFilter.where.and.splice(5); //6 conditions default; 1 or 2 dynamic -->changed to 5 as required_plan_id is removed
        //console.log(plansFilter.where.and.length)
        //console.log(`Apply filter to this ${pckg.name}:${pckg.applyFilters}`);

        let pccNincondition = pcc.ninCondition
        let pccExclusivePlanCoverageArray = pcc.exclusivePlanCoverageArray
        //package 3 : couple is same as family for Highcost drugs..

        if (pckg.id == CONST.HIGHCOST_DRUGS_PACKAGE_ID) {
          if (pcc.maritalStatus == 'COUPLE') {
            //remove FAMILY from pccExclusivePlanCoverageArray //just pop
            // console.log(pccExclusivePlanCoverageArray.length);
            pccExclusivePlanCoverageArray.pop();
            // console.log('popped last element--Family?')
            //console.log(pccExclusivePlanCoverageArray.length);

            // console.log(`pccNincondition:${pccNincondition}`)
            if (pccExclusivePlanCoverageArray.length == 0) {
              pccNincondition = false;
            }
            // console.log(`fixed for pckg3 pccNincondition:${pccNincondition}`)

          }
        }

        //package 5: applyfilters--true same single, couple, family, and combinations //applyfilters has no effect now..
        if (pckg.id == CONST.EXECUTIVE_PACKAGE_ID) {
          // console.log(`pccNincondition:${pccNincondition}`)
          if (pcc.maritalStatus == 'SINGLE') {
            pccExclusivePlanCoverageArray = ['COUPLE', 'FAMILY']
          } else if (pcc.maritalStatus == 'COUPLE') {
            pccExclusivePlanCoverageArray = ['FAMILY']
          } else {
            //FAMILY
            pccExclusivePlanCoverageArray = []
            pccNincondition = false
          }

          // console.log(`fixed for pckg5 pccNincondition:${pccNincondition}`)
        }

        // if (pckg.applyFilters) {
        if (pccNincondition) {
          let planCoverageConditon = { "or": [{ "planCoverage": { "nin": pccExclusivePlanCoverageArray } }, { "planCoverage": { "eq": null } }] }
          plansFilter.where.and.push(planCoverageConditon)
        }
        // } else {
        //   console.log('so basic no exc covergae filter')
        // }

        plansFilter.where.and.push({ "packageId": pckg.id })

        let plansLevelFilter: any = {
          order: 'ordering ASC',
          where: {
            //"id": {"inq": planLevelIds},
            "id": { "inq": filteredPlanLevels },
            "published": true,
            "requirePlanLevel": null
          },

          "include": [
            // { "relation": "planLevelFeatures", "scope": { "include": [{ "relation": "feature" }] } },
            //{"relation": "greenshieldPackages"},
            { "relation": "plans", "scope": plansFilter }]
        }
        const planLevels = await this.insurancePackages.planGroups(pckg.id).find(plansLevelFilter)
        console.log(plansLevelFilter);
        const groupsArray: any = []
        for (const pl of planLevels) {
          if (pl.plans?.length > 0) {

            const plansArray: any = []
            // for (const plan of pl.plans) {
            //   plan.options = []
            //   if (plan.id) {
            //     plan.options = brokerPlanOptions[plan.id];
            //     let planoptions: any = []
            //     if (plan.options) {
            //       for (const blOption of plan.options) {
            //         //blOption.id
            //         const pov = await this.planOptionsValuesRepository.find({where: {planOptionsId: blOption.id}})
            //         blOption.optionValues = pov
            //         planoptions.push(blOption);
            //       }
            //     }

            //     plan.options = planoptions;

            //     plansArray.push(plan)
            //   }
            // }

            //pl.plans = plansArray;

            //if (plansArray.length > 0)
            groupsArray.push(pl);
          }
        }

        packageObject["groups"] = groupsArray//planLevels
        //console.log("-->" + packageObject.groups.length)
        if (groupsArray.length > 0)
          packagesArray.push(packageObject);

      }

      data.packages = packagesArray;//packages;
    }

    catch (error) {
      console.log(error)
    }
    return data;

  }
  @post(BROKER.CREATE_FORM, {
    responses: {
      '200': {
        description: 'Broker form creation',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                },
                status: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  //added based on name get the values
  async broker_create_form_new(
    @param.path.string('brokerId') brokerId: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {

              broker_name: {
                type: 'string',
                default: '',
              },
              formDetails: {
                required: ['formType'],
                type: 'array',
                items: {
                  properties: {
                    formType: { type: 'string', default: 'REGULAR', enum: CONST.FORM_TYPE_ARRAY, },
                    name: { type: 'string', default: 'Health Benefits Application Form' },
                    // description: {type: 'string', default: ''},
                    link: { type: 'string', default: '' },
                    planLevelsisName: { type: 'boolean', default: 'false' },
                    planLevels: { type: 'array', default: '[]' }
                  }
                }

              },
            }
          }
        },
      }
    }) apiRequest: any,
  ): Promise<Response> {
    let message, status, statusCode, data: any = {};

    console.log(apiRequest);
    let signUpformId: any;
    try {

      //handle form

      const broker = await this.BrokerRepository.findById(brokerId);

      //console.log("CONST.signupForm")
      // console.log(CONST.signupForm)
      //signup_form
      let signupFormData: SignupForms = new SignupForms();
      signupFormData.brokerId = broker.id || 1;
      console.log(apiRequest.formDetails)
      console.log(typeof apiRequest.formDetails)
      if (typeof apiRequest.formDetails == "string") {
        apiRequest.formDetails = JSON.parse(apiRequest.formDetails)
        console.log(apiRequest.formDetails)
        console.log(typeof apiRequest.formDetails)
      }
      console.log(apiRequest.formDetails.length)

      data.form = []
      for (const formDetails of apiRequest.formDetails) {

        let link = await generateFormLink(broker.userId || 0)
        signupFormData.link = await this.checkAndGenerateNewFormLink(link, broker.userId || 0)//generate_random_lin and user_id

        let aliasLink = "";
        console.log(`apiRequest.form.link: ${formDetails.link}`)
        if (formDetails.link && formDetails.link != "") {
          aliasLink = ("/" + formDetails.link)
          console.log(`aliasLink1: ${aliasLink}`)
        } else {
          console.log(`broker.name: ${broker.name}`)
          aliasLink = "/" + broker.name?.toLowerCase().split(" ")[0]
          if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
            aliasLink += "_exec"
          }
          console.log(`aliasLink2: ${aliasLink}`)
        }
        signupFormData.alias = aliasLink
        if (formDetails.name) {
          if (formDetails.name.toLowerCase().trim() == "default") {
            if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
              signupFormData.name = formDetails.name ?? CONST.signupFormExec.name
            } else {
              signupFormData.name = formDetails.name ?? CONST.signupForm.name
            }
          } else {
            signupFormData.name = formDetails.name
          }
        } else {
          if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
            signupFormData.name = formDetails.name ?? CONST.signupFormExec.name
          } else {
            signupFormData.name = formDetails.name ?? CONST.signupForm.name
          }
        }

        signupFormData.description = formDetails.description ?? CONST.signupForm.description
        signupFormData.title = formDetails.title ?? CONST.signupForm.title
        signupFormData.formType = formDetails.formType ?? CONST.signupForm.formType

        signupFormData.keywords = formDetails.keywords ?? CONST.signupForm.keywords
        // signupFormData.disclosureAgreement = formDetails.disclosureAgreement ?? CONST.signupForm.disclosure_agreement
        // signupFormData.termsOfService = formDetails.termsOfService ?? CONST.signupForm.terms_of_service


        signupFormData.inelligibilityPeriod = CONST.signupForm.ineligibilityPeriod
        signupFormData.published = CONST.signupForm.published

        if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
          signupFormData.requireDentalHealthCoverage = false
          signupFormData.requireSpouseEmail = true
          signupFormData.warnRequiredDependantMedicalExam = true
        } else {
          signupFormData.requireDentalHealthCoverage = true
          signupFormData.requireSpouseEmail = false
          signupFormData.warnRequiredDependantMedicalExam = false
        }

        signupFormData.useCreditCardPaymentMethod = true
        signupFormData.usePadPaymentMethod = true

        signupFormData.isDemoForm = formDetails.isDemoform || false

        const signupForm = await this.SignupFormsRepository.create(signupFormData);
        signUpformId = signupForm.id;
        data.form.push(signupForm)
        console.log(`signupForm.id: ${signupForm.id}`)
        //broker_signup_forms_plans
        // let signupFormPlansArray: BrokerSignupFormsPlans[] = [];
        // let signupFormPlans: BrokerSignupFormsPlans = new BrokerSignupFormsPlans();
        //  signupFormPlans.formId = signupForm.id || 0;
        if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
          //get executive plan ids ---> package_id=5
          let executivePlans = await this.InsurancePlansRepository.find({ where: { packageId: CONST.EXECUTIVE_PACKAGE_ID } })
          let executivePlanlevelObj: SignupFormsPlanLevelMapping = new SignupFormsPlanLevelMapping();
          executivePlanlevelObj.formId = signupForm.id || 0;
          let executivePlanlevelArray: any = [];
          for (const executivePlan of executivePlans) {
            //   signupFormPlans.planId = executivePlan.id || 0
            // console.log(`before push`)
            // console.log(signupFormPlans);
            // signupFormPlansArray.push(signupFormPlans)
            // await this.BrokerSignupFormsPlansRepository.create(signupFormPlans);
            if (!executivePlanlevelArray.includes(executivePlan.planLevel)) {
              executivePlanlevelArray.push(executivePlan.planLevel);
            }
          }
          for (const executivePlanLevel of executivePlanlevelArray) {
            executivePlanlevelObj.planLevelId = executivePlanLevel;
            await this.SignupFormsPlanLevelMappingRepository.create(executivePlanlevelObj);
          }
          //   console.log(`signupFormPlansArray: ${signupFormPlansArray.length}`)
        }
        if (formDetails.formType == CONST.SIGNUP_FORM.CUSTOM) {
          let planLevels: any = [];
          // var planLevels = formDetails.planLevels;
          if (formDetails.planLevelsisName) {
            let plsInRequest = formDetails.planLevels;
            for (let pl of plsInRequest) {
              if (pl == "PocketPills") {
                pl = "Opt-In";
              }
              if (pl == "High-Cost Drugs (HCD)") {
                pl = 'High-Cost Drugs';
              }
              let palLevel: any = await this.PlanLevelRepository.findOne({
                where: {
                  and: [
                    { name: { like: `%${pl}%` } },
                    { published: '1' }
                  ]
                },
                // fields: { id: true }
              })
              if (palLevel) {
                await planLevels.push(await palLevel.id)
              }
              console.log(palLevel);
              console.log("plan levels after id");
              console.log(planLevels);
            }

          }
          else {
            planLevels = formDetails.planLevels;
          }
          let executivePlanlevelObj: SignupFormsPlanLevelMapping = new SignupFormsPlanLevelMapping();
          executivePlanlevelObj.formId = signupForm.id || 0;
          for (const pl of planLevels) {
            let plkanLevels = await this.PlanLevelRepository.find({
              where: {
                and: [
                  { or: [{ id: pl }, { parentId: pl }] },
                  { published: '1' }
                ]
              }, fields: {
                id: true
              }
            });
            if (plkanLevels) {
              for (const planlevel of plkanLevels) {
                executivePlanlevelObj.planLevelId = planlevel.id || 0;
                await this.SignupFormsPlanLevelMappingRepository.create(executivePlanlevelObj);
              }
            }
          }

        }
      }//forms

      message = `Signup Form for ${broker.name} is created successfully`;
      status = '200';
      statusCode = 200;

    } catch (error) {
      await this.BrokerRepository.deleteAll({ brokerId: signUpformId });
      console.error(error);
      message = `Signup Form for ${brokerId} creation failed`
      status = '202';
      statusCode = 202
    }

    this.response.status(statusCode).send({
      status: status,
      message: message,
      data: data,
      date: new Date(),
    });
    return this.response;

    //return {message, status, data}
  }
  @post(BROKER.CREATE_FORM_WITH_SALESTRACKING_CODE, {
    responses: {
      '200': {
        description: 'Broker form creation',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                },
                status: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  //added based on name get the values
  async broker_create_form_new_with_salesTrackingCode(
    @param.path.string('brokerIdOrName') brokerIdOrName: any, @param.path.boolean('idOrName') idOrName: boolean, @param.path.string('trackingCode') trackingCode: number,
    @requestBody({
      description: 'Create a form in params idOrName is true send brokerId',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {

              broker_name: {
                type: 'string',
                default: '',
              },
              formDetails: {
                required: ['formType'],
                type: 'array',
                items: {
                  properties: {
                    formType: { type: 'string', default: 'REGULAR', enum: CONST.FORM_TYPE_ARRAY, },
                    name: { type: 'string', default: 'Health Benefits Application Form' },
                    // description: {type: 'string', default: ''},
                    link: { type: 'string', default: '' },
                    planLevelsisName: { type: 'boolean', default: 'false' },
                    planLevels: { type: 'array', default: '[]' }
                  }
                }

              },
            }
          }
        },
      }
    }) apiRequest: any,
  ): Promise<Response> {
    let message, status, statusCode, data: any = {};
    let broker: any;
    console.log(apiRequest);
    let signUpformId: any;
    if (idOrName) {
      broker = await this.BrokerRepository.findById(brokerIdOrName);
    }
    else {
      broker = await this.BrokerRepository.findOne({ where: { and: [{ salesTrackingCode: trackingCode }, { or: [{ id: brokerIdOrName }, { name: { like: `%${brokerIdOrName}%` } }] }] } });
    }
    // broker= await this.BrokerRepository.findOne({ where: { and: [{ salesTrackingCode: trackingCode }, { or: [{ id: brokerIdOrName }, { name: { like: `%${brokerIdOrName}%` } }] }] } });
    try {
      // console.log({ where: { and: [{ salesTrackingCode: trackingCode }, { or: [{ id: brokerIdOrName }, { name: { like: `%${brokerIdOrName}%` } }] }] } })
      console.log(broker);
      if (broker && broker != null) {
        //console.log("CONST.signupForm")
        // console.log(CONST.signupForm)
        //signup_form
        let signupFormData: SignupForms = new SignupForms();
        signupFormData.brokerId = broker.id || 1;
        console.log(apiRequest.formDetails)
        console.log(typeof apiRequest.formDetails)
        if (typeof apiRequest.formDetails == "string") {
          apiRequest.formDetails = JSON.parse(apiRequest.formDetails)
          console.log(apiRequest.formDetails)
          console.log(typeof apiRequest.formDetails)
        }
        console.log(apiRequest.formDetails.length)

        data.form = []
        for (const formDetails of apiRequest.formDetails) {

          let link = await generateFormLink(broker.userId || 0)
          signupFormData.link = await this.checkAndGenerateNewFormLink(link, broker.userId || 0)//generate_random_lin and user_id

          let aliasLink = "";
          console.log(`apiRequest.form.link: ${formDetails.link}`)
          if (formDetails.link && formDetails.link != "") {
            aliasLink = ("/" + formDetails.link)
            console.log(`aliasLink1: ${aliasLink}`)
          } else {
            console.log(`broker.name: ${broker.name}`)
            aliasLink = "/" + broker.name?.toLowerCase().split(" ")[0]
            if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
              aliasLink += "_exec"
            }
            console.log(`aliasLink2: ${aliasLink}`)
          }
          signupFormData.alias = aliasLink
          if (formDetails.name) {
            if (formDetails.name.toLowerCase().trim() == "default") {
              if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                signupFormData.name = formDetails.name ?? CONST.signupFormExec.name
              } else {
                signupFormData.name = formDetails.name ?? CONST.signupForm.name
              }
            } else {
              signupFormData.name = formDetails.name
            }
          } else {
            if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
              signupFormData.name = formDetails.name ?? CONST.signupFormExec.name
            } else {
              signupFormData.name = formDetails.name ?? CONST.signupForm.name
            }
          }

          signupFormData.description = formDetails.description ?? CONST.signupForm.description
          signupFormData.title = formDetails.title ?? CONST.signupForm.title
          signupFormData.formType = formDetails.formType ?? CONST.signupForm.formType

          signupFormData.keywords = formDetails.keywords ?? CONST.signupForm.keywords
          // signupFormData.disclosureAgreement = formDetails.disclosureAgreement ?? CONST.signupForm.disclosure_agreement
          // signupFormData.termsOfService = formDetails.termsOfService ?? CONST.signupForm.terms_of_service


          signupFormData.inelligibilityPeriod = CONST.signupForm.ineligibilityPeriod
          signupFormData.published = CONST.signupForm.published

          if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
            signupFormData.requireDentalHealthCoverage = false
            signupFormData.requireSpouseEmail = true
            signupFormData.warnRequiredDependantMedicalExam = true
          } else {
            signupFormData.requireDentalHealthCoverage = true
            signupFormData.requireSpouseEmail = false
            signupFormData.warnRequiredDependantMedicalExam = false
          }

          signupFormData.useCreditCardPaymentMethod = true
          signupFormData.usePadPaymentMethod = true

          signupFormData.isDemoForm = formDetails.isDemoform || false

          const signupForm = await this.SignupFormsRepository.create(signupFormData);
          signUpformId = signupForm.id;
          data.form.push(signupForm)
          console.log(`signupForm.id: ${signupForm.id}`)
          //broker_signup_forms_plans
          //let signupFormPlansArray: BrokerSignupFormsPlans[] = [];
          // let signupFormPlans: BrokerSignupFormsPlans = new BrokerSignupFormsPlans();
          //signupFormPlans.formId = signupForm.id || 0;
          if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
            //get executive plan ids ---> package_id=5
            let executivePlans = await this.InsurancePlansRepository.find({ where: { packageId: CONST.EXECUTIVE_PACKAGE_ID } })
            let executivePlanlevelObj: SignupFormsPlanLevelMapping = new SignupFormsPlanLevelMapping();
            executivePlanlevelObj.formId = signupForm.id || 0;
            let executivePlanlevelArray: any = [];
            for (const executivePlan of executivePlans) {
              // signupFormPlans.planId = executivePlan.id || 0
              // console.log(`before push`)
              // console.log(signupFormPlans);
              // signupFormPlansArray.push(signupFormPlans)
              // await this.BrokerSignupFormsPlansRepository.create(signupFormPlans);
              if (!executivePlanlevelArray.includes(executivePlan.planLevel)) {
                executivePlanlevelArray.push(executivePlan.planLevel);
              }
            }
            for (const executivePlanLevel of executivePlanlevelArray) {
              executivePlanlevelObj.planLevelId = executivePlanLevel;
              await this.SignupFormsPlanLevelMappingRepository.create(executivePlanlevelObj);
            }
            // console.log(`signupFormPlansArray: ${signupFormPlansArray.length}`)
          }
          if (formDetails.formType == CONST.SIGNUP_FORM.CUSTOM) {
            let planLevels: any = [];
            // var planLevels = formDetails.planLevels;
            if (formDetails.planLevelsisName) {
              let plsInRequest = formDetails.planLevels;
              for (let pl of plsInRequest) {
                if (pl == "PocketPills") {
                  pl = "Opt-In";
                }
                if (pl == "High-Cost Drugs (HCD)") {
                  pl = 'High-Cost Drugs';
                }
                let palLevel: any = await this.PlanLevelRepository.findOne({
                  where: {
                    and: [
                      { name: { like: `%${pl}%` } },
                      { published: '1' }
                    ]
                  },
                  // fields: { id: true }
                })
                if (palLevel) {
                  await planLevels.push(await palLevel.id)
                }
                // console.log(palLevel);
                // console.log("plan levels after id");
                // console.log(planLevels);
              }

            }
            else {
              planLevels = formDetails.planLevels;
            }
            let executivePlanlevelObj: SignupFormsPlanLevelMapping = new SignupFormsPlanLevelMapping();
            //let brokerSignupformsPlansObj: BrokerSignupFormsPlans = new BrokerSignupFormsPlans();
            // brokerSignupformsPlansObj.formId = signupForm.id || 0;
            executivePlanlevelObj.formId = signupForm.id || 0;
            for (const pl of planLevels) {
              let plkanLevels = await this.PlanLevelRepository.find({
                where: {
                  and: [
                    { or: [{ id: pl }, { parentId: pl }] },
                    { published: '1' }
                  ]
                }, fields: {
                  id: true
                }
              });
              if (plkanLevels) {
                for (const planlevel of plkanLevels) {
                  executivePlanlevelObj.planLevelId = planlevel.id || 0;
                  await this.SignupFormsPlanLevelMappingRepository.create(executivePlanlevelObj);
                  let plans = await this.InsurancePlansRepository.find({ where: { planLevel: planlevel.id }, fields: { id: true } });

                  for (const plan of plans) {
                    // brokerSignupformsPlansObj.planId = plan.id || 0;
                    // console.log(brokerSignupformsPlansObj);
                    // await this.BrokerSignupFormsPlansRepository.create(brokerSignupformsPlansObj);

                  }
                }
              }
            }

          }
        }//forms

        message = `Signup Form for ${broker.name} is created successfully`;
        status = '200';
        statusCode = 200;
      }
      else {
        message = `Signup Form for ${brokerIdOrName} creation failed no broker details found`
        status = '202';
        statusCode = 202
      }
    } catch (error) {
      try {
        await this.SignupFormsPlanLevelMappingRepository.deleteAll({ formId: signUpformId });
        //await this.BrokerSignupFormsPlansRepository.deleteAll({ formId: signUpformId });
        await this.SignupFormsRepository.deleteById(signUpformId);
      }
      catch (error) {
        console.log(error);
      }
      console.error(error);
      message = `Signup Form for ${brokerIdOrName} creation failed`
      status = '202';
      statusCode = 202
    }

    this.response.status(statusCode).send({
      status: status,
      message: message,
      data: data,
      date: new Date(),
    });
    return this.response;

    //return {message, status, data}
  }
  @get(BROKER.FORM_DETAILS, {
    responses: {
      '200': {
        description: 'Broker form creation',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                },
                status: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async formDetails(@param.path.number('formId') formId: number): Promise<Response> {
    let message, signupFormPlans, status;
    let data: any = [];
    let formDetails: any = await this.SignupFormsRepository.findById(formId, { include: [{ relation: 'signupFormPlanLevels' }] });
    console.log(formDetails);
    try {
      if (formDetails) {
        data = formDetails
        status = 200;
        message = "Form details"
      }
      else {
        message = "No form details found"
        status = 201
      }
    }
    catch (error) {
      console.log(error)
      status = 402;
      message = "Error" + error.message;
    }
    this.response.status(status).send({
      message, status, data
    })
    return this.response;
  }
  @post(BROKER.MODIFY_FORM)
  @response(200, {
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  async addOrRemoveForm(@param.path.number('formId') formid: number, @requestBody(
    {
      description: 'Modify the existing form for with plan levels',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              newType: {
                type: 'string',
                default: ''
              },
              oldType: {
                type: 'string',
                default: ''
              },
              nameOrId: {
                type: 'boolean',
                default: 'false'
              },
              planlevel: {
                type: 'array',
                default: '[]'
              }

            }
          }
        }
      }
    }
  ) requestBody: any
    //  {
    //   newType: string,
    //   planlevel?: Array<number>,
    //   oldType: string,
    // }
  ): Promise<Response> {
    let planlevel: any = requestBody.planlevel;
    let newType = requestBody.newType;
    let oldType = requestBody.oldType;
    let message, statusCode, status, data: any = {};
    try {

      // let formData = await this.SignupFormsRepository.findOne({ where: { id: formid } })
      // if (!formData) {
      //   status = 201;
      //   message = "Enter valid form id";
      // }
      // else {
      if (oldType == newType && oldType != CONST.SIGNUP_FORM.CUSTOM) {
        status = 201;
        message = "the form is already is same "
      }
      else {
        let signUpform: SignupForms = new SignupForms();
        signUpform.id = formid;
        // signUpform.brokerId = formData.brokerId;
        if (newType == CONST.SIGNUP_FORM.REGULAR) {
          // let signUpform: SignupForms = new SignupForms();
          // signUpform.id = formid;
          // signUpform.brokerId = formData.brokerId;
          signUpform.formType = CONST.SIGNUP_FORM.REGULAR;
          signUpform.name = CONST.signupForm.name;
          // signUpform.published = formData.published;
          // signUpform.description = formData.description;
          // signUpform.keywords = formData.keywords;
          // signUpform.link = formData.link;
          // signUpform.alias = formData.alias;
          signUpform.requireDentalHealthCoverage = true;
          signUpform.requireSpouseEmail = false;
          signUpform.warnRequiredDependantMedicalExam = false;
          // signUpform.useCreditCardPaymentMethod = formData.useCreditCardPaymentMethod;
          // signUpform.usePadPaymentMethod = formData.usePadPaymentMethod;
          // signUpform.isDemoForm = formData.isDemoForm;
          await this.SignupFormsRepository.updateById(formid, signUpform);
          await this.SignupFormsPlanLevelMappingRepository.deleteAll({ formId: formid });
        }
        else if (newType == CONST.SIGNUP_FORM.EXECUTIVE) {
          // let signUpform: SignupForms = new SignupForms();
          // signUpform.brokerId = formData.brokerId;
          signUpform.formType = CONST.SIGNUP_FORM.EXECUTIVE;
          signUpform.name = CONST.signupForm.name;
          // signUpform.published = formData.published;
          // signUpform.description = formData.description;
          // signUpform.keywords = formData.keywords;
          // signUpform.link = formData.link;
          // signUpform.alias = formData.alias;
          signUpform.requireDentalHealthCoverage = false;
          signUpform.requireSpouseEmail = true;
          signUpform.warnRequiredDependantMedicalExam = true;
          // signUpform.useCreditCardPaymentMethod = formData.useCreditCardPaymentMethod;
          // signUpform.usePadPaymentMethod = formData.usePadPaymentMethod;
          // signUpform.isDemoForm = formData.isDemoForm;
          let newform = await this.SignupFormsRepository.updateById(formid, signUpform);
          await this.SignupFormsPlanLevelMappingRepository.deleteAll({ formId: formid });
          let brokerSignUpformlevel: SignupFormsPlanLevelMapping = new SignupFormsPlanLevelMapping();
          brokerSignUpformlevel.formId = formid || 0;
          let planlevels = CONST.EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.concat(CONST.EXECUTIVE_HEALTH_PLAN_LEVELS)
          for (let planLevel of planlevels) {
            brokerSignUpformlevel.planlevelId = planLevel;
            await this.SignupFormsPlanLevelMappingRepository.create(brokerSignUpformlevel);
          }
        }
        else {
          let planLevesAfter: any;
          // let signUpform: SignupForms = new SignupForms();
          // signUpform.brokerId = formData.brokerId;
          signUpform.formType = CONST.SIGNUP_FORM.CUSTOM;
          // signUpform.published = formData.published;
          // signUpform.description = formData.description;
          // signUpform.keywords = formData.keywords;
          // signUpform.link = formData.link;
          // signUpform.alias = formData.alias;
          signUpform.requireDentalHealthCoverage = true;
          signUpform.requireSpouseEmail = false;
          signUpform.warnRequiredDependantMedicalExam = false;
          // signUpform.useCreditCardPaymentMethod = formData.useCreditCardPaymentMethod;
          // signUpform.usePadPaymentMethod = formData.usePadPaymentMethod;
          // signUpform.isDemoForm = formData.isDemoForm;
          let newform = await this.SignupFormsRepository.updateById(formid, signUpform);
          await this.SignupFormsPlanLevelMappingRepository.deleteAll({ formId: formid });
          //   await this.BrokerSignupFormsPlansRepository.deleteAll({ formId: formid });
          if (requestBody.nameOrId) {
            let plsInRequest = requestBody.planlevel;
            for (let pl of plsInRequest) {
              if (pl == "PocketPills") {
                pl = "Opt-In";
              }
              if (pl == "High-Cost Drugs (HCD)") {
                pl = 'High-Cost Drugs';
              }
              let palLevel: any = await this.PlanLevelRepository.findOne({
                where: {
                  and: [
                    { name: { like: `%${pl}%` } },
                    { published: '1' }
                  ]
                },
                // fields: { id: true }
              })
              if (palLevel) {
                await planLevesAfter.push(await palLevel.id)
              }
              // console.log(palLevel);
              // console.log("plan levels after id");
              // console.log(planLevels);
            }
          }
          else {
            planLevesAfter = planlevel;
          }
          if (planLevesAfter.length >= 0) {
            for (const pl of planLevesAfter) {
              let plkanLevels = await this.PlanLevelRepository.find({
                where: {
                  and: [
                    { or: [{ id: pl }, { parentId: pl }] },
                    { published: '1' }
                  ]
                }, fields: {
                  id: true
                }
              });
              if (!plkanLevels) {
                status = 202;
                message = "No plans found"
              }
              else {
                let brokerSignUpformlevel: SignupFormsPlanLevelMapping = new SignupFormsPlanLevelMapping();
                //let brokerSignupformsPlansObj: BrokerSignupFormsPlans = new BrokerSignupFormsPlans();
                // brokerSignupformsPlansObj.formId = formid || 0;
                brokerSignUpformlevel.formId = formid || 0;
                for (const planlevel of plkanLevels) {
                  brokerSignUpformlevel.planLevelId = planlevel.id || 0;
                  await this.SignupFormsPlanLevelMappingRepository.create(brokerSignUpformlevel);
                  let plans = await this.InsurancePlansRepository.find({ where: { planLevel: planlevel.id }, fields: { id: true } });

                  for (const plan of plans) {
                    //brokerSignupformsPlansObj.planId = plan.id || 0;
                    // console.log(brokerSignupformsPlansObj);
                    //  await this.BrokerSignupFormsPlansRepository.create(brokerSignupformsPlansObj);
                  }
                }
              }
            }
          }
        }
        status = 200;
        message = "Form modified successfully"
      }
      // }
    } catch (error) {
      status = 404;
      message = "error while modify the form"
    }
    this.response.status(status).send({
      status, message, date: new Date(), data,
    });
    return this.response;
  }
  @get(BROKER.BROKER_DETAILS)
  async brokerDetails(@param.path.number('brokerId') id: number): Promise<any> {
    let final: any = [];
    let responseObject, status: any;
    try {
      console.log("enter");
      let data = await this.BrokerRepository.findOne({
        where: { id: id }, include: [
          {
            relation: 'user', scope: {
              fields: { username: true }
            }
          }, { relation: 'contactInfo' }, { relation: 'brokerEoInsurance' },
          {
            relation: 'brokerLicensedStatesAndProvinces', scope: {
              include: [{ relation: 'stateFullDetails', scope: { fields: { name: true } } }]
            },
          },
          {
            relation: 'signupForms', scope: {
              include: [{
                relation: 'signupFormPlanLevels'
              }
                , { relation: 'customers', scope: { fields: { firstName: true, lastName: true, dob: true, gender: true, status: true, userId: true } } }]
            }
          }]
      });
      if (!data) {
        status = 201;
        responseObject = {
          status: 201,
          message: "No details found",
          date: new Date(),
          data: final
        }
      }
      else {
        status = 200;
        let dataArray: any = data;
        let userId = data.userId;
        let userDetails: any = "";
        if (userId == null || !userId) {
          userDetails = "";
        }
        responseObject = {
          status: 200,
          message: "Broker Details",
          date: new Date(),
          data: data
        }
      }
      this.response.status(status).send(responseObject);
    }
    catch (error) {
      console.log(error);
    }
    return this.response;
  }
  @get(BROKER.BROKER_FORMS)
  async brokerFormDetails(@param.path.number('brokerid') brokerid: number): Promise<any> {
    let status, message, data: any;
    try {
      let brokerRes = await this.BrokerRepository.findById(brokerid, { include: [{ relation: 'signupForms' }] });
      if (brokerRes) {
        data = brokerRes;
        if (brokerRes.signupForms.length == 0) {
          message = "No form details found";
          status = 200;
        }
        else {
          message = "Broker details";
          status = 200;
        }

      }
      else {
        status = 201;
        message = "No broker details found"
      }
    } catch (error) {
      status = 201;
      message = "No broker details found"
    }
    this.response.status(status).send({
      status, message, data
    })
    return this.response;
  }
  @get(BROKER.BROKER_FORM_DETAILS)
  async brokerFormbasedonIdDetails(@param.path.number('brokerid') brokerid: number, @param.path.number('formId') formId: number): Promise<any> {
    let status, message, data: any;
    try {
      let brokerSignupForms = await this.SignupFormsRepository.find({ where: { and: [{ id: formId }, { brokerId: brokerid }] } });
      if (brokerSignupForms) {
        let data = brokerSignupForms;
        status = 200;
        message = "Broker form details";
      }
      else {
        status = 201;
        message = "No details found";
      }
    } catch (error) {
      status = 201;
      message = "No broker details found"
    }
    this.response.status(status).send({
      status, message, data
    })
    return this.response;
  }
  @get(BROKER.BROKER_CUSTOMERS)
  async customersBasedonbrokerId(@param.path.number('brokerid') brokerid: number): Promise<any> {
    let status, message, data: any, error;
    try {
      let brokerSignupFormwithCustomers = await this.SignupFormsRepository.find({ where: { brokerId: brokerid }, include: [{ relation: 'customers' }] });
      if (brokerSignupFormwithCustomers.length > 0) {
        status = 200;
        message = "Customers details"
        data = brokerSignupFormwithCustomers;
      }
      else {
        status = 201;
        message = "No customers details found"
      }
    }
    catch (error) {
      status = 401,
        message = "Error",
        error = error.message
    }
    this.response.status(status).send({
      status, message, data, error
    })
    return this.response;
  }
  @get(BROKER.BROKER_CUSTOMER_DETAILS)
  async customerdetailsBasedonbrokerIdandCustomerId(@param.path.number('brokerid') brokerid: number, @param.path.number('customerId') customerId: number): Promise<any> {
    let status, message, data: any, error;
    try {
      let brokerSignupFormwithCustomers = await this.SignupFormsRepository.find({ where: { brokerId: brokerid }, include: [{ relation: 'customers' }] });
      let customerdetails = await this.SignupFormsRepository.customers(customerId).find({ where: { brokerId: brokerid } })

      if (customerdetails.length > 0) {
        status = 200;
        message = "Customer details";
        data = customerdetails;

      }
      else {
        status = 201;
        message = "No customer found"
      }
    }
    catch (error) {
      status = 401,
        message = "Error",
        error = error.message
    }
    this.response.status(status).send({
      status, message, data, error
    })
    return this.response;

  }
  @get(BROKER.BROKER_FORM_CUSTOMER_DETAILS)
  async customerDetailsBasedOnBrokerIdandFormId(
    @param.path.number('brokerid') brokerid: number,
    @param.path.number('customerId') customerId: number,
    @param.path.number('formId') formId: number
  ): Promise<any> {
    let status, message, data, error;
    try {
      let formDetailsBasedonFormIdandBrokerId = await this.SignupFormsRepository.customers(customerId).find({ where: { id: formId, brokerId: brokerid } })
      if (formDetailsBasedonFormIdandBrokerId.length > 0) {
        status = 200;
        message = "Custoemr details";
        data = formDetailsBasedonFormIdandBrokerId;
      }
      else {
        status = 201;
        message = `No custromers found on this customerid ${customerId}`
      }
    } catch (error) {
      status = 404;
      message = "Error " + error.message
    }
    this.response.status(status).send({
      status, message, data
    })
    return this.response;

  }
  @post(BROKER.SEARCH, {
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
  })
  async search(@requestBody({
    description: 'search filter for the customers',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            searchArray: {
              type: 'array',
              default: `[{"searchterm":"", "searchvalue":""},{"searchterm":"policyStartDate","searchvalue":{from:"", to:""}}]`
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
  }) apiRequest: any): Promise<any> {
    let status, message, data: any;
    try {
      let filter: any = { where: { and: [] }, fields: { policyStartDate: true, name: true, brokerType: true, logo: true, userId: true, contactId: true ,id:true}, limit: apiRequest.count };
      let searchArray = apiRequest.searchArray;
      for (const seatObj of searchArray) {
        let searchterm = seatObj.searchterm;
        let searchvalue = seatObj.searchvalue;
        if (searchterm == "policyStartDate") {
          let from = searchvalue.from != "" ? searchvalue.from : '2001-01-01';
          let to = searchvalue.to != "" ? searchvalue.to : moment().format('YYYY-MM-DD');
          filter.where.and.push({ "policyStartDate": { "between": [from, to] } })
          // filter.where.and.push({ and: [{ registrationDate: { gte: from } }, { registrationDate: { lt: to } }] })
          console.log(from, "***", to)
        }
        else {
          if (searchterm != "") {
            let obj: any = {};
            console.log(apiRequest.strictOrpartial)
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
      let customers: any = await this.BrokerRepository.find(filter);
      if (customers.length > 0) {
        status = 200;
        message = "Broker details"
        data = customers;
      }
      else {
        status = 201;
        message = "No details found"
      }
    }
    catch (error) {
      status = 400;
      message = "Error " + error.message
    }
    this.response.status(status).send({
      status, message, data
    })
    return this.response;
  }
  @post(BROKER.REGISTRATION, {
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
  })
  async broker_registration(
    @requestBody({
      description: "Registration details of a broker",
      content: {
        'multipart/form-data': {
          // Skip body parsing
          'x-parser': 'stream',
          schema: {
            //required: ['name', 'email'],
            type: 'object',
            properties: {

              // contact_type: {
              //   type: 'string',
              //   default: 'BROKER',
              // },
              name: {
                type: 'string',
                default: '',
              },
              brokerType: {
                type: 'string',
                default: 'BROKERAGE',
                enum: CONST.BROKER_TYPE_ARRAY,
              },
              email: {
                type: 'string',
                default: '',
              },
              secondary_email: {
                type: 'string',
                default: '',
              },
              logo: {
                type: 'string',
                format: 'binary'
              },

              useParentsLogo: {
                type: 'boolean',
                default: 'false',
              },
              parent_id: {
                type: 'number',
                default: '0',
              },
              parent_name: {
                type: 'string',
                default: '',
              },
              license: {
                // required: ['formType'],
                type: 'object',
                properties: {

                  provinces_ids: {
                    type: 'array',
                    items: {
                      type: 'number'

                    }
                  },
                  provinces_names: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  expiry_date: { type: 'string', default: new Date().toISOString().slice(0, 10) },
                  reminder_email: { type: 'number', default: '7', description: 'send a reminder x days before' },
                  licence_nums: { type: "array", default: "" }
                }
              },
              licenses: {
                required: [''],
                type: 'array',
                items: {
                  properties: {
                    provinces_id: { type: 'number', default: '0' },
                    provinces_name: { type: 'string', default: '' },
                    expiry_date: { type: 'string', default: new Date().toISOString().slice(0, 10) },
                    reminder_email: { type: 'number', default: '7', description: 'send a reminder x days before' },
                    license_num: { type: "array", default: "" },
                    license_coverage: { type: 'string', default: 'LIFE_ACCIDENT_AND_SICKNESS', enum: CONST.LICENSE_COVERAGE }
                  }
                }
              },
              sales_tracking_code: {
                type: 'string',
                default: '',
              },

              createSignupForm: {
                type: 'boolean',
                default: '',
              },
              formDetails: {
                required: ['formType'],
                type: 'array',
                items: {
                  properties: {
                    formType: { type: 'string', default: 'REGULAR', enum: CONST.FORM_TYPE_ARRAY, },
                    name: { type: 'string', default: 'Health Benefits Application Form' },
                    description: { type: 'string', default: '' },
                    link: { type: 'string', default: '' },
                    planLevels: { type: 'array', default: '' },
                  }
                }

              },
              EOinsurence: {
                type: 'object',
                default: { EOInsurense: '', EOCertificate: '', policy: '', EOIexpiryDate: new Date().toISOString().slice(0, 10) },
                items: {
                  properties: {
                    EOInsurense: {
                      type: 'string', default: ''
                    },
                    EOCertificate: {
                      type: 'string', default: ''
                    },
                    policy: {
                      type: 'string', default: ''
                    },
                    EOIexpiryDate: {
                      type: 'string', default: new Date().toISOString().slice(0, 10)
                    }
                  }
                }
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
  ): Promise<Response> {
    let message: string, status: string, statusCode: number, data: any = {};
    let p = new Promise<any>((resolve, reject) => {
      this.handler(request, response, err => {
        if (err) reject(err);
        else {
          resolve(FilesController.getFilesAndFields(request, 'brokerLogoUpload', {}));
          // const upload = FilesController.getFilesAndFields(request, 'brokerLogoUpload', { brokerid: broker_id });
        }
      });
    });
    p.then(async value => {
      let brokerId;
      let userId;
      let contId;
      let signupFormId;
      let adminBroker;
      console.log("entry")
      console.log(value)
      if (!value.fields) {
        this.response.status(422).send({
          status: '422',
          error: `Missing input fields`,
          message: MESSAGE.ERRORS.missingDetails,
          date: new Date(),
        });
        return this.response;
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
        let BroId: any;


        try {

          //validations
          let user: any;
          user = await this.UsersRepository.findOne({ where: { username: apiRequest.email } });
          if (user) {
            // this.response.status(409).send({
            //   error: `User with this email ${apiRequest.email} is already registered`,
            //   message: 'Account already exists, please contact the provider',
            //   date: new Date(),
            //   data: "Check users -- customers/brokers"
            // });
            // return this.response;
          }
          else {
            const todayDate = new Date().toISOString().slice(0, 10);
            let userData: Users = new Users();
            userData.username = apiRequest.email;
            userData.role = CONST.USER_ROLE.BROKER;
            let password = await generateRandomPassword()
            userData.password = await encryptPassword(password);
            // userData.activation = this.registrationService.getActivationCode();
            userData.activation = await getActivationCode();
            userData.block = true;
            userData.registrationDate = todayDate;
            user = await this.UsersRepository.create(userData);
            console.log(`user - ${user.id}`)
          }

          //Contact Info
          let contactInfoData: ContactInformation = new ContactInformation();
          contactInfoData.primaryEmail = apiRequest.email
          contactInfoData.secondaryEmail = apiRequest.secondary_email
          contactInfoData.primaryPhone = apiRequest.phone_number
          contactInfoData.secondaryPhone = apiRequest.secondary_phone
          contactInfoData.apt = apiRequest.apt;
          contactInfoData.line1 = apiRequest.street_address_line1
          contactInfoData.line2 = apiRequest.street_address_line2
          contactInfoData.city = apiRequest.city
          contactInfoData.state = apiRequest.province
          //contactInfoData.country = Buffer.from(apiRequest.country || ''); //varbinary
          contactInfoData.country = apiRequest.country || ''; //varchar
          contactInfoData.postalCode = apiRequest.postal_code
          contactInfoData.contactType = CONST.CONTACT_TYPE.BROKER;
          contactInfoData.addressType = CONST.ADDRESS_TYPE.HOME_ADDRESS;
          const contactInfoHOME = await this.ContactInformationRepository.create(contactInfoData);
          console.log(`contactInfoHOME - ${contactInfoHOME.id}`)
          //broker
          let brokerData: Broker = new Broker();


          //broker parent
          if (apiRequest.parent_id && apiRequest.parent_id != 0) {
            brokerData.parentId = apiRequest.parent_id;
            let parentBroker = await this.BrokerRepository.findById(apiRequest.parent_id)
            if (parentBroker) {
              brokerData.parentId = parentBroker.id;
              brokerData.description = parentBroker.name
              if (apiRequest.useParentsLogo) {
                brokerData.logo = parentBroker.logo;
                brokerData.link = parentBroker.link;
              }
            }

          } else if (apiRequest.parent_name && apiRequest.parent_name != '') {
            let parentBroker = await this.BrokerRepository.findOne({ where: { name: apiRequest.parent_name } })
            if (parentBroker) {
              brokerData.parentId = parentBroker.id;
              brokerData.description = parentBroker.name
              if (apiRequest.useParentsLogo) {
                brokerData.logo = parentBroker.logo;
                brokerData.link = parentBroker.link;
              }
            }
          }

          brokerData.name = apiRequest.name;
          brokerData.salesTrackingCode = apiRequest.sales_tracking_code
          brokerData.useCreditCardPaymentMethod = true;
          brokerData.usePadPaymentMethod = true;
          brokerData.published = true;
          brokerData.userId = user.id;
          brokerData.contactId = contactInfoHOME.id;
          brokerData.brokerType = apiRequest.brokerType || CONST.broker.brokerType
          brokerData.discoverable = true;
          brokerData.salesTrackingType = apiRequest.salesTrackingType || ' ';
          brokerData.settingsAllowGroupBenefitsWallet = apiRequest.settingsAllowGroupBenefitsWallet || 0;
          brokerData.settingsAllowInvoicePaymentMethod = apiRequest.settingsAllowInvoicePaymentMethod || 0;
          brokerData.settingsEnableTieredHealthBenefits = apiRequest.settingsEnableTieredHealthBenefits || 0;
          brokerData.settingsRolloverEmployeeLimitNextYear = apiRequest.settingsRolloverEmployeeLimitNextYear || 0;
          brokerData.useInvoicePaymentMethod = apiRequest.useInvoicePaymentMethod || false;
          const broker: any = await this.BrokerRepository.create(brokerData);
          //brokerData.logo=?
          let brokerAdmin: BrokerAdmins = new BrokerAdmins();
          brokerAdmin.brokerId = broker.id;
          brokerAdmin.userId = user.id || 0;
          adminBroker = await this.BrokerAdminsRepository.create(brokerAdmin);
          brokerId = broker.id;
          contId = broker.contactId;
          userId = broker.userId;
          console.log(`Broker - ${brokerId}`)

          //broker
          //broker_licensed_states_and_provinces
          let brokerLicensesArray: BrokerLicensedStatesAndProvinces[] = [];
          let brokerLicenses: BrokerLicensedStatesAndProvinces = new BrokerLicensedStatesAndProvinces();
          brokerLicenses.brokerId = brokerId || 0;
          let brokerLicensedProvinces = [];
          if (apiRequest.licenses) {
            apiRequest.licenses = JSON.parse(apiRequest.licenses);
            let brokerLicenses: BrokerLicensedStatesAndProvinces = new BrokerLicensedStatesAndProvinces();
            brokerLicenses.brokerId = brokerId || 0;
            let licenses = apiRequest.licenses;
            for (const license of licenses) {
              brokerLicenses.expiryDate = license.expiry_date
              brokerLicenses.reminderEmail = license.reminder_email
              brokerLicenses.licenseNumber = license.license_num
              brokerLicenses.licenseCoverage = license.license_coverage
              brokerLicenses.stateId = license.provinces_id;
              await this.BrokerLicensedStatesAndProvincesRepository.create(brokerLicenses);
            }
          }
          //handle form
          // if (apiRequest.EOCertificate && apiRequest.EOIexpiryDate && apiRequest.EOInsurense && apiRequest.policy) {

          if (apiRequest.EOinsurence) {
            let EoinsurenceObj: any = JSON.parse(apiRequest.EOinsurence);
            console.log(EoinsurenceObj.length);
            console.log(EoinsurenceObj.policy)
            console.log("eo insurence >>>>", EoinsurenceObj)
            console.log(typeof (EoinsurenceObj))
            console.log(typeof (apiRequest.EOinsurence))
            let EOInsurence: BrokerEoInsurance = new BrokerEoInsurance();
            EOInsurence.brokerId = broker?.id || 1;
            EOInsurence.certificateNumber = EoinsurenceObj.EOCertificate;
            EOInsurence.expiryDate = EoinsurenceObj.EOIexpiryDate;
            EOInsurence.insurerName = EoinsurenceObj.EOInsurense;
            EOInsurence.policyNumber = EoinsurenceObj.policy;

            await this.BrokerEoInsuranceRepository.create(EOInsurence);
          }
          if (apiRequest.createSignupForm) {
            //console.log("CONST.signupForm")
            // console.log(CONST.signupForm)
            //signup_form
            let signupFormData: SignupForms = new SignupForms();
            signupFormData.brokerId = broker?.id || 1;
            console.log(apiRequest.formDetails)
            console.log(typeof apiRequest.formDetails)
            apiRequest.formDetails = JSON.parse(apiRequest.formDetails)
            console.log(apiRequest.formDetails)
            console.log(typeof apiRequest.formDetails)
            console.log(apiRequest.formDetails.length)
            data.form = []
            console.log("form details in api", apiRequest.formDetails);
            for (const formDetails of apiRequest.formDetails) {
              console.log("entery ", formDetails)
              let link = await generateFormLink(user.id || 0)
              signupFormData.link = await this.checkAndGenerateNewFormLink(link, user.id || 0)//generate_random_lin and user_id

              let aliasLink = "";
              console.log(`apiRequest.form.link: ${formDetails.link}`)
              if (formDetails.link && formDetails.link != "") {
                aliasLink = ("/" + formDetails.link)
                console.log(`aliasLink1: ${aliasLink}`)
              } else {
                console.log(`broker.name: ${broker.name}`)
                aliasLink = "/" + broker.name?.toLowerCase().split(" ")[0]
                if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                  aliasLink += "_exec"
                }
                console.log(`aliasLink2: ${aliasLink}`)
              }
              signupFormData.alias = aliasLink
              if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                signupFormData.name = formDetails.name ?? CONST.signupFormExec.name
              } else {
                signupFormData.name = formDetails.name ?? CONST.signupForm.name
              }

              signupFormData.description = formDetails.description ?? CONST.signupForm.description
              signupFormData.title = formDetails.title ?? CONST.signupForm.title
              signupFormData.formType = formDetails.formType ?? CONST.signupForm.formType
              signupFormData.keywords = formDetails.keywords ?? CONST.signupForm.keywords
              // signupFormData.disclosureAgreement = formDetails.disclosureAgreement ?? CONST.signupForm.disclosure_agreement
              // signupFormData.termsOfService = formDetails.termsOfService ?? CONST.signupForm.terms_of_service



              signupFormData.inelligibilityPeriod = CONST.signupForm.ineligibilityPeriod
              signupFormData.published = CONST.signupForm.published

              if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                signupFormData.requireDentalHealthCoverage = false
                signupFormData.requireSpouseEmail = true
                signupFormData.warnRequiredDependantMedicalExam = true
              } else {
                signupFormData.requireDentalHealthCoverage = true
                signupFormData.requireSpouseEmail = false
                signupFormData.warnRequiredDependantMedicalExam = false
              }

              signupFormData.useCreditCardPaymentMethod = true
              signupFormData.usePadPaymentMethod = true

              signupFormData.isDemoForm = formDetails.isDemoform || false

              const signupForm = await this.SignupFormsRepository.create(signupFormData);
              console.log(signupForm);

              signupFormId = signupForm.id || 0;

              data.form.push(signupForm)
              console.log(`signupForm.id: ${signupForm.id}`)
              //broker_signup_forms_plans
              // let signupFormPlansArray: BrokerSignupFormsPlans[] = [];
              // let signupFormPlans: BrokerSignupFormsPlans = new BrokerSignupFormsPlans();
              // signupFormPlans.formId = signupForm.id || 0;

              if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                //get executive plan ids ---> package_id=5

                let executivePlans = await this.InsurancePlansRepository.find({ where: { packageId: CONST.EXECUTIVE_PACKAGE_ID } })
                let executivePlanlevelObj: SignupFormsPlanLevelMapping = new SignupFormsPlanLevelMapping();
                executivePlanlevelObj.formId = signupForm.id || 0;
                let executivePlanlevelArray: any = [];
                for (const executivePlan of executivePlans) {
                  // signupFormPlans.planId = executivePlan.id || 0
                  // console.log(`before push`)
                  // console.log(signupFormPlans);
                  // signupFormPlansArray.push(signupFormPlans)
                  // await this.BrokerSignupFormsPlansRepository.create(signupFormPlans);
                  if (!executivePlanlevelArray.includes(executivePlan.planLevel)) {
                    executivePlanlevelArray.push(executivePlan.planLevel);
                  }
                }
                for (const executivePlanLevel of executivePlanlevelArray) {
                  executivePlanlevelObj.planLevelId = executivePlanLevel;
                  await this.SignupFormsPlanLevelMappingRepository.create(executivePlanlevelObj);
                }
                // console.log(`signupFormPlansArray: ${signupFormPlansArray.length}`)
              }
              if (formDetails.formType == CONST.SIGNUP_FORM.CUSTOM) {
                let planLevels = formDetails.planLevels;
                let customPlanlevelObj: SignupFormsPlanLevelMapping = new SignupFormsPlanLevelMapping();
                customPlanlevelObj.formId = signupForm.id || 0;
                for (const pl of planLevels) {
                  customPlanlevelObj.planLevelId = pl;
                  await this.SignupFormsPlanLevelMappingRepository.create(customPlanlevelObj);
                }
                // for (const pl of planLevels) {
                //   let planLevelsInRepo = await this.PlanLevelRepository.find({
                //     where: {
                //       and: [
                //         { or: [{ id: pl }, { parentId: pl }] },
                //         { published: '1' }
                //       ]
                //     }, fields: {
                //       id: true
                //     }
                //   });
                //   if (planLevelsInRepo) {
                //     console.log("plan", planLevelsInRepo);
                //     for (const planlevelloop of planLevelsInRepo) {
                //       let countofsignupformplanlevelcondition = await this.SignupFormsPlanLevelMappingRepository.count({ and: [{ formId: signupForm.id }, { planlevelId: planlevelloop.id }] })
                //       console.log(countofsignupformplanlevelcondition);
                //       if (countofsignupformplanlevelcondition.count > 0)// console.log("plan levels", planlevel);
                //       { }
                //       else {
                //         customPlanlevelObj.planLevelId = planlevelloop.id || 0;
                //         let bsfl = await this.SignupFormsPlanLevelMappingRepository.create(customPlanlevelObj);
                //         console.log("bsfl>>>>>", bsfl);
                //       }
                //     }
                //   }
                // }

              }
            }//forms

          }

          //handle logo
          if (value.files) {
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
                await this.BrokerRepository.updateById(brokerId, {
                  logo: BROKERPATH_STRING + filename,
                  link: BROKERPATH_STRING + modfilename
                })
                message = 'Broker logo is set'
                status = '200'
              } else {
                console.log('no broker with given id');
                message = 'No broker found'
                status = '202'
              }
            } else {
              console.log(`No logo needed`)
            }

          }

          data.broker = broker;

          message = 'Broker registration successful';
          status = '200';
          statusCode = 200;

        } catch (error) {
          console.error(error);
          message = 'Broker registration failed'
          status = '202';
          statusCode = 202
          await this.BrokerAdminsRepository.deleteAll({and:[{brokerId:brokerId},{userId:userId}]});
          await this.BrokerLicensedStatesAndProvincesRepository.deleteAll({ brokerId: brokerId })
          // await this.BrokerSignupFormsPlansRepository.deleteAll({ brokerId: brokerId });
          await this.SignupFormsPlanLevelMappingRepository.deleteAll({ formId: signupFormId });
          await this.BrokerEoInsuranceRepository.deleteAll({ brokerId: brokerId });
          await this.ContactInformationRepository.deleteById(contId);
          await this.BrokerLicensedStatesAndProvincesRepository.deleteAll({ brokerId: brokerId });
          await this.UsersRepository.deleteById(userId);
          await this.SignupFormsRepository.deleteAll({ brokerId: brokerId });         
          await this.BrokerRepository.deleteById(brokerId);
        }

      }

      this.response.status(parseInt(status)).send({
        status: status,
        message: message,
        date: new Date(),
        data: data
      });

    })
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
  @get(BROKER.APP)
  async app(): Promise<any> {
    let data: any = { "name": constants.name, "version": constants.version, "NodeVersion": process.versions.node, "NpmVersion": constants.npm_version };
    let responseData =
    {
      "statusCode": 200,
      "message": "The project details",
      "AppData": data
    };
    return responseData;
  }
}
