export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
export const RESOURCES_PATH = BASE_URL + '/app/resources/'
export const IMG_RESOURCES_PATH = BASE_URL + '/app/resources/images/'
export const SERVER_FILES_PATH = BASE_URL + '/app/server/'

export const SERVER_EXTDATA_PATH = BASE_URL + '/app/temp/externalData/'

export const LANG_TOKENS = SERVER_FILES_PATH + '{lang}/langTokens-{lang}.json'
//export const TERMS_COND = SERVER_FILES_PATH + '{lang}/terms-conditions-{lang}.html'
export const TERMS_COND = SERVER_FILES_PATH + '{lang}/terms-conditions-{lang}.pdf'
//export const DISCLOSURE = SERVER_FILES_PATH + '{lang}/disclosure-agreement-{lang}.html'
export const DISCLOSURE = SERVER_FILES_PATH + '{lang}/disclosure-agreement-{lang}.pdf'

export const GB_LOGO = IMG_RESOURCES_PATH + 'gb_logo.png'

export const TEMP_EXTDATA_FOLDER = "./support/extdata"

export const TEMP_UPLOADS_FOLDER = "./uploads"
export const RESOURCES_FOLDER = "./public/resources"
export const IMAGE_RESOURCES_FOLDER = RESOURCES_FOLDER + "/images"
export const BROKERIMG_RESOURCES_FOLDER = IMAGE_RESOURCES_FOLDER + "/broker"

export const BROKERPATH_STRING = 'app/resources/images/broker/';

export const SERVER_FOLDER = './public/server'
export const REPORTS_FOLDER = SERVER_FOLDER + '/reports'
export const REPORTS_PATH = SERVER_FILES_PATH + 'reports/'

export const CUSTOMER_CHEQUES_FOLDER = "./support/customer/bank"
export const CUSTOMER_CHEQUES_PATH = BASE_URL + '/app/temp/bankCheque/'
export const CHEQUEPATH_STRING = 'app/temp/bankCheque/';
//ROOT
export const BASE_PATH = "/";
export const API_BASE_PATH = "/api/";
export const APP_BASE_PATH = "/app/";




//API

//ADMIN
export const ADMIN_API_BASE_PATH = API_BASE_PATH + "admin/"

export const ADMIN_APP_DETAILS = ADMIN_API_BASE_PATH + "/app"

//Common
export const COMMON_API_BASE_PATH = API_BASE_PATH + "common/"

//CUSTOMER
export const CUSTOMER_API_BASE_PATH = API_BASE_PATH + "customer/"

//USER
export const USER_API_BASE_PATH = API_BASE_PATH + "user/"

//OTHERS
//FUSEBILL
export const FUSEBILL_API_BASE_PATH = API_BASE_PATH + "fusebill/"
