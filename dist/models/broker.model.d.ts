import { Entity } from '@loopback/repository';
import { BrokerEoInsurance } from './broker-eo-insurance.model';
import { BrokerLicensedStatesAndProvinces } from './broker-licensed-states-and-provinces.model';
import { SignupForms } from './signup-forms.model';
export declare class Broker extends Entity {
    brokerType: string;
    contactId?: number;
    deleted?: boolean;
    description?: string;
    discoverable: boolean;
    fusebillCorporateCustomerId?: string;
    id?: number;
    link?: string;
    logo?: string;
    name?: string;
    parentId?: number;
    policyStartDate?: string;
    published?: boolean;
    salesTrackingCode?: string;
    salesTrackingType: string;
    settingsAllowGroupBenefitsWallet: number;
    settingsAllowInvoicePaymentMethod: number;
    settingsEnableTieredHealthBenefits: number;
    settingsHealthSpendingAccount?: string;
    settingsHealthSpendingAllotment?: string;
    settingsRolloverEmployeeLimitNextYear: number;
    settingsRolloverUnusedWalletFunds?: string;
    uniqueId?: string;
    useCreditCardPaymentMethod: boolean;
    useInvoicePaymentMethod: boolean;
    usePadPaymentMethod: boolean;
    userId?: number;
    waitTime?: number;
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
