import { Entity } from '@loopback/repository';
export declare class CustomerContactInfo extends Entity {
    contactId?: number;
    customerId?: number;
    id?: number;
    [prop: string]: any;
    constructor(data?: Partial<CustomerContactInfo>);
}
export interface CustomerContactInfoRelations {
}
export declare type CustomerContactInfoWithRelations = CustomerContactInfo & CustomerContactInfoRelations;
