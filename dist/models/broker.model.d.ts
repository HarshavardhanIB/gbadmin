import { Entity } from '@loopback/repository';
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
    [prop: string]: any;
    constructor(data?: Partial<Broker>);
}
export interface BrokerRelations {
}
export declare type BrokerWithRelations = Broker & BrokerRelations;
