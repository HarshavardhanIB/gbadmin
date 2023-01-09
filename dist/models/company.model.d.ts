import { Entity } from '@loopback/repository';
export declare class Company extends Entity {
    companyName?: string;
    contactId?: number;
    description?: string;
    fusebillCustomerId?: string;
    fusebillPaymentId?: string;
    id: number;
    [prop: string]: any;
    constructor(data?: Partial<Company>);
}
export interface CompanyRelations {
}
export declare type CompanyWithRelations = Company & CompanyRelations;
