// Uncomment these imports to begin using these cool features!

import { inject } from "@loopback/core";
import { repository } from "@loopback/repository";
import { del, get, getModelSchemaRef, param, post, put, Request, requestBody, Response, response, RestBindings } from "@loopback/rest";
import { publicEncrypt, sign } from "crypto";
import { includes } from "lodash";
import { FILE_UPLOAD_SERVICE } from "../keys";
import { BROKERPATH_STRING } from "../paths";
import { BrokerRepository, BrokerLicensedStatesAndProvincesRepository, InsurancePlansRepository, SignupFormsRepository, BrokerSignupFormsPlansRepository, StatesAndProvincesRepository, BrokerSignupformsPlanlevelsRepository, TieredRebatesDataRepository, TieredRebatesRepository, UsersRepository, ContactInformationRepository, CustomerSignupRepository, CustomerRepository, PlanLevelRepository, BrokerEoInsuranceRepository } from '../repositories'
import { FileUploadHandler } from "../types";
import { FilesController } from "./files.controller";
import * as CONST from '../constants'
import * as MESSAGE from '../messages'
import { Broker, BrokerEoInsurance, BrokerLicensedStatesAndProvinces, BrokerSignupformsPlanlevels, BrokerSignupFormsPlans, ContactInformation, SignupForms, Users } from "../models";
import { encryptPassword, generateFormLink, generateRandomPassword, getActivationCode } from "../common-functions";
import { query } from "express";
import { request, STATUS_CODES } from "http";
import { authenticate } from "@loopback/authentication";
export class BrokerController {
  constructor(
    @repository(BrokerRepository)
    public BrokerRepository: BrokerRepository,
    @repository(BrokerLicensedStatesAndProvincesRepository)
    public BrokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository,
    @repository(BrokerSignupFormsPlansRepository)
    public BrokerSignupFormsPlansRepository: BrokerSignupFormsPlansRepository,
    @repository(BrokerSignupformsPlanlevelsRepository)
    public BrokerSignupformsPlanlevelsRepository: BrokerSignupformsPlanlevelsRepository,
    @repository(TieredRebatesDataRepository)
    public TieredRebatesDataRepository: TieredRebatesDataRepository,
    @repository(TieredRebatesRepository)
    public TieredRebatesRepository: TieredRebatesRepository,
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
  ) { }
  @get('/admin/broker')
  @response(200, {
    description: 'List of customers',
  })
  async getBroker(): Promise<any> {
    try {
      let final: any = [];
      console.log(">>>>>1 st");
      let data = await this.BrokerRepository.find({
        where: {}, fields: {
          name: true,
          userId: true,
          parentId: true,
          logo: true,
          published: true,
          brokerType: true,
          description: true,
          salesTrackingCode: true,
          usePadPaymentMethod: true,
          user_id: true
        }, include: [{
          relation: 'user',
          scope: {
            fields: { username: true }
          }
        }]
      });

      // // console.log("data>>>", data);
      // for (let i = 0; i < data.length; i++) {
      //   let dataArray: any = data[i];
      //   let userId = dataArray.userId;
      //   // console.log("userid", userId);
      //   let userDetails: any = "";
      //   if (userId == null || !userId) {
      //     userDetails = "";
      //   }
      //   else {
      //     userDetails = await this.UsersRepository.findOne({ where: { id: userId }, fields: { username: true } });
      //     // console.log("ud", userDetails);
      //   }
      //   dataArray['emailId'] = userDetails
      //   final.push(dataArray)
      // }
      const responseObject = {
        status: 200,
        message: "List of primary details",
        date: new Date(),
        data: data
      }
      // this.response.status(parseInt("200")).send(responseObject);
      // return this.response;
      return responseObject;
    }
    catch (err) {
      console.log(err);
    }
  }
  @get('/admin/broker/{id}')
  async brokerDetailsBasedonId(@param.path.number('id') id: number) {
    let final: any = [];
    let responseObject, status: any;
    try {
      let data = await this.BrokerRepository.findOne({ where: { id: id } });
      if (!data) {
        status = 201;
        responseObject = {
          status: 200,
          message: "List of primary details",
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
        else {
          userDetails = await this.UsersRepository.findOne({ where: { id: userId }, fields: { username: true } });
          dataArray['emailId'] = userDetails
        }
        let contactInfo = await this.ContactInformationRepository.find({ where: { id: data.contactId }, fields: { primaryEmail: true, primaryPhone: true, addressType: true, apt: true, line1: true, city: true, state: true, country: true } });
        if (contactInfo) {
          final.push(contactInfo);
        }
        final.push(dataArray);
        responseObject = {
          status: 200,
          message: "List of primary details",
          date: new Date(),
          data: final
        }

      }
      this.response.status(status).send(responseObject);
      return this.response;
    }
    catch (error) {
      console.log(error);

    }
  }
  @get('/admin/broker/customerlist/{id}')
  async custmerCount(@param.path.number('id') id: number): Promise<any> {
    try {
      let customers: any = "";
      let customerCount: any = "";
      let final: any = [];
      let signUpForms = await this.SignupFormsRepository.find({ where: { brokerId: id }, fields: { id: true } });
      for (const signUpform of signUpForms) {
        let custmrSignups = await this.CustomerSignupRepository.find({ where: { formId: signUpform.id }, fields: { customerId: true } });
        customerCount = await this.CustomerSignupRepository.count({ where: { formId: signUpform.id } });
        for (const custmrSignup of custmrSignups) {
          customers = await this.CustomerRepository.findById(custmrSignup.customerId, { fields: { firstName: true, lastName: true } });
          final.push(customers);
        }
      }
      let responseObj = {
        "statusCode": 200,
        "message": "List of customers and count",
        customerCount,
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
  @post('/broker/{brokerid}/logo', {

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

    @requestBody.file()

    request: Request,

    @inject(RestBindings.Http.RESPONSE) response: Response,

  ): Promise<Response> {

    let message: string, status: string, data: any = {};



    let p = new Promise<any>((resolve, reject) => {

      this.handler(request, response, err => {

        if (err) reject(err);

        else {

          resolve(FilesController.getFilesAndFields(request, 'brokerLogoUpload', { brokerid: broker_id }));

          //const upload = FilesController.getFilesAndFields(request, 'brokerLogoUpload', {brokerid: broker_id});
        }

      });

    });


    p.then(async value => {

      if (value.files) {

        console.log(value.files.length)

        console.log(value.files[0].originalname)

        let filename = value.files[0].originalname

        let modfilenameArr = filename.split(".")

        let modfilename = modfilenameArr[0] + "0." + modfilenameArr[1]



        const broker = await this.BrokerRepository.findById(broker_id);

        if (broker) {

          await this.BrokerRepository.updateById(broker_id, {

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

      }

    })



    p.catch(onrejected => {

      message = 'Broker logo is not set'

      status = '202'

    })



    this.response.status(parseInt('200')).send({

      status: '200',

      message: 'Broker logo',

      date: new Date(),

      data: data

    });

    return this.response;

  }
  @post('/broker/registration', {
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
                //required: ['formType'],
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
                    // name: {type: 'string', default: 'Health Benefits Application Form'},
                    // description: {type: 'string', default: ''},
                    link: { type: 'string', default: '' },
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



        try {

          //validations
          const emailExists = await this.UsersRepository.findOne({ where: { username: apiRequest.email } });

          if (emailExists) {

            this.response.status(409).send({
              error: `User with this email ${apiRequest.email} is already registered`,
              message: 'Account already exists, please contact the provider',
              date: new Date(),
              data: "Check users -- customers/brokers"
            });
            return this.response;
          }

          const todayDate = new Date().toISOString().slice(0, 10);
          //User
          let userData: Users = new Users();
          userData.username = apiRequest.email;
          userData.role = CONST.USER_ROLE.BROKER;
          let password = await generateRandomPassword()
          userData.password = await encryptPassword(password);
          // userData.activation = this.registrationService.getActivationCode();
          userData.activation = await getActivationCode();
          userData.block = true;
          userData.registrationDate = todayDate;
          const user = await this.UsersRepository.create(userData);
          console.log(`user - ${user.id}`)

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
          const broker = await this.BrokerRepository.create(brokerData);
          //brokerData.logo=?

          brokerId = broker.id;
          console.log(`Broker - ${brokerId}`)

          //broker
          //broker_licensed_states_and_provinces
          let brokerLicensesArray: BrokerLicensedStatesAndProvinces[] = [];
          let brokerLicenses: BrokerLicensedStatesAndProvinces = new BrokerLicensedStatesAndProvinces();
          brokerLicenses.brokerId = brokerId || 0;


          let brokerLicensedProvinces = [];
          if (apiRequest.license) {
            apiRequest.license = JSON.parse(apiRequest.license)
            brokerLicenses.expiryDate = apiRequest.license.expiry_date
            brokerLicenses.reminderEmail = apiRequest.license.reminder_email

            if (apiRequest.license.provinces_ids && apiRequest.license.provinces_ids.length > 0) {
              brokerLicensedProvinces = apiRequest.license.provinces_ids
            } else if (apiRequest.license.provinces_names && apiRequest.license.provinces_names.length > 0) {
              let provinces = await this.StatesAndProvincesRepository.find({
                where: {
                  or: [
                    { shortName: { inq: apiRequest.license.provinces_names } },
                    { name: { inq: apiRequest.license.provinces_names } }
                  ]
                }
              })

              console.log(provinces);

              for (const province of provinces) {
                brokerLicensedProvinces.push(province.id);
              }
            }

            for (const brokerLicensedProvince of brokerLicensedProvinces) {
              brokerLicenses.stateId = brokerLicensedProvince;
              console.log(`before push`)
              console.log(brokerLicenses);
              brokerLicensesArray.push(brokerLicenses)
              await this.BrokerLicensedStatesAndProvincesRepository.create(brokerLicenses);
            }

            console.log(`brokerLicensesArray: ${brokerLicensesArray.length}`)
            // if (brokerLicensesArray.length > 0)
            //   await this.brokerLicensedProvincesRepo.create(brokerLicensesArray);
          }


          //handle form
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
            for (const formDetails of apiRequest.formDetails) {

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

              data.form.push(signupForm)
              console.log(`signupForm.id: ${signupForm.id}`)
              //broker_signup_forms_plans
              let signupFormPlansArray: BrokerSignupFormsPlans[] = [];
              let signupFormPlans: BrokerSignupFormsPlans = new BrokerSignupFormsPlans();
              signupFormPlans.formId = signupForm.id || 0;

              if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                //get executive plan ids ---> package_id=5

                let executivePlans = await this.InsurancePlansRepository.find({ where: { packageId: CONST.EXECUTIVE_PACKAGE_ID } })
                let executivePlanlevelObj: BrokerSignupformsPlanlevels = new BrokerSignupformsPlanlevels();
                executivePlanlevelObj.formId = signupForm.id || 0;
                let executivePlanlevelArray: any = [];
                for (const executivePlan of executivePlans) {
                  signupFormPlans.planId = executivePlan.id || 0
                  // console.log(`before push`)
                  // console.log(signupFormPlans);
                  signupFormPlansArray.push(signupFormPlans)
                  await this.BrokerSignupFormsPlansRepository.create(signupFormPlans);
                  if (!executivePlanlevelArray.includes(executivePlan.planLevel)) {
                    executivePlanlevelArray.push(executivePlan.planLevel);
                  }
                }
                for (const executivePlanLevel of executivePlanlevelArray) {
                  executivePlanlevelObj.planlevelId = executivePlanLevel;
                  await this.BrokerSignupformsPlanlevelsRepository.create(executivePlanlevelObj);
                }
                console.log(`signupFormPlansArray: ${signupFormPlansArray.length}`)
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
  @post('/broker/{brokerId}/createForm', {
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
  async broker_create_form(
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

        data.form.push(signupForm)
        console.log(`signupForm.id: ${signupForm.id}`)
        //broker_signup_forms_plans
        let signupFormPlansArray: BrokerSignupFormsPlans[] = [];
        let signupFormPlans: BrokerSignupFormsPlans = new BrokerSignupFormsPlans();
        signupFormPlans.formId = signupForm.id || 0;

        if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
          //get executive plan ids ---> package_id=5

          let executivePlans = await this.InsurancePlansRepository.find({ where: { packageId: CONST.EXECUTIVE_PACKAGE_ID } })
          let executivePlanlevel: BrokerSignupformsPlanlevels = new BrokerSignupformsPlanlevels();
          executivePlanlevel.formId = signupForm.id || 0;
          for (const executivePlan of executivePlans) {
            signupFormPlans.planId = executivePlan.id || 0
            // console.log(`before push`)
            // console.log(signupFormPlans);
            signupFormPlansArray.push(signupFormPlans)
            await this.BrokerSignupFormsPlansRepository.create(signupFormPlans);
          }
          for (const executivePlan of executivePlans) {
            executivePlanlevel.planlevelId = executivePlan.id || 0;
            await this.BrokerSignupformsPlanlevelsRepository.create(executivePlanlevel);
          }
          console.log(`signupFormPlansArray: ${signupFormPlansArray.length}`)

          // if (signupFormPlansArray.length > 0) {
          //   console.log(signupFormPlansArray[0])
          //   console.log(signupFormPlansArray[1])
          //   await this.brokerSignupFormPlansRepository.create(signupFormPlansArray);
          // }

        }
      }//forms

      message = `Signup Form for ${broker.name} is created successfully`;
      status = '200';
      statusCode = 200;

    } catch (error) {
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
  @del('/broker/form/{formId}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'delete form',
      },
    },
  })
  async deleteForm(@param.path.number('formId') formId: number): Promise<any> {
    // let unPublish: number = 0;
    try {
      await this.BrokerSignupformsPlanlevelsRepository.deleteAll({ where: { formId: formId } });
      await this.SignupFormsRepository.updateById(formId, { published: false });
    }
    catch (error) {
      console.log(error);
    }
  }
  @del('/broker/brokerForm')
  async deleteBrokerForm(@param.path.number('id') id: number): Promise<any> {
    let brokerForms = await this.SignupFormsRepository.find({ where: { brokerId: id } });
    for (const form of brokerForms) {
      await this.BrokerSignupformsPlanlevelsRepository.deleteAll({ where: { formId: form.id } });
    }
    await this.SignupFormsRepository.deleteAll({ where: { brokerId: id } });
  }
  // @post('/broker/updateLogo')
  // async brokerLogoUpdate(
  //   @requestBody({
  //     description: "Registration details of a broker",
  //     content: {
  //       'multipart/form-data': {
  //         // Skip body parsing
  //         'x-parser': 'stream',
  //         schema: {
  //           type: 'object',
  //           properties: {
  //             logo: {
  //               type: 'string',
  //               format: 'binary'
  //             },

  //           }

  //         }
  //       }
  //     }

  //   })
  //   request: Request,
  //   @inject(RestBindings.Http.RESPONSE) response: Response,
  // ): Promise<any> {
  //   let message: string, status: string, statusCode: number, data: any = {};
  //   let p = new Promise<any>((resolve, reject) => {
  //     this.handler(request, response, err => {
  //       if (err) reject(err);
  //       else {
  //         resolve(FilesController.getFilesAndFields(request, 'brokerLogoUpload', {}));
  //         // const upload = FilesController.getFilesAndFields(request, 'brokerLogoUpload', { brokerid: broker_id });

  //       }
  //     });
  //   });
  //   p.then(async value => {
  //   });
  //   p.catch(onrejected => {
  //     message = 'Broker logo is not set'
  //     status = '202'
  //     this.response.status(parseInt(status)).send({
  //       status: status,
  //       message: message,
  //       date: new Date(),
  //       data: data
  //     });
  //   })

  // }
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

        //console.log(form);

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



        data['default_language'] = languageDetails.slug //term

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
  @post('/broker/form/{formid}/modify')
  @response(200, {
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  async modifyForm(@param.path.number('formid') formid: number, @requestBody(
    {
      content: {
        'application/json': {
          schema: {
            type: 'object'
          }
        }
      }
    }
  ) requestBody: {
    newType: string,
    planlevel?: Array<number>,
    oldType: string,
  }): Promise<Response> {
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
      if (oldType == newType) {
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
          await this.BrokerSignupformsPlanlevelsRepository.deleteAll({ where: { formid: formid } });
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
          await this.BrokerSignupformsPlanlevelsRepository.deleteAll({ where: { formid: formid } });
          let brokerSignUpformlevel: BrokerSignupformsPlanlevels = new BrokerSignupformsPlanlevels();
          brokerSignUpformlevel.formId = formid || 0;
          let planlevels = CONST.EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.concat(CONST.EXECUTIVE_HEALTH_PLAN_LEVELS)
          for (const planLevel of planlevels) {
            brokerSignUpformlevel.planlevelId = planLevel;
            await this.BrokerSignupformsPlanlevelsRepository.create(brokerSignUpformlevel);
          }
        }
        else {
          // let signUpform: SignupForms = new SignupForms();
          // signUpform.brokerId = formData.brokerId;
          signUpform.formType = CONST.SIGNUP_FORM.EXECUTIVE;
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
          await this.BrokerSignupformsPlanlevelsRepository.deleteAll({ where: { formid: formid } });
          if (planlevel.length >= 0) {
            for (const pl of planlevel) {
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
                let brokerSignUpformlevel: BrokerSignupformsPlanlevels = new BrokerSignupformsPlanlevels();
                brokerSignUpformlevel.formId = formid || 0;
                for (const planlevel of plkanLevels) {
                  brokerSignUpformlevel.planlevelId = planlevel.id || 0;
                  await this.BrokerSignupformsPlanlevelsRepository.create(brokerSignUpformlevel);
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
  @put('/broker/{brokerId}/updateContactInfo')
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
  @put('/broker/updateLicence/State')
  @response(200, {
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  async updateLiceceState(@requestBody({
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  }) requestBody: {
    states: Array<number>,
  }): Promise<any> {
    let status, message, date: any = {};
    if (requestBody.states.length > 0) {

    }
    else {
      status = 201;
      message = "Send states"
    }

  }
  @put('/broker/updateLicenceEO')
  @response(200, {
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  async updateEO(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(BrokerEoInsurance, {
          exclude: ['id']
        })
      }
    }
  }) BrokerEoInsurance: Omit<BrokerEoInsurance, 'id'>): Promise<any> {

  }
  @put('/broker/updateLicence/State')
  @response(200, {
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  async updateLiceceNum(): Promise<any> {

  }
  @del('/broker/{brokerId}')
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
        await this.BrokerSignupformsPlanlevelsRepository.deleteAll({ where: { formId: signupForm.id } })
      }
      await this.ContactInformationRepository.deleteAll({ where: { id: brokerId } });
      await this.BrokerLicensedStatesAndProvincesRepository.deleteAll({ where: { brokerId: brokerId } })
      await this.BrokerEoInsuranceRepository.deleteAll({ where: { brokerId: brokerId } });
      await this.SignupFormsRepository.deleteAll({ where: { brokerId: brokerId } });
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
}
