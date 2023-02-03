import { Entity } from '@loopback/repository';
import { InsurancePlans } from './insurance-plans.model';
import { PlanLevel } from './plan-level.model';
export declare class InsurancePackages extends Entity {
    allowMultiple?: boolean;
    applyFilters?: boolean;
    description?: string;
    id?: number;
    logo?: string;
    name?: string;
    optIn?: boolean;
    ordering?: number;
    published?: boolean;
    requiredPackage: number;
    plans: InsurancePlans[];
    planGroups: PlanLevel[];
    [prop: string]: any;
    constructor(data?: Partial<InsurancePackages>);
}
export interface InsurancePackagesRelations {
}
export declare type InsurancePackagesWithRelations = InsurancePackages & InsurancePackagesRelations;
