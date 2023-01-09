import { Entity } from '@loopback/repository';
export declare class Customer extends Entity {
    brokerId?: number;
    ccExpiry?: string;
    ccExpiryAlertSent?: boolean;
    companyId?: number;
    companyName?: string;
    deleted?: boolean;
    dob?: string;
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
    isCorporateAccount?: boolean;
    lastName: string;
    maritalStatus?: string;
    middleName?: string;
    monthlyRecurringRevenue: number;
    parentId?: number;
    paymentMethod: string;
    paymentMethodId?: string;
    paymentMethodName?: string;
    planLevel?: number;
    registrationDate: string;
    signature?: string;
    status?: string;
    uniqueSinId?: string;
    userId?: number;
    [prop: string]: any;
    constructor(data?: Partial<Customer>);
}
export interface CustomerRelations {
}
export declare type CustomerWithRelations = Customer & CustomerRelations;
