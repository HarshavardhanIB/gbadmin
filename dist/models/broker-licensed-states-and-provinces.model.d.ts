import { Entity } from '@loopback/repository';
export declare class BrokerLicensedStatesAndProvinces extends Entity {
    id?: number;
    brokerId: number;
    stateId: number;
    expiryDate?: string;
    reminderEmail?: number;
    [prop: string]: any;
    constructor(data?: Partial<BrokerLicensedStatesAndProvinces>);
}
export interface BrokerLicensedStatesAndProvincesRelations {
}
export declare type BrokerLicensedStatesAndProvincesWithRelations = BrokerLicensedStatesAndProvinces & BrokerLicensedStatesAndProvincesRelations;
