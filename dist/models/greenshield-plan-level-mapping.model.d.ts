import { Entity } from '@loopback/repository';
export declare class GreenshieldPlanLevelMapping extends Entity {
    id?: number;
    name: boolean;
    planLevelId?: number;
    stateId?: number;
    [prop: string]: any;
    constructor(data?: Partial<GreenshieldPlanLevelMapping>);
}
export interface GreenshieldPlanLevelMappingRelations {
}
export declare type GreenshieldPlanLevelMappingWithRelations = GreenshieldPlanLevelMapping & GreenshieldPlanLevelMappingRelations;
