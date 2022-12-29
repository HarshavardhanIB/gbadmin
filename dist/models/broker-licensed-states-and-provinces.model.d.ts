import { Entity } from '@loopback/repository';
export declare class BrokerLicensedStatesAndProvinces extends Entity {
    id?: number;
    brokerId: number;
    stateId: number;
    licenseNumber: string;
    licenseCoverage: string;
    expiryDate?: string;
    reminderEmail?: number;
    state_id: number;
    broker_id?: number;
    [prop: string]: any;
    constructor(data?: Partial<BrokerLicensedStatesAndProvinces>);
}
export interface BrokerLicensedStatesAndProvincesRelations {
}
export declare type BrokerLicensedStatesAndProvincesWithRelations = BrokerLicensedStatesAndProvinces & BrokerLicensedStatesAndProvincesRelations;
