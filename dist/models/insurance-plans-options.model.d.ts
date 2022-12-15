import { Entity } from '@loopback/repository';
export declare class InsurancePlansOptions extends Entity {
    id?: number;
    planId: number;
    planOptionsId: number;
    [prop: string]: any;
    constructor(data?: Partial<InsurancePlansOptions>);
}
export interface InsurancePlansOptionsRelations {
}
export declare type InsurancePlansOptionsWithRelations = InsurancePlansOptions & InsurancePlansOptionsRelations;
