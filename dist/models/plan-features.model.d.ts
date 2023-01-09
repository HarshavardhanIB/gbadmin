import { Entity } from '@loopback/repository';
export declare class PlanFeatures extends Entity {
    category?: string;
    description?: string;
    id?: number;
    name?: string;
    [prop: string]: any;
    constructor(data?: Partial<PlanFeatures>);
}
export interface PlanFeaturesRelations {
}
export declare type PlanFeaturesWithRelations = PlanFeatures & PlanFeaturesRelations;
