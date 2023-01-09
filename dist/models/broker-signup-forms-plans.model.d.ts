import { Entity } from '@loopback/repository';
export declare class BrokerSignupFormsPlans extends Entity {
    coveredPercentage?: number;
    formId: number;
    id?: number;
    planId: number;
    rebateId?: number;
    [prop: string]: any;
    constructor(data?: Partial<BrokerSignupFormsPlans>);
}
export interface BrokerSignupFormsPlansRelations {
}
export declare type BrokerSignupFormsPlansWithRelations = BrokerSignupFormsPlans & BrokerSignupFormsPlansRelations;
