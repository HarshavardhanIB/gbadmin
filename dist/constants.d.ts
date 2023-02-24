export declare const WELCOME = "Welcome to GroupBenefitz";
export declare const dateFormat1 = "YYYY-MM-DD HH:MM:SS";
export declare const dateFormat2 = "YYYY-MM-DD";
export declare const rolloverUnusedWalletFunds: string[];
export declare const walletAllotment: string[];
export declare const walletType: string[];
export declare const payForService: string[];
export declare const USER_ROLE: any;
export declare const TIER: {
    general: string;
};
export declare const CORPORATE_SETTINGS: {
    settings_allow_invoice_payment_method: string;
    settings_allow_group_benefits_wallet: string;
    settings_group_benefitz_wallet_type: string;
    settings_health_spending_account: string;
    settings_health_spending_allotment: string;
    settings_rollover_employee_limit_next_year: string;
    settings_enable_tiered_health_benefits: string;
    settings_enable_length_of_service_tiers: string;
    settings_enable_annual_income_tiers: string;
};
export declare const CONTACT_TYPE: any;
export declare const ADDRESS_TYPE: any;
export declare const RELATIONSHIP_TYPE: any;
export declare const MARITAL_STATUS_OLD: any;
export declare const MARITAL_STATUS: any;
export declare const MARITAL_STATUS_LIST: any;
export declare const PLAN_COVERAGE: any;
export declare const PLAN_COVERAGE_LIST: any;
export declare const GENDER: any;
export declare const GENDER_LIST: any;
export declare const STATUS: any;
export declare const EOI: {
    EXPIRE: string;
};
export declare const LICENCE: {
    EXPIRE: string;
    FOUND: string;
    NOLICENCES: string;
};
export declare const MIN = "Min";
export declare const MAX = "Max";
export declare const PARTIAL = "Partial";
export declare const NONE = "None";
export declare const NODATA = "No data found";
export declare const HEALTH_DENTAL_PACKAGE_ID = 1;
export declare const HEALTH_DENTAL_PACKAGES: number[];
export declare const GREENSHEILD_PACKAGES: number[];
export declare const GREENSHEILD_PLAN_LEVELS: number[];
export declare const EQUITABLE_PACKAGES: number[];
export declare const EQUITABLE_PLAN_LEVELS: number[];
export declare const OPTIN_PACKAGES: number[];
export declare const OPTIN_PLAN_LEVELS: number[];
export declare const HIGHCOST_DRUGS_PACKAGE_ID = 3;
export declare const HIGHCOST_DRUGS_PACKAGES: number[];
export declare const HIGHCOST_DRUGS_PLAN_LEVELS: number[];
export declare const EXECUTIVE_PACKAGE_ID = 5;
export declare const EXECUTIVE_PACKAGES: number[];
export declare const EXECUTIVE_HEALTH_PLAN_LEVELS: number[];
export declare const EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS: number[];
export declare const GREENSHEILD_REGISTRATION_STATUS: any;
export declare const EQUITABLE_REGISTRATION_STATUS: any;
export declare const LOGGING_SOURCE: any;
export declare const SPENDING_LIMIT = 1000;
export declare const MONTH: number;
export declare const HIRING_DATE_LIMIT: number;
export declare const HIRING_DATE_INELIGIBILITY_PERIOD_NO = 90;
export declare const HIRING_DATE_INELIGIBILITY_PERIOD_DURATION = "days";
export declare const VALIDATIONS: {
    CUSTOMER_AGE_MIN: number;
    CUSTOMER_AGE_MAX: number;
    CUSTOMER_WORKING_HOURS_MIN: number;
    CUSTOMER_WORKING_HOURS_MAX: number;
    SPOUSE_AGE_MIN: number;
    CUSTOMER_HIRING_DATE_MIN: number;
    CUSTOMER_HIRING_DATE_MAX: number;
};
export declare const DEFAULT_COUNTRY: {
    name: string;
    id: number;
    shortName: string;
    isoCode: string;
    currency: string;
    fusebillId: number;
    currencySymbol: string;
};
export declare const SIGNUP_FORM: {
    REGULAR: string;
    EXECUTIVE: string;
    CUSTOM: string;
};
export declare const FORM_TYPE_ARRAY: string[];
export declare const LICENSE_COVERAGE: string[];
export declare const PRODUCT_TYPE_ARRAY: string[];
export declare const BROKER: {
    BROKERAGE: string;
    ADVISOR: string;
    ASSOCIATION: string;
    CORPORATE: string;
    TPA_MGA: string;
};
export declare const BROKER_TYPE_ARRAY: string[];
export declare const DEFAULT_FORM_ID = 1;
export declare const DEFAULT_FORM: {
    name: string;
    title: string;
    description: string;
    formType: string;
    id: number;
    termsAndConditions: string;
    disclosureAgreement: string;
    languageTokens: string;
    ineligibilityPeriod: number;
    ineligibilityPeriodToken: string;
};
export declare const DEFAULT_LANGAUGE = "en";
export declare const httpStatus: any;
export declare const TIER_TYPE: {
    DEF: string;
    LOS: string;
    AI: string;
};
export declare const GB_DEV: string;
export declare const GB_SUPPORT: string;
export declare const GB_ADMIN: string;
export declare const CUSTOMER_ENROLL_REPORT_MAIL_SUBJECT_SYSADMIN = "Customers Enrollment Report at GroupBenefitz";
export declare const CUSTOMER_ENROLL_REPORT_MAIL_SUBJECT_BROKER = "Customers Enrollment Report at GroupBenefitz";
export declare const CUSTOMER_UPDATE_REPORT_MAIL_SUBJECT_SYSADMIN = "Customers Updated Report at GroupBenefitz";
export declare const CUSTOMER_UPDATE_REPORT_MAIL_SUBJECT_BROKER = "Customers Updated Report at GroupBenefitz";
export declare const CUSTOMER_CANCEL_REPORT_MAIL_SUBJECT_SYSADMIN = "Customers Cancellation Report at GroupBenefitz";
export declare const CUSTOMER_CANCEL_REPORT_MAIL_SUBJECT_BROKER = "Customers Cancellation Report at GroupBenefitz";
export declare const CUSTOMERREGISTRAION_MAIL_SUBJECT_SYSADMIN = "Customer Registered at GroupBenefitz";
export declare const CUSTOMERREGISTRAION_MAIL_SUBJECT_BROKER = "Customer Registered at GroupBenefitz";
export declare const CUSTOMERREGISTRAION_MAIL_SUBJECT_CUSTOMER = "Registration Successful";
export declare const PAYMENTFAIL_MAIL_SUBJECT_BROKER = "Payment Failed at Fusebill";
export declare const PAYMENTFAIL_MAIL_SUBJECT_CUSTOMER = "Payment Failed at Fusebill";
export declare const PAYMENTSUCCESS_MAIL_SUBJECT_BROKER = "Payment Success at Fusebill";
export declare const PAYMENTSUCCESS_MAIL_SUBJECT_CUSTOMER = "Payment Success at Fusebill";
export declare const userCreds: {
    username: string;
    email: string;
    password: string;
};
export declare const aitp: {
    server: string;
};
export declare const serviceEndpoints: {
    login: string;
    executionId: string;
    externalData: string;
};
export declare const commonExecutionData: any;
export declare const TestDataGreenshield_BCK: any;
export declare const TestDataGreenshield: any;
export declare const targetTestcasesGreenshield: any;
export declare const TestDataEquitableSave: any;
export declare const TestDataEquitable: any;
export declare const targetTestcasesEquitable: any;
export declare const TestDataExecutive: any;
export declare const targetTestcasesExecutive: any;
export declare const broker: any;
export declare const signupForm: any;
export declare const signupFormExec: any;
export declare const REPORTING_TYPE: any;
export declare const REPORTING_ID: any;
export declare const INSURANCE_SERVICES: any;
export declare const REGEX: any;
export declare const PAYMENT_METHOD: any;
export declare const PAYMENT_METHOD_LIST: any;
export declare const PAYMENT_METHOD_LIST_ARRAY: {
    name: string;
    key: string;
    value: any;
}[];
export declare const ACH: {
    server: string;
};
export declare const PAD: {
    server: string;
};
export declare const ACHserviceEndpoints: {
    authorize: string;
    createCustomer: string;
    createPayment: string;
};
export declare const ACH_CUSTOMER_STATUS: {
    ACTIVE: string;
    CANCELLED: string;
};
export declare const ACH_CUSTOMER_STATUS_LIST: any;
export declare const ACH_PAYMENT_STATUS: {
    SCHEDULED: string;
    PENDING: string;
    PAID: string;
    FAILED: string;
};
export declare const ACH_PAYMENT_STATUS_LIST: any;
export declare const PAD_CLIENT_ID: string;
export declare const PAD_CLIENT_SECRET: string;
export declare const BROKER_LICENSE_COVERAGE: {
    LIFE_A_S: string;
    A_S: string;
    LIFE: string;
};
export declare const BROKER_LICENSE_COVERAGE_LIST: any;
export declare const MAINAPI_DOMAIN: string;
