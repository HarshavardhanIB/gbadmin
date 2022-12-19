import { Entity } from '@loopback/repository';
export declare class BrokerSignupFormsPlans extends Entity {
    id?: number;
    formId: number;
    planId: number;
    rebateId?: number;
    coveredPercentage?: number;
    [prop: string]: any;
    constructor(data?: Partial<BrokerSignupFormsPlans>);
}
export interface BrokerSignupFormsPlansRelations {
}
export declare type BrokerSignupFormsPlansWithRelations = BrokerSignupFormsPlans & BrokerSignupFormsPlansRelations;
