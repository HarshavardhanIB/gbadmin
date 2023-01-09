import { Entity } from '@loopback/repository';
export declare class BrokerAvailablePlanLevels extends Entity {
    brokerId: number;
    id?: number;
    isUpgradable: boolean;
    planLevelId: number;
    [prop: string]: any;
    constructor(data?: Partial<BrokerAvailablePlanLevels>);
}
export interface BrokerAvailablePlanLevelsRelations {
}
export declare type BrokerAvailablePlanLevelsWithRelations = BrokerAvailablePlanLevels & BrokerAvailablePlanLevelsRelations;
