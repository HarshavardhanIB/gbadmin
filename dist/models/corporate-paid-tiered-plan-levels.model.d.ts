import { Entity } from '@loopback/repository';
export declare class CorporatePaidTieredPlanLevels extends Entity {
    coveredPercentage: number;
    id?: number;
    planId: number;
    spendingLimit: number;
    tierId: number;
    [prop: string]: any;
    constructor(data?: Partial<CorporatePaidTieredPlanLevels>);
}
export interface CorporatePaidTieredPlanLevelsRelations {
}
export declare type CorporatePaidTieredPlanLevelsWithRelations = CorporatePaidTieredPlanLevels & CorporatePaidTieredPlanLevelsRelations;
