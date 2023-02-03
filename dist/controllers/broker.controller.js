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
const authentication_1 = require("@loopback/authentication");
const validation = tslib_1.__importStar(require("../services/validation.services"));
const services_1 = require("../services");
const moment_1 = tslib_1.__importDefault(require("moment"));
const paths_2 = require("../paths");
const broker_admins_repository_1 = require("../repositories/broker-admins.repository");
// @authenticate('jwt')
// @authorize({
//   allowedRoles: ['BROKER', 'ADMINISTRATOR'],
//   voters: [basicAuthorization]
// })
let BrokerController = class BrokerController {
    constructor(BrokerRepository, BrokerLicensedStatesAndProvincesRepository, 
    // @repository(BrokerSignupFormsPlansRepository)
    // public BrokerSignupFormsPlansRepository: BrokerSignupFormsPlansRepository,
    SignupFormsPlanLevelMappingRepository, UsersRepository, ContactInformationRepository, SignupFormsRepository, StatesAndProvincesRepository, CustomerSignupRepository, CustomerRepository, InsurancePlansRepository, PlanLevelRepository, BrokerEoInsuranceRepository, response, handler, http, img, bs, insurancePackages, plansAvalibility, BrokerAdminsRepository) {
        this.BrokerRepository = BrokerRepository;
        this.BrokerLicensedStatesAndProvincesRepository = BrokerLicensedStatesAndProvincesRepository;
        this.SignupFormsPlanLevelMappingRepository = SignupFormsPlanLevelMappingRepository;
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
        this.bs = bs;
        this.insurancePackages = insurancePackages;
        this.plansAvalibility = plansAvalibility;
        this.BrokerAdminsRepository = BrokerAdminsRepository;
    }
    async brokerCount() {
        let totalBrokers, TpaMga, brokaRage, advisor, association, corporate, status, message, data, date = {};
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
            };
        }
        catch (error) {
            status = 201;
            message = MESSAGE.ERRORS.someThingwentWrong;
        }
        this.response.status(status).send({
            status: status,
            message: message,
            date: new Date(),
            data: data
        });
        return this.response;
    }
    async getBroker() {
        let brokerList = [];
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
                let EOIStatus, contactStatus, LicecncesStatus;
                let today = (0, moment_1.default)(new Date(), "YYYY-MM-DD").toDate();
                let brokerId = broker.id;
                let contactId = broker.contactId;
                let brokerEOI = await this.BrokerEoInsuranceRepository.findOne({ where: { brokerId: brokerId } });
                !brokerEOI || brokerEOI != repository_1.Null ? EOIStatus = "No data found" : new Date(brokerEOI.expiryDate) < today ? EOIStatus = "E&O insurece is expired" : EOIStatus = brokerEOI;
                let licences = await this.BrokerLicensedStatesAndProvincesRepository.find({ where: { brokerId: brokerId } });
                if (licences.length > 0) {
                    for (let licence of licences) {
                        if (licence.expiryDate != undefined) {
                            new Date(licence.expiryDate) < today ? LicecncesStatus = licence.licenseNumber + " is expired  " : LicecncesStatus = "  Licences are found  ";
                        }
                    }
                }
                else {
                    LicecncesStatus = "No Licences";
                }
                if (contactId) {
                    let contactDetails = await this.ContactInformationRepository.findById(contactId);
                    // console.log("Contacct details",contactDetails.length)
                    // console.log(">>>>>>>>",contactDetails)
                    if (contactDetails) {
                        console.log(">>>>", contactDetails.toObject.length);
                        console.log("><<><><>", contactDetails);
                        contactDetails.primaryEmail && contactDetails.secondaryEmail && contactDetails.line1 && contactDetails.city && contactDetails.apt ? contactStatus = "Max details" : contactStatus = "min";
                        console.log(contactDetails.primaryEmail && contactDetails.secondaryEmail && contactDetails.line1 && contactDetails.city && contactDetails.apt);
                        console.log(contactDetails.primaryEmail && contactDetails.secondaryEmail && contactDetails.line1 && contactDetails.city && contactDetails.apt ? contactStatus = "Max details" : contactStatus = "Partial");
                        contactDetails.apt == undefined || contactDetails.line1 == undefined ? contactStatus = 'Partial' : contactStatus = contactStatus;
                    }
                    else {
                        contactStatus = "None";
                    }
                }
                else {
                    contactStatus = "None";
                }
                broker.LicecncesStatus = LicecncesStatus;
                broker.EOIStatus = EOIStatus;
                let status = { "broker": broker, "LicecncesStatus": LicecncesStatus, "EOIStatus": EOIStatus, "contactStatus": contactStatus };
                brokerList.push(status);
            }
        }
        catch (err) {
            console.log(err);
        }
        this.response.status(parseInt("200")).send({
            brokerList
        });
        return this.response;
    }
    async brokerDetailsBasedonId(id) {
        let final = [];
        let responseObject, brokerStatus, status;
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
                    }, {
                        relation: 'brokerEoInsurance'
                    },
                    {
                        relation: 'signupForms', scope: {
                            include: [{
                                    relation: 'signupFormPlanLevels'
                                },
                                { relation: 'customers', scope: { fields: { firstName: true, lastName: true, dob: true, gender: true, status: true, userId: true } } }]
                        }
                    }
                ]
            });
            if (data) {
                let EOIStatus, contactStatus, LicecncesStatus;
                let today = (0, moment_1.default)(new Date(), "YYYY-MM-DD").toDate();
                let contactId = data.contactId || 0;
                let brokerEOI = await this.BrokerEoInsuranceRepository.findOne({ where: { brokerId: id } });
                !brokerEOI || brokerEOI != repository_1.Null ? EOIStatus = "No data found" : new Date(brokerEOI.expiryDate) < today ? EOIStatus = "E&O insurece is expired" : EOIStatus = brokerEOI;
                let licences = await this.BrokerLicensedStatesAndProvincesRepository.find({ where: { brokerId: id } });
                console.log(licences);
                if (licences.length > 0) {
                    for (let licence of licences) {
                        if (licence.expiryDate != undefined) {
                            new Date(licence.expiryDate) < today ? LicecncesStatus = licence.licenseNumber + " is expired  " : LicecncesStatus = "  Licences are found  ";
                        }
                    }
                }
                else {
                    LicecncesStatus = "No Licences";
                }
                if (contactId && contactId != 0) {
                    let contactDetails = await this.ContactInformationRepository.findById(contactId);
                    // console.log("Contacct details",contactDetails.length)
                    // console.log(">>>>>>>>",contactDetails)
                    if (contactDetails) {
                        console.log(">>>>", contactDetails.toObject.length);
                        console.log("><<><><>", contactDetails);
                        contactDetails.primaryEmail && contactDetails.secondaryEmail && contactDetails.line1 && contactDetails.city && contactDetails.apt ? contactStatus = "Max details" : contactStatus = "min";
                        console.log(contactDetails.primaryEmail && contactDetails.secondaryEmail && contactDetails.line1 && contactDetails.city && contactDetails.apt);
                        console.log(contactDetails.primaryEmail && contactDetails.secondaryEmail && contactDetails.line1 && contactDetails.city && contactDetails.apt ? contactStatus = "Max details" : contactStatus = "Partial");
                        contactDetails.apt == undefined || contactDetails.line1 == undefined ? contactStatus = 'Partial' : contactStatus = contactStatus;
                    }
                    else {
                        contactStatus = "None";
                    }
                }
                else {
                    contactStatus = "None";
                }
                brokerStatus = { "LicecncesStatus": LicecncesStatus, "EOIStatus": EOIStatus, "contactinfoStatus": contactStatus };
            }
            if (!data) {
                status = 201;
                responseObject = {
                    status: 201,
                    message: "No details found",
                    date: new Date(),
                    data: final,
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
                    // userDetails = await this.UsersRepository.findOne({ where: { id: userId }, fields: { username: true } });
                    // dataArray['emailId'] = userDetails
                }
                // let contactInfo = await this.ContactInformationRepository.find({ where: { id: data.contactId }, fields: { primaryEmail: true, primaryPhone: true, addressType: true, apt: true, line1: true, city: true, state: true, country: true } });
                // let signupForm = await this.BrokerSignupFormsPlansRepository.find({ where: { brokerId: id } });
                // console.log(signupForm);
                // dataArray['signupFormds'] = signupForm
                // if (contactInfo) {
                // final.push(contactInfo);
                // }
                // final.push(dataArray);
                responseObject = {
                    status: 200,
                    message: "Broker Details",
                    date: new Date(),
                    data: data,
                    brokerStatus: brokerStatus
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
            let countofCustomers = 0;
            let customerCount;
            let final = [];
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
                "message": "List of customers and count",
                "customerCount": countofCustomers,
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
                    status = '201';
                    message = "Something went wrong";
                }
            });
        });
        p.then(async (value) => {
            console.log("entered");
            console.log(value);
            try {
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
                        let brokerAfterUpdate = await this.BrokerRepository.updateById(broker_id, {
                            logo: paths_1.BROKERPATH_STRING + filename.replace(/[\])}[{(]/g, '').replace(/ /g, ''),
                            link: paths_1.BROKERPATH_STRING + modfilename
                        });
                        //method
                        let url = process.env.MAINAPI + `/api/customer/broker/${broker_id}/logo`;
                        let pathImg = paths_1.BROKERIMG_RESOURCES_FOLDER + "/" + filename.replace(/[\])}[{(]/g, '').replace(/ /g, '');
                        const fetchStatus = await this.http.fetchMultipartFormdata(url, pathImg);
                        console.log("fetchStatus >> status", fetchStatus);
                        message = 'Broker logo is set';
                        status = 200;
                        data = brokerAfterUpdate;
                        this.response.status(status).send({
                            status, message, data
                        });
                    }
                    else {
                        console.log('no broker with given id');
                        message = 'No broker found';
                        status = '202';
                        this.response.status(status).send({
                            status, message, data
                        });
                    }
                }
            }
            catch (error) {
                console.log(error);
                status = '201';
                message = "error " + error.message;
                this.response.status(status).send({
                    status, message, data
                });
            }
            return this.response;
        });
        p.catch(onrejected => {
            message = 'Broker logo is not set';
            status = '202';
            this.response.status(200).send({
                status, message
            });
            return this.response;
        });
        return this.response;
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
            await this.SignupFormsPlanLevelMappingRepository.deleteAll({ formId: formId });
            let suf = await this.SignupFormsRepository.findById(formId);
            if (suf) {
                // await this.SignupFormsRepository.updateById(formId, { published: false });
                await this.SignupFormsRepository.deleteById(formId);
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
                        // await this.BrokerSignupFormsPlansRepository.deleteAll({ formId: form.id });
                        await this.SignupFormsPlanLevelMappingRepository.deleteAll({ formId: form.id });
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
        await this.bs.print();
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
                console.log(form);
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
                // console.log('slug', languageDetails)
                // data['default_language'] = languageDetails.slug //term
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
        console.log(requestBody);
        let status, message, date = {};
        let licences = requestBody;
        if (licences.length > 0) {
            await this.BrokerLicensedStatesAndProvincesRepository.deleteAll({ brokerId: brokerId });
            let BrokerLicensedStatesAndProvince = new models_1.BrokerLicensedStatesAndProvinces();
            BrokerLicensedStatesAndProvince.brokerId = brokerId;
            for (const license of licences) {
                BrokerLicensedStatesAndProvince.expiryDate = license.expiry_date;
                BrokerLicensedStatesAndProvince.reminderEmail = license.reminder_email;
                BrokerLicensedStatesAndProvince.licenseNumber = license.license_num;
                BrokerLicensedStatesAndProvince.licenseCoverage = license.license_coverage;
                BrokerLicensedStatesAndProvince.stateId = license.provinces_id;
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
    async updateEO(brokerId, BrokerEoInsurance) {
        let status, message, data = {};
        console.log(BrokerEoInsurance);
        let brokerEOI = await this.BrokerEoInsuranceRepository.find({ where: { brokerId: brokerId } });
        console.log(brokerEOI);
        if (brokerEOI.length > 0) {
            await this.BrokerEoInsuranceRepository.updateAll(BrokerEoInsurance, { where: { brokerId: brokerId } });
            status = 200;
            message = "E&O insurence Updated succesfully";
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
    async deleteBroker(brokerId) {
        let statusCode, message = {};
        let broker = await this.BrokerRepository.findById(brokerId);
        if (broker) {
            let signUpForms = await this.SignupFormsRepository.find({ where: { brokerId: brokerId } });
            for (const signupForm of signUpForms) {
                await this.SignupFormsPlanLevelMappingRepository.deleteAll({ formId: signupForm.id });
            }
            await this.ContactInformationRepository.deleteAll({ id: brokerId });
            await this.BrokerLicensedStatesAndProvincesRepository.deleteAll({ brokerId: brokerId });
            await this.BrokerEoInsuranceRepository.deleteAll({ brokerId: brokerId });
            await this.SignupFormsRepository.deleteAll({ brokerId: brokerId });
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
    async brokerUpdate(request, response) {
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
    async formeConfig() {
        let status, message, date, data = {};
        try {
            status = 200;
            message = "Form configurations";
            data['gender'] = CONST.GENDER_LIST;
            data['marital_status'] = CONST.MARITAL_STATUS_LIST;
            data['brokerType'] = CONST.BROKER_TYPE_ARRAY;
            data['formType'] = CONST.FORM_TYPE_ARRAY;
            let countryFilter = {
                where: {
                    published: 1
                }
            };
            data['states'] = await this.StatesAndProvincesRepository.find(countryFilter);
            data['default_country'] = CONST.DEFAULT_COUNTRY;
        }
        catch (error) {
            status = 400;
            message = "Configuration error";
        }
        this.response.status(status).send({
            status, message, data, date: new Date()
        });
        return this.response;
    }
    async planId(apiRequest) {
        var _a;
        console.log(apiRequest);
        let status, message, data = {};
        try {
            // const brokerSignupFormPlans = await this.BrokerSignupFormsPlansRepository.find({
            //   where: {
            //     formId: apiRequest.formId
            //   }
            // });
            // const signupForm_PlanLevels = await this.SignupFormsPlanLevelMappingRepository.find({
            //   where: {
            //     formId: apiRequest.formId
            //   }
            // })
            // await this.brokerPlansRepository.find({
            //   where: {
            //     brokerId: broker.id
            //   },
            //   // include: [
            //   //   {relation: 'planOptions'} //brokerPlans -- brokerPlanOptions -- planOptions ()
            //   // ]
            // })
            //brokerPlanOptions -- planOptions -- planoptionvalues
            console.log(`brokerPlans or brokerSignupFormPlans`);
            //console.log(brokerSignupFormPlans);
            //signupForm_PlanLevels
            console.log(`brokerPlanLevels or brokerSignupFormPlansLevels`);
            // console.log(signupForm_PlanLevels)
            //let brokerPlanOptions: any = {}
            let brokerplanIds = [];
            // for (let brokerPlan of brokerSignupFormPlans) {
            //   if (brokerPlan.planId) {
            //     brokerplanIds.push(brokerPlan.planId)
            //     // brokerPlanOptions[brokerPlan.planId] = brokerPlan.planOptions
            //   }
            // }
            // console.log(brokerPlanOptions) //not needed
            let brokerplanLevels = [];
            // for (let brokerPlanLevel of signupForm_PlanLevels) {
            //   if (brokerPlanLevel.planLevelId) {
            //     brokerplanLevels.push(brokerPlanLevel.planLevelId)
            //     // brokerPlanOptions[brokerPlan.planId] = brokerPlan.planOptions
            //   }
            // }
            //check for broker -license statesalso
            console.log(`brokerplanIds`);
            console.log(brokerplanIds);
            // console.log(`brokerplanLevels`)
            // console.log(brokerplanLevels)
            const provinceData = await this.StatesAndProvincesRepository.findById(apiRequest.province_id);
            data.province = provinceData;
            //get plans valid for this customer -- state_id, plan_id
            let plansforProvince = {
                where: {
                    and: [
                        { "stateId": apiRequest.province_id }
                    ]
                },
                include: [{ relation: 'plan' }]
            };
            //Remove this //comment this
            if (brokerplanIds.length > 0) {
                let brokerPlanFilter = { "planId": { "inq": brokerplanIds } };
                plansforProvince.where.and.push(brokerPlanFilter);
            }
            // if (brokerplanLevels.length > 0) {
            //   let brokerPlanLevelsFilter = { "planLevel": { "inq": brokerplanLevels } }
            //   plansforProvince.where.and.push(brokerPlanLevelsFilter);
            // }
            // console.log(plansforProvince.where.and.length)
            //  console.log(plansforProvince.where.and)
            const planIdsData = await this.plansAvalibility.find(plansforProvince);
            // console.log(planIdsData);
            let planIds = [];
            let planLevelIds = [];
            for (let planIdData of planIdsData) {
                if (planIdData.planId)
                    planIds.push(planIdData.planId);
                if (planIdData.plan) {
                    if (planLevelIds.indexOf(planIdData.plan.planLevel) == -1)
                        planLevelIds.push(planIdData.plan.planLevel);
                }
            }
            console.log(planIds);
            console.log(planLevelIds);
            //console.log(age);
            // console.log(`children_coverage:${children_coverage}`);
            // let pcc: any = this.registrationService.planCoverageCalculations(apiRequest.having_spouse, apiRequest.spouse_details.is_spouse_having_healthcard, apiRequest.no_of_children, children_coverage);
            let pcc = {
                exclusivePlanCoverageArray: [],
                maritalStatus: 'COUPLE',
                ninCondition: false,
                rital_status: 'SINGLE',
                exclusive: ['COUPLE', 'FAMILY'],
                inclusive: ['SINGLE']
            };
            data.customer = {};
            data.customer.maritalStatus = pcc.maritalStatus;
            console.log(`excl. ${pcc.exclusivePlanCoverageArray}`);
            console.log(`maritalStatus: ${pcc.maritalStatus}`);
            let plansFilter = {
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
            };
            let packageFilter = {
                order: 'ordering ASC',
                where: {
                    published: true
                },
            };
            console.log(packageFilter);
            const packages = await this.insurancePackages.find(packageFilter);
            console.log("packages>>>>>");
            console.log(packages[0]);
            const packagesArray = [];
            for (const pckg of packages) {
                //console.log(pckg.name)
                const packageObject = {};
                // packageObject = pckg;
                packageObject["description"] = pckg.description;
                packageObject["id"] = pckg.id;
                packageObject["logo"] = pckg.logo;
                packageObject["name"] = pckg.name;
                packageObject["published"] = pckg.published;
                packageObject["ordering"] = pckg.ordering;
                packageObject["allowMultiple"] = pckg.allowMultiple;
                packageObject["applyFilters"] = pckg.applyFilters;
                packageObject["optIn"] = pckg.optIn;
                //console.log(plansFilter.where.and.length)
                plansFilter.where.and.splice(5); //6 conditions default; 1 or 2 dynamic -->changed to 5 as required_plan_id is removed
                //console.log(plansFilter.where.and.length)
                //console.log(`Apply filter to this ${pckg.name}:${pckg.applyFilters}`);
                let pccNincondition = pcc.ninCondition;
                let pccExclusivePlanCoverageArray = pcc.exclusivePlanCoverageArray;
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
                        pccExclusivePlanCoverageArray = ['COUPLE', 'FAMILY'];
                    }
                    else if (pcc.maritalStatus == 'COUPLE') {
                        pccExclusivePlanCoverageArray = ['FAMILY'];
                    }
                    else {
                        //FAMILY
                        pccExclusivePlanCoverageArray = [];
                        pccNincondition = false;
                    }
                    // console.log(`fixed for pckg5 pccNincondition:${pccNincondition}`)
                }
                // if (pckg.applyFilters) {
                if (pccNincondition) {
                    let planCoverageConditon = { "or": [{ "planCoverage": { "nin": pccExclusivePlanCoverageArray } }, { "planCoverage": { "eq": null } }] };
                    plansFilter.where.and.push(planCoverageConditon);
                }
                // } else {
                //   console.log('so basic no exc covergae filter')
                // }
                plansFilter.where.and.push({ "packageId": pckg.id });
                let plansLevelFilter = {
                    order: 'ordering ASC',
                    where: {
                        "id": { "inq": planLevelIds },
                        "published": true,
                        "requirePlanLevel": null
                    },
                    "include": [
                        // { "relation": "planLevelFeatures", "scope": { "include": [{ "relation": "feature" }] } },
                        //{"relation": "greenshieldPackages"},
                        { "relation": "plans", "scope": plansFilter }
                    ]
                };
                // console.log(plansFilter);
                // console.log(planLevelIds);
                // console.log("plan levels >>>>");
                // console.log(plansLevelFilter)
                const planLevels = await this.insurancePackages.planGroups(pckg.id).find(plansLevelFilter);
                // console.log("plan levels >>>>");
                // console.log(planLevels);
                const groupsArray = [];
                for (const pl of planLevels) {
                    if (((_a = pl.plans) === null || _a === void 0 ? void 0 : _a.length) > 0) {
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
                packageObject["groups"] = groupsArray; //planLevels
                //console.log("-->" + packageObject.groups.length)
                if (groupsArray.length > 0)
                    packagesArray.push(packageObject);
            }
            console.log(packagesArray);
            data.packages = packagesArray; //packages;
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
    async planlevels(apiRequest) {
        var _a;
        console.log(apiRequest);
        let status, message, data = {};
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
            });
            //brokerPlanOptions -- planOptions -- planoptionvalues
            console.log(`brokerPlans or brokerSignupFormPlans`);
            //console.log(brokerSignupFormPlans);
            //signupForm_PlanLevels
            console.log(`brokerPlanLevels or brokerSignupFormPlansLevels`);
            console.log(signupForm_PlanLevels);
            //let brokerPlanOptions: any = {}
            let brokerplanIds = [];
            // for (let brokerPlan of brokerSignupFormPlans) {
            //   if (brokerPlan.planId) {
            //     brokerplanIds.push(brokerPlan.planId)
            //     // brokerPlanOptions[brokerPlan.planId] = brokerPlan.planOptions
            //   }
            // }
            // console.log(brokerPlanOptions) //not needed
            let brokerplanLevels = [];
            for (let brokerPlanLevel of signupForm_PlanLevels) {
                if (brokerPlanLevel.planLevelId) {
                    brokerplanLevels.push(brokerPlanLevel.planLevelId);
                    // brokerPlanOptions[brokerPlan.planId] = brokerPlan.planOptions
                }
            }
            //check for broker -license statesalso
            // console.log(`brokerplanIds`)
            // console.log(brokerplanIds)
            console.log(`brokerplanLevels`);
            console.log(brokerplanLevels);
            const provinceData = await this.StatesAndProvincesRepository.findById(apiRequest.province_id);
            data.province = provinceData;
            console.log(data);
            //get plans valid for this customer -- state_id, plan_id
            let plansforProvince = {
                where: {
                    and: [
                        { "stateId": apiRequest.province_id }
                    ]
                },
                include: [{ relation: 'plan' }]
            };
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
            const planIdsData = await this.plansAvalibility.find(plansforProvince);
            // console.log(planIdsData);
            let planIds = [];
            let planLevelIds = [];
            for (let planIdData of planIdsData) {
                if (planIdData.planId)
                    planIds.push(planIdData.planId);
                if (planIdData.plan) {
                    if (planLevelIds.indexOf(planIdData.plan.planLevel) == -1)
                        planLevelIds.push(planIdData.plan.planLevel);
                }
            }
            console.log(`state - ${apiRequest.province_id} planIds`);
            console.log(planIds);
            console.log(`state - ${apiRequest.province_id} plans---planlevels`);
            console.log(planLevelIds);
            let filteredPlanLevels;
            if (brokerplanLevels.length > 0) {
                filteredPlanLevels = await (0, services_1.intersection)(planLevelIds, brokerplanLevels);
            }
            else {
                filteredPlanLevels = planLevelIds;
            }
            console.log("filteredPlanLevels");
            console.log(filteredPlanLevels);
            //console.log(age);
            // console.log(`children_coverage:${children_coverage}`);
            // let pcc: any = this.registrationService.planCoverageCalculations(apiRequest.having_spouse, apiRequest.spouse_details.is_spouse_having_healthcard, apiRequest.no_of_children, children_coverage);
            let pcc = {
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
            let plansFilter = {
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
            };
            let packageFilter = {
                order: 'ordering ASC',
                where: {
                    published: true
                },
            };
            const packages = await this.insurancePackages.find(packageFilter);
            const packagesArray = [];
            for (const pckg of packages) {
                //console.log(pckg.name)
                const packageObject = {};
                // packageObject = pckg;
                packageObject["description"] = pckg.description;
                packageObject["id"] = pckg.id;
                packageObject["logo"] = pckg.logo;
                packageObject["name"] = pckg.name;
                packageObject["published"] = pckg.published;
                packageObject["ordering"] = pckg.ordering;
                packageObject["allowMultiple"] = pckg.allowMultiple;
                packageObject["applyFilters"] = pckg.applyFilters;
                packageObject["optIn"] = pckg.optIn;
                //console.log(plansFilter.where.and.length)
                plansFilter.where.and.splice(5); //6 conditions default; 1 or 2 dynamic -->changed to 5 as required_plan_id is removed
                //console.log(plansFilter.where.and.length)
                //console.log(`Apply filter to this ${pckg.name}:${pckg.applyFilters}`);
                let pccNincondition = pcc.ninCondition;
                let pccExclusivePlanCoverageArray = pcc.exclusivePlanCoverageArray;
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
                        pccExclusivePlanCoverageArray = ['COUPLE', 'FAMILY'];
                    }
                    else if (pcc.maritalStatus == 'COUPLE') {
                        pccExclusivePlanCoverageArray = ['FAMILY'];
                    }
                    else {
                        //FAMILY
                        pccExclusivePlanCoverageArray = [];
                        pccNincondition = false;
                    }
                    // console.log(`fixed for pckg5 pccNincondition:${pccNincondition}`)
                }
                // if (pckg.applyFilters) {
                if (pccNincondition) {
                    let planCoverageConditon = { "or": [{ "planCoverage": { "nin": pccExclusivePlanCoverageArray } }, { "planCoverage": { "eq": null } }] };
                    plansFilter.where.and.push(planCoverageConditon);
                }
                // } else {
                //   console.log('so basic no exc covergae filter')
                // }
                plansFilter.where.and.push({ "packageId": pckg.id });
                let plansLevelFilter = {
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
                        { "relation": "plans", "scope": plansFilter }
                    ]
                };
                const planLevels = await this.insurancePackages.planGroups(pckg.id).find(plansLevelFilter);
                console.log(plansLevelFilter);
                const groupsArray = [];
                for (const pl of planLevels) {
                    if (((_a = pl.plans) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        const plansArray = [];
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
                packageObject["groups"] = groupsArray; //planLevels
                //console.log("-->" + packageObject.groups.length)
                if (groupsArray.length > 0)
                    packagesArray.push(packageObject);
            }
            data.packages = packagesArray; //packages;
        }
        catch (error) {
            console.log(error);
        }
        return data;
    }
    //added based on name get the values
    async broker_create_form_new(brokerId, apiRequest) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        let message, status, statusCode, data = {};
        console.log(apiRequest);
        let signUpformId;
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
                signUpformId = signupForm.id;
                data.form.push(signupForm);
                console.log(`signupForm.id: ${signupForm.id}`);
                //broker_signup_forms_plans
                // let signupFormPlansArray: BrokerSignupFormsPlans[] = [];
                // let signupFormPlans: BrokerSignupFormsPlans = new BrokerSignupFormsPlans();
                //  signupFormPlans.formId = signupForm.id || 0;
                if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                    //get executive plan ids ---> package_id=5
                    let executivePlans = await this.InsurancePlansRepository.find({ where: { packageId: CONST.EXECUTIVE_PACKAGE_ID } });
                    let executivePlanlevelObj = new models_1.SignupFormsPlanLevelMapping();
                    executivePlanlevelObj.formId = signupForm.id || 0;
                    let executivePlanlevelArray = [];
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
                    let planLevels = [];
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
                            let palLevel = await this.PlanLevelRepository.findOne({
                                where: {
                                    and: [
                                        { name: { like: `%${pl}%` } },
                                        { published: '1' }
                                    ]
                                },
                                // fields: { id: true }
                            });
                            if (palLevel) {
                                await planLevels.push(await palLevel.id);
                            }
                            console.log(palLevel);
                            console.log("plan levels after id");
                            console.log(planLevels);
                        }
                    }
                    else {
                        planLevels = formDetails.planLevels;
                    }
                    let executivePlanlevelObj = new models_1.SignupFormsPlanLevelMapping();
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
            } //forms
            message = `Signup Form for ${broker.name} is created successfully`;
            status = '200';
            statusCode = 200;
        }
        catch (error) {
            await this.BrokerRepository.deleteAll({ brokerId: signUpformId });
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
    //added based on name get the values
    async broker_create_form_new_with_salesTrackingCode(brokerIdOrName, idOrName, trackingCode, apiRequest) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        let message, status, statusCode, data = {};
        let broker;
        console.log(apiRequest);
        let signUpformId;
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
                    signUpformId = signupForm.id;
                    data.form.push(signupForm);
                    console.log(`signupForm.id: ${signupForm.id}`);
                    //broker_signup_forms_plans
                    //let signupFormPlansArray: BrokerSignupFormsPlans[] = [];
                    // let signupFormPlans: BrokerSignupFormsPlans = new BrokerSignupFormsPlans();
                    //signupFormPlans.formId = signupForm.id || 0;
                    if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                        //get executive plan ids ---> package_id=5
                        let executivePlans = await this.InsurancePlansRepository.find({ where: { packageId: CONST.EXECUTIVE_PACKAGE_ID } });
                        let executivePlanlevelObj = new models_1.SignupFormsPlanLevelMapping();
                        executivePlanlevelObj.formId = signupForm.id || 0;
                        let executivePlanlevelArray = [];
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
                        let planLevels = [];
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
                                let palLevel = await this.PlanLevelRepository.findOne({
                                    where: {
                                        and: [
                                            { name: { like: `%${pl}%` } },
                                            { published: '1' }
                                        ]
                                    },
                                    // fields: { id: true }
                                });
                                if (palLevel) {
                                    await planLevels.push(await palLevel.id);
                                }
                                // console.log(palLevel);
                                // console.log("plan levels after id");
                                // console.log(planLevels);
                            }
                        }
                        else {
                            planLevels = formDetails.planLevels;
                        }
                        let executivePlanlevelObj = new models_1.SignupFormsPlanLevelMapping();
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
                } //forms
                message = `Signup Form for ${broker.name} is created successfully`;
                status = '200';
                statusCode = 200;
            }
            else {
                message = `Signup Form for ${brokerIdOrName} creation failed no broker details found`;
                status = '202';
                statusCode = 202;
            }
        }
        catch (error) {
            try {
                await this.SignupFormsPlanLevelMappingRepository.deleteAll({ formId: signUpformId });
                //await this.BrokerSignupFormsPlansRepository.deleteAll({ formId: signUpformId });
                await this.SignupFormsRepository.deleteById(signUpformId);
            }
            catch (error) {
                console.log(error);
            }
            console.error(error);
            message = `Signup Form for ${brokerIdOrName} creation failed`;
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
    async formDetails(formId) {
        let message, signupFormPlans, status;
        let data = [];
        let formDetails = await this.SignupFormsRepository.findById(formId, { include: [{ relation: 'signupFormPlanLevels' }] });
        console.log(formDetails);
        try {
            if (formDetails) {
                data = formDetails;
                status = 200;
                message = "Form details";
            }
            else {
                message = "No form details found";
                status = 201;
            }
        }
        catch (error) {
            console.log(error);
            status = 402;
            message = "Error" + error.message;
        }
        this.response.status(status).send({
            message, status, data
        });
        return this.response;
    }
    async addOrRemoveForm(formid, requestBody
    //  {
    //   newType: string,
    //   planlevel?: Array<number>,
    //   oldType: string,
    // }
    ) {
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
            if (oldType == newType && oldType != CONST.SIGNUP_FORM.CUSTOM) {
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
                    let brokerSignUpformlevel = new models_1.SignupFormsPlanLevelMapping();
                    brokerSignUpformlevel.formId = formid || 0;
                    let planlevels = CONST.EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.concat(CONST.EXECUTIVE_HEALTH_PLAN_LEVELS);
                    for (let planLevel of planlevels) {
                        brokerSignUpformlevel.planlevelId = planLevel;
                        await this.SignupFormsPlanLevelMappingRepository.create(brokerSignUpformlevel);
                    }
                }
                else {
                    let planLevesAfter;
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
                            let palLevel = await this.PlanLevelRepository.findOne({
                                where: {
                                    and: [
                                        { name: { like: `%${pl}%` } },
                                        { published: '1' }
                                    ]
                                },
                                // fields: { id: true }
                            });
                            if (palLevel) {
                                await planLevesAfter.push(await palLevel.id);
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
                                message = "No plans found";
                            }
                            else {
                                let brokerSignUpformlevel = new models_1.SignupFormsPlanLevelMapping();
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
    async brokerDetails(id) {
        let final = [];
        let responseObject, status;
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
                                },
                                { relation: 'customers', scope: { fields: { firstName: true, lastName: true, dob: true, gender: true, status: true, userId: true } } }]
                        }
                    }
                ]
            });
            if (!data) {
                status = 201;
                responseObject = {
                    status: 201,
                    message: "No details found",
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
                responseObject = {
                    status: 200,
                    message: "Broker Details",
                    date: new Date(),
                    data: data
                };
            }
            this.response.status(status).send(responseObject);
        }
        catch (error) {
            console.log(error);
        }
        return this.response;
    }
    async brokerFormDetails(brokerid) {
        let status, message, data;
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
                message = "No broker details found";
            }
        }
        catch (error) {
            status = 201;
            message = "No broker details found";
        }
        this.response.status(status).send({
            status, message, data
        });
        return this.response;
    }
    async brokerFormbasedonIdDetails(brokerid, formId) {
        let status, message, data;
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
        }
        catch (error) {
            status = 201;
            message = "No broker details found";
        }
        this.response.status(status).send({
            status, message, data
        });
        return this.response;
    }
    async customersBasedonbrokerId(brokerid) {
        let status, message, data, error;
        try {
            let brokerSignupFormwithCustomers = await this.SignupFormsRepository.find({ where: { brokerId: brokerid }, include: [{ relation: 'customers' }] });
            if (brokerSignupFormwithCustomers.length > 0) {
                status = 200;
                message = "Customers details";
                data = brokerSignupFormwithCustomers;
            }
            else {
                status = 201;
                message = "No customers details found";
            }
        }
        catch (error) {
            status = 401,
                message = "Error",
                error = error.message;
        }
        this.response.status(status).send({
            status, message, data, error
        });
        return this.response;
    }
    async customerdetailsBasedonbrokerIdandCustomerId(brokerid, customerId) {
        let status, message, data, error;
        try {
            let brokerSignupFormwithCustomers = await this.SignupFormsRepository.find({ where: { brokerId: brokerid }, include: [{ relation: 'customers' }] });
            let customerdetails = await this.SignupFormsRepository.customers(customerId).find({ where: { brokerId: brokerid } });
            if (customerdetails.length > 0) {
                status = 200;
                message = "Customer details";
                data = customerdetails;
            }
            else {
                status = 201;
                message = "No customer found";
            }
        }
        catch (error) {
            status = 401,
                message = "Error",
                error = error.message;
        }
        this.response.status(status).send({
            status, message, data, error
        });
        return this.response;
    }
    async customerDetailsBasedOnBrokerIdandFormId(brokerid, customerId, formId) {
        let status, message, data, error;
        try {
            let formDetailsBasedonFormIdandBrokerId = await this.SignupFormsRepository.customers(customerId).find({ where: { id: formId, brokerId: brokerid } });
            if (formDetailsBasedonFormIdandBrokerId.length > 0) {
                status = 200;
                message = "Custoemr details";
                data = formDetailsBasedonFormIdandBrokerId;
            }
            else {
                status = 201;
                message = `No custromers found on this customerid ${customerId}`;
            }
        }
        catch (error) {
            status = 404;
            message = "Error " + error.message;
        }
        this.response.status(status).send({
            status, message, data
        });
        return this.response;
    }
    async search(apiRequest) {
        let status, message, data;
        try {
            let filter = { where: { and: [] }, fields: { policyStartDate: true, name: true, brokerType: true, logo: true, userId: true, contactId: true }, limit: apiRequest.count };
            let searchArray = apiRequest.searchArray;
            for (const seatObj of searchArray) {
                let searchterm = seatObj.searchterm;
                let searchvalue = seatObj.searchvalue;
                if (searchterm == "policyStartDate") {
                    let from = searchvalue.from != "" ? searchvalue.from : '2001-01-01';
                    let to = searchvalue.to != "" ? searchvalue.to : (0, moment_1.default)().format('YYYY-MM-DD');
                    filter.where.and.push({ "policyStartDate": { "between": [from, to] } });
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
            let customers = await this.BrokerRepository.find(filter);
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
            let adminBroker;
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
                    let user;
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
                        let userData = new models_1.Users();
                        userData.username = apiRequest.email;
                        userData.role = CONST.USER_ROLE.BROKER;
                        let password = await (0, common_functions_1.generateRandomPassword)();
                        userData.password = await (0, common_functions_1.encryptPassword)(password);
                        // userData.activation = this.registrationService.getActivationCode();
                        userData.activation = await (0, common_functions_1.getActivationCode)();
                        userData.block = true;
                        userData.registrationDate = todayDate;
                        user = await this.UsersRepository.create(userData);
                        console.log(`user - ${user.id}`);
                    }
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
                    brokerData.salesTrackingType = apiRequest.salesTrackingType || ' ';
                    brokerData.settingsAllowGroupBenefitsWallet = apiRequest.settingsAllowGroupBenefitsWallet || 0;
                    brokerData.settingsAllowInvoicePaymentMethod = apiRequest.settingsAllowInvoicePaymentMethod || 0;
                    brokerData.settingsEnableTieredHealthBenefits = apiRequest.settingsEnableTieredHealthBenefits || 0;
                    brokerData.settingsRolloverEmployeeLimitNextYear = apiRequest.settingsRolloverEmployeeLimitNextYear || 0;
                    brokerData.useInvoicePaymentMethod = apiRequest.useInvoicePaymentMethod || false;
                    const broker = await this.BrokerRepository.create(brokerData);
                    //brokerData.logo=?
                    let brokerAdmin = new models_1.BrokerAdmins();
                    brokerAdmin.brokerId = broker.id;
                    brokerAdmin.userId = user.id || 0;
                    adminBroker = await this.BrokerAdminsRepository.create(brokerAdmin);
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
                    // if (apiRequest.EOCertificate && apiRequest.EOIexpiryDate && apiRequest.EOInsurense && apiRequest.policy) {
                    if (apiRequest.EOinsurence) {
                        let EoinsurenceObj = JSON.parse(apiRequest.EOinsurence);
                        console.log(EoinsurenceObj.length);
                        console.log(EoinsurenceObj.policy);
                        console.log("eo insurence >>>>", EoinsurenceObj);
                        console.log(typeof (EoinsurenceObj));
                        console.log(typeof (apiRequest.EOinsurence));
                        let EOInsurence = new models_1.BrokerEoInsurance();
                        EOInsurence.brokerId = (broker === null || broker === void 0 ? void 0 : broker.id) || 1;
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
                            // let signupFormPlansArray: BrokerSignupFormsPlans[] = [];
                            // let signupFormPlans: BrokerSignupFormsPlans = new BrokerSignupFormsPlans();
                            // signupFormPlans.formId = signupForm.id || 0;
                            if (formDetails.formType == CONST.SIGNUP_FORM.EXECUTIVE) {
                                //get executive plan ids ---> package_id=5
                                let executivePlans = await this.InsurancePlansRepository.find({ where: { packageId: CONST.EXECUTIVE_PACKAGE_ID } });
                                let executivePlanlevelObj = new models_1.SignupFormsPlanLevelMapping();
                                executivePlanlevelObj.formId = signupForm.id || 0;
                                let executivePlanlevelArray = [];
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
                                let customPlanlevelObj = new models_1.SignupFormsPlanLevelMapping();
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
                    await this.BrokerLicensedStatesAndProvincesRepository.deleteAll({ brokerId: brokerId });
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
};
tslib_1.__decorate([
    (0, rest_1.get)(paths_2.BROKER.COUNT, {
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
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "brokerCount", null);
tslib_1.__decorate([
    (0, rest_1.get)(paths_2.BROKER.BROKER),
    (0, rest_1.response)(200, {
        description: 'List of customers',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "getBroker", null);
tslib_1.__decorate([
    (0, rest_1.get)(paths_2.BROKER.BROKERID),
    tslib_1.__param(0, rest_1.param.path.number('brokerId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "brokerDetailsBasedonId", null);
tslib_1.__decorate([
    (0, rest_1.get)(paths_2.BROKER.CUSTOMERLIST),
    tslib_1.__param(0, rest_1.param.path.number('brokerId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "custmerCount", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_2.BROKER.LOGO, {
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
    tslib_1.__param(1, rest_1.param.query.boolean('resize')),
    tslib_1.__param(2, rest_1.requestBody.file()),
    tslib_1.__param(3, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Boolean, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "brokerLogoUpload", null);
tslib_1.__decorate([
    (0, rest_1.del)(paths_2.BROKER.FORM, {
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
    (0, rest_1.del)(paths_2.BROKER.BROKER_FORM),
    tslib_1.__param(0, rest_1.param.path.number('brokerid')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "deleteBrokerForm", null);
tslib_1.__decorate([
    authentication_1.authenticate.skip(),
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
    (0, rest_1.put)(paths_2.BROKER.UPDATE_CONTACTINFO),
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
    (0, rest_1.put)(paths_2.BROKER.UPDATE_LICENSE),
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
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "updateLiceceState", null);
tslib_1.__decorate([
    (0, rest_1.put)(paths_2.BROKER.UPDATE_EOI),
    (0, rest_1.response)(200, {
        description: 'update broker E&O insurence',
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
                schema: (0, rest_1.getModelSchemaRef)(models_1.BrokerEoInsurance, {
                    exclude: ['id', 'brokerId', 'broker_id']
                })
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "updateEO", null);
tslib_1.__decorate([
    (0, rest_1.del)(paths_2.BROKER.BROKERID),
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
    (0, rest_1.post)(paths_2.BROKER.CHANGE_EMAIL),
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
    (0, rest_1.put)(paths_2.BROKER.BROKER, {
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
    })),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "brokerUpdate", null);
tslib_1.__decorate([
    (0, rest_1.get)(paths_2.BROKER.FORM_CONFIG, {
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
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "formeConfig", null);
tslib_1.__decorate([
    (0, rest_1.post)('/broker/plans/pi', {
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
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "planId", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_2.BROKER.PLAN_LEVELS, {
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
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "planlevels", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_2.BROKER.CREATE_FORM, {
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
    ,
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
                                    planLevelsisName: { type: 'boolean', default: 'false' },
                                    planLevels: { type: 'array', default: '[]' }
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
], BrokerController.prototype, "broker_create_form_new", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_2.BROKER.CREATE_FORM_WITH_SALESTRACKING_CODE, {
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
    ,
    tslib_1.__param(0, rest_1.param.path.string('brokerIdOrName')),
    tslib_1.__param(1, rest_1.param.path.boolean('idOrName')),
    tslib_1.__param(2, rest_1.param.path.string('trackingCode')),
    tslib_1.__param(3, (0, rest_1.requestBody)({
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
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Boolean, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "broker_create_form_new_with_salesTrackingCode", null);
tslib_1.__decorate([
    (0, rest_1.get)(paths_2.BROKER.FORM_DETAILS, {
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
    tslib_1.__param(0, rest_1.param.path.number('formId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "formDetails", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_2.BROKER.MODIFY_FORM),
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
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "addOrRemoveForm", null);
tslib_1.__decorate([
    (0, rest_1.get)(paths_2.BROKER.BROKER_DETAILS),
    tslib_1.__param(0, rest_1.param.path.number('brokerId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "brokerDetails", null);
tslib_1.__decorate([
    (0, rest_1.get)(paths_2.BROKER.BROKER_FORMS),
    tslib_1.__param(0, rest_1.param.path.number('brokerid')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "brokerFormDetails", null);
tslib_1.__decorate([
    (0, rest_1.get)(paths_2.BROKER.BROKER_FORM_DETAILS),
    tslib_1.__param(0, rest_1.param.path.number('brokerid')),
    tslib_1.__param(1, rest_1.param.path.number('formId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "brokerFormbasedonIdDetails", null);
tslib_1.__decorate([
    (0, rest_1.get)(paths_2.BROKER.BROKER_CUSTOMERS),
    tslib_1.__param(0, rest_1.param.path.number('brokerid')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "customersBasedonbrokerId", null);
tslib_1.__decorate([
    (0, rest_1.get)(paths_2.BROKER.BROKER_CUSTOMER_DETAILS),
    tslib_1.__param(0, rest_1.param.path.number('brokerid')),
    tslib_1.__param(1, rest_1.param.path.number('customerId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "customerdetailsBasedonbrokerIdandCustomerId", null);
tslib_1.__decorate([
    (0, rest_1.get)(paths_2.BROKER.BROKER_FORM_CUSTOMER_DETAILS),
    tslib_1.__param(0, rest_1.param.path.number('brokerid')),
    tslib_1.__param(1, rest_1.param.path.number('customerId')),
    tslib_1.__param(2, rest_1.param.path.number('formId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "customerDetailsBasedOnBrokerIdandFormId", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_2.BROKER.SEARCH, {
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
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "search", null);
tslib_1.__decorate([
    (0, rest_1.post)(paths_2.BROKER.REGISTRATION, {
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
    })),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BrokerController.prototype, "broker_registration", null);
BrokerController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.BrokerLicensedStatesAndProvincesRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.SignupFormsPlanLevelMappingRepository)),
    tslib_1.__param(3, (0, repository_1.repository)(repositories_1.UsersRepository)),
    tslib_1.__param(4, (0, repository_1.repository)(repositories_1.ContactInformationRepository)),
    tslib_1.__param(5, (0, repository_1.repository)(repositories_1.SignupFormsRepository)),
    tslib_1.__param(6, (0, repository_1.repository)(repositories_1.StatesAndProvincesRepository)),
    tslib_1.__param(7, (0, repository_1.repository)(repositories_1.CustomerSignupRepository)),
    tslib_1.__param(8, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__param(9, (0, repository_1.repository)(repositories_1.InsurancePlansRepository)),
    tslib_1.__param(10, (0, repository_1.repository)(repositories_1.PlanLevelRepository)),
    tslib_1.__param(11, (0, repository_1.repository)(repositories_1.BrokerEoInsuranceRepository)),
    tslib_1.__param(12, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(13, (0, core_1.inject)(keys_1.FILE_UPLOAD_SERVICE)),
    tslib_1.__param(14, (0, core_1.service)(services_1.HttpService)),
    tslib_1.__param(15, (0, core_1.service)(services_1.ResizeimgService)),
    tslib_1.__param(16, (0, core_1.service)(services_1.BrokerService)),
    tslib_1.__param(17, (0, repository_1.repository)(repositories_1.InsurancePackagesRepository)),
    tslib_1.__param(18, (0, repository_1.repository)(repositories_1.PlansAvailabilityRepository)),
    tslib_1.__param(19, (0, repository_1.repository)(broker_admins_repository_1.BrokerAdminsRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository,
        repositories_1.BrokerLicensedStatesAndProvincesRepository,
        repositories_1.SignupFormsPlanLevelMappingRepository,
        repositories_1.UsersRepository,
        repositories_1.ContactInformationRepository,
        repositories_1.SignupFormsRepository,
        repositories_1.StatesAndProvincesRepository,
        repositories_1.CustomerSignupRepository,
        repositories_1.CustomerRepository,
        repositories_1.InsurancePlansRepository,
        repositories_1.PlanLevelRepository,
        repositories_1.BrokerEoInsuranceRepository, Object, Function, services_1.HttpService,
        services_1.ResizeimgService,
        services_1.BrokerService,
        repositories_1.InsurancePackagesRepository,
        repositories_1.PlansAvailabilityRepository,
        broker_admins_repository_1.BrokerAdminsRepository])
], BrokerController);
exports.BrokerController = BrokerController;
//# sourceMappingURL=broker.controller.js.map