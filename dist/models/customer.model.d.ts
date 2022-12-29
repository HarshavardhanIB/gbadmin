import { Entity } from '@loopback/repository';
import { CustomerRelatives } from './customer-relatives.model';
import { CustomerPlans } from './customer-plans.model';
import { CustomerSignup } from './customer-signup.model';
import { ContactInformation } from './contact-information.model';
import { CustomerPlanOptionsValues } from './customer-plan-options-values.model';
export declare class Customer extends Entity {
    user_id: number;
    ccExpiry?: string;
    ccExpiryAlertSent?: boolean;
    companyId?: number;
    companyName?: string;
    deleted?: boolean;
    dob: string;
    equitableCertificateId?: string;
    equitableRegistrationStatus?: string;
    firstName: string;
    fusebillCustomerId?: string;
    fusebillPaymentId?: string;
    gender?: string;
    greenshieldMemberId?: string;
    greenshieldRegistrationStatus?: string;
    groupId?: number;
    id?: number;
    lastName: string;
    maritalStatus?: string;
    middleName?: string;
    monthlyRecurringRevenue: number;
    paymentMethod: string;
    paymentMethodId?: string;
    planLevel?: number;
    registrationDate: string;
    signature?: string;
    status?: string;
    uniqueSinId?: string;
    userId?: number;
    customerRelativeRelation: CustomerRelatives[];
    contactInformations: ContactInformation[];
    customerPlanOptionsValues: CustomerPlanOptionsValues[];
    customerPlans: CustomerPlans[];
    customerSignup: CustomerSignup;
    [prop: string]: any;
    constructor(data?: Partial<Customer>);
}
export interface CustomerRelations {
}
export declare type CustomerWithRelations = Customer & CustomerRelations;
