import { Entity } from '@loopback/repository';
export declare class PlanLevel extends Entity {
    backgroundColor?: string;
    childMaxAge: number;
    description?: string;
    disallowedPlanLevels?: string;
    id?: number;
    level?: number;
    name: string;
    ordering: number;
    parentId?: number;
    published?: boolean;
    requirePlanLevel?: number;
    textColor?: string;
    tooltipTitle?: string;
    [prop: string]: any;
    constructor(data?: Partial<PlanLevel>);
}
export interface PlanLevelRelations {
}
export declare type PlanLevelWithRelations = PlanLevel & PlanLevelRelations;
