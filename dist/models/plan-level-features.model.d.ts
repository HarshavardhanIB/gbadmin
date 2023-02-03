import { Entity } from '@loopback/repository';
export declare class PlanLevelFeatures extends Entity {
    id?: number;
    description?: string;
    planFeatureId?: number;
    planLevelId?: number;
    plan_feature_id: number;
    [prop: string]: any;
    constructor(data?: Partial<PlanLevelFeatures>);
}
export interface PlanLevelFeaturesRelations {
}
export declare type PlanLevelFeaturesWithRelations = PlanLevelFeatures & PlanLevelFeaturesRelations;
