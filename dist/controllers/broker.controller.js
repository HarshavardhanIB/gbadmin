"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const keys_1 = require("../keys");
const paths_1 = require("../paths");
const repositories_1 = require("../repositories");
const files_controller_1 = require("./files.controller");
const CONST = tslib_1.__importStar(require("../constants"));
const MESSAGE = tslib_1.__importStar(require("../messages"));
const models_1 = require("../models");
const common_functions_1 = require("../common-functions");
const validation = tslib_1.__importStar(require("../services/validation.services"));
const services_1 = require("../services");
let BrokerController = class BrokerController {
    constructor(BrokerRepository, BrokerLicensedStatesAndProvincesRepository, BrokerSignupFormsPlansRepository, BrokerSignupformsPlanlevelsRepository, TieredRebatesDataRepository, TieredRebatesRepository, UsersRepository, ContactInformationRepository, SignupFormsRepository, StatesAndProvincesRepository, CustomerSignupRepository, CustomerRepository, InsurancePlansRepository, PlanLevelRepository, BrokerEoInsuranceRepository, response, handler, http, img) {
        this.BrokerRepository = BrokerRepository;
        this.BrokerLicensedStatesAndProvincesRepository = BrokerLicensedStatesAndProvincesRepository;
        this.BrokerSignupFormsPlansRepository = BrokerSignupFormsPlansRepository;
        this.BrokerSignupformsPlanlevelsRepository = BrokerSignupformsPlanlevelsRepository;
        this.TieredRebatesDataRepository = TieredRebatesDataRepository;
        this.TieredRebatesRepository = TieredRebatesRepository;
        this.UsersRepository = UsersRepository;
        this.ContactInformationRepository = ContactInformationRepository;
        this.SignupFormsRepository = SignupFormsRepository;
        this.StatesAndProvincesRepository = StatesAndProvincesRepository;
        this.CustomerSignupRepository = CustomerSignupRepository;
        this.CustomerRepository = CustomerRepository;
        this.InsurancePlansRepository = InsurancePlansRepository;
        this.PlanLevelRepository = PlanLevelRepository;
        this.BrokerEoInsuranceRepository = BrokerEoInsuranceRepository;
        this.response = response;
        this.handler = handler;
        this.http = http;
        this.img = img;
    }
    async getBroker() {
        try {
            let final = [];
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
            };
            // this.response.status(parseInt("200")).send(responseObject);
            // return this.response;
            return responseObject;
        }
        catch (err) {
            console.log(err);
        }
    }
    async brokerDetailsBasedonId(id) {
        let final = [];
        let responseObject, status;
        try {
            let data = await this.BrokerRepository.findOne({ where: { id: id } });
            if (!data) {
                status = 201;
                responseObject = {
                    status: 200,
                    message: "List of primary details",
                    date: new Date(),
                    data: final
                };
            }
            else {
                status = 200;
                let dataArray = data;
                let userId = data.userId;
                let userDetails = "";
                if (userId == null || !userId) {
                    userDetails = "";
                }
                else {
                    userDetails = await this.UsersRepository.findOne({ where: { id: userId }, fields: { username: true } });
                    dataArray['emailId'] = userDetails;
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
                };
            }
            this.response.status(status).send(responseObject);
            return this.response;
        }
        catch (error) {
            console.log(error);
        }
    }
    async custmerCount(id) {
        try {
            let customers = "";
            let customerCount = "";
            let final = [];
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
            };
            return responseObj;
        }
        catch (error) {
            console.log(error);
        }
    }
    static async newBroker(request, method, others) {
        console.log(request);
        const uploadedFiles = request.files;
        const uploadedFields = request.body;
        //console.log(uploadedFields)
        const mapper = (f) => ({
            fieldname: f.fieldname,
            originalname: f.originalname,
            encoding: f.encoding,
            mimetype: f.mimetype,
            size: f.size,
        });
        let files = [];
        if (Array.isArray(uploadedFiles)) {
            files = uploadedFiles.map(mapper);
        }
        else {
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
    async brokerLogoUpload(broker_id, resize, request, response) {
        let message, status, data = {};
        let p = new Promise((resolve, reject) => {
            this.handler(request, response, err => {
                if (err)
                    reject(err);
                else {
                    resolve(files_controller_1.FilesController.getFilesAndFields(request, 'brokerLogoUpload', { brokerid: broker_id }));
                    //const upload = FilesController.getFilesAndFields(request, 'brokerLogoUpload', {brokerid: broker_id});
                }
            });
        });
        p.then(async (value) => {
            if (value.files) {
                console.log(value.files.length);
                console.log(value.files[0].originalname);
                let filename = value.files[0].originalname;
                let modfilenameArr = filename.split(".");
                let modfilename = modfilenameArr[0] + "0." + modfilenameArr[1];
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>" + resize);
                if (resize) {
                    let resizeimg = await this.img.resizeImg(filename.replace(/[\])}[{(]/g, '').replace(/ /g, ''));
                    console.log("the resizeimg >>>>>>>>>>>>", resizeimg);
                }
                else {
                }
                const broker = await this.BrokerRepository.findById(broker_id);
                console.log(broker);
                if (broker) {
                    await this.BrokerRepository.updateById(broker_id, {
                        logo: paths_1.BROKERPATH_STRING + filename.replace(/[\])}[{(]/g, '').replace(/ /g, ''),
                        link: paths_1.BROKERPATH_STRING + modfilename
                    });
                    //method
                    let url = process.env.MAINAPI + `/api/customer/broker/${broker_id}/logo`;
                    let pathImg = paths_1.BROKERIMG_RESOURCES_FOLDER + "/" + filename.replace(/[\])}[{(]/g, '').replace(/ /g, '');
                    const fetchStatus = await this.http.fetchMultipartFormdata(url, pathImg);
                    console.log("fetchStatus >> status", fetchStatus);
                    message = 'Broker logo is set';
                    status = '200';
                }
                else {
                    console.log('no broker with given id');
                    message = 'No broker found';
                    status = '202';
                }
            }
        });
        p.catch(onrejected => {
            message = 'Broker logo is not set';
            status = '202';
        });
        this.response.status(parseInt('200')).send({
            status: '200',
            message: 'Broker logo',
            date: new Date(),
            data: data
        });
        return this.response;
    }
    async broker_registration(request, response) {
        let message, status, statusCode, data = {};
        let p = new Promise((resolve, reject) => {
            this.handler(request, response, err => {
                if (err)
                    reject(err);
                else {
                    resolve(files_controller_1.FilesController.getFilesAndFields(request, 'brokerLogoUpload', {}));
                    // const upload = FilesController.getFilesAndFields(request, 'brokerLogoUpload', { brokerid: broker_id });
                }
            });
        });
        p.then(async (value) => {
            var _a, _b, _c, _d, _e, _f, _g;
            let brokerId;
            let userId;
            let contId;
            let signupFormId;
            console.log("entry");
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
                let BroId;
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
                    let userData = new models_1.Users();
                    userData.username = apiRequest.email;
                    userData.role = CONST.USER_ROLE.BROKER;
                    let password = await (0, common_functions_1.generateRandomPassword)();
                    userData.password = await (0, common_functions_1.encryptPassword)(password);
                    // userData.activation = this.registrationService.getActivationCode();
                    userData.activation = await (0, common_functions_1.getActivationCode)();
                    userData.block = true;
                    userData.registrationDate = todayDate;
                    const user = await this.UsersRepository.create(userData);
                    console.log(`user - ${user.id}`);
                    //Contact Info
                    let contactInfoData = new models_1.ContactInformation();
                    contactInfoData.primaryEmail = apiRequest.email;
                    contactInfoData.secondaryEmail = apiRequest.secondary_email;
                    contactInfoData.primaryPhone = apiRequest.phone_number;
                    contactInfoData.secondaryPhone = apiRequest.secondary_phone;
                    contactInfoData.apt = apiRequest.apt;
                    contactInfoData.line1 = apiRequest.street_address_line1;
                    contactInfoData.line2 = apiRequest.street_address_line2;
                    contactInfoData.city = apiRequest.city;
                    contactInfoData.state = apiRequest.province;
                    //contactInfoData.country = Buffer.from(apiRequest.country || ''); //varbinary
                    contactInfoData.country = apiRequest.country || ''; //varchar
                    contactInfoData.postalCode = apiRequest.postal_code;
                    contactInfoData.contactType = CONST.CONTACT_TYPE.BROKER;
                    contactInfoData.addressType = CONST.ADDRESS_TYPE.HOME_ADDRESS;
                    const contactInfoHOME = await this.ContactInformationRepository.create(contactInfoData);
                    console.log(`contactInfoHOME - ${contactInfoHOME.id}`);
                    //broker
                    let brokerData = new models_1.Broker();
                    //broker parent
                    if (apiRequest.parent_id && apiRequest.parent_id != 0) {
                        brokerData.parentId = apiRequest.parent_id;
                        let parentBroker = await this.BrokerRepository.findById(apiRequest.parent_id);
                        if (parentBroker) {
                            brokerData.parentId = parentBroker.id;
                            brokerData.description = parentBroker.name;
                            if (apiRequest.useParentsLogo) {
                                brokerData.logo = parentBroker.logo;
                                brokerData.link = parentBroker.link;
                            }
                        }
                    }
                    else if (apiRequest.parent_name && apiRequest.parent_name != '') {
                        let parentBroker = await this.BrokerRepository.findOne({ where: { name: apiRequest.parent_name } });
                        if (parentBroker) {
                            brokerData.parentId = parentBroker.id;
                            brokerData.description = parentBroker.name;
                            if (apiRequest.useParentsLogo) {
                                brokerData.logo = parentBroker.logo;
                                brokerData.link = parentBroker.link;
                            }
                        }
                    }
                    brokerData.name = apiRequest.name;
                    brokerData.salesTrackingCode = apiRequest.sales_tracking_code;
                    brokerData.useCreditCardPaymentMethod = true;
                    brokerData.usePadPaymentMethod = true;
                    brokerData.published = true;
                    brokerData.userId = user.id;
                    brokerData.contactId = contactInfoHOME.id;
                    brokerData.brokerType = apiRequest.brokerType || CONST.broker.brokerType;
                    brokerData.discoverable = true;
                    const broker = await this.BrokerRepository.create(brokerData);
                    //brokerData.logo=?
                    brokerId = broker.id;
                    contId = broker.contactId;
                    userId = broker.userId;
                    console.log(`Broker - ${brokerId}`);
                    //broker
                    //broker_licensed_states_and_provinces
                    let brokerLicensesArray = [];
                    let brokerLicenses = new models_1.BrokerLicensedStatesAndProvinces();
                    brokerLicenses.brokerId = brokerId || 0;
                    let brokerLicensedProvinces = [];
                    // if (apiRequest.license) {
                    //   apiRequest.license = JSON.parse(apiRequest.license)
                    //   brokerLicenses.expiryDate = apiRequest.license.expiry_date
                    //   brokerLicenses.reminderEmail = apiRequest.license.reminder_email
                    //   if (apiRequest.license.provinces_ids && apiRequest.license.provinces_ids.length > 0) {
                    //     brokerLicensedProvinces = apiRequest.license.provinces_ids
                    //   } else if (apiRequest.license.provinces_names && apiRequest.license.provinces_names.length > 0) {
                    //     let provinces = await this.StatesAndProvincesRepository.find({
                    //       where: {
                    //         or: [
                    //           { shortName: { inq: apiRequest.license.provinces_names } },
                    //           { name: { inq: apiRequest.license.provinces_names } }
                    //         ]
                    //       }
                    //     })
                    //     console.log(provinces);
                    //     for (const province of provinces) {
                    //       brokerLicensedProvinces.push(province.id);
                    //     }
                    //   }
                    //   let licenceNums = apiRequest.license.licence_nums;
                    //   // for (const brokerLicensedProvince of brokerLicensedProvinces) {
                    //   if (licenceNums.length == brokerLicensedProvinces.length) {
                    //     for (let i = 0; i < brokerLicensedProvinces.length; i++) {
                    //       // brokerLicenses.stateId = brokerLicensedProvince;
                    //       brokerLicenses.stateId = brokerLicensedProvinces[i];
                    //       brokerLicenses.licenseNumber = licenceNums[i];
                    //       console.log(`before push`)
                    //       console.log(brokerLicenses);
                    //       brokerLicensesArray.push(brokerLicenses)
                    //       await this.BrokerLicensedStatesAndProvincesRepository.create(brokerLicenses);
                    //     }
                    //   }
                    //   console.log(`brokerLicensesArray: ${brokerLicensesArray.length}`)
                    //   // if (brokerLicensesArray.length > 0)
                    //   //   await this.brokerLicensedProvincesRepo.create(brokerLicensesArray);
                    // }
                    if (apiRequest.licenses) {
                        apiRequest.licenses = JSON.parse(apiRequest.licenses);
                        let brokerLicenses = new models_1.BrokerLicensedStatesAndProvinces();
                        brokerLicenses.brokerId = brokerId || 0;
                        let licenses = apiRequest.licenses;
                        for (const license of licenses) {
                            brokerLicenses.expiryDate = license.expiry_date;
                            brokerLicenses.reminderEmail = license.reminder_email;
                            brokerLicenses.licenseNumber = license.license_num;
                            brokerLicenses.licenseCoverage = license.license_coverage;
                            brokerLicenses.stateId = license.provinces_id;
                            await this.BrokerLicensedStatesAndProvincesRepository.create(brokerLicenses);
                        }
                    }
                    //handle form
                    if (apiRequest.EOCertificate && apiRequest.EOIexpiryDate && apiRequest.EOInsurense && apiRequest.policy) {
                        let EOInsurence = new models_1.BrokerEoInsurance();
                        EOInsurence.brokerId = (broker === null || broker === void 0 ? void 0 : broker.id) || 1;
                        EOInsurence.certificateNumber = apiRequest.EOCertificate;
                        EOInsurence.expiryDate = apiRequest.EOIexpiryDate;
                        EOInsurence.insurerName = apiRequest.EOInsurense;
                        EOInsurence.policyNumber = apiRequest.policy;
                        await this.BrokerEoInsuranceRepository.create(EOInsurence);
                    }
                    if (apiRequest.createSignupForm) {
                        //console.log("CONST.signupForm")
                        // console.log(CONST.signupForm)
                        //signup_form
                        let signupFormData = new models_1.SignupForms();
                        signupFormData.brokerId = (broker === null || broker === void 0 ? void 0 : broker.id) || 1;
                        console.log(apiRequest.formDetails);
                        console.log(typeof apiRequest.formDetails);
                        apiRequest.formDetails = JSON.parse(apiRequest.formDetails);
                        console.log(apiRequest.formDetails);
                        console.log(typeof apiRequest.formDetails);
                        console.log(apiRequest.formDetails.length);
                        data.form = [];
                        console.log("form details in api", apiRequest.formDetails);
                        for (const formDetails of apiRequest.formDetails) {
                            console.log("entery ", formDetails);
                            let link = await (0, common_functions_1.generateFormLink)(user.id || 0);
                            signupFormData.link = await this.checkAndGenerateNewFormLink(link, user.id || 0); //generate_random_lin and user_id
                            let aliasLink = "";
                            console.log(`apiRequest.form.link: ${formDetails.link}`);
                            if (formDetails.link && formDetails.link != "") {
                                aliasLink = ("/" + formDetails.link);
                                console.log(`aliasLink1: ${aliasLink}`);
                            }
                            else {
                                console.log(`broker.name: ${broker.name}`);
                                aliasLink = "/" + ((_a = broker.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().split(" ")[0]);
                                if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                                    aliasLink += "_exec";
                                }
                                console.log(`aliasLink2: ${aliasLink}`);
                            }
                            signupFormData.alias = aliasLink;
                            if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                                signupFormData.name = (_b = formDetails.name) !== null && _b !== void 0 ? _b : CONST.signupFormExec.name;
                            }
                            else {
                                signupFormData.name = (_c = formDetails.name) !== null && _c !== void 0 ? _c : CONST.signupForm.name;
                            }
                            signupFormData.description = (_d = formDetails.description) !== null && _d !== void 0 ? _d : CONST.signupForm.description;
                            signupFormData.title = (_e = formDetails.title) !== null && _e !== void 0 ? _e : CONST.signupForm.title;
                            signupFormData.formType = (_f = formDetails.formType) !== null && _f !== void 0 ? _f : CONST.signupForm.formType;
                            signupFormData.keywords = (_g = formDetails.keywords) !== null && _g !== void 0 ? _g : CONST.signupForm.keywords;
                            // signupFormData.disclosureAgreement = formDetails.disclosureAgreement ?? CONST.signupForm.disclosure_agreement
                            // signupFormData.termsOfService = formDetails.termsOfService ?? CONST.signupForm.terms_of_service
                            signupFormData.inelligibilityPeriod = CONST.signupForm.ineligibilityPeriod;
                            signupFormData.published = CONST.signupForm.published;
                            if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                                signupFormData.requireDentalHealthCoverage = false;
                                signupFormData.requireSpouseEmail = true;
                                signupFormData.warnRequiredDependantMedicalExam = true;
                            }
                            else {
                                signupFormData.requireDentalHealthCoverage = true;
                                signupFormData.requireSpouseEmail = false;
                                signupFormData.warnRequiredDependantMedicalExam = false;
                            }
                            signupFormData.useCreditCardPaymentMethod = true;
                            signupFormData.usePadPaymentMethod = true;
                            signupFormData.isDemoForm = formDetails.isDemoform || false;
                            const signupForm = await this.SignupFormsRepository.create(signupFormData);
                            console.log(signupForm);
                            signupFormId = signupForm.id || 0;
                            data.form.push(signupForm);
                            console.log(`signupForm.id: ${signupForm.id}`);
                            //broker_signup_forms_plans
                            let signupFormPlansArray = [];
                            let signupFormPlans = new models_1.BrokerSignupFormsPlans();
                            signupFormPlans.formId = signupForm.id || 0;
                            if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                                //get executive plan ids ---> package_id=5
                                let executivePlans = await this.InsurancePlansRepository.find({ where: { packageId: CONST.EXECUTIVE_PACKAGE_ID } });
                                let executivePlanlevelObj = new models_1.BrokerSignupformsPlanlevels();
                                executivePlanlevelObj.formId = signupForm.id || 0;
                                let executivePlanlevelArray = [];
                                for (const executivePlan of executivePlans) {
                                    signupFormPlans.planId = executivePlan.id || 0;
                                    // console.log(`before push`)
                                    // console.log(signupFormPlans);
                                    signupFormPlansArray.push(signupFormPlans);
                                    await this.BrokerSignupFormsPlansRepository.create(signupFormPlans);
                                    if (!executivePlanlevelArray.includes(executivePlan.planLevel)) {
                                        executivePlanlevelArray.push(executivePlan.planLevel);
                                    }
                                }
                                for (const executivePlanLevel of executivePlanlevelArray) {
                                    executivePlanlevelObj.planlevelId = executivePlanLevel;
                                    await this.BrokerSignupformsPlanlevelsRepository.create(executivePlanlevelObj);
                                }
                                console.log(`signupFormPlansArray: ${signupFormPlansArray.length}`);
                            }
                            if (formDetails.formType == CONST.SIGNUP_FORM.CUSTOM) {
                                let planLevels = formDetails.planLevels;
                                let customPlanlevelObj = new models_1.BrokerSignupformsPlanlevels();
                                customPlanlevelObj.formId = signupForm.id || 0;
                                for (const pl of planLevels) {
                                    customPlanlevelObj.planlevelId = pl;
                                    await this.BrokerSignupformsPlanlevelsRepository.create(customPlanlevelObj);
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
                                //       let countofsignupformplanlevelcondition = await this.BrokerSignupformsPlanlevelsRepository.count({ and: [{ formId: signupForm.id }, { planlevelId: planlevelloop.id }] })
                                //       console.log(countofsignupformplanlevelcondition);
                                //       if (countofsignupformplanlevelcondition.count > 0)// console.log("plan levels", planlevel);
                                //       { }
                                //       else {
                                //         customPlanlevelObj.planlevelId = planlevelloop.id || 0;
                                //         let bsfl = await this.BrokerSignupformsPlanlevelsRepository.create(customPlanlevelObj);
                                //         console.log("bsfl>>>>>", bsfl);
                                //       }
                                //     }
                                //   }
                                // }
                            }
                        } //forms
                    }
                    //handle logo
                    if (value.files) {
                        console.log(`Logo -${value.files.length}`);
                        if (value.files.length > 0) {
                            console.log(value.files[0].originalname);
                            console.log(`file.originalname`);
                            let originalname = value.files[0].originalname;
                            console.log(originalname);
                            originalname = originalname.replace(/[\])}[{(]/g, '').replace(/ /g, '');
                            console.log(originalname);
                            let filename = originalname;
                            let modfilenameArr = filename.split(".");
                            let modfilename = modfilenameArr[0] + "0." + modfilenameArr[1];
                            // const broker = await this.BrokerRepository.findById(brokerId);
                            if (broker) {
                                await this.BrokerRepository.updateById(brokerId, {
                                    logo: paths_1.BROKERPATH_STRING + filename,
                                    link: paths_1.BROKERPATH_STRING + modfilename
                                });
                                message = 'Broker logo is set';
                                status = '200';
                            }
                            else {
                                console.log('no broker with given id');
                                message = 'No broker found';
                                status = '202';
                            }
                        }
                        else {
                            console.log(`No logo needed`);
                        }
                    }
                    data.broker = broker;
                    message = 'Broker registration successful';
                    status = '200';
                    statusCode = 200;
                }
                catch (error) {
                    console.error(error);
                    message = 'Broker registration failed';
                    status = '202';
                    statusCode = 202;
                }
                await this.BrokerLicensedStatesAndProvincesRepository.deleteAll({ brokerId: brokerId });
                await this.BrokerSignupformsPlanlevelsRepository.deleteAll({ formId: signupFormId });
                await this.BrokerEoInsuranceRepository.deleteAll({ brokerId: brokerId });
                await this.ContactInformationRepository.deleteById(contId);
                await this.BrokerLicensedStatesAndProvincesRepository.deleteAll({ brokerId: brokerId });
                await this.UsersRepository.deleteById(userId);
                await this.SignupFormsRepository.deleteAll({ brokerId: brokerId });
                await this.BrokerRepository.deleteById(brokerId);
            }
            this.response.status(parseInt(status)).send({
                status: status,
                message: message,
                date: new Date(),
                data: data
            });
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
    async broker_create_form(brokerId, apiRequest) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        let message, status, statusCode, data = {};
        console.log(apiRequest);
        try {
            //handle form
            const broker = await this.BrokerRepository.findById(brokerId);
            //console.log("CONST.signupForm")
            // console.log(CONST.signupForm)
            //signup_form
            let signupFormData = new models_1.SignupForms();
            signupFormData.brokerId = broker.id || 1;
            console.log(apiRequest.formDetails);
            console.log(typeof apiRequest.formDetails);
            if (typeof apiRequest.formDetails == "string") {
                apiRequest.formDetails = JSON.parse(apiRequest.formDetails);
                console.log(apiRequest.formDetails);
                console.log(typeof apiRequest.formDetails);
            }
            console.log(apiRequest.formDetails.length);
            data.form = [];
            for (const formDetails of apiRequest.formDetails) {
                let link = await (0, common_functions_1.generateFormLink)(broker.userId || 0);
                signupFormData.link = await this.checkAndGenerateNewFormLink(link, broker.userId || 0); //generate_random_lin and user_id
                let aliasLink = "";
                console.log(`apiRequest.form.link: ${formDetails.link}`);
                if (formDetails.link && formDetails.link != "") {
                    aliasLink = ("/" + formDetails.link);
                    console.log(`aliasLink1: ${aliasLink}`);
                }
                else {
                    console.log(`broker.name: ${broker.name}`);
                    aliasLink = "/" + ((_a = broker.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().split(" ")[0]);
                    if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                        aliasLink += "_exec";
                    }
                    console.log(`aliasLink2: ${aliasLink}`);
                }
                signupFormData.alias = aliasLink;
                if (formDetails.name) {
                    if (formDetails.name.toLowerCase().trim() == "default") {
                        if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                            signupFormData.name = (_b = formDetails.name) !== null && _b !== void 0 ? _b : CONST.signupFormExec.name;
                        }
                        else {
                            signupFormData.name = (_c = formDetails.name) !== null && _c !== void 0 ? _c : CONST.signupForm.name;
                        }
                    }
                    else {
                        signupFormData.name = formDetails.name;
                    }
                }
                else {
                    if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                        signupFormData.name = (_d = formDetails.name) !== null && _d !== void 0 ? _d : CONST.signupFormExec.name;
                    }
                    else {
                        signupFormData.name = (_e = formDetails.name) !== null && _e !== void 0 ? _e : CONST.signupForm.name;
                    }
                }
                signupFormData.description = (_f = formDetails.description) !== null && _f !== void 0 ? _f : CONST.signupForm.description;
                signupFormData.title = (_g = formDetails.title) !== null && _g !== void 0 ? _g : CONST.signupForm.title;
                signupFormData.formType = (_h = formDetails.formType) !== null && _h !== void 0 ? _h : CONST.signupForm.formType;
                signupFormData.keywords = (_j = formDetails.keywords) !== null && _j !== void 0 ? _j : CONST.signupForm.keywords;
                // signupFormData.disclosureAgreement = formDetails.disclosureAgreement ?? CONST.signupForm.disclosure_agreement
                // signupFormData.termsOfService = formDetails.termsOfService ?? CONST.signupForm.terms_of_service
                signupFormData.inelligibilityPeriod = CONST.signupForm.ineligibilityPeriod;
                signupFormData.published = CONST.signupForm.published;
                if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                    signupFormData.requireDentalHealthCoverage = false;
                    signupFormData.requireSpouseEmail = true;
                    signupFormData.warnRequiredDependantMedicalExam = true;
                }
                else {
                    signupFormData.requireDentalHealthCoverage = true;
                    signupFormData.requireSpouseEmail = false;
                    signupFormData.warnRequiredDependantMedicalExam = false;
                }
                signupFormData.useCreditCardPaymentMethod = true;
                signupFormData.usePadPaymentMethod = true;
                signupFormData.isDemoForm = formDetails.isDemoform || false;
                const signupForm = await this.SignupFormsRepository.create(signupFormData);
                data.form.push(signupForm);
                console.log(`signupForm.id: ${signupForm.id}`);
                //broker_signup_forms_plans
                let signupFormPlansArray = [];
                let signupFormPlans = new models_1.BrokerSignupFormsPlans();
                signupFormPlans.formId = signupForm.id || 0;
                if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                    //get executive plan ids ---> package_id=5
                    let executivePlans = await this.InsurancePlansRepository.find({ where: { packageId: CONST.EXECUTIVE_PACKAGE_ID } });
                    let executivePlanlevelObj = new models_1.BrokerSignupformsPlanlevels();
                    executivePlanlevelObj.formId = signupForm.id || 0;
                    let executivePlanlevelArray = [];
                    for (const executivePlan of executivePlans) {
                        signupFormPlans.planId = executivePlan.id || 0;
                        // console.log(`before push`)
                        // console.log(signupFormPlans);
                        signupFormPlansArray.push(signupFormPlans);
                        await this.BrokerSignupFormsPlansRepository.create(signupFormPlans);
                        if (!executivePlanlevelArray.includes(executivePlan.planLevel)) {
                            executivePlanlevelArray.push(executivePlan.planLevel);
                        }
                    }
                    for (const executivePlanLevel of executivePlanlevelArray) {
                        executivePlanlevelObj.planlevelId = executivePlanLevel;
                        await this.BrokerSignupformsPlanlevelsRepository.create(executivePlanlevelObj);
                    }
                    console.log(`signupFormPlansArray: ${signupFormPlansArray.length}`);
                }
                if (formDetails.formType == CONST.SIGNUP_FORM.CUSTOM) {
                    let planLevels = formDetails.planLevels;
                    let executivePlanlevelObj = new models_1.BrokerSignupformsPlanlevels();
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
                                executivePlanlevelObj.planlevelId = planlevel.id || 0;
                                await this.BrokerSignupformsPlanlevelsRepository.create(executivePlanlevelObj);
                            }
                        }
                    }
                }
            } //forms
            message = `Signup Form for ${broker.name} is created successfully`;
            status = '200';
            statusCode = 200;
        }
        catch (error) {
            console.error(error);
            message = `Signup Form for ${brokerId} creation failed`;
            status = '202';
            statusCode = 202;
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
    async checkAndGenerateNewFormLink(formLink, userid) {
        let linkExists = await this.SignupFormsRepository.findOne({ where: { link: formLink } });
        if (linkExists) {
            console.log(`linkExists: ${linkExists.id}`);
            let link = await (0, common_functions_1.generateFormLink)(userid);
            const newlink = await this.checkAndGenerateNewFormLink(link, userid);
            return newlink;
        }
        else {
            return formLink;
        }
    }
    async deleteForm(formId) {
        // let unPublish: number = 0;
        let status, message, data = {};
        try {
            await this.BrokerSignupformsPlanlevelsRepository.deleteAll({ where: { formId: formId } });
            let suf = await this.SignupFormsRepository.findById(formId);
            if (suf) {
                await this.SignupFormsRepository.updateById(formId, { published: false });
            }
            status = 200;
            message = "Form deleted successfull";
        }
        catch (error) {
            console.log(error);
            status = 400;
            message = "Error when deleting the form";
        }
        this.response.status(status).send({
            status, message, date: new Date(),
        });
        return this.response;
    }
    async deleteBrokerForm(Brokerid) {
        let status, message, data = {};
        try {
            if (Brokerid) {
                let brokerForms = await this.SignupFormsRepository.find({ where: { brokerId: Brokerid } });
                console.log(brokerForms);
                if (brokerForms) {
                    for (const form of brokerForms) {
                        await this.BrokerSignupFormsPlansRepository.deleteAll({ formId: form.id });
                        await this.BrokerSignupformsPlanlevelsRepository.deleteAll({ formId: form.id });
                    }
                    // await this.SignupFormsRepository.deleteAll({ where: { brokerId: Brokerid } });
                    await this.SignupFormsRepository.deleteAll({ brokerId: Brokerid });
                    status = 200;
                    message = "Broker formds deleted successfull";
                }
                else {
                    status = 201;
                    message = "No broker formds found";
                }
            }
            else {
                status = 401;
                message = "Send brokerId";
            }
        }
        catch (error) {
            status = 402;
            message = "Error when delete the broker form";
            console.log(error);
        }
        this.response.status(status).send({
            status, message, date: new Date(),
        });
        return this.response;
    }
    async formConfig(
    // @param.path.string('formLink') formLink: string
    formLink, lang) {
        let message, status, data = {}, error;
        // formLink += '/'
        // if (!formLink) {
        //   formLink = '/'
        // }
        let formError = false;
        console.log(`formLink: ${formLink}`);
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
                }
                else {
                    error = 'Configurations loading failed';
                    message = `The page you are trying to access is not available. Either contact your broker or GroupBenefitz Admin (${process.env.SYS_ADMIN_EMAIL})`;
                    status = '400';
                    formError = true;
                }
                data['form'] = form;
            }
            catch (error) {
                console.log(error);
                data['form'] = null;
                error = error;
                message = 'Could not load form for the given page is not available';
                status = '400';
                formError = true;
            }
        }
        else {
            data['form'] = null;
            error = 'Configurations loading failed';
            message = `The page you are trying to access is not available. Either contact your broker or GroupBenefitz Admin (${process.env.SYS_ADMIN_EMAIL})`;
            status = '400';
            formError = true;
        }
        console.log(`formError: ${formError}`);
        if (!formError) {
            console.log('no form error.');
            try {
                //data['default_form'] = DEFAULT_FORM;
                //gender_list
                data['gender'] = CONST.GENDER_LIST;
                //marital_status_list
                data['marital_status'] = CONST.MARITAL_STATUS_LIST;
                let languageDetails;
                //lang
                // languageDetails = await this.translationLanguagesRepository.findOne({
                //   where: {
                //     isDefault: true
                //   },
                //   include: [{relation: 'languageTokens'}]
                // });
                data['default_language'] = languageDetails.slug; //term
                // data['default_language_details'] = languageDetails
                console.log(`lang: ${lang}`);
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
                };
                // data['countries'] = await this.countryRepository.find(countryFilter);
                data['default_country'] = CONST.DEFAULT_COUNTRY;
                //states-and-provinces
                let provinceFilter = {
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
                };
                ////broker -- licensed province
                let brokerStateIds = [];
                if ((form === null || form === void 0 ? void 0 : form.broker.brokerLicensedStatesAndProvinces) && (form === null || form === void 0 ? void 0 : form.broker.brokerLicensedStatesAndProvinces.length) > 0) {
                    for (const bls of form === null || form === void 0 ? void 0 : form.broker.brokerLicensedStatesAndProvinces) {
                        brokerStateIds.push(bls.stateId);
                    }
                    //provinceFilter.where.id = {inq: brokerStateIds} //removed as all customers has to be allowed
                }
                console.log(brokerStateIds);
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
                console.log(`provincesArray.length: ${provincesArray.length}`);
                console.log(`brokerStateIds.length: ${brokerStateIds.length}`);
                if (provincesArray.length == brokerStateIds.length) {
                    data['assign_default_form'] = false;
                }
                else {
                    data['assign_default_form'] = true;
                    data['default_form'] = await this.SignupFormsRepository.findById(CONST.DEFAULT_FORM_ID, {
                        include: [{
                                relation: 'broker'
                            }]
                    });
                }
                data['validations'] = {};
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
                };
                data['validations']['spouse'] = {
                    age: {
                        min: CONST.VALIDATIONS.CUSTOMER_AGE_MIN
                    }
                };
                message = 'Configurations loaded successfully';
                status = '200';
            }
            catch (error) {
                console.log(error);
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
    async modifyForm(formid, requestBody) {
        let planlevel = requestBody.planlevel;
        let newType = requestBody.newType;
        let oldType = requestBody.oldType;
        let message, statusCode, status, data = {};
        try {
            // let formData = await this.SignupFormsRepository.findOne({ where: { id: formid } })
            // if (!formData) {
            //   status = 201;
            //   message = "Enter valid form id";
            // }
            // else {
            if (oldType == newType) {
                status = 201;
                message = "the form is already is same ";
            }
            else {
                let signUpform = new models_1.SignupForms();
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
                    let brokerSignUpformlevel = new models_1.BrokerSignupformsPlanlevels();
                    brokerSignUpformlevel.formId = formid || 0;
                    let planlevels = CONST.EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.concat(CONST.EXECUTIVE_HEALTH_PLAN_LEVELS);
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
                                message = "No plans found";
                            }
                            else {
                                let brokerSignUpformlevel = new models_1.BrokerSignupformsPlanlevels();
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
                message = "Form modified successfully";
            }
            // }
        }
        catch (error) {
            status = 404;
            message = "error while modify the form";
        }
        this.response.status(status).send({
            status, message, date: new Date(), data,
        });
        return this.response;
    }
    async updateContact(id, ContactInformation) {
        let statusCode, response, message = {};
        console.log(ContactInformation);
        let broker = await this.BrokerRepository.findOne({ where: { id: id }, fields: { contactId: true } });
        if (broker) {
            await this.ContactInformationRepository.updateAll(broker.contactId, ContactInformation);
            statusCode = 200;
            message = "Contact information updated successfully";
        }
        else {
            statusCode = 201;
            message = "No info found";
        }
        this.response.status(statusCode).send({
            statusCode, message, date: new Date()
        });
        return this.response;
    }
    async updateLiceceState(brokerId, requestBody) {
        let status, message, date = {};
        let states = requestBody.states;
        if (requestBody.states.length > 0) {
            await this.BrokerLicensedStatesAndProvincesRepository.deleteById(brokerId);
            let BrokerLicensedStatesAndProvince = new models_1.BrokerLicensedStatesAndProvinces();
            BrokerLicensedStatesAndProvince.brokerId = brokerId;
            for (const state of states) {
                BrokerLicensedStatesAndProvince.stateId = state;
                await this.BrokerLicensedStatesAndProvincesRepository.create(BrokerLicensedStatesAndProvince);
            }
            status = 200;
            message = "Licence states updated successfully";
        }
        else {
            status = 201;
            message = "Send states";
        }
        this.response.status(status).send({
            status, message, date: new Date()
        });
        return this.response;
    }
    async updateEO(BrokerEoInsurance) {
        let status, message, data = {};
        console.log(BrokerEoInsurance);
        let brokerId = BrokerEoInsurance.brokerId;
        if (!brokerId) {
            status = 201;
            message = "Send proper input";
        }
        else {
            await this.BrokerEoInsuranceRepository.updateAll(BrokerEoInsurance, { where: { brokerId: brokerId } });
            status = 200;
            message = "E&O insurence Updated succesfully";
        }
        this.response.status(status).send({
            status, message, date: new Date()
        });
        return this.response;
    }
    async updateLiceceNum(brokerId, requestBody) {
        let licenceNum = requestBody.licenceNum;
        let status, message, data = {};
        if (licenceNum.length > 0) {
            let brokerLicecs = await this.BrokerLicensedStatesAndProvincesRepository.find({ where: { brokerId: brokerId } });
            if (brokerLicecs) {
                let brokerLicecne = new models_1.BrokerLicensedStatesAndProvinces();
                await this.BrokerLicensedStatesAndProvincesRepository.updateAll({ licenseNumber: licenceNum }, { where: { brokerId: brokerId } });
                status = 200;
                message = "Licence number updated succesfully";
            }
            else {
                status = 201;
                message = "No broker licences found";
            }
        }
        else {
            status = 201;
            message = "Send licence number";
        }
        this.response.status(status).send({
            status, message, date: new Date()
        });
        return this.response;
    }
    async deleteBroker(brokerId) {
        let statusCode, message = {};
        let broker = await this.BrokerRepository.findById(brokerId);
        if (broker) {
            let signUpForms = await this.SignupFormsRepository.find({ where: { brokerId: brokerId } });
            for (const signupForm of signUpForms) {
                await this.BrokerSignupformsPlanlevelsRepository.deleteAll({ where: { formId: signupForm.id } });
            }
            await this.ContactInformationRepository.deleteAll({ where: { id: brokerId } });
            await this.BrokerLicensedStatesAndProvincesRepository.deleteAll({ where: { brokerId: brokerId } });
            await this.BrokerEoInsuranceRepository.deleteAll({ where: { brokerId: brokerId } });
            await this.SignupFormsRepository.deleteAll({ where: { brokerId: brokerId } });
            await this.BrokerRepository.deleteById(brokerId);
            statusCode = 200;
            message = "Broker details deleted successfull";
        }
        else {
            statusCode = 201;
            message = "No broker details found";
        }
        this.response.status(statusCode).send({
            statusCode, message, date: new Date()
        });
        return this.response;
    }
    async emailChange(brokerId, requestBody) {
        let newmail = requestBody.newMailid;
        let status, message, date, data = {};
        if (!newmail || !brokerId) {
            status: 201;
            message = "No inpiuts found";
        }
        try {
            let broker = await this.BrokerRepository.findById(brokerId, { fields: { contactId: true, user_id: true } });
            let emailValidation = await validation.emailvalidation(newmail);
            if (emailValidation) {
                status = 400;
                message = "Error when updating the mail id";
            }
            else {
                await this.UsersRepository.updateById(broker.userId, { username: newmail });
                await this.ContactInformationRepository.updateById(broker.contactId, { primaryEmail: newmail });
                status = 200;
                message = "Mail updated successfull";
            }
        }
        catch (error) {
            console.log(error);
            status = 400;
            message = "Error when updating the mail id";
        }
        this.response.status(status).send({
            status, message, date: new Date()
        });
        return this.response;
    }
    async brokerUpdate(request) {
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/admin/broker'),
    (0, rest_1.response)(200, {
        description: 'List of customers',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "getBroker", null);
tslib_1.__decorate([
    (0, rest_1.get)('/admin/broker/{id}'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "brokerDetailsBasedonId", null);
tslib_1.__decorate([
    (0, rest_1.get)('/admin/broker/customerlist/{id}'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "custmerCount", null);
tslib_1.__decorate([
    (0, rest_1.post)('/broker/{brokerid}/logo', {
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
    }),
    tslib_1.__param(0, rest_1.param.path.string('brokerid')),
    tslib_1.__param(1, rest_1.param.query.string('resize')),
    tslib_1.__param(2, rest_1.requestBody.file()),
    tslib_1.__param(3, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Boolean, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "brokerLogoUpload", null);
tslib_1.__decorate([
    (0, rest_1.post)('/broker/registration', {
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
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
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
    })),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "broker_registration", null);
tslib_1.__decorate([
    (0, rest_1.post)('/broker/{brokerId}/createForm', {
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
    }),
    tslib_1.__param(0, rest_1.param.path.string('brokerId')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
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
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "broker_create_form", null);
tslib_1.__decorate([
    (0, rest_1.del)('/broker/form/{formId}', {
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
    }),
    tslib_1.__param(0, rest_1.param.path.number('formId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "deleteForm", null);
tslib_1.__decorate([
    (0, rest_1.del)('/broker/brokerForm/{brokerid}'),
    tslib_1.__param(0, rest_1.param.path.number('brokerid')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "deleteBrokerForm", null);
tslib_1.__decorate([
    (0, rest_1.get)('/formConfigurations'),
    (0, rest_1.response)(200, {
        description: 'Mixed object of all the specific values needed for form configuration',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('formLink')),
    tslib_1.__param(1, rest_1.param.query.string('lang')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "formConfig", null);
tslib_1.__decorate([
    (0, rest_1.post)('/broker/form/{formid}/modify'),
    (0, rest_1.response)(200, {
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.path.number('formid')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "modifyForm", null);
tslib_1.__decorate([
    (0, rest_1.put)('/broker/{brokerId}/updateContactInfo'),
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
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.ContactInformation, { exclude: ['id', 'fusebillId'] })
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "updateContact", null);
tslib_1.__decorate([
    (0, rest_1.put)('/broker/updateLicenceState/{brokerId}'),
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
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "updateLiceceState", null);
tslib_1.__decorate([
    (0, rest_1.put)('/broker/updateLicenceEO'),
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
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.BrokerEoInsurance, {
                    exclude: ['id']
                })
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "updateEO", null);
tslib_1.__decorate([
    (0, rest_1.put)('/broker/{brokerId}/updateLicence'),
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
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "updateLiceceNum", null);
tslib_1.__decorate([
    (0, rest_1.del)('/broker/{brokerId}'),
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
], BrokerController.prototype, "deleteBroker", null);
tslib_1.__decorate([
    (0, rest_1.post)('/broker/change_emailId/{brokerId}'),
    tslib_1.__param(0, rest_1.param.path.number('brokerId')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "emailChange", null);
tslib_1.__decorate([
    (0, rest_1.put)('/broker/', {
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
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        description: "Update broker details",
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
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "brokerUpdate", null);
BrokerController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.BrokerLicensedStatesAndProvincesRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.BrokerSignupFormsPlansRepository)),
    tslib_1.__param(3, (0, repository_1.repository)(repositories_1.BrokerSignupformsPlanlevelsRepository)),
    tslib_1.__param(4, (0, repository_1.repository)(repositories_1.TieredRebatesDataRepository)),
    tslib_1.__param(5, (0, repository_1.repository)(repositories_1.TieredRebatesRepository)),
    tslib_1.__param(6, (0, repository_1.repository)(repositories_1.UsersRepository)),
    tslib_1.__param(7, (0, repository_1.repository)(repositories_1.ContactInformationRepository)),
    tslib_1.__param(8, (0, repository_1.repository)(repositories_1.SignupFormsRepository)),
    tslib_1.__param(9, (0, repository_1.repository)(repositories_1.StatesAndProvincesRepository)),
    tslib_1.__param(10, (0, repository_1.repository)(repositories_1.CustomerSignupRepository)),
    tslib_1.__param(11, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__param(12, (0, repository_1.repository)(repositories_1.InsurancePlansRepository)),
    tslib_1.__param(13, (0, repository_1.repository)(repositories_1.PlanLevelRepository)),
    tslib_1.__param(14, (0, repository_1.repository)(repositories_1.BrokerEoInsuranceRepository)),
    tslib_1.__param(15, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(16, (0, core_1.inject)(keys_1.FILE_UPLOAD_SERVICE)),
    tslib_1.__param(17, (0, core_1.service)(services_1.HttpService)),
    tslib_1.__param(18, (0, core_1.service)(services_1.ResizeimgService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository,
        repositories_1.BrokerLicensedStatesAndProvincesRepository,
        repositories_1.BrokerSignupFormsPlansRepository,
        repositories_1.BrokerSignupformsPlanlevelsRepository,
        repositories_1.TieredRebatesDataRepository,
        repositories_1.TieredRebatesRepository,
        repositories_1.UsersRepository,
        repositories_1.ContactInformationRepository,
        repositories_1.SignupFormsRepository,
        repositories_1.StatesAndProvincesRepository,
        repositories_1.CustomerSignupRepository,
        repositories_1.CustomerRepository,
        repositories_1.InsurancePlansRepository,
        repositories_1.PlanLevelRepository,
        repositories_1.BrokerEoInsuranceRepository, Object, Function, services_1.HttpService,
        services_1.ResizeimgService])
], BrokerController);
exports.BrokerController = BrokerController;
//# sourceMappingURL=broker.controller.js.map