import { Entity } from '@loopback/repository';
export declare class ContactInformation extends Entity {
    addressType?: string;
    apt?: string;
    city?: string;
    contactType?: string;
    country?: string;
    fusebillId?: string;
    id?: number;
    line1?: string;
    line2?: string;
    postalCode?: string;
    primaryEmail?: string;
    primaryPhone?: string;
    secondaryEmail?: string;
    secondaryPhone?: string;
    state?: string;
    [prop: string]: any;
    constructor(data?: Partial<ContactInformation>);
}
export interface ContactInformationRelations {
}
export declare type ContactInformationWithRelations = ContactInformation & ContactInformationRelations;
