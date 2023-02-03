import { Entity } from '@loopback/repository';
export declare class CorporateTieredPlanLevels extends Entity {
    id?: number;
    coveredPercentage: number;
    planId: number;
    spendingLimit: number;
    tierId: number;
    [prop: string]: any;
    constructor(data?: Partial<CorporateTieredPlanLevels>);
}
export interface CorporateTieredPlanLevelsRelations {
}
export declare type CorporateTieredPlanLevelsWithRelations = CorporateTieredPlanLevels & CorporateTieredPlanLevelsRelations;
