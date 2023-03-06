"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH = exports.BROKER = exports.CORPORATE = exports.FUSEBILL_API_BASE_PATH = exports.USER_API_BASE_PATH = exports.CUSTOMER_API_BASE_PATH = exports.COMMON_API_BASE_PATH = exports.ADMIN_APP_DETAILS = exports.ADMIN_API_BASE_PATH = exports.APP_BASE_PATH = exports.API_BASE_PATH = exports.BASE_PATH = exports.CHEQUEPATH_STRING = exports.CUSTOMER_CHEQUES_PATH = exports.CUSTOMER_CHEQUES_FOLDER = exports.SERVER_ROE_FOLDER = exports.REPORTS_PATH = exports.REPORTS_FOLDER = exports.SERVER_FOLDER = exports.DISCLOSUREPATH_STRING = exports.BROKERPATH_STRING = exports.BROKER_DISCLOSURES_FOLDER = exports.DISCLOSURES_FOLDER = exports.BROKERIMG_RESOURCES_FOLDER = exports.IMAGE_RESOURCES_FOLDER = exports.RESOURCES_FOLDER = exports.TEMP_UPLOADS_FOLDER = exports.TEMP_EXTDATA_FOLDER = exports.GB_LOGO = exports.DISCLOSURE = exports.TERMS_COND = exports.LANG_TOKENS = exports.SERVER_EXTDATA_PATH = exports.SERVER_ROE_FILES_PATH = exports.SERVER_FILES_PATH = exports.IMG_RESOURCES_PATH = exports.RESOURCES_PATH = exports.BASE_URL = void 0;
exports.BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
exports.RESOURCES_PATH = exports.BASE_URL + '/app/resources/';
exports.IMG_RESOURCES_PATH = exports.BASE_URL + '/app/resources/images/';
exports.SERVER_FILES_PATH = exports.BASE_URL + '/app/server/';
exports.SERVER_ROE_FILES_PATH = exports.BASE_URL + '/app/server/ROE/';
exports.SERVER_EXTDATA_PATH = exports.BASE_URL + '/app/temp/externalData/';
exports.LANG_TOKENS = exports.SERVER_FILES_PATH + '{lang}/langTokens-{lang}.json';
//export const TERMS_COND = SERVER_FILES_PATH + '{lang}/terms-conditions-{lang}.html'
exports.TERMS_COND = exports.SERVER_FILES_PATH + '{lang}/terms-conditions-{lang}.pdf';
//export const DISCLOSURE = SERVER_FILES_PATH + '{lang}/disclosure-agreement-{lang}.html'
exports.DISCLOSURE = exports.SERVER_FILES_PATH + '{lang}/disclosure-agreement-{lang}.pdf';
exports.GB_LOGO = exports.IMG_RESOURCES_PATH + 'gb_logo.png';
exports.TEMP_EXTDATA_FOLDER = "./support/extdata";
exports.TEMP_UPLOADS_FOLDER = "./uploads";
exports.RESOURCES_FOLDER = "./public/resources";
exports.IMAGE_RESOURCES_FOLDER = exports.RESOURCES_FOLDER + "/images";
exports.BROKERIMG_RESOURCES_FOLDER = exports.IMAGE_RESOURCES_FOLDER + "/broker";
exports.DISCLOSURES_FOLDER = exports.RESOURCES_FOLDER + '/disclosures';
exports.BROKER_DISCLOSURES_FOLDER = exports.DISCLOSURES_FOLDER + "/broker";
exports.BROKERPATH_STRING = 'app/resources/images/broker/';
exports.DISCLOSUREPATH_STRING = 'app/resources/disclosures/broker/';
exports.SERVER_FOLDER = './public/server';
exports.REPORTS_FOLDER = exports.SERVER_FOLDER + '/reports';
exports.REPORTS_PATH = exports.SERVER_FILES_PATH + 'reports/';
exports.SERVER_ROE_FOLDER = './public/server/ROE';
exports.CUSTOMER_CHEQUES_FOLDER = "./support/customer/bank";
exports.CUSTOMER_CHEQUES_PATH = exports.BASE_URL + '/app/temp/bankCheque/';
exports.CHEQUEPATH_STRING = 'app/temp/bankCheque/';
//ROOT
exports.BASE_PATH = "/";
exports.API_BASE_PATH = "/api/";
exports.APP_BASE_PATH = "/app/";
//API
//ADMIN
exports.ADMIN_API_BASE_PATH = exports.API_BASE_PATH + "admin/";
exports.ADMIN_APP_DETAILS = exports.ADMIN_API_BASE_PATH + "/app";
//Common
exports.COMMON_API_BASE_PATH = exports.API_BASE_PATH + "common/";
//CUSTOMER
exports.CUSTOMER_API_BASE_PATH = exports.API_BASE_PATH + "customer/";
//USER
exports.USER_API_BASE_PATH = exports.API_BASE_PATH + "user/";
//OTHERS
//FUSEBILL
exports.FUSEBILL_API_BASE_PATH = exports.API_BASE_PATH + "fusebill/";
//corporate paths
exports.CORPORATE = {
    SIGNUP: '/corporate/signup',
    LOGO: '/corporate/{company}/logo',
    FORMCONFIG: '/corporateSignup/formConfig',
    BANK_DETAILS_REGISTER: '/bankDetails/register',
    BANK_VERIFY: '/bank/verify',
    PLANS: '/corporate/validation',
    CUSTOMER_PLANS: '/corporate/{corporateId}/plans',
    CUSTOMER_VALIDATION: '/corporate/customer/validation',
    EMPLOYEE: '/corporate/{corporateId}/employee',
    PLAN_SELECTION: '/corporate/{corporateId}/planSelections',
    CONFIGURE_WALLET: '/corporate/{corporateId}/configureWallet',
    TIER: '/corporate/{corporateId}/configureTiers',
    EXCEL: '/corporate/uploadEmployees',
};
// broker paths
exports.BROKER = {
    COUNT: '/brokers/count',
    BROKER: '/broker',
    BROKERS: '/brokers',
    BROKERID: '/broker/{brokerId}',
    CUSTOMERLIST: '/admin/broker/{brokerId}/customerlist',
    LOGO: '/broker/{brokerid}/logo',
    FORM: '/broker/form/{formId}',
    BROKER_FORM: '/broker/{brokerId}/brokerForm',
    MODIFY_FORM: '/broker/form/{formId}/modify',
    UPDATE_CONTACTINFO: '/broker/{brokerId}/updateContactInfo',
    UPDATE_LICENSE: '/broker/{brokerId}/updateLicenseState',
    UPDATE_EOI: '/broker/{brokerId}/updateLicenceEO',
    CHANGE_EMAIL: '/broker/{brokerId}/changeEmailId',
    FORM_CONFIG: '/broker/formConfig',
    PLAN_LEVELS: '/broker/availablePlans',
    CREATE_FORM: '/broker/{brokerId}/createForm',
    CREATE_FORM_WITH_SALESTRACKING_CODE: '/broker/{brokerIdOrName}/createForm/{trackingCode}',
    FORM_DETAILS: '/broker/form/{formId}/Details',
    BROKER_DETAILS: '/broker/{brokerId}/details',
    BROKER_FORMS: '/broker/{brokerid}/forms',
    BROKER_FORM_DETAILS: '/broker/{brokerid}/form/{formId}/details',
    BROKER_CUSTOMERS: '/broker/{brokerid}/customers',
    BROKER_CUSTOMER_DETAILS: '/broker/{brokerid}/customer/{customerId}/details',
    BROKER_FORM_CUSTOMER_DETAILS: '/broker/{brokerid}/form/{formId}/customer/{customerId}/details',
    SEARCH: '/broker/search',
    REGISTRATION: '/broker/registration',
    APP: '/app',
    FORM_LOGO: '/broker/form/{formId}/logo',
    FORM_DISCLOUSER: '/broker/form/{formId}/disclouser',
    BROKER_DISCLOUSER: '/broker/{brokerId}/disclouser'
};
//AUTH 
exports.AUTH = {
    LOGIN: '/auth/login',
    WHOAMI: '/user/whoAmI',
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    FORGOTPASSWORD: '/auth/forgotPassword',
    USER_ACTIVATION: '/auth/userActivation/{key}',
    CHANGE_PASSWORD: '/user/changePassword',
    APP: '/admin/app',
    IP: '/userIp',
};
//# sourceMappingURL=paths.js.map