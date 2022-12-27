import { Entity } from '@loopback/repository';
export declare class BrokerSignupformsPlanlevels extends Entity {
    id?: number;
    formId: number;
    planlevelId: number;
    [prop: string]: any;
    constructor(data?: Partial<BrokerSignupformsPlanlevels>);
}
export interface BrokerSignupformsPlanlevelsRelations {
}
export declare type BrokerSignupformsPlanlevelsWithRelations = BrokerSignupformsPlanlevels & BrokerSignupformsPlanlevelsRelations;
