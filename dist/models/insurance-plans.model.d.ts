/// <reference types="node" />
import { Entity } from '@loopback/repository';
import { PlanOptions } from './plan-options.model';
import { PlansAvailability } from './plans-availability.model';
export declare class InsurancePlans extends Entity {
    code?: string;
    corporatePlan?: boolean;
    cost?: number;
    description?: string;
    frqMonthly?: string;
    frqYearly?: string;
    fusebillId?: string;
    id?: number;
    insuranceCompanyId?: number;
    isMonthlyCost?: boolean;
    logo?: string;
    maxAge?: number;
    minAge?: number;
    name?: string;
    ordering?: number;
    packageId?: number;
    planCoverage?: string;
    planLevel?: number;
    published?: Buffer;
    package_id?: number;
    stateTaxDetails: PlansAvailability[];
    planOptions: PlanOptions[];
    plan_level: number;
    [prop: string]: any;
    constructor(data?: Partial<InsurancePlans>);
}
export interface InsurancePlansRelations {
}
export declare type InsurancePlansWithRelations = InsurancePlans & InsurancePlansRelations;
