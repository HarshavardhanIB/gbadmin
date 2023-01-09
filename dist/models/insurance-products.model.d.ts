import { Entity } from '@loopback/repository';
export declare class InsuranceProducts extends Entity {
    code?: string;
    cost?: number;
    description?: string;
    fusebillId?: string;
    id?: number;
    isIncludedByDefault?: boolean;
    isMonthlyCost?: boolean;
    isOptional?: boolean;
    isRecurring?: boolean;
    logo?: string;
    name: string;
    planId?: number;
    published: boolean;
    serviceProviderId?: number;
    [prop: string]: any;
    constructor(data?: Partial<InsuranceProducts>);
}
export interface InsuranceProductsRelations {
}
export declare type InsuranceProductsWithRelations = InsuranceProducts & InsuranceProductsRelations;
