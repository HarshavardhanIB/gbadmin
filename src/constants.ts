// import {DISCLOSURE} from './disclosure_agreement';
import { SERVER_FILES_PATH } from './paths';
// import {TERMS_AND_CONDITIONS} from './terms_and_conditions';

export const WELCOME = 'Welcome to GroupBenefitz';

export const USER_ROLE: any = {
  CUSTOMER: 'CUSTOMER',
  CORPORATE_ADMINISTRATOR: 'CORPORATE_ADMIN',
  // COMPANY_ADMINISTRATOR: 'COMPANY_ADMINISTRATOR',
  BROKER: 'BROKER',
  AGENT: 'AGENT',
  ADMINISTRATOR: 'ADMINISTRATOR'
}

export const CONTACT_TYPE: any = {
  CUSTOMER: 'CUSTOMER',
  CUSTOMER_RELATIVE: 'CUSTOMER_RELATIVE',
  COMPANY: 'COMPANY',
  GROUP: 'GROUP',
  AGENT: 'AGENT',
  BROKER: 'BROKER',
  SERVICE_PROVIDER: 'SERVICE_PROVIDER',
  INSURANCE_COMPANY: 'INSURANCE_COMPANY'
}

export const ADDRESS_TYPE: any = {
  SHIPPING_ADDRESS: 'SHIPPING_ADDRESS',
  BILLING_ADDRESS: 'BILLING_ADDRESS',
  HOME_ADDRESS: 'HOME_ADDRESS',
  OFFICE_ADDRESS: 'OFFICE_ADDRESS'
}

export const RELATIONSHIP_TYPE: any = {
  SPOUSE: 'SPOUSE',
  CHILDREN: 'CHILDREN'
}

export const MARITAL_STATUS_OLD: any = {
  SINGLE: 'SINGLE',
  MARRIED: 'MARRIED',
  DIVORCED: 'DIVORCED',
  SEPARATED: 'SEPARATED',
  COMMON_LAW: 'COMMON LAW',
  WIDOW: 'WIDOW',
  FAMILY: 'FAMILY',
}

export const MARITAL_STATUS: any = {
  SINGLE: 'SINGLE',
  COUPLE: 'COUPLE',
  FAMILY: 'FAMILY',
}

export const MARITAL_STATUS_LIST: any = ['SINGLE', 'COUPLE', 'FAMILY']

export const PLAN_COVERAGE: any = {
  SINGLE: 'SINGLE',
  COUPLE: 'COUPLE',
  FAMILY: 'FAMILY',
  INCOME_REPLACEMENT: 'INCOME_REPLACEMENT',
  EMPLOYEE_ASSISTANCE: 'EMPLOYEE_ASSISTANCE',
  MENTHAL_HEALTH: 'MENTHAL_HEALTH'
}

export const PLAN_COVERAGE_LIST: any = ['SINGLE', 'COUPLE', 'FAMILY', 'INCOME_REPLACEMENT', 'EMPLOYEE_ASSISTANCE', 'MENTHAL_HEALTH']

export const GENDER: any = {
  MALE: 'Male',
  FEMALE: 'Female',
  NONBINARY: 'Non-Binary',
  UNDISCLOSED: 'Undisclosed'
}

export const GENDER_LIST: any = ['Male', 'Female', 'Non-Binary', 'Undisclosed']


export const STATUS: any = {
  DRAFT: 'Draft',
  ACTIVE: 'Active',
  HOLD: 'Hold',
  SUSPENDED: 'Suspended',
  CANCELLED: 'Cancelled'
}
export const EOI={
EXPIRE:"E&O insurece is expired",
}
export const LICENCE={
  EXPIRE:"expired",
  FOUND:"Licences are found",
  NOLICENCES:"No Licences",
}
export const MIN="Min"  
export const MAX="Max"
export const PARTIAL='Partial'
export const NONE='None';
export const NODATA='No data found';
export const HEALTH_DENTAL_PACKAGE_ID = 1
export const HEALTH_DENTAL_PACKAGES = [1]
export const GREENSHEILD_PACKAGES = [1] //Health&Dental
export const GREENSHEILD_PLAN_LEVELS = [2, 3, 4, 5] //Health&Dental - Classic
export const EQUITABLE_PACKAGES = [1] //Health&Dental
export const EQUITABLE_PLAN_LEVELS = [7, 8, 9] //Health&Dental - Allin

export const OPTIN_PACKAGES = [8] //Optin
export const OPTIN_PLAN_LEVELS = [17]

export const HIGHCOST_DRUGS_PACKAGE_ID = 3; //Catastrophic
export const HIGHCOST_DRUGS_PACKAGES = [3]//Executive
export const HIGHCOST_DRUGS_PLAN_LEVELS = [10]

export const EXECUTIVE_PACKAGE_ID = 5;
export const EXECUTIVE_PACKAGES = [5]//Executive
export const EXECUTIVE_HEALTH_PLAN_LEVELS = [17]
export const EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS = [18]


export const GREENSHEILD_REGISTRATION_STATUS: any = {
  PENDING: 'PENDING',
  DONE: 'DONE',
  MANUAL: 'MANUAL',
  TERMINATED: 'TERMINATED'

}

export const EQUITABLE_REGISTRATION_STATUS: any = {
  PENDING: 'PENDING',
  DONE: 'DONE',
  SAVE: 'SAVE',
  MANUAL: 'MANUAL',
  TERMINATED: 'TERMINATED'

}

export const LOGGING_SOURCE: any = {
  WEB: 'WEB',
  API: 'API',
  WEBHOOK: 'WEBHOOK',

}

export const MONTH = 30 * 24 * 60 * 60 * 1000;  // Month in milliseconds

export const HIRING_DATE_LIMIT = 3 * MONTH

export const HIRING_DATE_INELIGIBILITY_PERIOD_NO = 90; //no. in days
export const HIRING_DATE_INELIGIBILITY_PERIOD_DURATION = 'days'; //no. in days

export const VALIDATIONS = {
  CUSTOMER_AGE_MIN: 16, //years
  CUSTOMER_AGE_MAX: 100,
  CUSTOMER_WORKING_HOURS_MIN: 20, //hours
  CUSTOMER_WORKING_HOURS_MAX: 80, //hours
  SPOUSE_AGE_MIN: 16, //years
  CUSTOMER_HIRING_DATE_MIN: 16, //years after dob
  CUSTOMER_HIRING_DATE_MAX: HIRING_DATE_INELIGIBILITY_PERIOD_NO// days
}

export const DEFAULT_COUNTRY = {
  name: 'Canada',
  id: 1,
  shortName: 'CA',
  isoCode: 'en-ca',
  currency: 'CAD',
  fusebillId: 124,
  currencySymbol: '$'
}


export const SIGNUP_FORM = {
  REGULAR: 'REGULAR',
  EXECUTIVE: 'EXECUTIVE',
  CUSTOM: 'CUSTOM'
}

export const FORM_TYPE_ARRAY = [SIGNUP_FORM.REGULAR, SIGNUP_FORM.EXECUTIVE, SIGNUP_FORM.CUSTOM]
export const LICENSE_COVERAGE = ['LIFE_ACCIDENT_AND_SICKNESS', 'ACCIDENT_AND_SICKNESS', 'LIFE']
export const PRODUCT_TYPE_ARRAY = [
  'Classic Copper', 'Classic Bronze', 'Classic Silver',
  'All - In Bronze', 'All - In Silver', 'All - In Gold',
  'PocketPills',
  'EAP 2.0', 'Complete Wellness',
  'High - Cost Drugs(HCD)',
  'Protect 100', 'Protect 200',
  'Executive Health', 'Complete Executive Care']
  
export const BROKER = {
  BROKERAGE: 'BROKERAGE',
  ADVISOR: 'ADVISOR',
  ASSOCIATION: 'ASSOCIATION',
  CORPORATE: 'CORPORATE',
  TPA_MGA: 'TPA/MGA'
}

export const BROKER_TYPE_ARRAY = [BROKER.BROKERAGE, BROKER.ADVISOR, BROKER.ASSOCIATION, BROKER.CORPORATE, BROKER.TPA_MGA]

export const DEFAULT_FORM_ID = 1; //HouseClient form...

export const DEFAULT_FORM = {
  name: 'Health Benefits Application Form',
  title: 'Group Benefitz - Insurance signup',
  description: 'Group Benefitz registration page',
  formType: SIGNUP_FORM.REGULAR,
  id: 1,
  termsAndConditions: SERVER_FILES_PATH + 'terms-conditions.pdf',
  disclosureAgreement: SERVER_FILES_PATH + 'disclosure-agreement.pdf',
  languageTokens: SERVER_FILES_PATH + 'langTokens-default.html',
  ineligibilityPeriod: 0,
  ineligibilityPeriodToken: 'days',
}

export const DEFAULT_LANGAUGE = "en";


export const httpStatus: any = {
  "SUCCESS": "200",
  "PARTIAL": "206",
  "FAILED": "202"
}


/*mail*/
export const GB_DEV = process.env.GBDEV || "admin@aitestpro.com";
export const GB_SUPPORT = process.env.GBSUPPORT || "GB_Support@ideabytes.com";
export const GB_ADMIN = process.env.GBADMIN || "admin@aitestpro.com";


export const CUSTOMER_ENROLL_REPORT_MAIL_SUBJECT_SYSADMIN = "Customers Enrollment Report at GroupBenefitz"
export const CUSTOMER_ENROLL_REPORT_MAIL_SUBJECT_BROKER = "Customers Enrollment Report at GroupBenefitz"

export const CUSTOMER_UPDATE_REPORT_MAIL_SUBJECT_SYSADMIN = "Customers Updated Report at GroupBenefitz"
export const CUSTOMER_UPDATE_REPORT_MAIL_SUBJECT_BROKER = "Customers Updated Report at GroupBenefitz"

export const CUSTOMER_CANCEL_REPORT_MAIL_SUBJECT_SYSADMIN = "Customers Cancellation Report at GroupBenefitz"
export const CUSTOMER_CANCEL_REPORT_MAIL_SUBJECT_BROKER = "Customers Cancellation Report at GroupBenefitz"

export const CUSTOMERREGISTRAION_MAIL_SUBJECT_SYSADMIN = "Customer Registered at GroupBenefitz"
export const CUSTOMERREGISTRAION_MAIL_SUBJECT_BROKER = "Customer Registered at GroupBenefitz"
export const CUSTOMERREGISTRAION_MAIL_SUBJECT_CUSTOMER = "Registration Successful"

export const PAYMENTFAIL_MAIL_SUBJECT_BROKER = "Payment Failed at Fusebill"
export const PAYMENTFAIL_MAIL_SUBJECT_CUSTOMER = "Payment Failed at Fusebill"

export const PAYMENTSUCCESS_MAIL_SUBJECT_BROKER = "Payment Success at Fusebill"
export const PAYMENTSUCCESS_MAIL_SUBJECT_CUSTOMER = "Payment Success at Fusebill"


/* testdata recording linls */

export const userCreds = {
  "username": process.env.GBUSER || "gb_aitp",
  "email": process.env.GBEMAIL || "gb.aitp@ideabytes.com",
  "password": process.env.GBPASSWORD || "gb@Aitp22",
}



export const aitp = {
  "server": process.env.AITPSERVER || "http://127.0.0.1/aitestpro"
}

export const serviceEndpoints = {
  "login": '/api/auth/signin',
  "executionId": '/api/user/get_execution_id',
  "externalData": '/api/user/execute_script_external_source_multiple'
}


// export const headers = {
//   'Content-Type': 'application/json',
//   'Authorization': 'Bearer ' + token
// }

export const commonExecutionData: any = {

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
}


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
export const TestDataGreenshield_BCK: any = {

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

export const TestDataGreenshield: any = {

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
}


export const targetTestcasesGreenshield: any = {
  single: ['OpenUrl', 'login', 'Personal_Info', 'SignOut'],
  couple: ['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut'],
  family: ['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut'],
  terminate: ['OpenUrl', 'login', 'Terminate_Member', 'SignOut'],
}

//Equitable Save
export const TestDataEquitableSave: any = {


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
          { //16x10
            "2": [
              "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160"

            ]
          },//16x6
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
}
//Equitable Enroll
export const TestDataEquitable: any = {

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
          {"2": ["1", "2", "4", "5", "6"]},
          {"3": ["6"]},
          {"4": ["4", "5", "6", "8", "9", "10"]}
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
    "projectNameVersion": "equitable_couple_main_1_0", //equitable_couple_main_1_0 //equitable_couple_main_1_0
    "websiteName": "equitable",
    repoName: 'user_000031_of5djswmzn', //user_000031_of5djswmzn  //user_000031_yghey7xgzg
    tableName: 'equitable_couple_main_1_0_sp_1_0_1_1', //equitable_couple_main_1_0_sp_1_0_1_2 // equitable_couple_main_1_0_sp_1_0_1_1
    fileName: 'https://commonresources.aitestpro.com/excel/user_000031/equitable_couple_main_1_0_sp_1_0_1_2.xlsx', //'https://commonresources.aitestpro.com/excel/user_000031/equitable_couple_main_1_0_sp_1_0_1_1.xlsx',
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
    repoName: 'user_000031_3dsenjfy3a',//user_000031_3dsenjfy3a //user_000031_vy3t3lymst
    tableName: 'equitable_family_1_0_sp_1_0_1_1',//equitable_family_1_0_sp_1_0_1_1 //equitable_family_1_0_sp_1_0_1_0
    //fileName: 'https://commonresources.aitestpro.com/excel/user_000031/equitable_family_1_0_sp_1_0_1_0.xlsx',
    fileName: 'https://commonresources.aitestpro.com/excel/user_000031/equitable_family_1_0_sp_1_0_1_1.xlsx',
    "targetTestcases": [
      "PersonalInfo"
    ],
    "target": {
      "request": {
        "PersonalInfo": [
          {
            "2": ["2", "3", "4", "5", "6", "7", //"8",
              "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", //"20",
              "21",//"22",
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
}


export const targetTestcasesEquitable: any = {
  singleSave: ['OpenUrl', 'login', 'Personal_information_form', 'signout'],
  coupleSave: ['OpenUrl', 'login', 'Personal_Info', 'Dependents_info', 'Signout'],
  familySave: ['OpenUrl', 'login', 'Personal_Info', 'Dependents_info', 'Signout'],

  single: ['OpenUrl', 'login', 'PersonalInfo', 'Signout'],
  couple: ['OpenUrl', 'login', 'PersonalInfo', 'Signout'],
  family: ['OpenUrl', 'login', 'PersonalInfo', 'Signout'],

  terminate: ['OpenUrl', 'login', 'Termination', 'SignOut'],
}

//Executive
export const TestDataExecutive: any = {


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
          {"2": ["1"]}

        ]
      },
      "response": {
        "Termination": [
          {"2": ["1", "2"]}

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

}




export const targetTestcasesExecutive: any = {
  single: ['OpenUrl', 'login', 'Add_Employee', 'logout'],
  couple: ['OpenUrl', 'login', 'Add_Employee', 'logout'],
  family: ['OpenUrl', 'login', 'Add_Employee', 'logout'],
  terminate: ['OpenUrl', 'login', 'Termination', 'logout'],
}

if (process.env.NODE_ENV == "local") {
  TestDataExecutive.single.fileName = 'http://127.0.0.1:8080/localresources/excel/user_000031/candoohealth_1_0_sp_1_0_1_2.xlsx'
  TestDataExecutive.terminate.fileName = 'http://127.0.0.1:8080/localresources/excel/user_000031/candoohealth_termination_1_0_sp_1_0_1_0.xlsx'

  TestDataEquitable.single.fileName = 'http://127.0.0.1:8080/commonresources/excel/user_000031/equitable_single_1_0_sp_1_0_1_1.xlsx'
  //TestDataEquitable.couple.fileName = 'http://127.0.0.1:8080/commonresources/excel/user_000031/equitable_couple_main_1_0_sp_1_0_1_1.xlsx'
  TestDataEquitable.couple.fileName = 'http://127.0.0.1:8080/commonresources/excel/user_000031/equitable_couple_main_1_0_sp_1_0_1_2.xlsx'
  TestDataEquitable.family.fileName = 'http://127.0.0.1:8080/commonresources/excel/user_000031/equitable_family_1_0_sp_1_0_1_1.xlsx'
  TestDataEquitable.terminate.fileName = 'http://127.0.0.1:8080/commonresources/excel/user_000031/equitable_termination_1_0_sp_1_0_1_0.xlsx'

  TestDataGreenshield.couple.fileName = 'http://127.0.0.1:8080/commonresources/excel/user_000031/greenshiled_couple_1_0_sp_1_0_1_2.xlsx'
  TestDataGreenshield.family.fileName = 'http://127.0.0.1:8080/commonresources/excel/user_000031/greenshiled_family_1_0_sp_1_0_1_0.xlsx'
}


export const broker: any = {
  brokerType: BROKER.BROKERAGE,
}



export const signupForm: any = {
  name: 'Health Benefits Application Form',
  title: 'Group Benefitz - Insurance signup',
  description: 'Group Benefitz registration page',
  formType: SIGNUP_FORM.REGULAR,
  keywords: 'Group Benefitz,insurance,signup',
  // terms_of_service: TERMS_AND_CONDITIONS,
  // disclosure_agreement: DISCLOSURE,
  published: true,
  inelligibilityPeriod: 0,
  link: '/abc'
}

export const signupFormExec: any = {
  name: 'Executive Benefits Application Form',
  title: 'Group Benefitz - Insurance signup',
  description: 'Group Benefitz registration page',
  formType: SIGNUP_FORM.EXECUTIVE,
  keywords: 'Group Benefitz,insurance,signup',
  // terms_of_service: TERMS_AND_CONDITIONS,
  // disclosure_agreement: DISCLOSURE,
  published: true,
  inelligibilityPeriod: 0,
  link: '/abc_exec'
}

export const REPORTING_TYPE: any = { API_REPORTING: 'API_REPORTING', EMAIL_REPORTING: 'EMAIL_REPORTING' }

export const REPORTING_ID: any = {
  bestdoctorsinsurance: 'bestdoctorsinsurance',
  marital_status: 'marital_status',
  name_email: 'name_email',
  candoohealth: 'candoohealth'

}

export const INSURANCE_SERVICES: any = {
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

}

// EXECUTIVE:{
//   name:'',
//   policy:''
// }


export const REGEX: any = {
  NAME: /^[A-Za-z]{2,40}$/,
  EMAIL: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
  POSTAL_CODE: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/,
  //POSTAL_CODE: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/gm,
  CREDIT_CARD: /^[0-9]{13,19}$/,
  APT_SUITE: /^(([a-zA-Z]?)|([0-9]*))$/,
  BANK_CODE: /^[0-9]{3,3}$/,
  BRANCH_CODE: /^[0-9]{5,5}$/,
  ACCOUNT_NO: /^[0-9]{5,12}$/,

}


export const PAYMENT_METHOD: any = {
  CREDIT_CARD: 'CREDIT_CARD',
  ACH: 'ACH',
  PAD: 'PAD',
  INVOICE: 'INVOICE'
}

export const PAYMENT_METHOD_LIST: any = [PAYMENT_METHOD.CREDIT_CARD, PAYMENT_METHOD.ACH, PAYMENT_METHOD.PAD, PAYMENT_METHOD.INVOICE]

//ach //pad
export const ACH = {
  "server": process.env.PADSERVER || process.env.ACHSERVER || 'http://127.0.0.1:3001'
}

export const PAD = {
  "server": process.env.PADSERVER || process.env.ACHSERVER || 'http://127.0.0.1:3001'
}

export const ACHserviceEndpoints = {
  "authorize": '/api/auth',
  "createCustomer": '/api/customer/customerRecord',
  "createPayment": '/api/customer/paymentRecord',
}

export const ACH_CUSTOMER_STATUS = {
  ACTIVE: 'ACTIVE', CANCELLED: 'CANCELLED'
}

export const ACH_CUSTOMER_STATUS_LIST: any = ['ACTIVE', 'CANCELLED']

export const ACH_PAYMENT_STATUS = {
  SCHEDULED: 'SCHEDULED', PENDING: 'PENDING',
  PAID: 'PAID', FAILED: 'FAILED'
}

export const ACH_PAYMENT_STATUS_LIST: any = ['SCHEDULED', 'PENDING', 'PAID', 'FAILED']


export const PAD_CLIENT_ID = process.env.PAD_CLIENT_ID || "4626a003fcfdea860329c0aa0c34efb46b72b1ae8b6c606b3732d1fb85980338"
export const PAD_CLIENT_SECRET = process.env.PAD_CLIENT_SECRET || "MzIxQHNldHliYWVkSQ=="
export const BROKER_LICENSE_COVERAGE = {
  LIFE_A_S: 'LIFE_ACCIDENT_AND_SICKNESS',
  A_S: 'ACCIDENT_AND_SICKNESS',
  LIFE: 'LIFE'
}

export const BROKER_LICENSE_COVERAGE_LIST: any = [BROKER_LICENSE_COVERAGE.LIFE_A_S, BROKER_LICENSE_COVERAGE.A_S, BROKER_LICENSE_COVERAGE.LIFE]

export const MAINAPI_DOMAIN = process.env.MAINAPI || "https://testapi.groupbenefitz.aitestpro.com"
