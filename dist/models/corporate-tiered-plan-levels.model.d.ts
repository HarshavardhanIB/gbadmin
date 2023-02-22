import { Entity } from '@loopback/repository';
export declare class CorporateTieredPlanLevels extends Entity {
    id?: number;
    coveredPercentage: number;
    paidByCompany?: number;
    coveredByCompany?: number;
    paidByEmployee?: number;
    planLevelId: number;
    spendingLimit: number;
    tierId: number;
    [prop: string]: any;
    constructor(data?: Partial<CorporateTieredPlanLevels>);
}
export interface CorporateTieredPlanLevelsRelations {
}
export declare type CorporateTieredPlanLevelsWithRelations = CorporateTieredPlanLevels & CorporateTieredPlanLevelsRelations;
