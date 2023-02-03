import { Entity } from '@loopback/repository';
import { BrokerEoInsurance } from './broker-eo-insurance.model';
import { BrokerLicensedStatesAndProvinces } from './broker-licensed-states-and-provinces.model';
import { SignupForms } from './signup-forms.model';
export declare class Broker extends Entity {
    id?: number;
    brokerType: string;
    contactId?: number;
    deleted?: boolean;
    description?: string;
    discoverable?: boolean;
    fusebillCorporateCustomerId?: string;
    link?: string;
    logo?: string;
    name?: string;
    parentId?: number;
    policyStartDate?: string;
    published?: boolean;
    salesTrackingCode?: string;
    salesTrackingType?: string;
    settingsAllowGroupBenefitsWallet?: number;
    settingsGroupBenefitzWalletType?: string;
    settingsAllowInvoicePaymentMethod?: number;
    settingsEnableTieredHealthBenefits?: number;
    settingsHealthSpendingAccount?: string;
    settingsHealthSpendingAllotment?: string;
    settingsRolloverEmployeeLimitNextYear?: number;
    settingsRolloverUnusedWalletFunds?: string;
    uniqueId?: string;
    useCreditCardPaymentMethod?: boolean;
    useInvoicePaymentMethod?: boolean;
    usePadPaymentMethod?: boolean;
    userId?: number;
    waitTime?: number;
    settingsEnableLengthOfServiceTiers?: number;
    settingsEnableAnnualIncomeTiers?: number;
    brokerEoInsurance: BrokerEoInsurance;
    contact_id: number;
    brokerLicensedStatesAndProvinces: BrokerLicensedStatesAndProvinces[];
    signupForms: SignupForms[];
    subBrokers: Broker[];
    parent_id: number;
    user_id: number;
    [prop: string]: any;
    constructor(data?: Partial<Broker>);
}
export interface BrokerRelations {
}
export declare type BrokerWithRelations = Broker & BrokerRelations;
