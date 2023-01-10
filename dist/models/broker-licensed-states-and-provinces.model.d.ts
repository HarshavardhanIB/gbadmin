import { Entity } from '@loopback/repository';
export declare class BrokerLicensedStatesAndProvinces extends Entity {
    brokerId: number;
    expiryDate?: string;
    id?: number;
    licenseCoverage: string;
    licenseNumber: string;
    reminderEmail?: number;
    stateId: number;
    state_id: number;
    broker_id?: number;
    [prop: string]: any;
    constructor(data?: Partial<BrokerLicensedStatesAndProvinces>);
}
export interface BrokerLicensedStatesAndProvincesRelations {
}
export declare type BrokerLicensedStatesAndProvincesWithRelations = BrokerLicensedStatesAndProvinces & BrokerLicensedStatesAndProvincesRelations;
