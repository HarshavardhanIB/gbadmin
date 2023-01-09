import { Entity } from '@loopback/repository';
export declare class CustomerSignup extends Entity {
    companyName?: string;
    customerId: number;
    enrollmentDate: string;
    formId: number;
    hiringDate: string;
    id?: number;
    jobTitle?: string;
    maritalStatus: string;
    optInPills: boolean;
    provincialHealthCare: boolean;
    readAdvisorDisclosure: boolean;
    signature: string;
    signupDate: string;
    termsAndConditions: boolean;
    weeklyHours: number;
    working_20hours: boolean;
    [prop: string]: any;
    constructor(data?: Partial<CustomerSignup>);
}
export interface CustomerSignupRelations {
}
export declare type CustomerSignupWithRelations = CustomerSignup & CustomerSignupRelations;
