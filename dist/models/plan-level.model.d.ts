/// <reference types="node" />
import { Entity } from '@loopback/repository';
import { EquitablePlanLevelMapping } from './equitable-plan-level-mapping.model';
import { GreenshieldPlanLevelMapping } from './greenshield-plan-level-mapping.model';
import { InsurancePlans } from './insurance-plans.model';
import { PlanFeatures } from './plan-features.model';
import { PlanLevelFeatures } from './plan-level-features.model';
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
    published?: Buffer;
    requirePlanLevel?: number;
    textColor?: string;
    tooltipTitle?: string;
    greenshieldPackages: GreenshieldPlanLevelMapping[];
    planLevelFeatures: PlanLevelFeatures[];
    planFeatures: PlanFeatures[];
    equitablePackages: EquitablePlanLevelMapping[];
    plans: InsurancePlans[];
    [prop: string]: any;
    constructor(data?: Partial<PlanLevel>);
}
export interface PlanLevelRelations {
}
export declare type PlanLevelWithRelations = PlanLevel & PlanLevelRelations;
