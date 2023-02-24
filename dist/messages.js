"use strict";
//Registration
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH = exports.BROKER_MSG = exports.CORPORATE_MSG = exports.EMAIL_EXISTS = exports.MAIL = exports.ERRORS = void 0;
exports.ERRORS = {
    recaptcha: `Invalid Recaptcha`,
    quebec: `We are not currently operating in Quebec. Please check back with us in 2023`,
    email: `Please enter valid email`,
    firstName: `Firstname must be only alphabets with minimum of 2 characters and max of 40`,
    lastName: `Lastname must be only alphabets with minimum of 2 characters and max of 40`,
    phone: `Phone number is minimum of 10 digits`,
    apt: `Please enter valid Apartment / suite number`,
    postalCode: `Please enter valid postal code`,
    minAge: `Registrant age must be {{minAge}} or greater`,
    maxAge: `Registrant age must be {{maxAge}} or below`,
    minWorkingHours: `Hours per week should be more than {{minWorkingHours}}`,
    maxWorkingHours: `Hours per week should be less than {{maxWorkingHours}}`,
    bankCode: `Bank code must be only numbers of length 3 `,
    branchCode: `Branch code must be only numbers of length 5`,
    accountNo: `Account number must be only numbers of length between 5 and 12`,
    missingDetails: `Input details are insufficient`,
    invalidBankDetails: `Invalid bank details`,
    someThingwentWrong: 'Something went wrong',
    planSelectionPadByTheCompany: 'Please select at least one plan paid by the company'
};
exports.MAIL = {
    SENT: "Mail sent successfully",
    NOT_SENT: "Sending mail failed"
};
exports.EMAIL_EXISTS = {
    ACCESSIBLE_ACCOUNT: `The email address already exists.Please contact your broker for assistance at {{broker_mail}}`,
    INACCESSIBLE_ACCOUNT: `The email address already exists.Please contact GroupBenefitz Admin at {{admin_mail}}`
};
//corporate messages
exports.CORPORATE_MSG = {
    REGISTRATION_SUCCESS: 'Corporate registratered successfully ',
    REGISTRATION_FAIL: 'Corporate registration failed',
    LOGO_NOT_SET: 'logo is not set',
    LOGO: 'logo',
    NOLOGO: 'No logo found',
    PLANS: 'Plans selections are successfully',
    NO_CORPORATE: 'No details found for this corporate',
    EMP_REGISTRATION_SUCCESS: 'Employee registration successfully',
    GROUP_ADMIN_DETAILS: 'Please atlease one company administrator details',
    TIER_CONFIG_SUCCESS: 'Tiers config set successfull',
    WALLET_CONFIG_SUCCESS: 'Wallet config set successfull'
};
exports.BROKER_MSG = {
    BROKERCOUNT: "The brokers count",
    BROKERS_PRMARY_DETAILS: "Broker primary details",
    BROKER_DETAILS: "Broker Details",
    CUSTOMERS_DETAILS_COUNT: "List of customers and count",
    NO_FORM: "No form details found",
    NO_BROKER: 'No broker details found for this broker id'
};
exports.AUTH = {
    NO_USER: "No user found please contact admin",
};
//# sourceMappingURL=messages.js.map