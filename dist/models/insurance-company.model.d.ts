import { Entity } from '@loopback/repository';
export declare class InsuranceCompany extends Entity {
    contactId?: number;
    deleted?: boolean;
    description?: string;
    id?: number;
    link?: string;
    logo?: string;
    name?: string;
    published?: boolean;
    [prop: string]: any;
    constructor(data?: Partial<InsuranceCompany>);
}
export interface InsuranceCompanyRelations {
}
export declare type InsuranceCompanyWithRelations = InsuranceCompany & InsuranceCompanyRelations;
