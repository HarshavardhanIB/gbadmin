import { Entity } from '@loopback/repository';
export declare class BrokerRegistration extends Entity {
    brokerId?: number;
    insuranceCompanyId?: number;
    [prop: string]: any;
    constructor(data?: Partial<BrokerRegistration>);
}
export interface BrokerRegistrationRelations {
}
export declare type BrokerRegistrationWithRelations = BrokerRegistration & BrokerRegistrationRelations;
