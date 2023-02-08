"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT_TYPE_ARRAY = exports.LICENSE_COVERAGE = exports.FORM_TYPE_ARRAY = exports.SIGNUP_FORM = exports.DEFAULT_COUNTRY = exports.VALIDATIONS = exports.HIRING_DATE_INELIGIBILITY_PERIOD_DURATION = exports.HIRING_DATE_INELIGIBILITY_PERIOD_NO = exports.HIRING_DATE_LIMIT = exports.MONTH = exports.LOGGING_SOURCE = exports.EQUITABLE_REGISTRATION_STATUS = exports.GREENSHEILD_REGISTRATION_STATUS = exports.EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS = exports.EXECUTIVE_HEALTH_PLAN_LEVELS = exports.EXECUTIVE_PACKAGES = exports.EXECUTIVE_PACKAGE_ID = exports.HIGHCOST_DRUGS_PLAN_LEVELS = exports.HIGHCOST_DRUGS_PACKAGES = exports.HIGHCOST_DRUGS_PACKAGE_ID = exports.OPTIN_PLAN_LEVELS = exports.OPTIN_PACKAGES = exports.EQUITABLE_PLAN_LEVELS = exports.EQUITABLE_PACKAGES = exports.GREENSHEILD_PLAN_LEVELS = exports.GREENSHEILD_PACKAGES = exports.HEALTH_DENTAL_PACKAGES = exports.HEALTH_DENTAL_PACKAGE_ID = exports.NODATA = exports.NONE = exports.PARTIAL = exports.MAX = exports.MIN = exports.LICENCE = exports.EOI = exports.STATUS = exports.GENDER_LIST = exports.GENDER = exports.PLAN_COVERAGE_LIST = exports.PLAN_COVERAGE = exports.MARITAL_STATUS_LIST = exports.MARITAL_STATUS = exports.MARITAL_STATUS_OLD = exports.RELATIONSHIP_TYPE = exports.ADDRESS_TYPE = exports.CONTACT_TYPE = exports.USER_ROLE = exports.dateFormat2 = exports.dateFormat1 = exports.WELCOME = void 0;
exports.ACH_PAYMENT_STATUS = exports.ACH_CUSTOMER_STATUS_LIST = exports.ACH_CUSTOMER_STATUS = exports.ACHserviceEndpoints = exports.PAD = exports.ACH = exports.PAYMENT_METHOD_LIST_ARRAY = exports.PAYMENT_METHOD_LIST = exports.PAYMENT_METHOD = exports.REGEX = exports.INSURANCE_SERVICES = exports.REPORTING_ID = exports.REPORTING_TYPE = exports.signupFormExec = exports.signupForm = exports.broker = exports.targetTestcasesExecutive = exports.TestDataExecutive = exports.targetTestcasesEquitable = exports.TestDataEquitable = exports.TestDataEquitableSave = exports.targetTestcasesGreenshield = exports.TestDataGreenshield = exports.TestDataGreenshield_BCK = exports.commonExecutionData = exports.serviceEndpoints = exports.aitp = exports.userCreds = exports.PAYMENTSUCCESS_MAIL_SUBJECT_CUSTOMER = exports.PAYMENTSUCCESS_MAIL_SUBJECT_BROKER = exports.PAYMENTFAIL_MAIL_SUBJECT_CUSTOMER = exports.PAYMENTFAIL_MAIL_SUBJECT_BROKER = exports.CUSTOMERREGISTRAION_MAIL_SUBJECT_CUSTOMER = exports.CUSTOMERREGISTRAION_MAIL_SUBJECT_BROKER = exports.CUSTOMERREGISTRAION_MAIL_SUBJECT_SYSADMIN = exports.CUSTOMER_CANCEL_REPORT_MAIL_SUBJECT_BROKER = exports.CUSTOMER_CANCEL_REPORT_MAIL_SUBJECT_SYSADMIN = exports.CUSTOMER_UPDATE_REPORT_MAIL_SUBJECT_BROKER = exports.CUSTOMER_UPDATE_REPORT_MAIL_SUBJECT_SYSADMIN = exports.CUSTOMER_ENROLL_REPORT_MAIL_SUBJECT_BROKER = exports.CUSTOMER_ENROLL_REPORT_MAIL_SUBJECT_SYSADMIN = exports.GB_ADMIN = exports.GB_SUPPORT = exports.GB_DEV = exports.httpStatus = exports.DEFAULT_LANGAUGE = exports.DEFAULT_FORM = exports.DEFAULT_FORM_ID = exports.BROKER_TYPE_ARRAY = exports.BROKER = void 0;
exports.MAINAPI_DOMAIN = exports.BROKER_LICENSE_COVERAGE_LIST = exports.BROKER_LICENSE_COVERAGE = exports.PAD_CLIENT_SECRET = exports.PAD_CLIENT_ID = exports.ACH_PAYMENT_STATUS_LIST = void 0;
// import {DISCLOSURE} from './disclosure_agreement';
const paths_1 = require("./paths");
// import {TERMS_AND_CONDITIONS} from './terms_and_conditions';
exports.WELCOME = 'Welcome to GroupBenefitz';
exports.dateFormat1 = "YYYY-MM-DD HH:MM:SS";
exports.dateFormat2 = "YYYY-MM-DD";
exports.USER_ROLE = {
    CUSTOMER: 'CUSTOMER',
    CORPORATE_ADMINISTRATOR: 'CORPORATE_ADMIN',
    // COMPANY_ADMINISTRATOR: 'COMPANY_ADMINISTRATOR',
    BROKER: 'BROKER',
    AGENT: 'AGENT',
    ADMINISTRATOR: 'ADMINISTRATOR'
};
exports.CONTACT_TYPE = {
    CUSTOMER: 'CUSTOMER',
    CUSTOMER_RELATIVE: 'CUSTOMER_RELATIVE',
    COMPANY: 'COMPANY',
    GROUP: 'GROUP',
    AGENT: 'AGENT',
    BROKER: 'BROKER',
    SERVICE_PROVIDER: 'SERVICE_PROVIDER',
    INSURANCE_COMPANY: 'INSURANCE_COMPANY'
};
exports.ADDRESS_TYPE = {
    SHIPPING_ADDRESS: 'SHIPPING_ADDRESS',
    BILLING_ADDRESS: 'BILLING_ADDRESS',
    HOME_ADDRESS: 'HOME_ADDRESS',
    OFFICE_ADDRESS: 'OFFICE_ADDRESS'
};
exports.RELATIONSHIP_TYPE = {
    SPOUSE: 'SPOUSE',
    CHILDREN: 'CHILDREN'
};
exports.MARITAL_STATUS_OLD = {
    SINGLE: 'SINGLE',
    MARRIED: 'MARRIED',
    DIVORCED: 'DIVORCED',
    SEPARATED: 'SEPARATED',
    COMMON_LAW: 'COMMON LAW',
    WIDOW: 'WIDOW',
    FAMILY: 'FAMILY',
};
exports.MARITAL_STATUS = {
    SINGLE: 'SINGLE',
    COUPLE: 'COUPLE',
    FAMILY: 'FAMILY',
};
exports.MARITAL_STATUS_LIST = ['SINGLE', 'COUPLE', 'FAMILY'];
exports.PLAN_COVERAGE = {
    SINGLE: 'SINGLE',
    COUPLE: 'COUPLE',
    FAMILY: 'FAMILY',
    INCOME_REPLACEMENT: 'INCOME_REPLACEMENT',
    EMPLOYEE_ASSISTANCE: 'EMPLOYEE_ASSISTANCE',
    MENTHAL_HEALTH: 'MENTHAL_HEALTH'
};
exports.PLAN_COVERAGE_LIST = ['SINGLE', 'COUPLE', 'FAMILY', 'INCOME_REPLACEMENT', 'EMPLOYEE_ASSISTANCE', 'MENTHAL_HEALTH'];
exports.GENDER = {
    MALE: 'Male',
    FEMALE: 'Female',
    NONBINARY: 'Non-Binary',
    UNDISCLOSED: 'Undisclosed'
};
exports.GENDER_LIST = ['Male', 'Female', 'Non-Binary', 'Undisclosed'];
exports.STATUS = {
    DRAFT: 'Draft',
    ACTIVE: 'Active',
    HOLD: 'Hold',
    SUSPENDED: 'Suspended',
    CANCELLED: 'Cancelled'
};
exports.EOI = {
    EXPIRE: "E&O insurece is expired",
};
exports.LICENCE = {
    EXPIRE: "expired",
    FOUND: "Licences are found",
    NOLICENCES: "No Licences",
};
exports.MIN = "Min";
exports.MAX = "Max";
exports.PARTIAL = 'Partial';
exports.NONE = 'None';
exports.NODATA = 'No data found';
exports.HEALTH_DENTAL_PACKAGE_ID = 1;
exports.HEALTH_DENTAL_PACKAGES = [1];
exports.GREENSHEILD_PACKAGES = [1]; //Health&Dental
exports.GREENSHEILD_PLAN_LEVELS = [2, 3, 4, 5]; //Health&Dental - Classic
exports.EQUITABLE_PACKAGES = [1]; //Health&Dental
exports.EQUITABLE_PLAN_LEVELS = [7, 8, 9]; //Health&Dental - Allin
exports.OPTIN_PACKAGES = [8]; //Optin
exports.OPTIN_PLAN_LEVELS = [17];
exports.HIGHCOST_DRUGS_PACKAGE_ID = 3; //Catastrophic
exports.HIGHCOST_DRUGS_PACKAGES = [3]; //Executive
exports.HIGHCOST_DRUGS_PLAN_LEVELS = [10];
exports.EXECUTIVE_PACKAGE_ID = 5;
exports.EXECUTIVE_PACKAGES = [5]; //Executive
exports.EXECUTIVE_HEALTH_PLAN_LEVELS = [17];
exports.EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS = [18];
exports.GREENSHEILD_REGISTRATION_STATUS = {
    PENDING: 'PENDING',
    DONE: 'DONE',
    MANUAL: 'MANUAL',
    TERMINATED: 'TERMINATED'
};
exports.EQUITABLE_REGISTRATION_STATUS = {
    PENDING: 'PENDING',
    DONE: 'DONE',
    SAVE: 'SAVE',
    MANUAL: 'MANUAL',
    TERMINATED: 'TERMINATED'
};
exports.LOGGING_SOURCE = {
    WEB: 'WEB',
    API: 'API',
    WEBHOOK: 'WEBHOOK',
};
exports.MONTH = 30 * 24 * 60 * 60 * 1000; // Month in milliseconds
exports.HIRING_DATE_LIMIT = 3 * exports.MONTH;
exports.HIRING_DATE_INELIGIBILITY_PERIOD_NO = 90; //no. in days
exports.HIRING_DATE_INELIGIBILITY_PERIOD_DURATION = 'days'; //no. in days
exports.VALIDATIONS = {
    CUSTOMER_AGE_MIN: 16,
    CUSTOMER_AGE_MAX: 100,
    CUSTOMER_WORKING_HOURS_MIN: 20,
    CUSTOMER_WORKING_HOURS_MAX: 80,
    SPOUSE_AGE_MIN: 16,
    CUSTOMER_HIRING_DATE_MIN: 16,
    CUSTOMER_HIRING_DATE_MAX: exports.HIRING_DATE_INELIGIBILITY_PERIOD_NO // days
};
exports.DEFAULT_COUNTRY = {
    name: 'Canada',
    id: 1,
    shortName: 'CA',
    isoCode: 'en-ca',
    currency: 'CAD',
    fusebillId: 124,
    currencySymbol: '$'
};
exports.SIGNUP_FORM = {
    REGULAR: 'REGULAR',
    EXECUTIVE: 'EXECUTIVE',
    CUSTOM: 'CUSTOM'
};
exports.FORM_TYPE_ARRAY = [exports.SIGNUP_FORM.REGULAR, exports.SIGNUP_FORM.EXECUTIVE, exports.SIGNUP_FORM.CUSTOM];
exports.LICENSE_COVERAGE = ['LIFE_ACCIDENT_AND_SICKNESS', 'ACCIDENT_AND_SICKNESS', 'LIFE'];
exports.PRODUCT_TYPE_ARRAY = [
    'Classic Copper', 'Classic Bronze', 'Classic Silver',
    'All - In Bronze', 'All - In Silver', 'All - In Gold',
    'PocketPills',
    'EAP 2.0', 'Complete Wellness',
    'High - Cost Drugs(HCD)',
    'Protect 100', 'Protect 200',
    'Executive Health', 'Complete Executive Care'
];
exports.BROKER = {
    BROKERAGE: 'BROKERAGE',
    ADVISOR: 'ADVISOR',
    ASSOCIATION: 'ASSOCIATION',
    CORPORATE: 'CORPORATE',
    TPA_MGA: 'TPA/MGA'
};
exports.BROKER_TYPE_ARRAY = [exports.BROKER.BROKERAGE, exports.BROKER.ADVISOR, exports.BROKER.ASSOCIATION, exports.BROKER.CORPORATE, exports.BROKER.TPA_MGA];
exports.DEFAULT_FORM_ID = 1; //HouseClient form...
exports.DEFAULT_FORM = {
    name: 'Health Benefits Application Form',
    title: 'Group Benefitz - Insurance signup',
    description: 'Group Benefitz registration page',
    formType: exports.SIGNUP_FORM.REGULAR,
    id: 1,
    termsAndConditions: paths_1.SERVER_FILES_PATH + 'terms-conditions.pdf',
    disclosureAgreement: paths_1.SERVER_FILES_PATH + 'disclosure-agreement.pdf',
    languageTokens: paths_1.SERVER_FILES_PATH + 'langTokens-default.html',
    ineligibilityPeriod: 0,
    ineligibilityPeriodToken: 'days',
};
exports.DEFAULT_LANGAUGE = "en";
exports.httpStatus = {
    "SUCCESS": "200",
    "PARTIAL": "206",
    "FAILED": "202"
};
/*mail*/
exports.GB_DEV = process.env.GBDEV || "admin@aitestpro.com";
exports.GB_SUPPORT = process.env.GBSUPPORT || "GB_Support@ideabytes.com";
exports.GB_ADMIN = process.env.GBADMIN || "admin@aitestpro.com";
exports.CUSTOMER_ENROLL_REPORT_MAIL_SUBJECT_SYSADMIN = "Customers Enrollment Report at GroupBenefitz";
exports.CUSTOMER_ENROLL_REPORT_MAIL_SUBJECT_BROKER = "Customers Enrollment Report at GroupBenefitz";
exports.CUSTOMER_UPDATE_REPORT_MAIL_SUBJECT_SYSADMIN = "Customers Updated Report at GroupBenefitz";
exports.CUSTOMER_UPDATE_REPORT_MAIL_SUBJECT_BROKER = "Customers Updated Report at GroupBenefitz";
exports.CUSTOMER_CANCEL_REPORT_MAIL_SUBJECT_SYSADMIN = "Customers Cancellation Report at GroupBenefitz";
exports.CUSTOMER_CANCEL_REPORT_MAIL_SUBJECT_BROKER = "Customers Cancellation Report at GroupBenefitz";
exports.CUSTOMERREGISTRAION_MAIL_SUBJECT_SYSADMIN = "Customer Registered at GroupBenefitz";
exports.CUSTOMERREGISTRAION_MAIL_SUBJECT_BROKER = "Customer Registered at GroupBenefitz";
exports.CUSTOMERREGISTRAION_MAIL_SUBJECT_CUSTOMER = "Registration Successful";
exports.PAYMENTFAIL_MAIL_SUBJECT_BROKER = "Payment Failed at Fusebill";
exports.PAYMENTFAIL_MAIL_SUBJECT_CUSTOMER = "Payment Failed at Fusebill";
exports.PAYMENTSUCCESS_MAIL_SUBJECT_BROKER = "Payment Success at Fusebill";
exports.PAYMENTSUCCESS_MAIL_SUBJECT_CUSTOMER = "Payment Success at Fusebill";
/* testdata recording linls */
exports.userCreds = {
    "username": process.env.GBUSER || "gb_aitp",
    "email": process.env.GBEMAIL || "gb.aitp@ideabytes.com",
    "password": process.env.GBPASSWORD || "gb@Aitp22",
};
exports.aitp = {
    "server": process.env.AITPSERVER || "http://127.0.0.1/aitestpro"
};
exports.serviceEndpoints = {
    "login": '/api/auth/signin',
    "executionId": '/api/user/get_execution_id',
    "externalData": '/api/user/execute_script_external_source_multiple'
};
// export const headers = {
//   'Content-Type': 'application/json',
//   'Authorization': 'Bearer ' + token
// }
exports.commonExecutionData = {
    "tool": "selenium",
    "os": "linux",
    "browser": "chrome",
    "executePreConditions": 0,
    "debugMode": 1,
    "executeAll": 1,
    // "repoName": "user_000008_kko1sjbvou",
    // "tableName": "greenshield_1_0_sp_sprint1_1_8",
    // "fileName": "https://commonresources.aitestpro.com/excel/user_000008/greenshield_1_0_sp_sprint1_1_8.xlsx",
    repoName: 'user_000031_ah9yryydjo',
    tableName: 'greenshiled_single_1_0_sp_1_0_1_0',
    fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_single_1_0_sp_1_0_1_0.xlsx',
    "excelVersion": "v1",
    "testCases": [
        ""
    ],
    "targetTestcases": [
        "Dependents"
    ],
    "execution_id": 747,
    "project_id": "83",
    "testsuite_id": "84",
    "saveToDB": "",
    "sheetKey": "0",
    "videoRecording": (process.env.AITP_EXEC_VIDEORECORDING ? (process.env.AITP_EXEC_VIDEORECORDING == "yes" ? true : false) : true),
    "allowMultipleExecutions": false,
    "flagKeyMultipleExecutions": "websiteName",
    "flagValueMultipleExecutions": "",
    "projectName": "greenshiled_single",
    "projectNameVersion": "greenshiled_single_1_0",
    "websiteName": "",
    "websiteLink": "",
    "continueOnRequestFail": true,
    "skipDataset1": true
};
/* export const TestData: any = {

  terminate: {
    "flagValueMultipleExecutions": "greenshield",
    "projectName": "greenshiled_single",
    "projectNameVersion": "greenshiled_single_1_0",
    "websiteName": "greenshield",
    repoName: 'user_000031_ah9yryydjo',
    tableName: 'greenshiled_single_1_0_sp_1_0_1_0',
    // fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_single_1_0_sp_1_0_1_0.xlsx',
    fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_1_0_sp_1_0_1_0.xlsx',
    "targetTestcases": [
      "Terminate_Member"
    ], "target": {
      "request": {
        "Terminate_Member": [
          {"3": ["1"]},
          {"4": ["1"]},
          {"6": ["1", "2", "3", "4", "5"]}
        ],
      },
      "response": {},
      "crossverify": {}
    },
    "source": {
      "type": "link",
      "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_17.xlsx",
      "data": ""
    },
  },

  single: {
    "flagValueMultipleExecutions": "greenshield",
    "projectName": "greenshiled_single",
    "projectNameVersion": "greenshiled_single_1_0",
    "websiteName": "greenshield",
    // "repoName": "user_000008_kko1sjbvou",
    // "tableName": "greenshield_1_0_sp_sprint1_1_8",
    // "fileName": "https://commonresources.aitestpro.com/excel/user_000008/greenshield_1_0_sp_sprint1_1_8.xlsx",
    repoName: 'user_000031_ah9yryydjo',
    tableName: 'greenshiled_single_1_0_sp_1_0_1_0',
    // fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_single_1_0_sp_1_0_1_0.xlsx',
    fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_1_0_sp_1_0_1_0.xlsx',
    "targetTestcases": [
      "Personal_Info"
    ],
    "target": {
      "request": {
        "Personal_Info": [
          {"2": ["1", "2", "3"]},
          {
            "3": ["1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15"]
          },
          {"4": ["1"]}
        ],
      },
      "response": {},
      "crossverify": {}
    },
    "source": {
      "type": "link",
      "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_17.xlsx",
      "data": ""
    },
  },

  couple: {
    "flagValueMultipleExecutions": "greenshield",
    "projectName": "greenshiled_couple",
    "projectNameVersion": "greenshiled_couple_1_0",
    "websiteName": "greenshield",
    "repoName": "user_000031_ojnelij6zh",
    "tableName": "greenshiled_couple_1_0_sp_1_0_1_2",
    "fileName": "https://commonresources.aitestpro.com/excel/user_000031/greenshiled_couple_1_0_sp_1_0_1_2.xlsx",
    "targetTestcases": [
      "Personal_Info",
      "Dependents"
    ],
    "target": {
      "request": {
        "Personal_Info": [
          {"2": ["1", "2", "3"]},
          {
            "3": ["1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15"]
          },
          {"4": ["1"]}
        ],
        "Dependents": [
          {
            "2": [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7"
            ]
          },
          {
            "3": [
              "1",
              "2"
            ]
          }
        ]
      },
      "response": {},
      "crossverify": {}
    },
    "source": {
      "type": "link",
      "link": "https://commonresources.aitestpro.com/excel/user_000008/ExternalData_17.xlsx",
      "data": ""
    },
  },


  family: {
    "flagValueMultipleExecutions": "greenshield",
    "projectName": "greenshiled_family",
    "projectNameVersion": "greenshiled_family_1_0",
    "websiteName": "greenshield",
    "repoName": "user_000031_wpczbets91",
    "tableName": "greenshiled_family_1_0_sp_1_0_1_0",
    "fileName": "https://commonresources.aitestpro.com/excel/user_000031/greenshiled_family_1_0_sp_1_0_1_0.xlsx",
    "targetTestcases": [
      "Personal_Info",
      "Dependents"
    ],
    "target": {
      "request": {
        "Personal_Info": [
          {"2": ["1", "2", "3"]},
          {
            "3": ["1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15"]
          },
          {"4": ["1"]}
        ],
        "Dependents": [
          {
            "5": [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30",
              "31",
              "32",
              "33",
              "34",
              "35",
              "36",
              "37",
              "38",
              "39",
              "40",
              "41",
              "42",
              "43",
              "44",
              "45",
              "46",
              "47",
              "48",
              "49",
              "50",
              "51",
              "52",
              "53",
              "54",
              "55",
              "56",
              "57",
              "58",
              "59",
              "60",
              "61",
              "62",
              "63",
              "64",
              "65",
              "66",
              "67",
              "68",
              "69",
              "70",
              "71",
              "72",
              "73",
              "74",
              "75",
              "76",
              "77",
              "78",
              "79",
              "80",
              "81",
              "82",
              "83",
              "84",
              "85",
              "86",
              "87",
              "88",
              "89",
              "90",
              "91",
              "92",
              "93",
              "94",
              "95",
              "96",
              "97",
              "98",
              "99",
              "100",
              "101",
              "102",
              "103",
              "104",
              "105",
              "106",
              "107",
              "108",
              "109",
              "110",
              "111",
              "112"
            ]
          },
          {
            "6": [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16"
            ]
          }
        ]
      },
      "response": {},
      "crossverify": {}
    },
    "source": {
      "type": "link",
      "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_17.xlsx",
      "data": ""
    },
  }
}


export const targetTestcases: any = {
  single: ['OpenUrl', 'login', 'Personal_Info', 'SignOut'],
  couple: ['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut'],
  family: ['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut'],
  terminate: ['OpenUrl', 'login', 'Terminate_Member', 'SignOut'],
} */
//Greenshield
exports.TestDataGreenshield_BCK = {
    terminate: {
        "flagValueMultipleExecutions": "greenshield",
        "projectName": "greenshiled_single",
        "projectNameVersion": "greenshiled_single_1_0",
        "websiteName": "greenshield",
        repoName: 'user_000031_ah9yryydjo',
        tableName: 'greenshiled_single_1_0_sp_1_0_1_0',
        // fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_single_1_0_sp_1_0_1_0.xlsx',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_1_0_sp_1_0_1_0.xlsx',
        "targetTestcases": [
            "Terminate_Member"
        ], "target": {
            "request": {
                "Terminate_Member": [
                    { "3": ["1"] },
                    { "4": ["1"] },
                    { "6": ["1", "2", "3", "4", "5"] }
                ],
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_17.xlsx",
            "data": ""
        },
    },
    single: {
        "flagValueMultipleExecutions": "greenshield",
        "projectName": "greenshiled_single",
        "projectNameVersion": "greenshiled_single_1_0",
        "websiteName": "greenshield",
        // "repoName": "user_000008_kko1sjbvou",
        // "tableName": "greenshield_1_0_sp_sprint1_1_8",
        // "fileName": "https://commonresources.aitestpro.com/excel/user_000008/greenshield_1_0_sp_sprint1_1_8.xlsx",
        repoName: 'user_000031_ah9yryydjo',
        tableName: 'greenshiled_single_1_0_sp_1_0_1_0',
        // fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_single_1_0_sp_1_0_1_0.xlsx',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_1_0_sp_1_0_1_0.xlsx',
        "targetTestcases": [
            "Personal_Info"
        ],
        "target": {
            "request": {
                "Personal_Info": [
                    { "2": ["1", "2", "3"] },
                    {
                        "3": ["1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15"]
                    },
                    { "4": ["1"] }
                ],
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_17.xlsx",
            "data": ""
        },
    },
    couple: {
        "flagValueMultipleExecutions": "greenshield",
        "projectName": "greenshiled_couple",
        "projectNameVersion": "greenshiled_couple_1_0",
        "websiteName": "greenshield",
        "repoName": "user_000031_ojnelij6zh",
        "tableName": "greenshiled_couple_1_0_sp_1_0_1_2",
        "fileName": "https://commonresources.aitestpro.com/excel/user_000031/greenshiled_couple_1_0_sp_1_0_1_2.xlsx",
        "targetTestcases": [
            "Personal_Info",
            "Dependents"
        ],
        "target": {
            "request": {
                "Personal_Info": [
                    { "2": ["1", "2", "3"] },
                    {
                        "3": ["1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15"]
                    },
                    { "4": ["1"] }
                ],
                "Dependents": [
                    {
                        "2": [
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7"
                        ]
                    },
                    {
                        "3": [
                            "1",
                            "2"
                        ]
                    }
                ]
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000008/ExternalData_17.xlsx",
            "data": ""
        },
    },
    family: {
        "flagValueMultipleExecutions": "greenshield",
        "projectName": "greenshiled_family",
        "projectNameVersion": "greenshiled_family_1_0",
        "websiteName": "greenshield",
        "repoName": "user_000031_wpczbets91",
        "tableName": "greenshiled_family_1_0_sp_1_0_1_0",
        "fileName": "https://commonresources.aitestpro.com/excel/user_000031/greenshiled_family_1_0_sp_1_0_1_0.xlsx",
        "targetTestcases": [
            "Personal_Info",
            "Dependents"
        ],
        "target": {
            "request": {
                "Personal_Info": [
                    { "2": ["1", "2", "3"] },
                    {
                        "3": ["1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15"]
                    },
                    { "4": ["1"] }
                ],
                "Dependents": [
                    {
                        "5": [
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15",
                            "16",
                            "17",
                            "18",
                            "19",
                            "20",
                            "21",
                            "22",
                            "23",
                            "24",
                            "25",
                            "26",
                            "27",
                            "28",
                            "29",
                            "30",
                            "31",
                            "32",
                            "33",
                            "34",
                            "35",
                            "36",
                            "37",
                            "38",
                            "39",
                            "40",
                            "41",
                            "42",
                            "43",
                            "44",
                            "45",
                            "46",
                            "47",
                            "48",
                            "49",
                            "50",
                            "51",
                            "52",
                            "53",
                            "54",
                            "55",
                            "56",
                            "57",
                            "58",
                            "59",
                            "60",
                            "61",
                            "62",
                            "63",
                            "64",
                            "65",
                            "66",
                            "67",
                            "68",
                            "69",
                            "70",
                            "71",
                            "72",
                            "73",
                            "74",
                            "75",
                            "76",
                            "77",
                            "78",
                            "79",
                            "80",
                            "81",
                            "82",
                            "83",
                            "84",
                            "85",
                            "86",
                            "87",
                            "88",
                            "89",
                            "90",
                            "91",
                            "92",
                            "93",
                            "94",
                            "95",
                            "96",
                            "97",
                            "98",
                            "99",
                            "100",
                            "101",
                            "102",
                            "103",
                            "104",
                            "105",
                            "106",
                            "107",
                            "108",
                            "109",
                            "110",
                            "111",
                            "112"
                        ]
                    },
                    {
                        "6": [
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15",
                            "16"
                        ]
                    }
                ]
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_17.xlsx",
            "data": ""
        },
    }
};
exports.TestDataGreenshield = {
    terminate: {
        "flagValueMultipleExecutions": "greenshield",
        "projectName": "greenshiled_single",
        "projectNameVersion": "greenshiled_single_1_0",
        "websiteName": "greenshield",
        repoName: 'user_000031_ah9yryydjo',
        tableName: 'greenshiled_single_1_0_sp_1_0_1_0',
        // fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_single_1_0_sp_1_0_1_0.xlsx',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_1_0_sp_1_0_1_0.xlsx',
        "targetTestcases": [
            "Terminate_Member"
        ], "target": {
            "request": {
                "Terminate_Member": [
                    { "3": ["1"] },
                    { "4": ["1"] },
                    { "6": ["1", "2", "3", "4", "5"] }
                ],
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_17.xlsx",
            "data": ""
        },
    },
    single: {
        "flagValueMultipleExecutions": "greenshield",
        "projectName": "greenshiled_single",
        "projectNameVersion": "greenshiled_single_1_0",
        "websiteName": "greenshield",
        // "repoName": "user_000008_kko1sjbvou",
        // "tableName": "greenshield_1_0_sp_sprint1_1_8",
        // "fileName": "https://commonresources.aitestpro.com/excel/user_000008/greenshield_1_0_sp_sprint1_1_8.xlsx",
        repoName: 'user_000031_ah9yryydjo',
        tableName: 'greenshiled_single_1_0_sp_1_0_1_0',
        // fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_single_1_0_sp_1_0_1_0.xlsx',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_1_0_sp_1_0_1_0.xlsx',
        "targetTestcases": [
            "Personal_Info"
        ],
        "target": {
            "request": {
                "Personal_Info": [
                    { "2": ["1", "2", "3"] },
                    {
                        "3": ["1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15"]
                    },
                    { "4": ["1"] }
                ],
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_17.xlsx",
            "data": ""
        },
    },
    couple: {
        "flagValueMultipleExecutions": "greenshield",
        "projectName": "greenshiled_couple",
        "projectNameVersion": "greenshiled_couple_1_0",
        "websiteName": "greenshield",
        "repoName": "user_000031_ojnelij6zh",
        "tableName": "greenshiled_couple_1_0_sp_1_0_1_2",
        "fileName": "https://commonresources.aitestpro.com/excel/user_000031/greenshiled_couple_1_0_sp_1_0_1_2.xlsx",
        "targetTestcases": [
            "Personal_Info",
            "Dependents"
        ],
        "target": {
            "request": {
                "Personal_Info": [
                    { "2": ["1", "2", "3"] },
                    {
                        "3": ["1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15"]
                    },
                    { "4": ["1"] }
                ],
                "Dependents": [
                    {
                        "2": [
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7"
                        ]
                    },
                    {
                        "3": [
                            "1",
                            "2",
                            "3"
                        ]
                    }
                ]
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000008/ExternalData_17.xlsx",
            "data": ""
        },
    },
    family: {
        "flagValueMultipleExecutions": "greenshield",
        "projectName": "greenshiled_family",
        "projectNameVersion": "greenshiled_family_1_0",
        "websiteName": "greenshield",
        "repoName": "user_000031_wpczbets91",
        "tableName": "greenshiled_family_1_0_sp_1_0_1_0",
        "fileName": "https://commonresources.aitestpro.com/excel/user_000031/greenshiled_family_1_0_sp_1_0_1_0.xlsx",
        "targetTestcases": [
            "Personal_Info",
            "Dependents"
        ],
        "target": {
            "request": {
                "Personal_Info": [
                    { "2": ["1", "2", "3"] },
                    {
                        "3": ["1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15"]
                    },
                    { "4": ["1"] }
                ],
                "Dependents": [
                    {
                        "5": [
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15",
                            "16",
                            "17",
                            "18",
                            "19",
                            "20",
                            "21",
                            "22",
                            "23",
                            "24",
                            "25",
                            "26",
                            "27",
                            "28",
                            "29",
                            "30",
                            "31",
                            "32",
                            "33",
                            "34",
                            "35",
                            "36",
                            "37",
                            "38",
                            "39",
                            "40",
                            "41",
                            "42",
                            "43",
                            "44",
                            "45",
                            "46",
                            "47",
                            "48",
                            "49",
                            "50",
                            "51",
                            "52",
                            "53",
                            "54",
                            "55",
                            "56",
                            "57",
                            "58",
                            "59",
                            "60",
                            "61",
                            "62",
                            "63",
                            "64",
                            "65",
                            "66",
                            "67",
                            "68",
                            "69",
                            "70",
                            "71",
                            "72",
                            "73",
                            "74",
                            "75",
                            "76",
                            "77",
                            "78",
                            "79",
                            "80",
                            "81",
                            "82",
                            "83",
                            "84",
                            "85",
                            "86",
                            "87",
                            "88",
                            "89",
                            "90",
                            "91",
                            "92",
                            "93",
                            "94",
                            "95",
                            "96",
                            "97",
                            "98",
                            "99",
                            "100",
                            "101",
                            "102",
                            "103",
                            "104",
                            "105",
                            "106",
                            "107",
                            "108",
                            "109",
                            "110",
                            "111",
                            "112"
                        ]
                    },
                    {
                        "6": [
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15",
                            "16",
                            "17",
                            "18",
                            "19",
                            "20",
                            "21",
                            "22",
                            "23",
                            "24",
                            "25",
                            "26",
                            "27",
                            "28",
                            "29",
                            "30",
                            "31"
                        ]
                    }
                ]
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_17.xlsx",
            "data": ""
        },
    }
};
exports.targetTestcasesGreenshield = {
    single: ['OpenUrl', 'login', 'Personal_Info', 'SignOut'],
    couple: ['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut'],
    family: ['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut'],
    terminate: ['OpenUrl', 'login', 'Terminate_Member', 'SignOut'],
};
//Equitable Save
exports.TestDataEquitableSave = {
    terminate: {
        "flagValueMultipleExecutions": "equitable",
        "projectName": "greenshiled_couple",
        "projectNameVersion": "greenshiled_couple_1_0",
        "websiteName": "equitable",
        repoName: 'user_000031_ah9yryydjo',
        tableName: 'greenshiled_single_1_0_sp_1_0_1_0',
        // fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_single_1_0_sp_1_0_1_0.xlsx',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/greenshiled_1_0_sp_1_0_1_0.xlsx',
        "targetTestcases": [
            "Terminate_Member"
        ], "target": {
            "request": {
                "Terminate_Member": [
                    { "3": ["1"] },
                    { "4": ["1"] },
                    { "6": ["1", "2", "3", "4", "5"] }
                ],
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_17.xlsx",
            "data": ""
        },
    },
    single: {
        "flagValueMultipleExecutions": "equitable",
        "projectName": "equitable_single_save",
        "projectNameVersion": "equitable_single_save_1_0",
        "websiteName": "equitable",
        repoName: 'user_000031_hiaxfdvj6l',
        tableName: 'equitable_single_save_1_0_sp_sprint1_1_0',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/equitable_single_save_1_0_sp_sprint1_1_0.xlsx',
        "targetTestcases": [
            "Personal_information_form"
        ],
        "target": {
            "request": {
                "Personal_information_form": [
                    {
                        "3": [
                            "1"
                        ]
                    },
                    {
                        "4": [
                            "1"
                        ]
                    },
                    {
                        "5": [
                            "1"
                        ]
                    },
                    {
                        "6": [
                            "1",
                            "2",
                            "3",
                            "5",
                            "6",
                            "7",
                            "8",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15"
                        ]
                    },
                    {
                        "7": [
                            "1",
                            "2",
                            "3"
                        ]
                    },
                    {
                        "8": [
                            "1"
                        ]
                    }
                ]
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_21.xlsx",
            "data": ""
        },
    },
    couple: {
        "flagValueMultipleExecutions": "equitable",
        "projectName": "equitable_couple_save",
        "projectNameVersion": "equitable_couple_save_1_0",
        "websiteName": "equitable",
        repoName: 'user_000031_hr1rds2su8',
        tableName: 'equitable_couple_save_1_0_sp_1_0_1_0',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/equitable_couple_save_1_0_sp_1_0_1_0.xlsx',
        "targetTestcases": [
            "Personal_Info",
            "Dependents_info"
        ],
        "target": {
            "request": {
                "Personal_Info": [
                    {
                        "3": [
                            "1"
                        ]
                    },
                    {
                        "4": [
                            "1"
                        ]
                    },
                    {
                        "5": [
                            "1"
                        ]
                    },
                    {
                        "6": [
                            "1",
                            "2",
                            "3",
                            "5",
                            "6",
                            "7",
                            "8",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15",
                            "16",
                            "17",
                            "18"
                        ]
                    },
                    {
                        "8": [
                            "1"
                        ]
                    }
                ],
                "Dependents_info": [
                    {
                        "2": [
                            "1",
                            "2",
                            "4",
                            "5",
                            "6"
                        ]
                    },
                    {
                        "3": [
                            "1",
                            "2"
                        ]
                    },
                    {
                        "4": [
                            "1",
                            "2",
                            "3",
                            "4"
                        ]
                    }
                ]
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_couple_save.xlsx",
            "data": ""
        },
    },
    family: {
        "continueOnRequestFail": true,
        "flagValueMultipleExecutions": "equitable",
        "projectName": "equitable_family_save",
        "projectNameVersion": "equitable_family_save_1_0",
        "websiteName": "equitable",
        repoName: 'user_000031_hr1rds2su8',
        tableName: 'equitable_family_save_1_0_sp_1_0_1_0',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/equitable_family_save_1_0_sp_1_0_1_0.xlsx',
        "targetTestcases": [
            "Personal_Info",
            "Dependents_info"
        ],
        "target": {
            "request": {
                "Personal_Info": [
                    {
                        "3": [
                            "1"
                        ]
                    },
                    {
                        "4": [
                            "1"
                        ]
                    },
                    {
                        "5": [
                            "1"
                        ]
                    },
                    {
                        "6": [
                            "1",
                            "2",
                            "3",
                            "5",
                            "6",
                            "7",
                            "8",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15",
                            "16",
                            "17",
                            "18"
                        ]
                    },
                    {
                        "8": [
                            "1"
                        ]
                    }
                ],
                "Dependents_info": [
                    {
                        "2": [
                            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160"
                        ]
                    },
                    {
                        "3": [
                            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96"
                        ]
                    }
                ]
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_family_save.xlsx",
            "data": ""
        },
    },
};
//Equitable Enroll
exports.TestDataEquitable = {
    terminate: {
        "flagValueMultipleExecutions": "equitable",
        "projectName": "equitable_termination",
        "projectNameVersion": "equitable_termination_1_0",
        "websiteName": "equitable",
        repoName: 'user_000031_jwvcytxynf',
        tableName: 'equitable_termination_1_0_sp_1_0_1_0',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/equitable_termination_1_0_sp_1_0_1_0.xlsx',
        "targetTestcases": [
            "Termination"
        ], "target": {
            "request": {
                "Termination": [
                    { "2": ["1", "2", "4", "5", "6"] },
                    { "3": ["6"] },
                    { "4": ["4", "5", "6", "8", "9", "10"] }
                ],
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_equitable_termination_1_0_sp_1_0_1_0.json",
            "data": ""
        },
    },
    single: {
        "flagValueMultipleExecutions": "equitable",
        "projectName": "equitable_Single",
        "projectNameVersion": "equitable_single_1_0",
        "websiteName": "equitable",
        repoName: 'user_000031_kubymoapi5',
        tableName: 'equitable_single_1_0_sp_1_0_1_1',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/equitable_single_1_0_sp_1_0_1_1.xlsx',
        "targetTestcases": [
            "PersonalInfo"
        ],
        "target": {
            "request": {
                "PersonalInfo": [
                    {
                        "2": [
                            // "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            //"8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15",
                            "16",
                            "17",
                            "18",
                            "19",
                            //"20",
                            "21"
                            //"22",
                            //"23"
                        ]
                    }
                ]
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_equitable_single_1_0_sp_1_0_1_1.json",
            "data": ""
        },
    },
    couple: {
        "flagValueMultipleExecutions": "equitable",
        "projectName": "equitable_couple_main",
        "projectNameVersion": "equitable_couple_main_1_0",
        "websiteName": "equitable",
        repoName: 'user_000031_of5djswmzn',
        tableName: 'equitable_couple_main_1_0_sp_1_0_1_1',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/equitable_couple_main_1_0_sp_1_0_1_2.xlsx',
        "targetTestcases": [
            "PersonalInfo"
        ],
        "target": {
            "request": {
                "PersonalInfo": [
                    {
                        "2": [
                            // "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            //"8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15",
                            "16",
                            "17",
                            "18",
                            "19",
                            //"20",
                            "21",
                            //"22",
                            "23",
                            "24",
                            "25",
                            "26",
                            "27",
                            "28",
                            "29",
                            "31",
                            "32",
                            "33",
                            "34"
                        ]
                    }
                ]
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_equitable_couple_main_1_0_sp_1_0_1_1.json",
            "data": ""
        },
    },
    family: {
        "continueOnRequestFail": true,
        "flagValueMultipleExecutions": "equitable",
        "projectName": "equitable_family",
        "projectNameVersion": "equitable_family_1_0",
        "websiteName": "equitable",
        repoName: 'user_000031_3dsenjfy3a',
        tableName: 'equitable_family_1_0_sp_1_0_1_1',
        //fileName: 'https://commonresources.aitestpro.com/excel/user_000031/equitable_family_1_0_sp_1_0_1_0.xlsx',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/equitable_family_1_0_sp_1_0_1_1.xlsx',
        "targetTestcases": [
            "PersonalInfo"
        ],
        "target": {
            "request": {
                "PersonalInfo": [
                    {
                        "2": ["2", "3", "4", "5", "6", "7",
                            "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
                            "21",
                            "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36",
                            "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
                            "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64",
                            "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78",
                            "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92",
                            "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106",
                            "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120",
                            "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134",
                            "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148",
                            "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162"
                        ]
                    }
                ]
            },
            "response": {},
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_equitable_family_1_0_sp_1_0_1_1.json",
            "data": ""
        },
    },
};
exports.targetTestcasesEquitable = {
    singleSave: ['OpenUrl', 'login', 'Personal_information_form', 'signout'],
    coupleSave: ['OpenUrl', 'login', 'Personal_Info', 'Dependents_info', 'Signout'],
    familySave: ['OpenUrl', 'login', 'Personal_Info', 'Dependents_info', 'Signout'],
    single: ['OpenUrl', 'login', 'PersonalInfo', 'Signout'],
    couple: ['OpenUrl', 'login', 'PersonalInfo', 'Signout'],
    family: ['OpenUrl', 'login', 'PersonalInfo', 'Signout'],
    terminate: ['OpenUrl', 'login', 'Termination', 'SignOut'],
};
//Executive
exports.TestDataExecutive = {
    terminate: {
        "flagValueMultipleExecutions": "candoo",
        "projectName": "candoohealth_termination",
        "projectNameVersion": "candoohealth_termination_1_0",
        "websiteName": "candoo",
        repoName: 'user_000031_afqqm9ufyi',
        tableName: 'candoohealth_termination_1_0_sp_1_0_1_0',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/candoohealth_termination_1_0_sp_1_0_1_0.xlsx',
        "targetTestcases": [
            "Termination"
        ], "target": {
            "request": {
                "Termination": [
                    { "2": ["1"] }
                ]
            },
            "response": {
                "Termination": [
                    { "2": ["1", "2"] }
                ]
            },
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_17.xlsx",
            "data": ""
        },
    },
    single: {
        "flagValueMultipleExecutions": "candoo",
        "projectName": "candoohealth",
        "projectNameVersion": "candoohealth_1_0",
        "websiteName": "candoo",
        repoName: 'user_000031_od81mjgviv',
        tableName: 'candoohealth_1_0_sp_1_0_1_2',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/candoohealth_1_0_sp_1_0_1_2.xlsx',
        // fileName: 'http://127.0.0.1:8080/localresources/excel/user_000031/candoohealth_1_0_sp_1_0_1_2.xlsx',
        "targetTestcases": [
            "Add_Employee"
        ],
        "target": {
            "request": {
                "Add_Employee": [
                    {
                        "3": [
                            "1",
                            "2",
                            "3"
                        ]
                    },
                    {
                        "4": [
                            "1"
                        ]
                    }
                ]
            },
            "response": {
                "Add_Employee": [
                    {
                        "4": [
                            "1",
                            "2"
                        ]
                    }
                ]
            },
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_21.xlsx",
            "data": ""
        },
    },
    couple: {
        "flagValueMultipleExecutions": "candoo",
        "projectName": "candoohealth",
        "projectNameVersion": "candoohealth_1_0",
        "websiteName": "candoo",
        repoName: 'user_000031_od81mjgviv',
        tableName: 'candoohealth_1_0_sp_1_0_1_2',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/candoohealth_1_0_sp_1_0_1_2.xlsx',
        "targetTestcases": [
            "Add_Employee"
        ],
        "target": {
            "request": {
                "Add_Employee": [
                    {
                        "3": [
                            "1",
                            "2",
                            "3"
                        ]
                    },
                    {
                        "4": [
                            "1"
                        ]
                    }
                ]
            },
            "response": {
                "Add_Employee": [
                    {
                        "4": [
                            "1",
                            "2"
                        ]
                    }
                ]
            },
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_21.xlsx",
            "data": ""
        },
    },
    family: {
        "flagValueMultipleExecutions": "candoo",
        "projectName": "candoohealth",
        "projectNameVersion": "candoohealth_1_0",
        "websiteName": "candoo",
        repoName: 'user_000031_od81mjgviv',
        tableName: 'candoohealth_1_0_sp_1_0_1_2',
        fileName: 'https://commonresources.aitestpro.com/excel/user_000031/candoohealth_1_0_sp_1_0_1_2.xlsx',
        "targetTestcases": [
            "Add_Employee"
        ],
        "target": {
            "request": {
                "Add_Employee": [
                    {
                        "3": [
                            "1",
                            "2",
                            "3"
                        ]
                    },
                    {
                        "4": [
                            "1"
                        ]
                    }
                ]
            },
            "response": {
                "Add_Employee": [
                    {
                        "4": [
                            "1",
                            "2"
                        ]
                    }
                ]
            },
            "crossverify": {}
        },
        "source": {
            "type": "link",
            "link": "https://commonresources.aitestpro.com/excel/user_000031/ExternalData_21.xlsx",
            "data": ""
        },
    },
};
exports.targetTestcasesExecutive = {
    single: ['OpenUrl', 'login', 'Add_Employee', 'logout'],
    couple: ['OpenUrl', 'login', 'Add_Employee', 'logout'],
    family: ['OpenUrl', 'login', 'Add_Employee', 'logout'],
    terminate: ['OpenUrl', 'login', 'Termination', 'logout'],
};
if (process.env.NODE_ENV == "local") {
    exports.TestDataExecutive.single.fileName = 'http://127.0.0.1:8080/localresources/excel/user_000031/candoohealth_1_0_sp_1_0_1_2.xlsx';
    exports.TestDataExecutive.terminate.fileName = 'http://127.0.0.1:8080/localresources/excel/user_000031/candoohealth_termination_1_0_sp_1_0_1_0.xlsx';
    exports.TestDataEquitable.single.fileName = 'http://127.0.0.1:8080/commonresources/excel/user_000031/equitable_single_1_0_sp_1_0_1_1.xlsx';
    //TestDataEquitable.couple.fileName = 'http://127.0.0.1:8080/commonresources/excel/user_000031/equitable_couple_main_1_0_sp_1_0_1_1.xlsx'
    exports.TestDataEquitable.couple.fileName = 'http://127.0.0.1:8080/commonresources/excel/user_000031/equitable_couple_main_1_0_sp_1_0_1_2.xlsx';
    exports.TestDataEquitable.family.fileName = 'http://127.0.0.1:8080/commonresources/excel/user_000031/equitable_family_1_0_sp_1_0_1_1.xlsx';
    exports.TestDataEquitable.terminate.fileName = 'http://127.0.0.1:8080/commonresources/excel/user_000031/equitable_termination_1_0_sp_1_0_1_0.xlsx';
    exports.TestDataGreenshield.couple.fileName = 'http://127.0.0.1:8080/commonresources/excel/user_000031/greenshiled_couple_1_0_sp_1_0_1_2.xlsx';
    exports.TestDataGreenshield.family.fileName = 'http://127.0.0.1:8080/commonresources/excel/user_000031/greenshiled_family_1_0_sp_1_0_1_0.xlsx';
}
exports.broker = {
    brokerType: exports.BROKER.BROKERAGE,
};
exports.signupForm = {
    name: 'Health Benefits Application Form',
    title: 'Group Benefitz - Insurance signup',
    description: 'Group Benefitz registration page',
    formType: exports.SIGNUP_FORM.REGULAR,
    keywords: 'Group Benefitz,insurance,signup',
    // terms_of_service: TERMS_AND_CONDITIONS,
    // disclosure_agreement: DISCLOSURE,
    published: true,
    inelligibilityPeriod: 0,
    link: '/abc'
};
exports.signupFormExec = {
    name: 'Executive Benefits Application Form',
    title: 'Group Benefitz - Insurance signup',
    description: 'Group Benefitz registration page',
    formType: exports.SIGNUP_FORM.EXECUTIVE,
    keywords: 'Group Benefitz,insurance,signup',
    // terms_of_service: TERMS_AND_CONDITIONS,
    // disclosure_agreement: DISCLOSURE,
    published: true,
    inelligibilityPeriod: 0,
    link: '/abc_exec'
};
exports.REPORTING_TYPE = { API_REPORTING: 'API_REPORTING', EMAIL_REPORTING: 'EMAIL_REPORTING' };
exports.REPORTING_ID = {
    bestdoctorsinsurance: 'bestdoctorsinsurance',
    marital_status: 'marital_status',
    name_email: 'name_email',
    candoohealth: 'candoohealth'
};
exports.INSURANCE_SERVICES = {
    GREENSHIELD: {
        name: 'Green Shield',
        policy: 'BFLX 41000',
        fullName: 'The GroupBenefitz Platform Inc.',
        carrier: '0',
        issueNo: '01'
    },
    EQUITABLE: {
        name: 'Equitable',
        policy: '814458',
        fullName: 'The GroupBenefitz Platform Inc.',
        carrier: '29',
        issueNo: '01'
    },
};
// EXECUTIVE:{
//   name:'',
//   policy:''
// }
exports.REGEX = {
    NAME: /^[A-Za-z]{2,40}$/,
    EMAIL: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
    POSTAL_CODE: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/,
    //POSTAL_CODE: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/gm,
    CREDIT_CARD: /^[0-9]{13,19}$/,
    APT_SUITE: /^(([a-zA-Z]?)|([0-9]*))$/,
    BANK_CODE: /^[0-9]{3,3}$/,
    BRANCH_CODE: /^[0-9]{5,5}$/,
    ACCOUNT_NO: /^[0-9]{5,12}$/,
};
exports.PAYMENT_METHOD = {
    CREDIT_CARD: 'CREDIT_CARD',
    ACH: 'ACH',
    PAD: 'PAD',
    INVOICE: 'INVOICE'
};
exports.PAYMENT_METHOD_LIST = [exports.PAYMENT_METHOD.CREDIT_CARD, exports.PAYMENT_METHOD.ACH, exports.PAYMENT_METHOD.PAD, exports.PAYMENT_METHOD.INVOICE];
exports.PAYMENT_METHOD_LIST_ARRAY = [{ 'name': 'Credit Card', 'key': 'CC', 'value': exports.PAYMENT_METHOD.CREDIT_CARD }, { 'name': 'Pre-Authorised Debit', 'key': 'PAD', 'value': exports.PAYMENT_METHOD.PAD }, { 'name': 'Invoice Monthly', 'key': 'INVOICE', 'value': exports.PAYMENT_METHOD.INVOICE }];
//ach //pad
exports.ACH = {
    "server": process.env.PADSERVER || process.env.ACHSERVER || 'http://127.0.0.1:3001'
};
exports.PAD = {
    "server": process.env.PADSERVER || process.env.ACHSERVER || 'http://127.0.0.1:3001'
};
exports.ACHserviceEndpoints = {
    "authorize": '/api/auth',
    "createCustomer": '/api/customer/customerRecord',
    "createPayment": '/api/customer/paymentRecord',
};
exports.ACH_CUSTOMER_STATUS = {
    ACTIVE: 'ACTIVE', CANCELLED: 'CANCELLED'
};
exports.ACH_CUSTOMER_STATUS_LIST = ['ACTIVE', 'CANCELLED'];
exports.ACH_PAYMENT_STATUS = {
    SCHEDULED: 'SCHEDULED', PENDING: 'PENDING',
    PAID: 'PAID', FAILED: 'FAILED'
};
exports.ACH_PAYMENT_STATUS_LIST = ['SCHEDULED', 'PENDING', 'PAID', 'FAILED'];
exports.PAD_CLIENT_ID = process.env.PAD_CLIENT_ID || "4626a003fcfdea860329c0aa0c34efb46b72b1ae8b6c606b3732d1fb85980338";
exports.PAD_CLIENT_SECRET = process.env.PAD_CLIENT_SECRET || "MzIxQHNldHliYWVkSQ==";
exports.BROKER_LICENSE_COVERAGE = {
    LIFE_A_S: 'LIFE_ACCIDENT_AND_SICKNESS',
    A_S: 'ACCIDENT_AND_SICKNESS',
    LIFE: 'LIFE'
};
exports.BROKER_LICENSE_COVERAGE_LIST = [exports.BROKER_LICENSE_COVERAGE.LIFE_A_S, exports.BROKER_LICENSE_COVERAGE.A_S, exports.BROKER_LICENSE_COVERAGE.LIFE];
exports.MAINAPI_DOMAIN = process.env.MAINAPI || "https://testapi.groupbenefitz.aitestpro.com";
//# sourceMappingURL=constants.js.map