import { Entity } from '@loopback/repository';
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
    published?: boolean;
    package_id?: number;
    plan_level?: number;
    stateTaxDetails: PlansAvailability[];
    [prop: string]: any;
    constructor(data?: Partial<InsurancePlans>);
}
export interface InsurancePlansRelations {
}
export declare type InsurancePlansWithRelations = InsurancePlans & InsurancePlansRelations;
