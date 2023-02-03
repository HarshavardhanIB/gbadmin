import { Entity } from '@loopback/repository';
export declare class PlanFeatures extends Entity {
    id: number;
    name?: string;
    category?: string;
    description?: string;
    [prop: string]: any;
    constructor(data?: Partial<PlanFeatures>);
}
export interface PlanFeaturesRelations {
}
export declare type PlanFeaturesWithRelations = PlanFeatures & PlanFeaturesRelations;
