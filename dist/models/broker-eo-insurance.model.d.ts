import { Entity } from '@loopback/repository';
export declare class BrokerEoInsurance extends Entity {
    id?: number;
    brokerId: number;
    insurerName: string;
    policyNumber: string;
    certificateNumber: string;
    expiryDate: string;
    broker_id?: number;
    [prop: string]: any;
    constructor(data?: Partial<BrokerEoInsurance>);
}
export interface BrokerEoInsuranceRelations {
}
export declare type BrokerEoInsuranceWithRelations = BrokerEoInsurance & BrokerEoInsuranceRelations;
