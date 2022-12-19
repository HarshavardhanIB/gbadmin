"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FUSEBILL_API_BASE_PATH = exports.USER_API_BASE_PATH = exports.CUSTOMER_API_BASE_PATH = exports.COMMON_API_BASE_PATH = exports.ADMIN_APP_DETAILS = exports.ADMIN_API_BASE_PATH = exports.APP_BASE_PATH = exports.API_BASE_PATH = exports.BASE_PATH = exports.CHEQUEPATH_STRING = exports.CUSTOMER_CHEQUES_PATH = exports.CUSTOMER_CHEQUES_FOLDER = exports.REPORTS_PATH = exports.REPORTS_FOLDER = exports.SERVER_FOLDER = exports.BROKERPATH_STRING = exports.BROKERIMG_RESOURCES_FOLDER = exports.IMAGE_RESOURCES_FOLDER = exports.RESOURCES_FOLDER = exports.TEMP_UPLOADS_FOLDER = exports.TEMP_EXTDATA_FOLDER = exports.GB_LOGO = exports.DISCLOSURE = exports.TERMS_COND = exports.LANG_TOKENS = exports.SERVER_EXTDATA_PATH = exports.SERVER_FILES_PATH = exports.IMG_RESOURCES_PATH = exports.RESOURCES_PATH = exports.BASE_URL = void 0;
exports.BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
exports.RESOURCES_PATH = exports.BASE_URL + '/app/resources/';
exports.IMG_RESOURCES_PATH = exports.BASE_URL + '/app/resources/images/';
exports.SERVER_FILES_PATH = exports.BASE_URL + '/app/server/';
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
exports.BROKERPATH_STRING = 'app/resources/images/broker/';
exports.SERVER_FOLDER = './public/server';
exports.REPORTS_FOLDER = exports.SERVER_FOLDER + '/reports';
exports.REPORTS_PATH = exports.SERVER_FILES_PATH + 'reports/';
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
//# sourceMappingURL=paths.js.map