import { Entity } from '@loopback/repository';
import { BrokerEoInsurance } from './broker-eo-insurance.model';
import { BrokerLicensedStatesAndProvinces } from './broker-licensed-states-and-provinces.model';
import { SignupForms } from './signup-forms.model';
export declare class Broker extends Entity {
    id?: number;
    parentId?: number;
    name?: string;
    brokerType: string;
    uniqueId?: string;
    logo?: string;
    link?: string;
    description?: string;
    published?: boolean;
    deleted?: boolean;
    userId?: number;
    contactId?: number;
    salesTrackingCode?: string;
    useCreditCardPaymentMethod: boolean;
    usePadPaymentMethod: boolean;
    discoverable: boolean;
    user_id: number;
    contact_id: number;
    brokerEoInsurance: BrokerEoInsurance;
    brokerLicensedStatesAndProvinces: BrokerLicensedStatesAndProvinces[];
    signupForms: SignupForms[];
    [prop: string]: any;
    constructor(data?: Partial<Broker>);
}
export interface BrokerRelations {
}
export declare type BrokerWithRelations = Broker & BrokerRelations;
