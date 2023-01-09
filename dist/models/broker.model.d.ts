import { Entity } from '@loopback/repository';
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
    [prop: string]: any;
    constructor(data?: Partial<Broker>);
}
export interface BrokerRelations {
}
export declare type BrokerWithRelations = Broker & BrokerRelations;
