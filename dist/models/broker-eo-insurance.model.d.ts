import { Entity } from '@loopback/repository';
export declare class BrokerEoInsurance extends Entity {
    brokerId: number;
    certificateNumber: string;
    expiryDate: string;
    id?: number;
    insurerName: string;
    policyNumber: string;
    [prop: string]: any;
    constructor(data?: Partial<BrokerEoInsurance>);
}
export interface BrokerEoInsuranceRelations {
}
export declare type BrokerEoInsuranceWithRelations = BrokerEoInsurance & BrokerEoInsuranceRelations;
