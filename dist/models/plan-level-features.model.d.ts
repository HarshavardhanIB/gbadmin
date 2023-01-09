import { Entity } from '@loopback/repository';
export declare class PlanLevelFeatures extends Entity {
    description?: string;
    id?: number;
    planFeatureId?: number;
    planLevelId?: number;
    [prop: string]: any;
    constructor(data?: Partial<PlanLevelFeatures>);
}
export interface PlanLevelFeaturesRelations {
}
export declare type PlanLevelFeaturesWithRelations = PlanLevelFeatures & PlanLevelFeaturesRelations;
